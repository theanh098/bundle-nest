import { InternalServerErrorException } from "@nestjs/common";
import { Effect as E } from "effect";

import type { AnyHow } from ".";
import type { NonCtxEft } from "../types/non-context-effect.type";

export class MissingEnvironmentError implements AnyHow {
  static readonly _tag = "MissingEnvironmentError";

  static infer(err: AnyHow): err is MissingEnvironmentError {
    return MissingEnvironmentError._tag === err._tag;
  }

  static into(config: string): NonCtxEft<MissingEnvironmentError, never> {
    return E.fail(new MissingEnvironmentError(config));
  }

  constructor(public readonly config: string) {}

  public readonly _tag = MissingEnvironmentError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag,
      message: `Missing environment: ${this.config}`
    });
  }
}
