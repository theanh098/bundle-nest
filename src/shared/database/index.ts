import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgSchema } from "drizzle-orm/pg-core";
import type { PoolConfig } from "pg";
import { Pool } from "pg";

import {
  city,
  cityCountryRelations
} from "@root/shared/database/models/city.model";
import {
  country,
  countryCityRelations
} from "@root/shared/database/models/country.model";

const tables = {
  city,
  country
};

const schema = {
  ...tables,
  cityCountryRelations,
  countryCityRelations
};

export type Database = NodePgDatabase<typeof schema>;

export const drizzleSchema = pgSchema("drizzle");

export const getDatabase = (config: PoolConfig): Database => {
  const pool = new Pool(config);
  return drizzle(pool, {
    schema
  });
};
