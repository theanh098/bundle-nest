import { CommandFactory } from "nest-commander";
import { AppModule } from "./app.module";
import { CommandModule } from "./command/command.module";

async function bootstrap() {
  await CommandFactory.run(CommandModule, ["warn", "error"]);
}

bootstrap();
