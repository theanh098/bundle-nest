import { NonCtxEft } from "@root/shared/types/non-context-effect.type";
import { pipe, Effect as E, Either } from "effect";

export const assertEffect =
  <E, A, B = void>(effect: NonCtxEft<E, A>) =>
  (onLeft: (left: E) => B, onRight: (right: A) => B) =>
    pipe(effect, E.either, E.runPromise).then(
      Either.match({ onLeft, onRight })
    );
