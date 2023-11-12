import type { HttpException } from "@nestjs/common";

export type AnyHow<T extends HttpException = HttpException> = {
  _tag: string;
  endCode: () => T;
};

export const encodeError = <T extends HttpException>(err: AnyHow<T>): never => {
  throw err.endCode();
};
