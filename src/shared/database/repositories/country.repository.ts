import { Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { Effect, Option, ReadonlyArray, flow, pipe } from "effect";

import type { Country } from "@root/shared/IO/Country";
import type { PaginateResponse } from "@root/shared/IO/Paginate";
import type { NonCtxEffect } from "@root/shared/types/non-context-effect";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import { DatabaseQueryError } from "@root/shared/errors/database-query-error";
import { DatabaseQueryNotFoundError } from "@root/shared/errors/database-query-not-found-error";

import { country } from "../models/country.model";

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
            where: (cols, opts) => opts.eq(cols.id, id),
            with: {
              cities: {
                columns: {
                  id: true
                }
              }
            }
          }),
        catch: err => new DatabaseQueryError(err)
      }),
      Effect.map(k => k),
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

  public findAndCount(): NonCtxEffect<
    DatabaseQueryError,
    PaginateResponse<Country>
  > {
    return pipe(
      { nodes: this.find(), count: this.count() },
      Effect.all,
      Effect.map(({ count, nodes }) => ({
        limit: 10,
        nodes,
        page: 1,
        total: count
      }))
    );
  }

  private find(): NonCtxEffect<DatabaseQueryError, Country[]> {
    return Effect.tryPromise({
      try: () =>
        this.db.query.country.findMany({
          offset: 0,
          limit: 10,
          orderBy: ({ id }, { desc }) => [desc(id), desc(id)]
        }),
      catch: e => new DatabaseQueryError(e)
    });
  }

  private count(): NonCtxEffect<DatabaseQueryError, number> {
    return pipe(
      Effect.tryPromise({
        try: () =>
          this.db
            .select({ count: sql`count(*)`.mapWith(Number) })
            .from(country),
        catch: e => new DatabaseQueryError(e)
      }),
      Effect.map(
        flow(
          ReadonlyArray.head,
          Option.match({
            onNone: () => 0,
            onSome: ({ count }) => count
          })
        )
      )
    );
  }
}
