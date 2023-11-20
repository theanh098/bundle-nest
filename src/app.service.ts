import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Effect } from "effect";

import { readConfig } from "./shared/helpers/read-config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    console.log("env: ", this.configService.get("WTF"));
    console.log("ENV: ", readConfig("WTF").pipe(Effect.runSync));

    return "Hello Kitty!";
  }
}
