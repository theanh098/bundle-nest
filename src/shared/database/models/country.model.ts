import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { city } from "./city.model";

export const country = pgTable("country", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 26 }).notNull().unique()
});

export const countryCityRelations = relations(country, ({ many }) => ({
  cities: many(city)
}));
