import { Inject } from "@nestjs/common";

import { DATABASE } from "../constants/token.constant";

export const InjectDb = () => Inject(DATABASE);
