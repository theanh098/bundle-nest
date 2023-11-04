import type { city } from "../database/models/city.model";

export type City = Readonly<typeof city.$inferSelect>;
