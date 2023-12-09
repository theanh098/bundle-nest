import { InternalServerErrorException } from "@nestjs/common";
import { Effect } from "effect";

import type { AnyHow } from ".";
import type { NonCtxEffect } from "../types/non-context-effect.type";

export class MissingEnvironmentError implements AnyHow {
  static readonly _tag = "MissingEnvironmentError";

  static isInfer(err: AnyHow): err is MissingEnvironmentError {
    return MissingEnvironmentError._tag === err._tag;
  }

  static into(config: string): NonCtxEffect<MissingEnvironmentError, never> {
    return Effect.fail(new MissingEnvironmentError(config));
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
