import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { country } from "./country.model";

export const popularityEnum = pgEnum("popularity", [
  "unknown",
  "known",
  "popular"
]);

export const city = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 26 }).notNull().unique(),
  popularity: popularityEnum("popularity").notNull().default("unknown"),
  countryId: integer("country_id")
    .notNull()
    .references(() => country.id, { onDelete: "cascade" })
});

export const cityCountryRelations = relations(city, ({ one }) => ({
  country: one(country, {
    fields: [city.countryId],
    references: [country.id]
  })
}));
