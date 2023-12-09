import { InternalServerErrorException } from "@nestjs/common";

import type { AnyHow } from ".";

import { toError } from "../helpers/to-error.helper";

export class DatabaseUpdateError implements AnyHow {
  static readonly _tag = "DatabaseUpdateError";

  static isInfer(err: AnyHow): err is DatabaseUpdateError {
    return DatabaseUpdateError._tag === err._tag;
  }

  constructor(public readonly error: unknown) {}

  public readonly _tag = DatabaseUpdateError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag,
      message: `Database update error with reason ${
        toError(this.error).message
      }`
    });
  }
}
