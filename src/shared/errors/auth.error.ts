import { UnauthorizedException } from "@nestjs/common";
import { Effect } from "effect";

import type { AnyHow } from ".";
import type { NonCtxEffect } from "../types/non-context-effect.type";

export class AuthError implements AnyHow {
  static readonly _tag = "AuthError";

  static isInfer(err: AnyHow): err is AuthError {
    return AuthError._tag === err._tag;
  }

  static into(reason?: string): NonCtxEffect<AuthError, never> {
    return Effect.fail(new AuthError(reason));
  }

  constructor(public readonly reason?: string) {}

  public readonly _tag = AuthError._tag;

  public endCode(): UnauthorizedException {
    return new UnauthorizedException(this.reason);
  }
}
