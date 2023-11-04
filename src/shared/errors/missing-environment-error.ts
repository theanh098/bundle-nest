import { InternalServerErrorException } from "@nestjs/common";

import type { AnyHow } from "./encode";

export class MissingEnvironmentError implements AnyHow {
  static readonly _tag: unique symbol = Symbol("MissingEnvironmentErrorTag");

  static isBounded(err: AnyHow): err is MissingEnvironmentError {
    return MissingEnvironmentError._tag === err._tag;
  }

  constructor(public config: string) {}

  public _tag = MissingEnvironmentError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException(
      `Missing environment: ${this.config}`
    );
  }
}
