import { Effect, pipe } from "effect";

import type { BlazingTable } from "../database";
import type { NonCtxEffect } from "../types/non-context-effect.type";

import { DatabaseQueryNotFoundError } from "../errors/database-query-not-found.error";
import { DatabaseQueryError } from "../errors/database-query.error";

export const safetyFindOne =
  (table: BlazingTable, args?: unknown) =>
  <T>(
    promise: Promise<T>
  ): NonCtxEffect<
    DatabaseQueryError | DatabaseQueryNotFoundError,
    NonNullable<T>
  > =>
    pipe(
      Effect.tryPromise({
        try: () => promise,
        catch: e => new DatabaseQueryError(e)
      }),
      Effect.flatMap(Effect.fromNullable),
      Effect.catchTag("NoSuchElementException", () =>
        DatabaseQueryNotFoundError.into(table, args)
      )
    );
