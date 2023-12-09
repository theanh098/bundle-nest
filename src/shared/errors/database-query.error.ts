import { InternalServerErrorException } from "@nestjs/common";
import { Effect } from "effect";

import type { AnyHow } from ".";
import type { NonCtxEffect } from "../types/non-context-effect.type";

import { toError } from "../helpers/to-error.helper";

export class DatabaseQueryError implements AnyHow {
  static readonly _tag = "DatabaseQueryError";

  static isInfer(err: AnyHow): err is DatabaseQueryError {
    return DatabaseQueryError._tag === err._tag;
  }

  static into(error: unknown): NonCtxEffect<DatabaseQueryError, never> {
    return Effect.fail(new DatabaseQueryError(error));
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
