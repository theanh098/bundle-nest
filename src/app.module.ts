import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CountryModule } from "./country/country.module";
import { DrizzleModule } from "./drizzle/drizzle.module";

@Module({
  imports: [
    DrizzleModule,
    CountryModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
