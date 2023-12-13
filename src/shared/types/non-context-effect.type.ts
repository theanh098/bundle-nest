import type { Effect as E } from "effect";

export type NonCtxE<E, A> = E.Effect<never, E, A>;
