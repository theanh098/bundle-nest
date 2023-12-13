import highlight from "cli-highlight";
import { LogWriter } from "drizzle-orm";
import { pipe } from "effect";

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
