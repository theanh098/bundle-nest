import { Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";
import { Effect as E, Option, ReadonlyArray, flow, pipe } from "effect";

import type { DatabaseQueryNotFoundError } from "@root/shared/errors/database-query-not-found.error";
import type { Country } from "@root/shared/IO/Country.io";
import type { PaginateResponse } from "@root/shared/IO/Paginate.io";
import type { NonCtxEft } from "@root/shared/types/non-context-effect.type";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import { DatabaseQueryError } from "@root/shared/errors/database-query.error";
import { safetyFindOne } from "@root/shared/helpers/safety-find-one";

import { country } from "../models/country.model";

@Injectable()
export class CountryRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(
    id: number
  ): NonCtxEft<DatabaseQueryNotFoundError | DatabaseQueryError, Country> {
    return safetyFindOne("countries", { id })(
      this.db.query.country.findFirst({
        where: (cols, opts) => opts.eq(cols.id, id),
        with: {
          cities: {
            columns: {
              name: true
            }
          }
        }
      })
    );
  }

  public findAndCount(): NonCtxEft<
    DatabaseQueryError,
    PaginateResponse<Country>
  > {
    return pipe(
      { nodes: this.find(), count: this.count() },
      E.all,
      E.map(({ count, nodes }) => ({
        limit: 10,
        nodes,
        page: 1,
        total: count
      }))
    );
  }

  private find(): NonCtxEft<DatabaseQueryError, Country[]> {
    return E.tryPromise({
      try: () =>
        this.db.query.country.findMany({
          offset: 0,
          limit: 10,
          orderBy: ({ id, name }, { desc }) => [desc(id), desc(name)]
        }),
      catch: e => new DatabaseQueryError(e)
    });
  }

  private count(): NonCtxEft<DatabaseQueryError, number> {
    return pipe(
      E.tryPromise({
        try: () =>
          this.db
            .select({ count: sql`count(*)`.mapWith(Number) })
            .from(country),
        catch: e => new DatabaseQueryError(e)
      }),
      E.map(
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
