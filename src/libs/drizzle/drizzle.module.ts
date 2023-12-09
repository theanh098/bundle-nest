import { ConfigService } from "@nestjs/config";

import type { DynamicModule } from "@nestjs/common";
import { Global, Module } from "@nestjs/common";

import { DATABASE } from "@root/shared/constants/token.constant";
import type { Database } from "@root/shared/database";
import { getDatabase } from "@root/shared/database";
import { readConfigOrExit } from "@root/shared/helpers/read-config.helper";

@Global()
@Module({})
export class DrizzleModule {
  static register(
    ...repositories: Array<{ new (db: Database): object }>
  ): DynamicModule {
    return {
      module: DrizzleModule,
      providers: [
        {
          provide: DATABASE,
          useFactory: (configService: ConfigService): Database =>
            getDatabase({
              connectionString: readConfigOrExit(configService)("DATABASE_URL")
            }),
          inject: [ConfigService]
        },
        ...repositories
      ],
      exports: repositories
    };
  }
}
