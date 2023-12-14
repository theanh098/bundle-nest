import type { ConfigService } from "@nestjs/config";
import { Config, Effect as E, Option as O, pipe } from "effect";

import { MissingEnvironmentError } from "../errors/missing-environment.error";
import type { NonCtxEft } from "../types/non-context-effect.type";

export const readConfigOrExit =
  (configService: ConfigService) =>
  (config: string): string =>
    pipe(
      configService.get<string | undefined>(config),
      O.fromNullable,
      O.match({
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
