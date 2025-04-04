import { Context, Telegraf, session } from "@telegraf";
import yargs from "yargs";
import { SqliteSessionStore } from "./sqlite-session-store.ts";

interface MyContext extends Context {
  session: {
    count: number;
  };
}

function parseArgs(): { token: string } {
  return yargs(Deno.args)
    .option("token", {
      type: "string",
      describe: "The token for the Telegram bot, also can be set via BOT_TOKEN env variable",
      alias: "t",
      default: Deno.env.get("BOT_TOKEN"),
    })
    .scriptName("Telegram bot")
    .version("1.0.0")
    .strictOptions()
    .demandOption("token")
    .parse();
}

function main() {
  const { token } = parseArgs();

  const bot = new Telegraf<MyContext>(token);

  bot.use(
    session({
      defaultSession: () => ({
        count: 0,
      }),
      store: SqliteSessionStore(),
    })
  );

  bot.start((ctx) => {
    ctx.reply(`You've pressed the button ${++ctx.session.count} times`);
  });

  bot.launch();

  console.log("Bot is running...");
}

if (import.meta.main) {
  main();
}
