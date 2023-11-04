import type { country } from "../database/models/country.model";

export type Country = typeof country.$inferSelect;
