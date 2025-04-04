# deno-telegraf-template

A cross-platform Telegram bot built with Deno and Telegraf.

## Installation

1. Clone this repository
2. Run Deno compile task `deno task compile`
3. Make sure the `run.sh` script is executable:

   ```sh
   chmod +x run.sh
   ```

## Usage

Run the bot using the included script which automatically detects your platform:

```sh
./run.sh --token=your_telegram_bot_token
```

The script will automatically select the appropriate binary for your operating system and architecture.

## Development

Create a `.env` file in the project root with your Telegram bot token:

```sh
BOT_TOKEN=your_telegram_bot_token
```

To run in development mode with automatic reloading:

```sh
deno task dev
```

To start without watch mode:

```sh
deno task start
```

## Build

Compile binaries for all supported platforms:

```sh
deno task compile
```

This will create binaries in the `./bin` directory for:

- macOS (Intel and Apple Silicon)
- Linux (ARM64 and x86_64)
- Windows (x86_64)

## Dependencies

- [Deno](https://deno.land/)
- [Telegraf](https://telegraf.js.org/)
- SQLite database for Telegraf sessions
