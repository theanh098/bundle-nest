import { InternalServerErrorException } from "@nestjs/common";
import { Effect } from "effect";

import type { AnyHow } from ".";
import type { NonCtxEffect } from "../types/non-context-effect.type";

import { toError } from "../helpers/to-error.helper";

export class InfrastructureError implements AnyHow {
  static readonly _tag = "InfrastructureError";

  static isInfer(err: AnyHow): err is InfrastructureError {
    return InfrastructureError._tag === err._tag;
  }

  static into(error: unknown): NonCtxEffect<InfrastructureError, never> {
    return Effect.fail(new InfrastructureError(error));
  }

  constructor(public readonly error: unknown) {}

  public readonly _tag = InfrastructureError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag,
      message: `Infrastructure error with reason: ${
        toError(this.error).message
      }`
    });
  }
}
