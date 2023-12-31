import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
import { Effect as E } from "effect";

import { readConfig } from "./shared/helpers/read-config.helper";

@Injectable()
export class AppService {
  // constructor(private configService: ConfigService) {}

  getHello(): string {
    // console.log("env: ", this.configService.get("WTF"));
    console.log("ENV: ", readConfig("WTF").pipe(E.runSync));

    console.log("ENV: ENV: ENV: ENV: ENV: ENV: ENV: ");

    return "Hello Kitty!";
  }
}
