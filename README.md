<h1 align="center">LOLZTEAM MCP</h1>

<p align="center">
  An MCP server that lets AI assistants search and read the LOLZTEAM Forum and LZT Market through their official APIs.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/lolzteam-mcp"><img src="https://img.shields.io/npm/v/lolzteam-mcp?label=npm&color=4c9dff" alt="npm"></a>
  <a href="https://github.com/liwidale/lolzteam-mcp/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/liwidale/lolzteam-mcp/ci.yml?label=tests" alt="Tests"></a>
  <img src="https://img.shields.io/badge/platform-Node.js%2022%2B-lightgrey" alt="Node.js 22 or newer">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/liwidale/lolzteam-mcp?color=3ad37e" alt="MIT License"></a>
</p>

<p align="center">English · <a href="README.ru.md">Русский</a></p>

An AI assistant cannot read LOLZTEAM or LZT Market on its own: the content sits behind authenticated APIs with their own parameters, pagination and rate limits. LOLZTEAM MCP wraps the official Forum and Market APIs in 24 read-only tools that any client supporting the Model Context Protocol can call. The assistant can search threads and posts, follow a discussion page by page, look up users, search Market listings with category filters, open a listing and check its seller. Results come back as compact JSON with links to the original pages. The endpoint catalog is generated from the official OpenAPI documents, so new API methods and parameters become available without new code.

## Contents

- [Installation](#installation)
- [What you get](#what-you-get)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [How it works](#how-it-works)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

Installation takes three steps: install Node.js, get an API token and run one setup command. The setup command checks the token and adds the server to your AI clients.

### 1. Install Node.js

LOLZTEAM MCP runs on Node.js 22.18 or newer. Check the version you have:

```bash
node --version
```

If the command is not found or prints a version below `v22.18.0`:

- **Windows and macOS.** Download the LTS installer from [nodejs.org](https://nodejs.org/) and run it.
- **Linux.** Install Node.js 22 or 24 from your distribution's packages or with a version manager such as [nvm](https://github.com/nvm-sh/nvm).

Open a new terminal window after installing, so the `node` and `npx` commands are found.

### 2. Get an API token

1. Sign in to LOLZTEAM and create an API client at [lolz.live/account/api/client-add](https://lolz.live/account/api/client-add).
2. Get an access token at [lolz.live/account/api/get-token](https://lolz.live/account/api/get-token) and select these scopes:

| Scope    | Needed for                                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `read`   | All forum reading tools.                                                                                                              |
| `basic`  | `forum_get_user`.                                                                                                                     |
| `post`   | `forum_search`. The official API documents its search endpoints as requiring this scope. The server uses it only for search requests. |
| `market` | All `market_*` tools.                                                                                                                 |

Market API access also requires 200 sympathies on the forum or a paid Market API subscription. Without it the Market tools return a `forbidden` error, while the forum tools keep working.

Keep the token private. Anyone who has it can use the API on behalf of your account.

### 3. Run the setup

```bash
npx -y lolzteam-mcp setup
```

The command downloads the latest version and then:

1. Asks for the token. The input stays hidden.
2. Checks the token against both APIs and shows the account it belongs to. A rejected token stops the setup before anything changes.
3. Finds the installed MCP clients: Claude Desktop, Cursor and Windsurf.
4. Asks which of them to configure. Press `Enter` to configure all of them.
5. Adds the `lolzteam` server to each configuration file. Other servers and settings stay as they are, and the previous file is saved next to it with a `.bak` extension.
6. Prints the command for Claude Code.

A typical run looks like this:

```text
LOLZTEAM MCP 1.0.0 setup
Create an API client at https://lolz.live/account/api/client-add, then get a token at https://lolz.live/account/api/get-token with the read, basic, post and market scopes.
API token (input is hidden):
Checking the token...
Forum API: signed in as your_name.
Market API: available.
Found these MCP clients:
  1. Claude Desktop (C:\Users\you\AppData\Roaming\Claude\claude_desktop_config.json)
  2. Cursor (C:\Users\you\.cursor\mcp.json)
Clients to configure, as numbers separated by commas. Press Enter for all:
Claude Desktop: added the lolzteam server to C:\Users\you\AppData\Roaming\Claude\claude_desktop_config.json
Cursor: added the lolzteam server to C:\Users\you\.cursor\mcp.json

Claude Code: run this command with your token in place of <token>:
  claude mcp add --transport stdio --scope user --env LOLZTEAM_TOKEN=<token> lolzteam -- cmd /c npx -y lolzteam-mcp@latest

Restart the configured clients. The lolzteam server and its tools appear after the restart.
```

Restart the configured clients. The 24 tools appear under the `lolzteam` server.

The setup speaks the language of your system. Run it with `LOLZTEAM_LOCALE=en` or `LOLZTEAM_LOCALE=ru` to choose. The chosen language is also saved for the server.

#### Setup options

| Option           | Effect                                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--yes`          | Configures every detected client without asking.                                                                                                                                     |
| `--client <id>`  | Configures only this client: `claude-desktop`, `cursor` or `windsurf`. Repeat it for several clients. Use it when a client has never been started and its folder does not exist yet. |
| `LOLZTEAM_TOKEN` | Environment variable with the token. The setup uses it instead of asking, which lets it run in scripts.                                                                              |

For example, to configure only Cursor without questions on macOS or Linux:

```bash
LOLZTEAM_TOKEN=your-token npx -y lolzteam-mcp setup --yes --client cursor
```

<details>
<summary><b>Set up a client by hand</b></summary>

<br>

Use this when the setup command fails, when your client is not in its list or when you prefer to edit the configuration yourself. Any MCP client that starts servers over stdio works.

1. Check that the package runs. The command prints the version:

   ```bash
   npx -y lolzteam-mcp@latest --version
   ```

2. Quit the client and open its configuration file in a text editor. Create the file if it does not exist yet.

   | Client         | Windows                                           | macOS                                                             | Linux                                         |
   | -------------- | ------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------- |
   | Claude Desktop | `%APPDATA%\Claude\claude_desktop_config.json`     | `~/Library/Application Support/Claude/claude_desktop_config.json` | `~/.config/Claude/claude_desktop_config.json` |
   | Cursor         | `%USERPROFILE%\.cursor\mcp.json`                  | `~/.cursor/mcp.json`                                              | `~/.cursor/mcp.json`                          |
   | Windsurf       | `%USERPROFILE%\.codeium\windsurf\mcp_config.json` | `~/.codeium/windsurf/mcp_config.json`                             | `~/.codeium/windsurf/mcp_config.json`         |

   Other clients describe the location in their documentation. Look for the `mcpServers` setting.

3. Add the `lolzteam` server and put your token in place of `your-token`.

   macOS and Linux:

   ```json
   {
     "mcpServers": {
       "lolzteam": {
         "command": "npx",
         "args": ["-y", "lolzteam-mcp@latest"],
         "env": {
           "LOLZTEAM_TOKEN": "your-token"
         }
       }
     }
   }
   ```

   Windows:

   ```json
   {
     "mcpServers": {
       "lolzteam": {
         "command": "cmd",
         "args": ["/c", "npx", "-y", "lolzteam-mcp@latest"],
         "env": {
           "LOLZTEAM_TOKEN": "your-token"
         }
       }
     }
   }
   ```

   If the file already has an `mcpServers` object, add only the `"lolzteam": { ... }` block inside it and separate it from the other servers with a comma.

4. Save the file and start the client. Claude Desktop keeps running in the tray or menu bar after you close its window, so quit it from there before starting it again.

**When `npx` does not work.** Install the package once and point the client straight to it:

```bash
npm install -g lolzteam-mcp
```

```bash
npm root -g
```

The second command prints the folder with global packages. In the configuration, use `node` as the command and the full path to `lolzteam-mcp/dist/index.js` inside that folder as the argument. On Windows, double every backslash in JSON:

```json
"lolzteam": {
  "command": "node",
  "args": ["C:\\Users\\you\\AppData\\Roaming\\npm\\node_modules\\lolzteam-mcp\\dist\\index.js"],
  "env": {
    "LOLZTEAM_TOKEN": "your-token"
  }
}
```

This copy does not update itself. Run `npm install -g lolzteam-mcp@latest` to get a new version.

</details>

### Claude Code

Claude Code keeps its own list of servers. Add the server with one command and put your token in place of `your-token`.

macOS and Linux:

```bash
claude mcp add --transport stdio --scope user --env LOLZTEAM_TOKEN=your-token lolzteam -- npx -y lolzteam-mcp@latest
```

Windows:

```bash
claude mcp add --transport stdio --scope user --env LOLZTEAM_TOKEN=your-token lolzteam -- cmd /c npx -y lolzteam-mcp@latest
```

Run `claude mcp list` to check that `lolzteam` is connected.

### Updating

The configuration runs `npx -y lolzteam-mcp@latest`, so npm fetches the newest published version when a client starts the server. Restart the client to pick up a new release. Run the setup again only to change the token or add another client.

### Install from source

Use this to run your own changes or a version that is not published yet. You need Git in addition to Node.js.

```bash
git clone https://github.com/liwidale/lolzteam-mcp.git
cd lolzteam-mcp
npm ci
npm run build
node dist/index.js setup
```

When the setup runs from a cloned folder, it writes the full path to `node` and to `dist/index.js` into the client configuration instead of `npx`. Pull new commits and run `npm ci` and `npm run build` to update.

### Uninstalling

1. Remove the `lolzteam` entry from each client configuration file, or restore the `.bak` file the setup saved. For Claude Code, run `claude mcp remove lolzteam --scope user`.
2. Restart the clients.
3. Revoke the token at [lolz.live/account/api](https://lolz.live/account/api) if you no longer need it.

## What you get

- **Forum search and reading.** Full-text search across threads, posts and profile posts, thread lists with filters and sorting, full thread and post text, comments, polls and tags.
- **People lookup.** Find users by the beginning of their username, read public profiles and list what a user has written.
- **Market search with real filters.** Search any of the 23 Market categories or all of them at once by price, currency, origin, seller and the category-specific filters from the official documentation, such as Steam games or Telegram premium.
- **Listing and seller checks.** Open one listing with its attributes, guarantee and seller statistics, read the seller's feedback and estimate a Steam inventory.
- **Context-friendly output.** Every tool returns compact JSON without permission flags or HTML duplicates. Long texts are cut at a limit you control and marked as truncated.
- **Links back to the source.** Threads, posts, users and listings include their URL on the site whenever the API provides one.
- **Every read-only endpoint, kept current.** Three universal tools reach all 113 read-only endpoints of both APIs, including the ones without a dedicated tool. A daily workflow pulls the official OpenAPI documents and opens a pull request when the API changes.
- **Read-only by design.** The server never posts, edits, buys, sells or changes settings. No tool can.
- **Predictable errors.** Failures come back as a structured error with a code, the API message, a hint and, for rate limits, how long to wait.

## Getting started

After the setup and a client restart, ask the assistant something that needs the forum or the Market:

- "What does the LOLZTEAM forum say about Steam Guard recovery? Summarize the three most discussed threads."
- "Find the cheapest Steam accounts with CS2 Prime and no VAC ban under 500 rubles. Check the sellers' feedback."
- "Who is the user `example`, and what have they posted recently?"

The assistant picks the tools on its own. Most clients show each tool call and ask for permission the first time, so you can see which requests go to the API.

## Usage

All tools are read-only and marked with the MCP `readOnlyHint` annotation. Optional parameters can be omitted.

### Forum tools

| Tool                        | What it does                                                                                         | Key parameters                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `forum_search`              | Full-text search across threads, posts and profile posts.                                            | `query`, `type` (`all`, `threads`, `posts`, `profile_posts`), `tag`, `forum_id`, `user_id`, `page`, `limit`     |
| `forum_list_categories`     | Lists top-level forum categories.                                                                    | `parent_category_id`, `parent_forum_id`                                                                         |
| `forum_list_forums`         | Lists forum sections with IDs and thread counts. Descriptions, links and thread prefixes on request. | `parent_category_id`, `parent_forum_id`, `detailed`, `include_prefixes`                                         |
| `forum_list_threads`        | Lists threads of a section with filters and sorting.                                                 | `forum_id`, `title`, `creator_user_id`, `prefix_ids`, `tag_id`, `period`, `order`, `direction`, `page`, `limit` |
| `forum_get_thread`          | One thread with the full first post and, optionally, its poll.                                       | `thread_id`, `include_poll`                                                                                     |
| `forum_list_posts`          | Posts of a thread, page by page.                                                                     | `thread_id`, `page_of_post_id`, `order`, `page`, `limit`                                                        |
| `forum_get_post`            | One post with its full text.                                                                         | `post_id`                                                                                                       |
| `forum_list_post_comments`  | Comments under a post.                                                                               | `post_id`, `before_comment_id`                                                                                  |
| `forum_get_user`            | Public profile of a user.                                                                            | `user_id` (a number or `me`)                                                                                    |
| `forum_find_users`          | Users whose name starts with the given text.                                                         | `username`                                                                                                      |
| `forum_list_user_content`   | Threads and posts created by a user.                                                                 | `user_id`, `page`, `limit`                                                                                      |
| `forum_find_tags`           | Tags by prefix, or the popular tags.                                                                 | `query`                                                                                                         |
| `forum_list_tagged_threads` | Threads with a tag.                                                                                  | `tag_id`, `page`, `limit`                                                                                       |

Tools that return message text accept `text_length`, the maximum number of characters per item. Text beyond the limit is replaced with a `[truncated, N more characters]` marker, so the assistant knows to fetch the full post when it matters.

### Market tools

| Tool                               | What it does                                                               | Key parameters                                                                                                                                                               |
| ---------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `market_search`                    | Searches listings in one category or across all of them.                   | `category`, `title`, `min_price`, `max_price`, `currency`, `order_by`, `origin`, `exclude_origin`, `seller_id`, `not_sold_before`, `filters`, `include_attributes`, `cursor` |
| `market_get_item`                  | Full details of one listing.                                               | `item_id`, `description_length`                                                                                                                                              |
| `market_get_category_filters`      | Filters a category supports, with types and allowed values. Works offline. | `category`                                                                                                                                                                   |
| `market_list_categories`           | Market categories as reported by the API.                                  | none                                                                                                                                                                         |
| `market_list_category_games`       | Finds games of a category and their IDs for game filters.                  | `category`, `query`, `limit`                                                                                                                                                 |
| `market_get_seller_feedback`       | Buyer feedback for a seller with positive and negative totals.             | `seller_id`, `type`, `category_id`, `exclude_automatic`, `page`, `limit`                                                                                                     |
| `market_get_steam_inventory_value` | Estimated Steam inventory value of a listing for one game.                 | `item_id`, `app_id`, `currency`                                                                                                                                              |
| `market_list_currencies`           | Supported currencies and exchange rates.                                   | none                                                                                                                                                                         |

Category-specific filters go into the `filters` object under their API names. Call `market_get_category_filters` first to see them. For example, a Steam search for CS2 accounts without a VAC ban that have a Steam Guard file:

```json
{
  "category": "steam",
  "max_price": 500,
  "order_by": "price_to_up",
  "filters": { "game[]": [730], "no_vac": true, "mafile": "yes" }
}
```

Array filters accept a list. Filters such as `hours_played` accept an object like `{"730": 100}`. Yes or no filters accept `yes`, `no` or `nomatter`. Unknown filter names and values outside the documented list are rejected before any request is sent.

Search results contain the main fields of each listing: price, origin, guarantee, seller statistics with feedback totals, link and a short description. Set `include_attributes` to also get the category-specific attributes, such as Steam level, games, bans and inventory values. `market_get_item` always returns all of them, with dates converted to ISO 8601.

### Universal tools

These tools cover every read-only endpoint in the generated catalog, including endpoints added to the API after this release.

| Tool                    | What it does                                                                     | Key parameters                                |
| ----------------------- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| `api_list_endpoints`    | Lists the available endpoints of one or both APIs, optionally filtered by words. | `service`, `query`                            |
| `api_describe_endpoint` | Parameters of one endpoint with types, allowed values and descriptions.          | `service`, `operation`                        |
| `api_call_endpoint`     | Calls one endpoint with validated parameters and returns the cleaned response.   | `service`, `operation`, `params`, `max_chars` |

The assistant uses them when no dedicated tool fits, for example to read a user's trophies, a feedback comment thread or recent threads across the forum:

```json
{
  "service": "forum",
  "operation": "Users.Trophies",
  "params": { "user_id": 1 }
}
```

Parameters are checked against the official documentation before the request is sent: unknown names, wrong types, values outside the documented list and missing required parameters are rejected. Responses pass through the same cleanup as the other tools. Credentials, private account fields, permission flags and HTML duplicates are removed. A response larger than `max_chars` comes back as a preview with a hint to narrow the request.

### Pagination

- Forum lists return `pagination` with `page`, `pages`, `total` and `next_page`. Pass `next_page` as `page` to continue.
- Market search returns `has_next_page` and `next_cursor`. Pass `next_cursor` as `cursor` to continue.
- Post comments return `oldest_comment_id`. Pass it as `before_comment_id` to load older comments.

### Errors

A failed call returns `isError: true` and a JSON body such as:

```json
{
  "error": {
    "code": "rate_limited",
    "message": "The Market API rate limit was reached. Try again later.",
    "status": 429,
    "endpoint": "GET /steam",
    "retry_after_seconds": 12,
    "hint": "Wait at least retry_after_seconds before calling this API again."
  }
}
```

| Code                   | Meaning                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `invalid_input`        | An argument is missing, out of range or not a documented filter.                            |
| `not_configured`       | No token is set for this API.                                                               |
| `bad_request`          | The API rejected the parameters. `api_messages` says why.                                   |
| `unauthorized`         | The token is invalid or expired.                                                            |
| `forbidden`            | The token lacks a scope, or the account has no access to this content or to the Market API. |
| `not_found`            | The thread, post, user or listing does not exist or is hidden.                              |
| `rate_limited`         | A rate limit was reached. `retry_after_seconds` says how long to wait.                      |
| `upstream_unavailable` | The API returned a server error after retries.                                              |
| `timeout`              | The API did not answer within `LOLZTEAM_TIMEOUT_MS`.                                        |
| `network_error`        | The API host could not be reached.                                                          |
| `invalid_response`     | The API answered with something other than JSON, or the response was too large.             |
| `cancelled`            | The client cancelled the call.                                                              |

## Configuration

The server reads environment variables that your MCP client passes to it.

| Variable                          | Default                  | Description                                                                                                                                                                                                                        |
| --------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LOLZTEAM_TOKEN`                  | none                     | Token used for both APIs.                                                                                                                                                                                                          |
| `LOLZTEAM_FORUM_TOKEN`            | `LOLZTEAM_TOKEN`         | Separate token for the Forum API.                                                                                                                                                                                                  |
| `LOLZTEAM_MARKET_TOKEN`           | `LOLZTEAM_TOKEN`         | Separate token for the Market API.                                                                                                                                                                                                 |
| `LOLZTEAM_FORUM_BASE_URL`         | `https://api.lolz.live`  | Forum API host. The official documentation also lists `https://api.lolz.team` and `https://api.zelenka.guru`.                                                                                                                      |
| `LOLZTEAM_MARKET_BASE_URL`        | `https://api.lzt.market` | Market API host.                                                                                                                                                                                                                   |
| `LOLZTEAM_LOCALE`                 | none                     | Language of the server and the API messages, such as `en` or `ru`. Tool descriptions, errors and hints use it, and the API receives it as the documented `locale` parameter. Languages without a translation fall back to English. |
| `LOLZTEAM_TIMEOUT_MS`             | `60000`                  | Timeout of one HTTP request, from 1000 to 600000.                                                                                                                                                                                  |
| `LOLZTEAM_MAX_RETRIES`            | `2`                      | Retries after a 429, a 5xx response or a network failure, from 0 to 5.                                                                                                                                                             |
| `LOLZTEAM_MAX_RATE_LIMIT_WAIT_MS` | `15000`                  | Longest wait the server accepts before it returns `rate_limited` instead of waiting, from 0 to 120000.                                                                                                                             |

The server starts without a token so that clients can list its tools. Calls to an API without a token return `not_configured`.

### Rate limits

The server keeps its own request budget per API, matching the limits in the official documentation, so it slows down before the API starts refusing requests:

| API    | Requests                             | Limit          |
| ------ | ------------------------------------ | -------------- |
| Forum  | `GET` requests                       | 300 per minute |
| Forum  | Search, which uses `POST`            | 30 per minute  |
| Market | Category search and `GET /{item_id}` | 120 per minute |
| Market | Other `GET` requests                 | 300 per minute |

It also follows the `X-RateLimit-Remaining`, `X-RateLimit-Reset` and `Retry-After` headers. When the required wait is longer than `LOLZTEAM_MAX_RATE_LIMIT_WAIT_MS`, the tool returns `rate_limited` with `retry_after_seconds` instead of blocking the conversation.

The Market documentation also mentions a stricter limit of 20 category searches per minute in an older section. If your account hits it, the server reports `rate_limited` with the wait time from the API.

## Security

- **Read-only surface.** The server calls only documented read endpoints, the forum search endpoints and the bulk listing lookup, all filtered by the policy described in [Keeping up with API changes](#keeping-up-with-api-changes). It has no code path that posts, edits, deletes, buys, sells, transfers money or changes settings.
- **Secrets stay out of results.** The token is sent only in the `Authorization` header to the configured API host. It never appears in tool results or logs, and API error messages that echo it are redacted.
- **Sensitive listing data is removed.** Market results drop fields with login data, passwords, cookies, `.mafile` data, email codes, phone numbers, private notes and buyer information, even when the token's account could see them.
- **Private profile data is not exposed.** Forum user results contain public profile fields only, never balances, email or secret answers, even for `me`.
- **Untrusted content is treated as data.** Forum and Market texts are written by other people. The server strips invisible and bidirectional control characters, never interprets the text and tells the assistant, in its instructions and tool descriptions, to treat it as data.
- **Strict input validation.** Every argument is checked against a schema with ranges and documented values. Path identifiers must be positive integers or `me`, Market filters must exist in the official documentation and base URLs must use HTTPS.
- **Local only.** The server uses the stdio transport and opens no network port. It sends nothing anywhere except the two configured APIs. There is no telemetry.

Follow the LOLZTEAM rules and the API terms when you use the data the server returns.

## Troubleshooting

**`npx` or `node` is not recognized.** Node.js is not installed, or the terminal was opened before the installation. Install Node.js as described in [Installation](#installation) and open a new terminal.

**The setup does not find a client.** A client creates its configuration folder on its first start. Start the client once and run the setup again, or name it with `--client`, for example `--client cursor`.

**The setup reports that a file is not valid JSON.** The client configuration file contains a syntax error, and the setup does not touch it. Fix the file or move it away and run the setup again.

**The tools do not appear in the client.** Restart the client completely, including its tray icon. Then run `npx -y lolzteam-mcp@latest --version` in a terminal: it prints the version when Node.js and npm work. For a source install, check that the paths in the configuration are absolute and that `npm run build` finished.

**Every call returns `not_configured`.** The client does not pass `LOLZTEAM_TOKEN` to the server. Run the setup again, or put the token in the `env` block of the server configuration, not in your shell profile.

**`unauthorized`.** The token is invalid or expired. Create a new one and run the setup again.

**`forbidden` from `forum_search`.** The token lacks the `post` scope. Other forum tools work without it.

**`forbidden` from Market tools.** The token lacks the `market` scope, or the account does not meet the Market API access requirement.

**`rate_limited`.** Wait for `retry_after_seconds`. If it happens often, reduce how many searches you ask for in a row.

**Check a token from the terminal.** In a source install, run:

```bash
LOLZTEAM_TOKEN=your-token npm run smoke
```

It calls a few read-only tools against the live APIs and prints `ok` or `FAIL` for each.

## Development

```bash
npm ci
npm test
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Tests use the built-in Node.js test runner and a fake `fetch`, so they never touch the real APIs and need no token. They cover configuration, the HTTP client with retries, rate limits and error mapping, catalog generation and the read-only policy, parameter validation and every tool through a real MCP client connection. One test fails when the generated catalogs no longer match the OpenAPI documents in `openapi/`.

### Keeping up with API changes

The official OpenAPI documents live in `openapi/`. `npm run generate` turns them into the endpoint catalogs in `src/endpoints/forum.generated.ts` and `src/endpoints/market.generated.ts`. The universal tools and the Market category filters read these catalogs, so a new endpoint, parameter or filter needs no code. The dedicated tools keep their hand-picked parameters, and anything new is reachable through the universal tools right away.

To update by hand, download the latest documents and regenerate:

```bash
npm run sync
```

The command prints a report of added, changed and removed endpoints, plus new operations the read-only policy excluded.

The `Sync API` workflow does the same every day at 06:00 UTC. When the documents change, it runs the checks and opens or updates the `api-sync` pull request with the report and the check results. Review it and merge. Pull the change and run `npm run build` to use it.

The workflow needs **Allow GitHub Actions to create and approve pull requests** enabled under **Settings** > **Actions** > **General**.

Endpoints get into the catalog only if `src/endpoints/policy.ts` allows them:

- Only `GET` requests, plus the documented search endpoints and the bulk listing lookup. Every other method can change data and is excluded.
- No endpoints that need the private `conversate`, `payment` or `invoice` scopes.
- No endpoints whose path points to credentials, such as `.mafile`, email codes, letters, passwords or proxies.
- No endpoints whose documentation warns about side effects, such as cancelling an account guarantee.
- No endpoints that return the token owner's private account data, such as `/users/me` with its balance and email.

A new endpoint that matches none of these rules appears in the pull request under **Added endpoints**. That is the moment to check that it is safe to expose.

## How it works

1. Your MCP client starts the server and lists its tools over stdio.
2. When the assistant calls a tool, the arguments are validated with Zod and checked against the endpoint catalog generated from the official OpenAPI documents.
3. The HTTP client waits for a free slot in the local rate limit bucket, sends the request with the bearer token and a timeout and retries rate limits, server errors and network failures with backoff.
4. The response is reduced to the fields that matter and its texts are cleaned and truncated. The result goes back to the assistant as JSON.

The official OpenAPI documents published with the API documentation were the reference for every endpoint, parameter and response field the server uses.

## Project structure

```text
src/
  index.ts                  Entry point: command line, server start, shutdown
  server.ts                 MCP server, instructions and API clients
  config.ts                 Environment variables and validation
  tool.ts                   Tool registration, results and error format
  endpoints/                Generated endpoint catalogs, read-only policy, universal tools
  http/                     HTTP client, query encoding and rate limiter
  i18n/                     User-facing texts: English source and Russian translation
  forum/                    Forum tools and response formatting
  market/                   Market tools, formatting and category filters
  setup/                    Setup command: token check, client detection, configuration files
  util/                     JSON access, text cleanup and response sanitizing
openapi/                    Official OpenAPI documents of both APIs
scripts/
  catalog.ts                Builds endpoint catalogs from OpenAPI documents
  generate.ts               Downloads documents, writes catalogs, prints the change report
  smoke.ts                  Live check with a real token
test/                       Unit and integration tests
```

## Contributing

Issues and pull requests are welcome. Keep the server read-only, put every user-facing text into `src/i18n/en.ts` and its translations, base every parameter on the official API documentation, add tests for new behavior and run `npm test`, `npm run lint` and `npm run typecheck` before you open a pull request.

## License

[MIT](LICENSE) © 2026 Liwidale

LOLZTEAM MCP is an independent project. It is not affiliated with or endorsed by LOLZTEAM or LZT Market.

<p align="center"><sub>ゝ made by <a href="https://github.com/liwidale">liwidale</a></sub></p>
