import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { country } from "../database/models/country.model";
import { citySchema } from "./City";

export const countrySchema = createSelectSchema(country);

export const countryWithCitiesSchema = countrySchema.extend({
  cities: z.object({
    nodes: citySchema.array(),
    cursor: z.number().optional()
  })
});

export type Country = typeof country.$inferSelect;

export type CountryWithCities = z.infer<typeof countryWithCitiesSchema>;
