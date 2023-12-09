import { CommandFactory } from "nest-commander";

import { CommandModule } from "./libs/command/command.module";

async function bootstrap() {
  await CommandFactory.run(CommandModule, ["warn", "error"]);
}

bootstrap();
