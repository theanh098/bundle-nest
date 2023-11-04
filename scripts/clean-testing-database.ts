import { getDatabase } from "@root/shared/database";
import { sql } from "drizzle-orm";
import { TEST_DATABASE_CONNECTION } from "test-helper/database.test.client";

async function main() {
  const db = getDatabase({
    connectionString: TEST_DATABASE_CONNECTION
  });

  const tables = Object.keys(db._.tableNamesMap);

  for (const table of tables) {
    await db.execute(sql.raw(`DROP TABLE IF EXISTS ${table} CASCADE`));
    console.log(`Droped ${table} table.`);
  }
}

main()
  .then(() => {
    console.info("Testing database has been clean up.");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
