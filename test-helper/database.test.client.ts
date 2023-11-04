import { getDatabase } from "@root/shared/database";

export const TEST_DATABASE_CONNECTION =
  "postgresql://postgres:test@localhost:6000/db_test";

export const testDatabase = getDatabase({
  connectionString: TEST_DATABASE_CONNECTION
});
