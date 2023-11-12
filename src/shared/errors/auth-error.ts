import { UnauthorizedException } from "@nestjs/common";

import type { AnyHow } from "./encode";

export class AuthError implements AnyHow {
  static readonly _tag = "AuthError";

  static isInfer(err: AnyHow): err is AuthError {
    return AuthError._tag === err._tag;
  }

  constructor(public readonly reason?: string) {}

  public readonly _tag = AuthError._tag;

  public endCode(): UnauthorizedException {
    return new UnauthorizedException(this.reason);
  }
}
