import { Command, CommandRunner } from "nest-commander";

@Command({ name: "basic", description: "A parameter parse" })
export class BasicCommand extends CommandRunner {
  run(args: string[]): Promise<void> {
    console.log("args: ", args);

    return Promise.resolve();
  }
}
