import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { DATABASE } from "@root/shared/constants/token";
import type { Database } from "@root/shared/database";
import { getDatabase } from "@root/shared/database";
import { CityRepository } from "@root/shared/database/repositories/city.repository";
import { CountryRepository } from "@root/shared/database/repositories/country.repository";
import { readConfigOrExit } from "@root/shared/helpers/read-config";

@Global()
@Module({
  exports: [CityRepository, CountryRepository],
  providers: [
    {
      provide: DATABASE,
      useFactory: (configService: ConfigService): Database =>
        getDatabase({
          connectionString: readConfigOrExit(configService)("DATABASE_URL")
        }),
      inject: [ConfigService]
    },
    CityRepository,
    CountryRepository
  ]
})
export class DrizzleModule {}
