import { InternalServerErrorException } from "@nestjs/common";

import type { AnyHow } from "./encode";

import { toError } from "../helpers/to-error";

export class DatabaseQueryError implements AnyHow {
  static readonly _tag: unique symbol = Symbol("MissingEnvironmentErrorTag");

  static isBounded(err: AnyHow): err is DatabaseQueryError {
    return DatabaseQueryError._tag === err._tag;
  }

  constructor(public error: unknown) {}

  public _tag = DatabaseQueryError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag.description,
      message: `Database query error with reason ${toError(this.error).message}`
    });
  }
}
