import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import type { z } from "zod";

import { city } from "../database/models/city.model";
import { countrySchema } from "./Country.io";

export const citySchema = createSelectSchema(city);
export const cityCreateSchema = createInsertSchema(city);

const cityWithCountry = citySchema.extend({
  country: countrySchema
});

export type CityWithCountry = z.infer<typeof cityWithCountry>;

export type City = z.infer<typeof citySchema>;

export type CreateCity = z.infer<typeof cityCreateSchema>;
