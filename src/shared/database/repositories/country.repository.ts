import { sql } from "drizzle-orm";
import { Effect, flow, pipe } from "effect";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import { DatabaseQueryError } from "@root/shared/errors/database-query-error";
import { DatabaseQueryNotFoundError } from "@root/shared/errors/database-query-not-found-error";
import type { Country } from "@root/shared/IO/Country";
import type { PaginateResponse } from "@root/shared/IO/Paginate";
import type { NonCtxEffect } from "@root/shared/types/non-context-effect";

import { country } from "../models/country.model";
import { Injectable } from "@nestjs/common";
@Injectable()
export class CountryRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(
    id: number
  ): NonCtxEffect<DatabaseQueryNotFoundError | DatabaseQueryError, Country> {
    return pipe(
      Effect.tryPromise({
        try: () =>
          this.db.query.country.findFirst({
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
                table: "country",
                column: "id",
                value: id
              })
          )
        )
      )
    );
  }

  public find(): NonCtxEffect<DatabaseQueryError, PaginateResponse<Country>> {
    return pipe(
      Effect.tryPromise({
        try: () =>
          Promise.all([
            this.db.query.country.findMany({
              offset: 0,
              limit: 10
            }),
            this.db
              .select({
                count: sql`count(*)`.mapWith(Number)
              })
              .from(country)
          ]),
        catch: e => new DatabaseQueryError(e)
      }),
      Effect.map(([nodes, [{ count }]]) => ({
        limit: 10,
        nodes,
        page: 1,
        total: count
      }))
    );
  }
}
