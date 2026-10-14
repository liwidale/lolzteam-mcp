# Changelog

## 1.0.3

### Added

- The setup command now finds and configures Antigravity. You can also choose it with `--client antigravity`.

### Improved

- The README warns that the forum rules forbid letting an LLM write messages for you and explains how to set up a client by hand.

## 1.0.2

### Improved

- The package no longer has dependencies. Installing it adds only its own code instead of about a hundred third-party packages, which makes installation faster and removes dependency alerts in security scanners.
- Invalid tool arguments now come back as a regular `invalid_input` error with every problem listed, in English or Russian.

## 1.0.1

### Improved

- The package is now built and published by GitHub Actions with npm provenance, so you can verify on npmjs.com that it comes from this repository. The server works the same as in 1.0.0.

## 1.0.0

### Added

- Forum search across threads, posts and profile posts, with filters by section, author and tag.
- Forum browsing: sections, categories, thread lists with sorting, full threads with polls, posts, comments, users and tags.
- Market search in every category or across all of them, with price, currency, sorting, origin, seller and category-specific filters checked against the official documentation.
- Market listing details, seller feedback, Steam inventory value, category games and currency rates.
- Local rate limiting that follows the official limits and the API rate limit headers, with retries for rate limits, server errors and network failures.
- Structured errors with a code, the API message and a hint for the assistant.
- Universal tools that list, describe and call every read-only endpoint of both APIs, generated from the official OpenAPI documents.
- One-command installation with `npx -y lolzteam-mcp setup`. It checks the token against both APIs and adds the server to Claude Desktop, Cursor and Windsurf, keeping a backup of each configuration file.
- English and Russian interface. `LOLZTEAM_LOCALE` switches tool descriptions, errors and hints.
- A daily workflow that downloads the official OpenAPI documents, regenerates the endpoint catalogs and opens a pull request with a report of what changed.
