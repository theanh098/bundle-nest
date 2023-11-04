import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { DATABASE } from "@root/shared/constants/token";
import type { Database } from "@root/shared/database";
import { getDatabase } from "@root/shared/database";
import { CityRepository } from "@root/shared/database/repositories/city.repository";
import { CountryRepository } from "@root/shared/database/repositories/country.repository";

@Global()
@Module({
  exports: [CityRepository, CountryRepository],
  providers: [
    CityRepository,
    CountryRepository,
    {
      provide: DATABASE,
      useFactory: (configService: ConfigService): Database =>
        getDatabase({
          connectionString: configService.get<string>("DATABASE_URL")
        }),
      inject: [ConfigService]
    }
  ]
})
export class DrizzleModule {}
