import { InternalServerErrorException } from "@nestjs/common";

import type { AnyHow } from "./encode";

export class DatabaseQueryNotFoundError implements AnyHow {
  static readonly _tag = "DatabaseQueryNotFoundError";

  static isInfer(err: AnyHow): err is DatabaseQueryNotFoundError {
    return DatabaseQueryNotFoundError._tag === err._tag;
  }

  constructor(
    public readonly query: {
      table: string;
      column: string;
      value: string | number | boolean | null | undefined;
    }
  ) {}

  public readonly _tag = DatabaseQueryNotFoundError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag,
      message: `Not found record on table ${this.query.table} with ${this.query.column} = ${this.query.value}`
    });
  }
}
