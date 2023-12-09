import type { Effect } from "effect";

export type NonCtxEffect<E, A> = Effect.Effect<never, E, A>;
