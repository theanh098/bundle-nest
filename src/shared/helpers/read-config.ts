import { Config, Effect, Option, pipe } from "effect";

import type { NonCtxEffect } from "../types/non-context-effect";
import type { ConfigService } from "@nestjs/config";

import { MissingEnvironmentError } from "../errors/missing-environment-error";

export const readConfigOrExit =
  (configService: ConfigService) =>
  (config: string): string =>
    pipe(
      configService.get<string | undefined>(config),
      Option.fromNullable,
      Option.match({
        onNone: () => {
          console.error(`Missing ${config} env`);
          process.exit();
        },
        onSome: value => value
      })
    );

export const readConfig = (
  config: string
): NonCtxEffect<MissingEnvironmentError, string> =>
  pipe(
    Effect.config(Config.string(config)),
    Effect.mapError(() => new MissingEnvironmentError(config))
  );
