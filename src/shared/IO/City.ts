import { city } from "../database/models/city.model";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { countrySchema } from "./Country";

export const citySchema = createSelectSchema(city);
export const cityCreateSchema = createInsertSchema(city);

const cityWithCountry = citySchema.extend({
  country: countrySchema
});

export type CityWithCountry = z.infer<typeof cityWithCountry>;

export type City = z.infer<typeof citySchema>;

export type CreateCity = z.infer<typeof cityCreateSchema>;
