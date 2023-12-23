import { UnauthorizedException } from "@nestjs/common";
import { Effect as E } from "effect";

import type { AnyHow } from ".";
import type { NonCtxEft } from "../types/non-context-effect.type";

export class AuthError implements AnyHow {
  static readonly _tag = "AuthError";

  static infer(err: AnyHow): err is AuthError {
    return AuthError._tag === err._tag;
  }

  static into(reason?: string): NonCtxEft<AuthError, never> {
    return E.fail(new AuthError(reason));
  }

  constructor(public readonly reason?: string) {}

  public readonly _tag = AuthError._tag;

  public endCode(): UnauthorizedException {
    return new UnauthorizedException(this.reason);
  }
}
