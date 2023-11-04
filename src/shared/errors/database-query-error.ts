import { InternalServerErrorException } from "@nestjs/common";

import { toError } from "../helpers/to-error";
import type { AnyHow } from "./encode";

export class DatabaseQueryError implements AnyHow {
  static readonly _tag: unique symbol = Symbol("MissingEnvironmentErrorTag");

  static isBounded(err: AnyHow): err is DatabaseQueryError {
    return DatabaseQueryError._tag === err._tag;
  }

  constructor(public error: unknown) {}

  public _tag = DatabaseQueryError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      _tag: this._tag,
      message: `Database query error with reason ${toError(this.error).message}`
    });
  }
}
