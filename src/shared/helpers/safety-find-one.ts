import { Effect as E, pipe } from "effect";

import type { BlazingTable } from "../database";
import { DatabaseQueryNotFoundError } from "../errors/database-query-not-found.error";
import { DatabaseQueryError } from "../errors/database-query.error";
import type { NonCtxEft } from "../types/non-context-effect.type";

export const safetyFindOne =
  (table: BlazingTable, args?: unknown) =>
  <T>(
    promise: Promise<T>
  ): NonCtxEft<
    DatabaseQueryError | DatabaseQueryNotFoundError,
    NonNullable<T>
  > =>
    pipe(
      E.tryPromise({
        try: () => promise,
        catch: e => new DatabaseQueryError(e)
      }),
      E.flatMap(E.fromNullable),
      E.catchTag("NoSuchElementException", () =>
        DatabaseQueryNotFoundError.into(table, args)
      )
    );
