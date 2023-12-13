import { Effect as E, Either } from "effect";

import type { AnyHow } from "../errors";
import { encodeError } from "../errors";
import { NonCtxE } from "../types/non-context-effect.type";

export const genericPromise = <E extends AnyHow, A>(
  effect: NonCtxE<E, A>
): Promise<A> =>
  E.runPromise(E.either(effect)).then(
    Either.match({ onLeft: encodeError, onRight: res => res })
  );
