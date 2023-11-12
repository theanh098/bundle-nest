import { InternalServerErrorException } from "@nestjs/common";

import type { AnyHow } from "./encode";

export class MissingEnvironmentError implements AnyHow {
  static readonly _tag = "MissingEnvironmentError";

  static isInfer(err: AnyHow): err is MissingEnvironmentError {
    return MissingEnvironmentError._tag === err._tag;
  }

  constructor(public readonly config: string) {}

  public readonly _tag = MissingEnvironmentError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      cause: this._tag,
      message: `Missing environment: ${this.config}`
    });
  }
}
