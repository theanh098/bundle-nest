import { InternalServerErrorException } from "@nestjs/common";
import { Effect as E } from "effect";

import type { AnyHow } from ".";
import type { NonCtxE } from "../types/non-context-effect.type";

import { toError } from "../helpers/to-error.helper";

export class DatabaseUpdateError implements AnyHow {
  static readonly _tag = "DatabaseUpdateError";

  static isInfer(err: AnyHow): err is DatabaseUpdateError {
    return DatabaseUpdateError._tag === err._tag;
  }

  static into(error: unknown): NonCtxE<DatabaseUpdateError, never> {
    return E.fail(new DatabaseUpdateError(error));
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
