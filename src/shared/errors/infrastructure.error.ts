import { InternalServerErrorException } from "@nestjs/common";
import { Effect as E } from "effect";

import type { AnyHow } from ".";
import { toError } from "../helpers/to-error.helper";
import type { NonCtxEft } from "../types/non-context-effect.type";

export class InfrastructureError implements AnyHow {
  static readonly _tag = "InfrastructureError";

  static infer(err: AnyHow): err is InfrastructureError {
    return InfrastructureError._tag === err._tag;
  }

  static into(error: unknown): NonCtxEft<InfrastructureError, never> {
    return E.fail(new InfrastructureError(error));
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
