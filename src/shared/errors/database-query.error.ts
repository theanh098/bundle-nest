import { InternalServerErrorException } from "@nestjs/common";
import { Effect as E } from "effect";

import type { AnyHow } from ".";
import { toError } from "../helpers/to-error.helper";
import type { NonCtxEft } from "../types/non-context-effect.type";

export class DatabaseQueryError implements AnyHow {
  static readonly _tag = "DatabaseQueryError";

  static isInfer(err: AnyHow): err is DatabaseQueryError {
    return DatabaseQueryError._tag === err._tag;
  }

  static into(error: unknown): NonCtxEft<DatabaseQueryError, never> {
    return E.fail(new DatabaseQueryError(error));
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
