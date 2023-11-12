import { Injectable } from "@nestjs/common";
import { Effect, flow, pipe } from "effect";

import type { City } from "@root/shared/IO/City";
import type { NonCtxEffect } from "@root/shared/types/non-context-effect";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import { DatabaseQueryError } from "@root/shared/errors/database-query-error";
import { DatabaseQueryNotFoundError } from "@root/shared/errors/database-query-not-found-error";

@Injectable()
export class CityRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(
    id: number
  ): NonCtxEffect<DatabaseQueryError | DatabaseQueryNotFoundError, City> {
    return pipe(
      Effect.tryPromise({
        try: () =>
          this.db.query.city.findFirst({
            where: (cols, opts) => opts.eq(cols.id, id)
          }),
        catch: err => new DatabaseQueryError(err)
      }),
      Effect.flatMap(
        flow(
          Effect.fromNullable,
          Effect.mapError(
            () =>
              new DatabaseQueryNotFoundError({
                table: "city",
                column: "id",
                value: id
              })
          )
        )
      )
    );
  }
}
