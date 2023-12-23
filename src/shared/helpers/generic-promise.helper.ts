import { Effect as E, Either, identity } from "effect";

import type { AnyHow } from "../errors";
import { encodeError } from "../errors";
import type { NonCtxEft } from "../types/non-context-effect.type";

export const genericPromise = <E extends AnyHow, A>(
  effect: NonCtxEft<E, A>
): Promise<A> =>
  E.runPromise(E.either(effect)).then(
    Either.match({ onLeft: encodeError, onRight: identity })
  );
