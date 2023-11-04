import { InternalServerErrorException } from "@nestjs/common";

import { toError } from "../helpers/to-error";
import type { AnyHow } from "./encode";

export class InfrastructureError implements AnyHow {
  static readonly _tag: unique symbol = Symbol("InfrastructureErrorTag");

  static isBounded(err: AnyHow): err is InfrastructureError {
    return InfrastructureError._tag === err._tag;
  }

  constructor(public error: unknown) {}

  public _tag = InfrastructureError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException(
      `Infrastructure error with reason: ${toError(this.error).message}`
    );
  }
}
