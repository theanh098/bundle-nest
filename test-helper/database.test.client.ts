import { Database, schema } from "@root/shared/database";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const TEST_DATABASE_CONNECTION =
  "postgresql://postgres:test@localhost:6000/db_test";

export class TestDatabse {
  private pool: Pool;
  public database: Database;

  constructor() {
    const pool = new Pool({ connectionString: TEST_DATABASE_CONNECTION });
    this.pool = pool;
    this.database = drizzle(pool, { schema });
  }

  public async disconnect() {
    await this.pool.end();
  }
}
