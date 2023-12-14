import { DbTestingClient } from "@test-helper/database.test.client";
import { sql } from "drizzle-orm";

async function main() {
  const client = new DbTestingClient();

  const tables = Object.keys(client.database._.tableNamesMap);

  for (const table of tables) {
    await client.database.execute(
      sql.raw(`DROP TABLE IF EXISTS ${table} CASCADE`)
    );
    console.log(`Droped ${table} table.`);
  }

  await client.disconnect();
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
