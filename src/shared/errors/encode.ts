import type { HttpException } from "@nestjs/common";

export type AnyHow<T extends HttpException = HttpException> = {
  _tag: symbol;
  endCode: () => T;
};

export const encodeError = <T extends HttpException>(err: AnyHow<T>): never => {
  throw err.endCode();
};
