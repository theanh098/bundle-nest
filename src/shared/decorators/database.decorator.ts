import { Inject } from "@nestjs/common";

import { DATABASE } from "../constants/token";

export const InjectDb = () => Inject(DATABASE);
