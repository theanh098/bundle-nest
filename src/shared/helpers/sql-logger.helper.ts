import highlight from "cli-highlight";
import { pipe } from "effect";

import type { LogWriter } from "drizzle-orm";

export class SqlLogger implements LogWriter {
  static log(statement: string) {
    pipe(
      highlight(statement, { language: "postgresql", ignoreIllegals: true }),
      console.log
    );
  }

  write(statement: string) {
    SqlLogger.log(statement);
  }
}
