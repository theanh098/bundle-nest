import type { Effect } from "effect";

export type NonCtxEft<E, A> = Effect.Effect<never, E, A>;
