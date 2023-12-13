import { Database, schema } from "@root/shared/database";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const TEST_DATABASE_CONNECTION =
  "postgresql://postgres:test@localhost:6000/db_test";

export class DbTestingClient {
  private pool: Pool;
  public database: Database;

  constructor() {
    this.pool = new Pool({ connectionString: TEST_DATABASE_CONNECTION });
    this.database = drizzle(this.pool, {
      schema
    });
  }

  public async disconnect() {
    await this.pool.end();
  }
}
