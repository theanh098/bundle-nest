import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CountryModule } from "./country/country.module";
import { CommandModule } from "./libs/command/command.module";
import { DrizzleModule } from "./libs/drizzle/drizzle.module";
import { CityRepository } from "./shared/database/repositories/city.repository";
import { CountryRepository } from "./shared/database/repositories/country.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/.${process.env.ENV || "local"}.env`
    }),
    DrizzleModule.register(CountryRepository, CityRepository),
    CountryModule,
    CommandModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
