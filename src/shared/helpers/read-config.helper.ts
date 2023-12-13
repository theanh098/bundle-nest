import { Config, Effect as E, Option, pipe } from "effect";

import type { NonCtxEft } from "../types/non-context-effect.type";
import type { ConfigService } from "@nestjs/config";

import { MissingEnvironmentError } from "../errors/missing-environment.error";

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
): NonCtxEft<MissingEnvironmentError, string> =>
  pipe(
    E.config(Config.string(config)),
    E.mapError(() => new MissingEnvironmentError(config))
  );
