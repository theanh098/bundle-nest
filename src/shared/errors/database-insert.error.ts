import { InternalServerErrorException } from "@nestjs/common";
import { Effect } from "effect";

import type { AnyHow } from ".";
import type { NonCtxEffect } from "../types/non-context-effect.type";

import { toError } from "../helpers/to-error.helper";

export class DatabaseInsertError implements AnyHow {
  static readonly _tag = "DatabaseInsertError";

  static isInfer(err: AnyHow): err is DatabaseInsertError {
    return DatabaseInsertError._tag === err._tag;
  }

  static into(error: unknown): NonCtxEffect<DatabaseInsertError, never> {
    return Effect.fail(new DatabaseInsertError(error));
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
