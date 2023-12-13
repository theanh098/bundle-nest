import { InternalServerErrorException } from "@nestjs/common";
import { Effect as E } from "effect";

import type { AnyHow } from ".";
import type { BlazingTable } from "../database";
import type { NonCtxE } from "../types/non-context-effect.type";

export class DatabaseQueryNotFoundError implements AnyHow {
  static readonly _tag = "DatabaseQueryNotFoundError";

  static isInfer(err: AnyHow): err is DatabaseQueryNotFoundError {
    return DatabaseQueryNotFoundError._tag === err._tag;
  }

  static into(
    table: BlazingTable,
    args: unknown
  ): NonCtxE<DatabaseQueryNotFoundError, never> {
    return E.fail(new DatabaseQueryNotFoundError(table, args));
  }

  constructor(
    public readonly table: BlazingTable,
    public readonly args: unknown
  ) {}

  public readonly _tag = DatabaseQueryNotFoundError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag,
      message: `Not found record on table ${this.table} with ${JSON.stringify(
        this.args
      )}`
    });
  }
}
