import { Database, schema } from "@root/shared/database";
import { highlight } from "cli-highlight";
import { DefaultLogger, LogWriter } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const TEST_DATABASE_CONNECTION =
  "postgresql://postgres:test@localhost:6000/db_test";

class SqlWriter implements LogWriter {
  write(message: string) {
    console.log(
      highlight(message, {
        language: "postgresql",
        ignoreIllegals: true
      })
    );
  }
}
export class TestDatabse {
  private pool: Pool;
  public database: Database;

  constructor() {
    this.pool = new Pool({ connectionString: TEST_DATABASE_CONNECTION });
    this.database = drizzle(this.pool, {
      schema,
      logger: new DefaultLogger({ writer: new SqlWriter() })
    });
  }

  public async disconnect() {
    await this.pool.end();
  }
}
