import { InternalServerErrorException } from "@nestjs/common";

import type { AnyHow } from "./encode";

import { toError } from "../helpers/to-error";

export class DatabaseQueryError implements AnyHow {
  static readonly _tag = "DatabaseQueryError";

  static isInfer(err: AnyHow): err is DatabaseQueryError {
    return DatabaseQueryError._tag === err._tag;
  }

  constructor(public readonly error: unknown) {}

  public readonly _tag = DatabaseQueryError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag,
      message: `Database query error with reason ${toError(this.error).message}`
    });
  }
}
