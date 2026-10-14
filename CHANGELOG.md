# Changelog

## 1.0.0

### Added

- Forum search across threads, posts and profile posts, with filters by section, author and tag.
- Forum browsing: sections, categories, thread lists with sorting, full threads with polls, posts, comments, users and tags.
- Market search in every category or across all of them, with price, currency, sorting, origin, seller and category-specific filters checked against the official documentation.
- Market listing details, seller feedback, Steam inventory value, category games and currency rates.
- Local rate limiting that follows the official limits and the API rate limit headers, with retries for rate limits, server errors and network failures.
- Structured errors with a code, the API message and a hint for the assistant.
- Universal tools that list, describe and call every read-only endpoint of both APIs, generated from the official OpenAPI documents.
- English and Russian interface. `LOLZTEAM_LOCALE` switches tool descriptions, errors and hints.
- A daily workflow that downloads the official OpenAPI documents, regenerates the endpoint catalogs and opens a pull request with a report of what changed.
