import { InternalServerErrorException } from "@nestjs/common";

import type { AnyHow } from ".";

import { toError } from "../helpers/to-error.helper";

export class InfrastructureError implements AnyHow {
  static readonly _tag = "InfrastructureError";

  static isInfer(err: AnyHow): err is InfrastructureError {
    return InfrastructureError._tag === err._tag;
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
