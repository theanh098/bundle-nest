import { InternalServerErrorException } from "@nestjs/common";

import type { AnyHow } from ".";

import { toError } from "../helpers/to-error.helper";

export class DatabaseInsertError implements AnyHow {
  static readonly _tag = "DatabaseInsertError";

  static isInfer(err: AnyHow): err is DatabaseInsertError {
    return DatabaseInsertError._tag === err._tag;
  }

  constructor(public readonly error: unknown) {}

  public readonly _tag = DatabaseInsertError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag,
      message: `Database insert error with reason ${
        toError(this.error).message
      }`
    });
  }
}
