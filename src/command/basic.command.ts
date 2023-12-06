import { Command, CommandRunner, Option } from "nest-commander";

@Command({ name: "basic", description: "A parameter parse" })
export class BasicCommand extends CommandRunner {
  async run(args: string[]): Promise<void> {
    console.log("args: ", args);
  }
}
