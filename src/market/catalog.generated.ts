import type { MarketCatalog } from "./catalog.ts";

export const marketCatalog: MarketCatalog = {
  "all": {
    "path": "/",
    "title": "Get Last Accounts",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      }
    ]
  },
  "steam": {
    "path": "/steam",
    "title": "Steam",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no",
          "no_market"
        ]
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "game[]",
        "type": "array",
        "description": "List of games.",
        "items": "integer"
      },
      {
        "name": "not_game[]",
        "type": "array",
        "description": "List of games to exclude.",
        "items": "integer"
      },
      {
        "name": "hours_played",
        "type": "object",
        "description": "List of minimum hours played by game.",
        "items": "integer"
      },
      {
        "name": "hours_played_max",
        "type": "object",
        "description": "List of maximum hours played by game.",
        "items": "integer"
      },
      {
        "name": "eg",
        "type": "integer",
        "description": "Guarantee type.",
        "values": [
          -1,
          0,
          1
        ]
      },
      {
        "name": "vac[]",
        "type": "array",
        "description": "List of VAC bans by game.",
        "items": "integer"
      },
      {
        "name": "vac_skip_game_check",
        "type": "boolean",
        "description": "Don't check game existence while checking for vac."
      },
      {
        "name": "rt",
        "type": "string",
        "description": "Has community ban.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "trade_ban",
        "type": "string",
        "description": "Has lifetime trade ban.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "trade_limit",
        "type": "string",
        "description": "Has temporary trade limit.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "limit",
        "type": "string",
        "description": "Has 5 $ limit.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "mafile",
        "type": "string",
        "description": "Has .mafile (Steam Guard Authenticator).",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "lmin",
        "type": "integer",
        "description": "Minimum level."
      },
      {
        "name": "lmax",
        "type": "integer",
        "description": "Maximum level."
      },
      {
        "name": "wingman_rmin",
        "type": "integer",
        "description": "Minimum rank in CS2 Wingman.",
        "values": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18
        ]
      },
      {
        "name": "wingman_rmax",
        "type": "integer",
        "description": "Maximum rank in CS2 Wingman.",
        "values": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18
        ]
      },
      {
        "name": "no_vac",
        "type": "boolean",
        "description": "Has no VAC ban."
      },
      {
        "name": "mm_ban",
        "type": "string",
        "description": "Has CS2 Matchmaking ban.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "balance_min",
        "type": "integer",
        "description": "Minimum balance."
      },
      {
        "name": "balance_max",
        "type": "integer",
        "description": "Maximum balance."
      },
      {
        "name": "inv_game",
        "type": "integer",
        "description": "Game ID to check inventory price.",
        "values": [
          440,
          570,
          730,
          753,
          232090,
          252490,
          304930,
          322330,
          578080
        ]
      },
      {
        "name": "inv_min",
        "type": "number",
        "description": "Minimum inventory price for game."
      },
      {
        "name": "inv_max",
        "type": "number",
        "description": "Maximum inventory price for game."
      },
      {
        "name": "friends_min",
        "type": "integer",
        "description": "Minimum number of friends."
      },
      {
        "name": "friends_max",
        "type": "integer",
        "description": "Maximum number of friends."
      },
      {
        "name": "gmin",
        "type": "integer",
        "description": "Minimum number of games."
      },
      {
        "name": "gmax",
        "type": "integer",
        "description": "Maximum number of games."
      },
      {
        "name": "win_count_min",
        "type": "integer",
        "description": "Minimum number of wins."
      },
      {
        "name": "win_count_max",
        "type": "integer",
        "description": "Maximum number of wins."
      },
      {
        "name": "medal_id[]",
        "type": "array",
        "description": "List of medal IDs.",
        "items": "integer",
        "valueCount": 189
      },
      {
        "name": "medal_operator_or",
        "type": "boolean",
        "description": "Search for medals using \"OR\" instead of \"AND\"."
      },
      {
        "name": "medal_min",
        "type": "integer",
        "description": "Minimum number of medals."
      },
      {
        "name": "medal_max",
        "type": "integer",
        "description": "Maximum number of medals."
      },
      {
        "name": "gift[]",
        "type": "array",
        "description": "List of gifts.",
        "items": "string",
        "valueCount": 4305
      },
      {
        "name": "gift_min",
        "type": "integer",
        "description": "Minimum number of gifts."
      },
      {
        "name": "gift_max",
        "type": "integer",
        "description": "Maximum number of gifts."
      },
      {
        "name": "recently_hours_min",
        "type": "integer",
        "description": "Minimum number of recently played hours."
      },
      {
        "name": "recently_hours_max",
        "type": "integer",
        "description": "Maximum number of recently played hours."
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "cs2_profile_rank_min",
        "type": "integer",
        "description": "Minimum CS2 rank."
      },
      {
        "name": "cs2_profile_rank_max",
        "type": "integer",
        "description": "Maximum CS2 rank."
      },
      {
        "name": "solommr_min",
        "type": "integer",
        "description": "Minimum number of Dota 2 MMR."
      },
      {
        "name": "solommr_max",
        "type": "integer",
        "description": "Maximum number of Dota 2 MMR."
      },
      {
        "name": "d2_game_count_min",
        "type": "integer",
        "description": "Minimum number of Dota 2 games."
      },
      {
        "name": "d2_game_count_max",
        "type": "integer",
        "description": "Maximum number of Dota 2 games."
      },
      {
        "name": "d2_win_count_min",
        "type": "integer",
        "description": "Minimum number of Dota 2 wins."
      },
      {
        "name": "d2_win_count_max",
        "type": "integer",
        "description": "Maximum number of Dota 2 wins."
      },
      {
        "name": "d2_behavior_min",
        "type": "integer",
        "description": "Minimum number of Dota 2 behavior."
      },
      {
        "name": "d2_behavior_max",
        "type": "integer",
        "description": "Maximum number of Dota 2 behavior."
      },
      {
        "name": "faceit_lvl_min",
        "type": "integer",
        "description": "Minimum FACEIT level."
      },
      {
        "name": "faceit_lvl_max",
        "type": "integer",
        "description": "Maximum FACEIT level."
      },
      {
        "name": "points_min",
        "type": "integer",
        "description": "Minimum number of Steam points."
      },
      {
        "name": "points_max",
        "type": "integer",
        "description": "Maximum number of Steam points."
      },
      {
        "name": "relevant_gmin",
        "type": "integer",
        "description": "Minimum number of relevant games."
      },
      {
        "name": "relevant_gmax",
        "type": "integer",
        "description": "Maximum number of relevant games."
      },
      {
        "name": "last_trans_date",
        "type": "integer",
        "description": "How old is last transaction."
      },
      {
        "name": "last_trans_date_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "last_trans_date_later",
        "type": "integer",
        "description": "How new is last transaction."
      },
      {
        "name": "last_trans_date_period_later",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "no_trans",
        "type": "boolean",
        "description": "Has no transactions."
      },
      {
        "name": "trans",
        "type": "boolean",
        "description": "Has transactions."
      },
      {
        "name": "gifts_purchase_min",
        "type": "number",
        "description": "Minimum amount spent on gifts."
      },
      {
        "name": "gifts_purchase_max",
        "type": "number",
        "description": "Maximum amount spent on gifts."
      },
      {
        "name": "refunds_purchase_min",
        "type": "number",
        "description": "Minimum amount of refunds."
      },
      {
        "name": "refunds_purchase_max",
        "type": "number",
        "description": "Minimum amount of refunds."
      },
      {
        "name": "ingame_purchase_min",
        "type": "number",
        "description": "Minimum spend amount on in-game purchases."
      },
      {
        "name": "ingame_purchase_max",
        "type": "number",
        "description": "Maximum spend amount on in-game purchases."
      },
      {
        "name": "games_purchase_min",
        "type": "number",
        "description": "Minimum spend amount on all purchases."
      },
      {
        "name": "games_purchase_max",
        "type": "number",
        "description": "Maximum spend amount on all purchases."
      },
      {
        "name": "purchase_min",
        "type": "number",
        "description": "Minimum spend amount on all purchases."
      },
      {
        "name": "purchase_max",
        "type": "number",
        "description": "Maximum spend amount on all purchases."
      },
      {
        "name": "has_activated_keys",
        "type": "string",
        "description": "Has activated keys.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "elo_min",
        "type": "integer",
        "description": "Minimum Premier ELO in CS2."
      },
      {
        "name": "elo_max",
        "type": "integer",
        "description": "Maximum Premier ELO in CS2."
      },
      {
        "name": "cs2_map_rank",
        "type": "integer",
        "description": "Map for rank in CS2.",
        "values": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27
        ]
      },
      {
        "name": "cs2_map_rmin",
        "type": "integer",
        "description": "Minimum rank in CS2 on a certain map.",
        "values": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18
        ]
      },
      {
        "name": "cs2_map_rmax",
        "type": "integer",
        "description": "Maximum rank in CS2 on a certain map.",
        "values": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18
        ]
      },
      {
        "name": "has_faceit",
        "type": "string",
        "description": "Has FACEIT account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "faceit_csgo_lvl_min",
        "type": "integer",
        "description": "Minimum FACEIT level."
      },
      {
        "name": "faceit_csgo_lvl_max",
        "type": "integer",
        "description": "Maximum FACEIT level."
      },
      {
        "name": "rust_deaths_min",
        "type": "integer",
        "description": "Minimum number of Rust deaths"
      },
      {
        "name": "rust_deaths_max",
        "type": "integer",
        "description": "Maximum number of Rust deaths"
      },
      {
        "name": "rust_kills_min",
        "type": "integer",
        "description": "Minimum number of Rust kills"
      },
      {
        "name": "rust_kills_max",
        "type": "integer",
        "description": "Maximum number of Rust kills"
      },
      {
        "name": "d2_last_match_date",
        "type": "integer",
        "description": "How old is last match of Dota 2."
      },
      {
        "name": "d2_last_match_date_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "cards_min",
        "type": "integer",
        "description": "Minimum number of available to collect trading cards."
      },
      {
        "name": "cards_max",
        "type": "integer",
        "description": "Maximum number of available to collect trading cards."
      },
      {
        "name": "cards_games_min",
        "type": "integer",
        "description": "Minimum number of available games with available to collect trading cards."
      },
      {
        "name": "cards_games_max",
        "type": "integer",
        "description": "Maximum number of available games with available to collect trading cards."
      },
      {
        "name": "skip_vac_inv",
        "type": "boolean",
        "description": "Ignore inventory value if game has VAC ban."
      },
      {
        "name": "market",
        "type": "string",
        "description": "Has market available.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "reg_after",
        "type": "integer",
        "description": "How young is the account."
      },
      {
        "name": "reg_after_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "pending_balance_min",
        "type": "integer",
        "description": "Minimum pending balance."
      },
      {
        "name": "pending_balance_max",
        "type": "integer",
        "description": "Maximum pending balance."
      },
      {
        "name": "d2_last_match_date_later",
        "type": "integer",
        "description": "Last match of Dota 2 is later than."
      },
      {
        "name": "d2_last_match_date_later_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "d2_low_priority_min",
        "type": "integer",
        "description": "Minimum number of Dota 2 low priority games."
      },
      {
        "name": "d2_low_priority_max",
        "type": "integer",
        "description": "Maximum number of Dota 2 low priority games."
      },
      {
        "name": "d2_low_priority",
        "type": "string",
        "description": "Dota 2 low priority is active.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "d2_ranked",
        "type": "string",
        "description": "Dota 2 ranked matchmaking unlocked.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "spend_min",
        "type": "integer",
        "description": "Minimum total spend amount."
      },
      {
        "name": "spend_max",
        "type": "integer",
        "description": "Maximum total spend amount."
      },
      {
        "name": "vacnet",
        "type": "string",
        "description": "Has access to VacNet labeling portal.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "d2_comm_score_min",
        "type": "integer",
        "description": "Minimum Dota 2 comm score."
      },
      {
        "name": "d2_comm_score_max",
        "type": "integer",
        "description": "Maximum Dota 2 comm score."
      },
      {
        "name": "licenses_min",
        "type": "integer",
        "description": "Minimum number of licenses."
      },
      {
        "name": "licenses_max",
        "type": "integer",
        "description": "Maximum number of licenses."
      },
      {
        "name": "deadlock_game_count_min",
        "type": "integer",
        "description": "Minimum number of Deadlock matches."
      },
      {
        "name": "deadlock_game_count_max",
        "type": "integer",
        "description": "Maximum number of Deadlock matches."
      },
      {
        "name": "deadlock_win_count_min",
        "type": "integer",
        "description": "Minimum number of Deadlock wins."
      },
      {
        "name": "deadlock_win_count_max",
        "type": "integer",
        "description": "Maximum number of Deadlock wins."
      },
      {
        "name": "deadlock_rank_min",
        "type": "integer",
        "description": "Minimum rank in Deadlock.",
        "values": [
          "Acolyte",
          "Ascendant",
          "Emissary",
          "Eternus",
          "Initiate",
          "Mystic",
          "Obscurus",
          "Oracle",
          "Phantom",
          "Ritualist",
          "Seeker",
          "Sentinel"
        ]
      },
      {
        "name": "deadlock_rank_max",
        "type": "integer",
        "description": "Maximum rank in Deadlock.",
        "values": [
          "Acolyte",
          "Ascendant",
          "Emissary",
          "Eternus",
          "Initiate",
          "Mystic",
          "Obscurus",
          "Oracle",
          "Phantom",
          "Ritualist",
          "Seeker",
          "Sentinel"
        ]
      },
      {
        "name": "deadlock_last_match_date",
        "type": "integer",
        "description": "How old is last match of Deadlock."
      },
      {
        "name": "deadlock_last_match_date_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "deadlock_last_match_date_later",
        "type": "integer",
        "description": "Last match of Deadlock is later than."
      },
      {
        "name": "deadlock_last_match_date_later_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      }
    ]
  },
  "mihoyo": {
    "path": "/mihoyo",
    "title": "miHoYo",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "email",
        "type": "string",
        "description": "Has linked email.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "ea",
        "type": "string",
        "description": "Has linked external accounts.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "region",
        "type": "array",
        "description": "Region.",
        "items": "string",
        "values": [
          "asia",
          "cht",
          "eu",
          "usa"
        ]
      },
      {
        "name": "not_region",
        "type": "array",
        "description": "List of disallowed regions.",
        "items": "string",
        "values": [
          "asia",
          "cht",
          "eu",
          "usa"
        ]
      },
      {
        "name": "genshin_character[]",
        "type": "array",
        "description": "List of characters.",
        "items": "integer",
        "valueCount": 124
      },
      {
        "name": "genshin_character_constellations",
        "type": "object",
        "description": "List of minimum constellations on characters.",
        "items": "integer"
      },
      {
        "name": "genshin_character_constellations_max",
        "type": "object",
        "description": "List of maximum constellations on characters.",
        "items": "integer"
      },
      {
        "name": "genshin_weapon[]",
        "type": "array",
        "description": "List of weapons.",
        "items": "integer",
        "valueCount": 252
      },
      {
        "name": "genshin_char_min",
        "type": "integer",
        "description": "Minimum number of characters."
      },
      {
        "name": "genshin_char_max",
        "type": "integer",
        "description": "Maximum number of characters."
      },
      {
        "name": "genshin_legendary_min",
        "type": "integer",
        "description": "Minimum number of legendary characters."
      },
      {
        "name": "genshin_legendary_max",
        "type": "integer",
        "description": "Maximum number of legendary characters."
      },
      {
        "name": "genshin_level_min",
        "type": "integer",
        "description": "Minimum level."
      },
      {
        "name": "genshin_level_max",
        "type": "integer",
        "description": "Maximum level."
      },
      {
        "name": "genshin_legendary_weapon_min",
        "type": "integer",
        "description": "Minimum number of legendary weapon characters."
      },
      {
        "name": "genshin_legendary_weapon_max",
        "type": "integer",
        "description": "Maximum number of legendary weapon characters."
      },
      {
        "name": "constellations_min",
        "type": "integer",
        "description": "Minimum number of constellations on legendary characters."
      },
      {
        "name": "constellations_max",
        "type": "integer",
        "description": "Maximum number of constellations on legendary characters."
      },
      {
        "name": "genshin_achievement_min",
        "type": "integer",
        "description": "Minimum number of achievements."
      },
      {
        "name": "genshin_achievement_max",
        "type": "integer",
        "description": "Maximum number of achievements."
      },
      {
        "name": "genshin_currency_min",
        "type": "integer",
        "description": "Minimum number of primogems."
      },
      {
        "name": "genshin_currency_max",
        "type": "integer",
        "description": "Maximum number of primogems."
      },
      {
        "name": "honkai_character[]",
        "type": "array",
        "description": "List of characters.",
        "items": "integer",
        "valueCount": 98
      },
      {
        "name": "honkai_character_eidolons",
        "type": "object",
        "description": "List of minimum eidolons on characters.",
        "items": "integer"
      },
      {
        "name": "honkai_character_eidolons_max",
        "type": "object",
        "description": "List of maximum eidolons on characters.",
        "items": "integer"
      },
      {
        "name": "honkai_weapon[]",
        "type": "array",
        "description": "List of weapons.",
        "items": "integer",
        "valueCount": 170
      },
      {
        "name": "honkai_char_min",
        "type": "integer",
        "description": "Minimum number of characters."
      },
      {
        "name": "honkai_char_max",
        "type": "integer",
        "description": "Maximum number of characters."
      },
      {
        "name": "honkai_legendary_min",
        "type": "integer",
        "description": "Minimum number of legendary characters."
      },
      {
        "name": "honkai_legendary_max",
        "type": "integer",
        "description": "Maximum number of legendary characters."
      },
      {
        "name": "honkai_level_min",
        "type": "integer",
        "description": "Minimum level."
      },
      {
        "name": "honkai_level_max",
        "type": "integer",
        "description": "Maximum level."
      },
      {
        "name": "honkai_legendary_weapon_min",
        "type": "integer",
        "description": "Minimum number of legendary weapon characters."
      },
      {
        "name": "honkai_legendary_weapon_max",
        "type": "integer",
        "description": "Maximum number of legendary weapon characters."
      },
      {
        "name": "eidolons_min",
        "type": "integer",
        "description": "Minimum number of constellations on Honkai: Star Rail legendary characters."
      },
      {
        "name": "eidolons_max",
        "type": "integer",
        "description": "Maximum number of legendary Honkai: Star Rail weapon characters."
      },
      {
        "name": "honkai_achievement_min",
        "type": "integer",
        "description": "Minimum number of achievements."
      },
      {
        "name": "honkai_achievement_max",
        "type": "integer",
        "description": "Maximum number of achievements."
      },
      {
        "name": "honkai_currency_min",
        "type": "integer",
        "description": "Minimum number of Stellar Jade."
      },
      {
        "name": "honkai_currency_max",
        "type": "integer",
        "description": "Maximum number of Stellar Jade."
      },
      {
        "name": "zenless_character[]",
        "type": "array",
        "description": "List of Zenless Zone Zero characters.",
        "items": "integer",
        "values": [
          1011,
          1021,
          1031,
          1041,
          1051,
          1061,
          1071,
          1081,
          1091,
          1101,
          1111,
          1121,
          1131,
          1141,
          1151,
          1161,
          1171,
          1181,
          1191,
          1201,
          1211,
          1221,
          1241,
          1251,
          1261,
          1271,
          1281,
          1291,
          1301,
          1311,
          1321,
          1331,
          1341,
          1351,
          1361,
          1371,
          1381,
          1391,
          1401,
          1411,
          1421,
          1431,
          1441,
          1451,
          1461,
          1471,
          1481,
          1491,
          1501,
          1511,
          1521,
          1531,
          1541,
          1551,
          1561,
          1571,
          1581,
          1591,
          1611,
          1621
        ]
      },
      {
        "name": "zenless_character_cinemas",
        "type": "object",
        "description": "List of minimum cinemas on characters.",
        "items": "integer"
      },
      {
        "name": "zenless_character_cinemas_max",
        "type": "object",
        "description": "List of maximum cinemas on characters.",
        "items": "integer"
      },
      {
        "name": "zenless_weapon[]",
        "type": "array",
        "description": "List of Zenless Zone Zero weapons.",
        "items": "integer",
        "valueCount": 99
      },
      {
        "name": "zenless_legendary_min",
        "type": "integer",
        "description": "Minimum number of Zenless Zone Zero legendary characters."
      },
      {
        "name": "zenless_legendary_max",
        "type": "integer",
        "description": "Maximum number of Zenless Zone Zero legendary characters."
      },
      {
        "name": "cinemas_min",
        "type": "integer",
        "description": "Minimum number of cinemas on Zenless Zone Zero characters."
      },
      {
        "name": "cinemas_max",
        "type": "integer",
        "description": "Maximum number of cinemas on Zenless Zone Zero characters."
      },
      {
        "name": "zenless_legendary_weapon_min",
        "type": "integer",
        "description": "Minimum number of legendary Zenless Zone Zero weapon characters."
      },
      {
        "name": "zenless_legendary_weapon_max",
        "type": "integer",
        "description": "Maximum number of legendary Zenless Zone Zero weapon characters."
      },
      {
        "name": "zenless_char_min",
        "type": "integer",
        "description": "Minimum number of Zenless Zone Zero characters."
      },
      {
        "name": "zenless_char_max",
        "type": "integer",
        "description": "Maximum number of Zenless Zone Zero characters."
      },
      {
        "name": "zenless_level_min",
        "type": "integer",
        "description": "Minimum Zenless Zone Zero level."
      },
      {
        "name": "zenless_level_max",
        "type": "integer",
        "description": "Maximum Zenless Zone Zero level."
      },
      {
        "name": "zenless_achievement_min",
        "type": "integer",
        "description": "Minimum count of Zenless Zone Zero achievements."
      },
      {
        "name": "zenless_achievement_max",
        "type": "integer",
        "description": "Maximum count of Zenless Zone Zero achievements."
      },
      {
        "name": "zenless_currency_min",
        "type": "integer",
        "description": "Minimum count of Zenless Zone Zero polychrome."
      },
      {
        "name": "zenless_currency_max",
        "type": "integer",
        "description": "Maximum count of Zenless Zone Zero polychrome."
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "mihoyo_game[]",
        "type": "array",
        "description": "List of miHoYo games the account must have.",
        "items": "string",
        "values": [
          "genshin-impact",
          "honkai-star-rail",
          "zenless-zone-zero"
        ]
      }
    ]
  },
  "riot": {
    "path": "/riot",
    "title": "Riot",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "rmin",
        "type": "integer",
        "description": "Minimum valorant rank.",
        "values": [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27
        ]
      },
      {
        "name": "rmax",
        "type": "integer",
        "description": "Maximum valorant rank.",
        "values": [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27
        ]
      },
      {
        "name": "last_rmin",
        "type": "integer",
        "description": "Last minimum valorant rank.",
        "values": [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27
        ]
      },
      {
        "name": "last_rmax",
        "type": "integer",
        "description": "Last maximum valorant rank.",
        "values": [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27
        ]
      },
      {
        "name": "previous_rmin",
        "type": "integer",
        "description": "Previous minimum rank.",
        "values": [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27
        ]
      },
      {
        "name": "previous_rmax",
        "type": "integer",
        "description": "Previous maximum rank.",
        "values": [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27
        ]
      },
      {
        "name": "weaponSkin[]",
        "type": "array",
        "description": "List of weapon skins.",
        "items": "string"
      },
      {
        "name": "buddy[]",
        "type": "array",
        "description": "List of buddies.",
        "items": "string"
      },
      {
        "name": "agent[]",
        "type": "array",
        "description": "List of agents.",
        "items": "string"
      },
      {
        "name": "champion[]",
        "type": "array",
        "description": "List of champions.",
        "items": "string"
      },
      {
        "name": "skin[]",
        "type": "array",
        "description": "List of LoL skins.",
        "items": "string"
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 150
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 150
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "valorant_level_min",
        "type": "integer",
        "description": "Minimum level in Valorant."
      },
      {
        "name": "valorant_level_max",
        "type": "integer",
        "description": "Maximum level in Valorant."
      },
      {
        "name": "lol_level_min",
        "type": "integer",
        "description": "Minimum level in LoL."
      },
      {
        "name": "lol_level_max",
        "type": "integer",
        "description": "Maximum level in LoL."
      },
      {
        "name": "inv_min",
        "type": "integer",
        "description": "Minimum inventory value."
      },
      {
        "name": "inv_max",
        "type": "integer",
        "description": "Maximum inventory value."
      },
      {
        "name": "vp_min",
        "type": "integer",
        "description": "Minimum number of Valorant points."
      },
      {
        "name": "vp_max",
        "type": "integer",
        "description": "Maximum number of Valorant points."
      },
      {
        "name": "valorant_smin",
        "type": "integer",
        "description": "Minimum number of skins."
      },
      {
        "name": "valorant_smax",
        "type": "integer",
        "description": "Maximum number of skins."
      },
      {
        "name": "valorant_rank_type[]",
        "type": "array",
        "description": "List of allowed rank types.",
        "items": "string",
        "values": [
          "ranked",
          "ranked_ready",
          "unrated"
        ]
      },
      {
        "name": "amin",
        "type": "integer",
        "description": "Minimum amount of agents."
      },
      {
        "name": "amax",
        "type": "integer",
        "description": "Maximum amount of agents."
      },
      {
        "name": "valorant_region[]",
        "type": "array",
        "description": "List of allowed regions in Valorant.",
        "items": "string",
        "values": [
          "AP",
          "BR",
          "EU",
          "KR",
          "LA",
          "NA"
        ]
      },
      {
        "name": "valorant_not_region[]",
        "type": "array",
        "description": "List of disallowed regions in Valorant.",
        "items": "string",
        "values": [
          "AP",
          "BR",
          "EU",
          "KR",
          "LA",
          "NA"
        ]
      },
      {
        "name": "lol_region[]",
        "type": "array",
        "description": "List of allowed regions in LoL.",
        "items": "string",
        "values": [
          "BR1",
          "EUN1",
          "EUW1",
          "JP1",
          "KR",
          "LA1",
          "LA2",
          "ME1",
          "NA1",
          "OC1",
          "PH2",
          "RU",
          "SG2",
          "TH2",
          "TR1",
          "TW2",
          "VN2"
        ]
      },
      {
        "name": "lol_not_region[]",
        "type": "array",
        "description": "List of disallowed regions in LoL.",
        "items": "string",
        "values": [
          "BR1",
          "EUN1",
          "EUW1",
          "JP1",
          "KR",
          "LA1",
          "LA2",
          "ME1",
          "NA1",
          "OC1",
          "PH2",
          "RU",
          "SG2",
          "TH2",
          "TR1",
          "TW2",
          "VN2"
        ]
      },
      {
        "name": "knife",
        "type": "boolean",
        "description": "Has any knife."
      },
      {
        "name": "lol_smin",
        "type": "integer",
        "description": "Minimum number of skins in LoL."
      },
      {
        "name": "lol_smax",
        "type": "integer",
        "description": "Maximum number of skins in LoL."
      },
      {
        "name": "champion_min",
        "type": "integer",
        "description": "Minimum number of champions."
      },
      {
        "name": "champion_max",
        "type": "integer",
        "description": "Maximum number of champions."
      },
      {
        "name": "win_rate_min",
        "type": "integer",
        "description": "Minimum win-rate."
      },
      {
        "name": "win_rate_max",
        "type": "integer",
        "description": "Maximum win-rate."
      },
      {
        "name": "blue_min",
        "type": "integer",
        "description": "Minimum wallet blue balance."
      },
      {
        "name": "blue_max",
        "type": "integer",
        "description": "Maximum wallet blue balance."
      },
      {
        "name": "orange_min",
        "type": "integer",
        "description": "Minimum wallet orange balance."
      },
      {
        "name": "orange_max",
        "type": "integer",
        "description": "Maximum wallet orange balance."
      },
      {
        "name": "mythic_min",
        "type": "integer",
        "description": "Minimum wallet mythic balance."
      },
      {
        "name": "mythic_max",
        "type": "integer",
        "description": "Maximum wallet mythic balance."
      },
      {
        "name": "riot_min",
        "type": "integer",
        "description": "Minimum wallet riot balance."
      },
      {
        "name": "riot_max",
        "type": "integer",
        "description": "Maximum wallet riot balance."
      },
      {
        "name": "email",
        "type": "string",
        "description": "Has linked email.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has linked mobile.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "valorant_knife_min",
        "type": "integer",
        "description": "Minimum knifes in Valorant."
      },
      {
        "name": "valorant_knife_max",
        "type": "integer",
        "description": "Maximum knifes in Valorant."
      },
      {
        "name": "rp_min",
        "type": "integer",
        "description": "Minimum number of Valorant Radiant Points."
      },
      {
        "name": "rp_max",
        "type": "integer",
        "description": "Maximum number of Valorant Radiant Points."
      },
      {
        "name": "fa_min",
        "type": "integer",
        "description": "Minimum number of Valorant free agents."
      },
      {
        "name": "fa_max",
        "type": "integer",
        "description": "Maximum number of Valorant free agents."
      },
      {
        "name": "lol_rank[]",
        "type": "array",
        "description": "List of allowed ranks in LoL.",
        "items": "string",
        "values": [
          "BRONZE I",
          "BRONZE II",
          "BRONZE III",
          "BRONZE IV",
          "CHALLENGER I",
          "DIAMOND I",
          "DIAMOND II",
          "DIAMOND III",
          "DIAMOND IV",
          "EMERALD I",
          "EMERALD II",
          "EMERALD III",
          "EMERALD IV",
          "GOLD I",
          "GOLD II",
          "GOLD III",
          "GOLD IV",
          "GRANDMASTER I",
          "IRON I",
          "IRON II",
          "IRON III",
          "IRON IV",
          "MASTER I",
          "PLATINUM I",
          "PLATINUM II",
          "PLATINUM III",
          "PLATINUM IV",
          "SILVER I",
          "SILVER II",
          "SILVER III",
          "SILVER IV",
          "Unranked"
        ]
      },
      {
        "name": "riot_game[]",
        "type": "array",
        "description": "List of Riot games the account must have.",
        "items": "string",
        "values": [
          "league-of-legends",
          "valorant"
        ]
      }
    ]
  },
  "telegram": {
    "path": "/telegram",
    "title": "Telegram",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "spam",
        "type": "string",
        "description": "Has a spam ban.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "password",
        "type": "string",
        "description": "Has a cloud password.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "premium",
        "type": "string",
        "description": "Has a premium subscription.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "premium_expiration",
        "type": "integer",
        "description": "When premium subscription will be active"
      },
      {
        "name": "premium_expiration_period",
        "type": "string",
        "description": "In what notation is time measured",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "min_channels",
        "type": "integer",
        "description": "Minimum number of channels."
      },
      {
        "name": "max_channels",
        "type": "integer",
        "description": "Maximum number of channels."
      },
      {
        "name": "min_chats",
        "type": "integer",
        "description": "Minimum number of chats."
      },
      {
        "name": "max_chats",
        "type": "integer",
        "description": "Maximum number of chats."
      },
      {
        "name": "min_conversations",
        "type": "integer",
        "description": "Minimum number of conversations."
      },
      {
        "name": "max_conversations",
        "type": "integer",
        "description": "Maximum number of conversations."
      },
      {
        "name": "min_admin",
        "type": "integer",
        "description": "Minimum number of channels, where account is administrator/owner."
      },
      {
        "name": "max_admin",
        "type": "integer",
        "description": "Maximum number of channels, where account is administrator/owner."
      },
      {
        "name": "min_admin_sub",
        "type": "integer",
        "description": "Minimum number of subscribers in channel, where account is administrator/owner."
      },
      {
        "name": "max_admin_sub",
        "type": "integer",
        "description": "Maximum number of subscribers in channel, where account is administrator/owner."
      },
      {
        "name": "dig_min",
        "type": "integer",
        "description": "Minimum number of digits in ID."
      },
      {
        "name": "dig_max",
        "type": "integer",
        "description": "Maximum number of digits in ID."
      },
      {
        "name": "min_contacts",
        "type": "integer",
        "description": "Minimum number of contacts."
      },
      {
        "name": "max_contacts",
        "type": "integer",
        "description": "Maximum number of contacts."
      },
      {
        "name": "min_stars",
        "type": "integer",
        "description": "Minimum number of Telegram Stars."
      },
      {
        "name": "max_stars",
        "type": "integer",
        "description": "Maximum number of Telegram Stars."
      },
      {
        "name": "birthday",
        "type": "integer",
        "description": "Birthday was X time before."
      },
      {
        "name": "birthday_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "birthday_after",
        "type": "integer",
        "description": "Birthday was X time after."
      },
      {
        "name": "birthday_after_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "min_id",
        "type": "integer",
        "description": "Minimum ID of account, will be rounded down till nearest 10k. Available if your balance is higher than 100000 RUB."
      },
      {
        "name": "max_id",
        "type": "integer",
        "description": "Maximum ID of account, will be rounded down till nearest 10k. Available if your balance is higher than 100000 RUB."
      },
      {
        "name": "allow_geo_spamblock",
        "type": "boolean",
        "description": "Allow geo spam block in search with spam=no."
      },
      {
        "name": "min_gifts",
        "type": "integer",
        "description": "Minimum number of Telegram gifts on account."
      },
      {
        "name": "max_gifts",
        "type": "integer",
        "description": "Maximum number of Telegram gifts on account."
      },
      {
        "name": "min_nft_gifts",
        "type": "integer",
        "description": "Minimum number of Telegram NFT gifts on account."
      },
      {
        "name": "max_nft_gifts",
        "type": "integer",
        "description": "Maximum number of Telegram NFT gifts on account."
      },
      {
        "name": "min_gifts_stars",
        "type": "integer",
        "description": "Minimum value of all Stars gifts."
      },
      {
        "name": "max_gifts_stars",
        "type": "integer",
        "description": "Maximum value of all Stars gifts."
      },
      {
        "name": "min_gifts_convert_stars",
        "type": "integer",
        "description": "Minimum value of all Stars gifts after convert."
      },
      {
        "name": "max_gifts_convert_stars",
        "type": "integer",
        "description": "Maximum value of all Stars gifts after convert."
      },
      {
        "name": "dc_id[]",
        "type": "array",
        "description": "List of allowed DC ID.",
        "items": "integer"
      },
      {
        "name": "not_dc_id[]",
        "type": "array",
        "description": "List of disallowed DC ID.",
        "items": "integer"
      },
      {
        "name": "email",
        "type": "string",
        "description": "Has linked email.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "min_bots",
        "type": "integer",
        "description": "Minimum number of bots."
      },
      {
        "name": "max_bots",
        "type": "integer",
        "description": "Maximum number of bots."
      },
      {
        "name": "min_bot_active_users",
        "type": "integer",
        "description": "Minimum active users in bot."
      },
      {
        "name": "max_bot_active_users",
        "type": "integer",
        "description": "Maximum active users in bot."
      },
      {
        "name": "min_stars_rating_level",
        "type": "integer",
        "description": "Minimum Telegram Stars rating level."
      },
      {
        "name": "max_stars_rating_level",
        "type": "integer",
        "description": "Maximum Telegram Stars rating level."
      },
      {
        "name": "min_gram",
        "type": "integer",
        "description": "Minimum number of Telegram GRAM."
      },
      {
        "name": "max_gram",
        "type": "integer",
        "description": "Maximum number of Telegram GRAM."
      },
      {
        "name": "min_rare_gifts",
        "type": "integer",
        "description": "Minimum number of Telegram rare (not upgraded) gifts on account."
      },
      {
        "name": "max_rare_gifts",
        "type": "integer",
        "description": "Maximum number of Telegram rare (not upgraded) gifts on account."
      },
      {
        "name": "min_authorizations",
        "type": "integer",
        "description": "Minimum number of authorizations."
      },
      {
        "name": "max_authorizations",
        "type": "integer",
        "description": "Maximum number of authorizations."
      },
      {
        "name": "session_age",
        "type": "integer",
        "description": "Session was created X time before."
      },
      {
        "name": "session_age_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      }
    ]
  },
  "supercell": {
    "path": "/supercell",
    "title": "Supercell",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "eg",
        "type": "integer",
        "description": "Guarantee type.",
        "values": [
          -1,
          0,
          1,
          2
        ]
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has linked mobile.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "brawl_level_min",
        "type": "integer",
        "description": "Minimum Brawl Stars level."
      },
      {
        "name": "brawl_level_max",
        "type": "integer",
        "description": "Maximum Brawl Stars level."
      },
      {
        "name": "brawl_cup_min",
        "type": "integer",
        "description": "Minimum number of Brawl Stars trophies."
      },
      {
        "name": "brawl_cup_max",
        "type": "integer",
        "description": "Maximum number of Brawl Stars trophies."
      },
      {
        "name": "brawl_wins_min",
        "type": "integer",
        "description": "Minimum number of Brawl Stars wins."
      },
      {
        "name": "brawl_wins_max",
        "type": "integer",
        "description": "Maximum number of Brawl Stars wins."
      },
      {
        "name": "brawl_pass",
        "type": "string",
        "description": "Has Brawl Pass.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "brawler[]",
        "type": "array",
        "description": "List of brawlers.",
        "items": "string",
        "valueCount": 109
      },
      {
        "name": "brawlers_min",
        "type": "integer",
        "description": "Minimum number of brawlers."
      },
      {
        "name": "brawlers_max",
        "type": "integer",
        "description": "Maximum number of brawlers."
      },
      {
        "name": "legendary_brawlers_min",
        "type": "integer",
        "description": "Minimum number of legendary brawlers."
      },
      {
        "name": "legendary_brawlers_max",
        "type": "integer",
        "description": "Maximum number of legendary brawlers."
      },
      {
        "name": "royale_level_min",
        "type": "integer",
        "description": "Minimum Clash Royale level."
      },
      {
        "name": "royale_level_max",
        "type": "integer",
        "description": "Maximum Clash Royale level."
      },
      {
        "name": "royale_cup_min",
        "type": "integer",
        "description": "Minimum number of Clash Royale trophies."
      },
      {
        "name": "royale_cup_max",
        "type": "integer",
        "description": "Maximum number of Clash Royale trophies."
      },
      {
        "name": "royale_wins_min",
        "type": "integer",
        "description": "Minimum number of Clash Royale wins."
      },
      {
        "name": "royale_wins_max",
        "type": "integer",
        "description": "Maximum number of Clash Royale wins."
      },
      {
        "name": "king_level_min",
        "type": "integer",
        "description": "Minimum King level in Clash Royale."
      },
      {
        "name": "king_level_max",
        "type": "integer",
        "description": "Maximum King level in Clash Royale."
      },
      {
        "name": "royale_pass",
        "type": "string",
        "description": "Has Royale Pass.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "clash_level_min",
        "type": "integer",
        "description": "Minimum Clash of Clans level."
      },
      {
        "name": "clash_level_max",
        "type": "integer",
        "description": "Maximum Clash of Clans level."
      },
      {
        "name": "clash_cup_min",
        "type": "integer",
        "description": "Minimum number of Clash of Clans trophies."
      },
      {
        "name": "clash_cup_max",
        "type": "integer",
        "description": "Maximum number of Clash of Clans trophies."
      },
      {
        "name": "clash_wins_min",
        "type": "integer",
        "description": "Minimum number of Clash of Clans wins."
      },
      {
        "name": "clash_wins_max",
        "type": "integer",
        "description": "Maximum number of Clash of Clans wins."
      },
      {
        "name": "clash_pass",
        "type": "string",
        "description": "Has Battle Pass.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "total_heroes_level_min",
        "type": "integer",
        "description": "Minimum total heroes level count in Clash of Clans."
      },
      {
        "name": "total_heroes_level_max",
        "type": "integer",
        "description": "Maximum total heroes level count in Clash of Clans."
      },
      {
        "name": "total_troops_level_min",
        "type": "integer",
        "description": "Minimum total troops level count in Clash of Clans."
      },
      {
        "name": "total_troops_level_max",
        "type": "integer",
        "description": "Maximum total troops level count in Clash of Clans."
      },
      {
        "name": "total_spells_level_min",
        "type": "integer",
        "description": "Minimum total spells level count in Clash of Clans."
      },
      {
        "name": "total_spells_level_max",
        "type": "integer",
        "description": "Maximum total spells level count in Clash of Clans."
      },
      {
        "name": "total_builder_heroes_level_min",
        "type": "integer",
        "description": "Minimum total builder village heroes level count in Clash of Clans."
      },
      {
        "name": "total_builder_heroes_level_max",
        "type": "integer",
        "description": "Maximum total builder village heroes level count in Clash of Clans."
      },
      {
        "name": "total_builder_troops_level_min",
        "type": "integer",
        "description": "Minimum total builder village troops level count in Clash of Clans."
      },
      {
        "name": "total_builder_troops_level_max",
        "type": "integer",
        "description": "Maximum total builder village troops level count in Clash of Clans."
      },
      {
        "name": "town_hall_level_min",
        "type": "integer",
        "description": "Minimum level of town hall."
      },
      {
        "name": "town_hall_level_max",
        "type": "integer",
        "description": "Maximum level of town hall."
      },
      {
        "name": "builder_hall_level_min",
        "type": "integer",
        "description": "Minimum level of builder hall."
      },
      {
        "name": "builder_hall_level_max",
        "type": "integer",
        "description": "Maximum level of builder hall."
      },
      {
        "name": "builder_hall_cup_min",
        "type": "integer",
        "description": "Minimum number of builder hall cups."
      },
      {
        "name": "builder_hall_cup_max",
        "type": "integer",
        "description": "Maximum number of builder hall cups."
      },
      {
        "name": "creation_year_min",
        "type": "integer",
        "description": "Minimum account creation year (e.g. 2023)."
      },
      {
        "name": "creation_year_max",
        "type": "integer",
        "description": "Maximum account creation year (e.g. 2024)."
      },
      {
        "name": "skin[]",
        "type": "array",
        "description": "List of Brawl Stars skins.",
        "items": "string"
      },
      {
        "name": "brawler_rank",
        "type": "object",
        "description": "Minimum rank per brawler.",
        "items": "integer"
      },
      {
        "name": "brawler_rank_max",
        "type": "object",
        "description": "Maximum rank per brawler.",
        "items": "integer"
      },
      {
        "name": "brawler_power",
        "type": "object",
        "description": "Minimum power per brawler.",
        "items": "integer"
      },
      {
        "name": "brawler_power_max",
        "type": "object",
        "description": "Maximum power per brawler.",
        "items": "integer"
      },
      {
        "name": "brawler_trophies",
        "type": "object",
        "description": "Minimum trophies per brawler.",
        "items": "integer"
      },
      {
        "name": "brawler_trophies_max",
        "type": "object",
        "description": "Maximum trophies per brawler.",
        "items": "integer"
      },
      {
        "name": "hypercharges_min",
        "type": "integer",
        "description": "Minimum number of hypercharges."
      },
      {
        "name": "hypercharges_max",
        "type": "integer",
        "description": "Maximum number of hypercharges."
      },
      {
        "name": "brawl_highest_trophies_min",
        "type": "integer",
        "description": "Minimum highest trophies in Brawl Stars."
      },
      {
        "name": "brawl_highest_trophies_max",
        "type": "integer",
        "description": "Maximum highest trophies in Brawl Stars."
      },
      {
        "name": "royale_evolved_min",
        "type": "integer",
        "description": "Minimum number of evolved cards in Clash Royale."
      },
      {
        "name": "royale_evolved_max",
        "type": "integer",
        "description": "Maximum number of evolved cards in Clash Royale."
      },
      {
        "name": "royale_champions_min",
        "type": "integer",
        "description": "Minimum number of champion cards in Clash Royale."
      },
      {
        "name": "royale_champions_max",
        "type": "integer",
        "description": "Maximum number of champion cards in Clash Royale."
      },
      {
        "name": "royale_league_trophies_min",
        "type": "integer",
        "description": "Minimum league trophies in Clash Royale."
      },
      {
        "name": "royale_league_trophies_max",
        "type": "integer",
        "description": "Maximum league trophies in Clash Royale."
      },
      {
        "name": "royale_league_number_min",
        "type": "integer",
        "description": "Minimum league number in Clash Royale."
      },
      {
        "name": "royale_league_number_max",
        "type": "integer",
        "description": "Maximum league number in Clash Royale."
      },
      {
        "name": "supercell_game[]",
        "type": "array",
        "description": "List of Supercell games the account must have.",
        "items": "string",
        "values": [
          "brawl-stars",
          "clash-of-clans",
          "clash-royale"
        ]
      },
      {
        "name": "prime_count_min",
        "type": "integer",
        "description": "Minimum number of primes (prestiges) on the account."
      },
      {
        "name": "prime_count_max",
        "type": "integer",
        "description": "Maximum number of primes (prestiges) on the account."
      },
      {
        "name": "royale_collection_level_min",
        "type": "integer",
        "description": "Minimum Collection Level in Clash Royale."
      },
      {
        "name": "royale_collection_level_max",
        "type": "integer",
        "description": "Maximum Collection Level in Clash Royale."
      },
      {
        "name": "brawl_ranked_min",
        "type": "integer",
        "description": "Minimum current ranked tier in Brawl Stars (1 = Bronze I, 21 = Masters III)."
      },
      {
        "name": "brawl_ranked_max",
        "type": "integer",
        "description": "Maximum current ranked tier in Brawl Stars (1 = Bronze I, 21 = Masters III)."
      },
      {
        "name": "brawl_highest_ranked_min",
        "type": "integer",
        "description": "Minimum highest ranked tier in Brawl Stars (1 = Bronze I, 21 = Masters III)."
      },
      {
        "name": "brawl_highest_ranked_max",
        "type": "integer",
        "description": "Maximum highest ranked tier in Brawl Stars (1 = Bronze I, 21 = Masters III)."
      },
      {
        "name": "brawl_fame_level_min",
        "type": "integer",
        "description": "Minimum fame (glory) level in Brawl Stars (1-24)."
      },
      {
        "name": "brawl_fame_level_max",
        "type": "integer",
        "description": "Maximum fame (glory) level in Brawl Stars (1-24)."
      }
    ]
  },
  "ea": {
    "path": "/ea",
    "title": "EA (Origin)",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "game[]",
        "type": "array",
        "description": "List of games.",
        "items": "string"
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "gmin",
        "type": "integer",
        "description": "Minimum count of games."
      },
      {
        "name": "gmax",
        "type": "integer",
        "description": "Maximum count of games."
      },
      {
        "name": "al_rank_min",
        "type": "integer",
        "description": "Minimum rank points in Apex Legends.",
        "values": [
          0,
          250,
          500,
          750,
          1000,
          1500,
          2000,
          2500,
          3000,
          3600,
          4200,
          4800,
          5400,
          6100,
          6800,
          7500,
          8200,
          9000,
          9800,
          10600,
          11400,
          12300,
          13200,
          14100,
          15000
        ]
      },
      {
        "name": "al_rank_max",
        "type": "integer",
        "description": "Maximum rank points in Apex Legends.",
        "values": [
          249,
          499,
          749,
          999,
          1499,
          1999,
          2499,
          2999,
          3599,
          4199,
          4799,
          5399,
          6099,
          6799,
          7499,
          8199,
          8999,
          9799,
          10599,
          11399,
          12299,
          13199,
          14099,
          14999,
          500000
        ]
      },
      {
        "name": "al_level_min",
        "type": "integer",
        "description": "Minimum level in Apex Legends."
      },
      {
        "name": "al_level_max",
        "type": "integer",
        "description": "Maximum level in Apex Legends."
      },
      {
        "name": "has_ban",
        "type": "string",
        "description": "Has a ban in any game.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "xbox_connected",
        "type": "string",
        "description": "Xbox connected to account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "steam_connected",
        "type": "string",
        "description": "Steam connected to account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "psn_connected",
        "type": "string",
        "description": "PSN connected to account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "subscription",
        "type": "string",
        "description": "Name of subscription.",
        "values": [
          "EA Play",
          "EA Play Pro"
        ]
      },
      {
        "name": "subscription_length",
        "type": "integer",
        "description": "Length of subscription."
      },
      {
        "name": "subscription_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "hours_played",
        "type": "object",
        "description": "List of minimum hours played by game.",
        "items": "integer"
      },
      {
        "name": "hours_played_max",
        "type": "object",
        "description": "List of maximum hours played by game.",
        "items": "integer"
      },
      {
        "name": "transactions",
        "type": "string",
        "description": "Has transactions.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      }
    ]
  },
  "world-of-tanks": {
    "path": "/world-of-tanks",
    "title": "World of Tanks",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has linked mobile.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "battles_min",
        "type": "integer",
        "description": "Minimum number of battles."
      },
      {
        "name": "battles_max",
        "type": "integer",
        "description": "Maximum number of battles."
      },
      {
        "name": "gold_min",
        "type": "integer",
        "description": "Minimum number of gold."
      },
      {
        "name": "gold_max",
        "type": "integer",
        "description": "Maximum number of gold."
      },
      {
        "name": "silver_min",
        "type": "integer",
        "description": "Minimum number of silver."
      },
      {
        "name": "silver_max",
        "type": "integer",
        "description": "Maximum number of silver."
      },
      {
        "name": "top_min",
        "type": "integer",
        "description": "Minimum number of top tanks."
      },
      {
        "name": "top_max",
        "type": "integer",
        "description": "Maximum number of top tanks."
      },
      {
        "name": "prem_min",
        "type": "integer",
        "description": "Minimum number of premium tanks."
      },
      {
        "name": "prem_max",
        "type": "integer",
        "description": "Maximum number of premium tanks."
      },
      {
        "name": "top_prem_min",
        "type": "integer",
        "description": "Minimum number of top premium tanks."
      },
      {
        "name": "top_prem_max",
        "type": "integer",
        "description": "Maximum number of top premium tanks."
      },
      {
        "name": "win_pmin",
        "type": "integer",
        "description": "Minimum number of wins."
      },
      {
        "name": "win_pmax",
        "type": "integer",
        "description": "Maximum number of wins."
      },
      {
        "name": "tank[]",
        "type": "array",
        "description": "List of tanks.",
        "items": "integer"
      },
      {
        "name": "region[]",
        "type": "array",
        "description": "Region.",
        "items": "string",
        "values": [
          "asia",
          "eu",
          "na",
          "ru"
        ]
      },
      {
        "name": "not_region[]",
        "type": "array",
        "description": "Exclude region.",
        "items": "string",
        "values": [
          "asia",
          "eu",
          "na",
          "ru"
        ]
      },
      {
        "name": "premium",
        "type": "string",
        "description": "Has a premium subscription.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "premium_expiration",
        "type": "integer",
        "description": "When premium subscription will be active"
      },
      {
        "name": "premium_expiration_period",
        "type": "string",
        "description": "In what notation is time measured",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "clan",
        "type": "string",
        "description": "Has clan.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "clan_role[]",
        "type": "array",
        "description": "List of allowed clan role.",
        "items": "string",
        "values": [
          "combat_officer",
          "commander",
          "executive_officer",
          "intelligence_officer",
          "junior_officer",
          "personnel_officer",
          "private",
          "quartermaster",
          "recruit",
          "recruitment_officer",
          "reservist"
        ]
      },
      {
        "name": "not_clan_role[]",
        "type": "array",
        "description": "List of disallowed clan role.",
        "items": "string",
        "values": [
          "combat_officer",
          "commander",
          "executive_officer",
          "intelligence_officer",
          "junior_officer",
          "personnel_officer",
          "private",
          "quartermaster",
          "recruit",
          "recruitment_officer",
          "reservist"
        ]
      },
      {
        "name": "clan_gold_min",
        "type": "integer",
        "description": "Minimum number of gold in clan treasure."
      },
      {
        "name": "clan_gold_max",
        "type": "integer",
        "description": "Maximum number of gold in clan treasure."
      },
      {
        "name": "clan_crystal_min",
        "type": "integer",
        "description": "Minimum number of crystal in clan treasure."
      },
      {
        "name": "clan_crystal_max",
        "type": "integer",
        "description": "Maximum number of crystal in clan treasure."
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "clan_members_min",
        "type": "integer",
        "description": "Minimum number of members in clan."
      },
      {
        "name": "clan_members_max",
        "type": "integer",
        "description": "Maximum number of members in clan."
      },
      {
        "name": "wot_game[]",
        "type": "array",
        "description": "List of games the account must have.",
        "items": "string",
        "values": [
          "blitz",
          "wot"
        ]
      },
      {
        "name": "blitz_battles_min",
        "type": "integer",
        "description": "Minimum number of WoT Blitz battles."
      },
      {
        "name": "blitz_battles_max",
        "type": "integer",
        "description": "Maximum number of WoT Blitz battles."
      },
      {
        "name": "blitz_gold_min",
        "type": "integer",
        "description": "Minimum WoT Blitz gold balance."
      },
      {
        "name": "blitz_gold_max",
        "type": "integer",
        "description": "Maximum WoT Blitz gold balance."
      },
      {
        "name": "blitz_silver_min",
        "type": "integer",
        "description": "Minimum WoT Blitz credits balance."
      },
      {
        "name": "blitz_silver_max",
        "type": "integer",
        "description": "Maximum WoT Blitz credits balance."
      },
      {
        "name": "blitz_top_min",
        "type": "integer",
        "description": "Minimum number of WoT Blitz tier X tanks."
      },
      {
        "name": "blitz_top_max",
        "type": "integer",
        "description": "Maximum number of WoT Blitz tier X tanks."
      },
      {
        "name": "blitz_prem_min",
        "type": "integer",
        "description": "Minimum number of WoT Blitz premium tanks."
      },
      {
        "name": "blitz_prem_max",
        "type": "integer",
        "description": "Maximum number of WoT Blitz premium tanks."
      },
      {
        "name": "blitz_top_prem_min",
        "type": "integer",
        "description": "Minimum number of WoT Blitz tier X premium tanks."
      },
      {
        "name": "blitz_top_prem_max",
        "type": "integer",
        "description": "Maximum number of WoT Blitz tier X premium tanks."
      },
      {
        "name": "blitz_win_pmin",
        "type": "integer",
        "description": "Minimum WoT Blitz win rate, %."
      },
      {
        "name": "blitz_win_pmax",
        "type": "integer",
        "description": "Maximum WoT Blitz win rate, %."
      },
      {
        "name": "blitz_premium_expiration",
        "type": "integer",
        "description": "When WoT Blitz premium subscription will be active."
      },
      {
        "name": "blitz_premium_expiration_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "blitz_clan_members_min",
        "type": "integer",
        "description": "Minimum number of members in WoT Blitz clan."
      },
      {
        "name": "blitz_clan_members_max",
        "type": "integer",
        "description": "Maximum number of members in WoT Blitz clan."
      },
      {
        "name": "blitz_clan_gold_min",
        "type": "integer",
        "description": "Minimum number of gold in WoT Blitz clan treasure."
      },
      {
        "name": "blitz_clan_gold_max",
        "type": "integer",
        "description": "Maximum number of gold in WoT Blitz clan treasure."
      },
      {
        "name": "blitz_clan_crystal_min",
        "type": "integer",
        "description": "Minimum number of crystal in WoT Blitz clan treasure."
      },
      {
        "name": "blitz_clan_crystal_max",
        "type": "integer",
        "description": "Maximum number of crystal in WoT Blitz clan treasure."
      },
      {
        "name": "blitz_clan_role[]",
        "type": "array",
        "description": "List of allowed WoT Blitz clan roles.",
        "items": "string"
      },
      {
        "name": "blitz_not_clan_role[]",
        "type": "array",
        "description": "List of disallowed WoT Blitz clan roles.",
        "items": "string"
      },
      {
        "name": "blitz_premium",
        "type": "string",
        "description": "Has a WoT Blitz premium subscription.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "blitz_clan",
        "type": "string",
        "description": "Has WoT Blitz clan.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "blitzTank[]",
        "type": "array",
        "description": "List of WoT Blitz tanks.",
        "items": "string"
      }
    ]
  },
  "gifts": {
    "path": "/gifts",
    "title": "Gifts",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "subscription",
        "type": "string",
        "description": "Name of subscription.",
        "values": [
          "claude_max_20x",
          "claude_max_5x",
          "claude_pro",
          "discord_nitro",
          "discord_nitro_basic",
          "discord_nitro_trial",
          "telegram_premium"
        ]
      },
      {
        "name": "subscription_length",
        "type": "integer",
        "description": "Length of subscription."
      },
      {
        "name": "subscription_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      }
    ]
  },
  "epicgames": {
    "path": "/epicgames",
    "title": "Epic Games",
    "filters": [
      {
        "name": "epicgames_game[]",
        "type": "array",
        "description": "List of Epic Games titles the account must have.",
        "items": "string",
        "values": [
          "fortnite"
        ]
      },
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "market",
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "eg",
        "type": "integer",
        "description": "Guarantee type.",
        "values": [
          -1,
          0,
          1,
          2
        ]
      },
      {
        "name": "game[]",
        "type": "array",
        "description": "List of games.",
        "items": "string"
      },
      {
        "name": "change_email",
        "type": "string",
        "description": "Can change email.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "rl_purchases",
        "type": "boolean",
        "description": "Has Rocket League purchases."
      },
      {
        "name": "balance_min",
        "type": "number",
        "description": "Minimum epic wallet balance."
      },
      {
        "name": "balance_max",
        "type": "number",
        "description": "Maximum epic wallet balance."
      },
      {
        "name": "rewards_balance_min",
        "type": "number",
        "description": "Minimum rewards balance."
      },
      {
        "name": "rewards_balance_max",
        "type": "number",
        "description": "Maximum rewards balance."
      },
      {
        "name": "gmin",
        "type": "integer",
        "description": "Minimum number of games."
      },
      {
        "name": "gmax",
        "type": "integer",
        "description": "Maximum number of games."
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "hours_played",
        "type": "object",
        "description": "List of minimum hours played by game.",
        "items": "integer"
      },
      {
        "name": "hours_played_max",
        "type": "object",
        "description": "List of maximum hours played by game.",
        "items": "integer"
      },
      {
        "name": "no_trans",
        "type": "boolean",
        "description": "No transactions on account."
      },
      {
        "name": "last_trans_date",
        "type": "integer",
        "description": "How old is last transaction."
      },
      {
        "name": "last_trans_date_period",
        "type": "string",
        "description": "In what notation is time measured."
      },
      {
        "name": "smin",
        "type": "integer",
        "description": "Minimum number of skins."
      },
      {
        "name": "smax",
        "type": "integer",
        "description": "Maximum number of skins."
      },
      {
        "name": "pickaxe_min",
        "type": "integer",
        "description": "Minimum number of pickaxes."
      },
      {
        "name": "pickaxe_max",
        "type": "integer",
        "description": "Maximum number of pickaxes."
      },
      {
        "name": "dmin",
        "type": "integer",
        "description": "Minimum number of dances."
      },
      {
        "name": "dmax",
        "type": "integer",
        "description": "Maximum number of dances."
      },
      {
        "name": "glider_min",
        "type": "integer",
        "description": "Minimum number of gliders."
      },
      {
        "name": "glider_max",
        "type": "integer",
        "description": "Maximum number of gliders."
      },
      {
        "name": "friends_min",
        "type": "integer",
        "description": "Minimum number of friends."
      },
      {
        "name": "friends_max",
        "type": "integer",
        "description": "Maximum number of friends."
      },
      {
        "name": "vbmin",
        "type": "integer",
        "description": "Minimum number of V-Bucks."
      },
      {
        "name": "vbmax",
        "type": "integer",
        "description": "Maximum number of V-Bucks."
      },
      {
        "name": "skin[]",
        "type": "array",
        "description": "Skins.",
        "items": "string",
        "valueCount": 3147
      },
      {
        "name": "pickaxe[]",
        "type": "array",
        "description": "Pickaxes.",
        "items": "string",
        "valueCount": 2335
      },
      {
        "name": "dance[]",
        "type": "array",
        "description": "Dances.",
        "items": "string",
        "valueCount": 2229
      },
      {
        "name": "glider[]",
        "type": "array",
        "description": "Gliders.",
        "items": "string",
        "valueCount": 760
      },
      {
        "name": "platform[]",
        "type": "array",
        "description": "Platform.",
        "items": "string",
        "values": [
          "Epic",
          "EpicAndroid",
          "EpicIOS",
          "EpicPC",
          "EpicPCKorea",
          "GooglePlay",
          "IOSAppStore",
          "Live",
          "Nintendo",
          "OneStoreKorea",
          "PSN",
          "Samsung"
        ]
      },
      {
        "name": "bp",
        "type": "string",
        "description": "Has Battle Pass.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "lmin",
        "type": "integer",
        "description": "Minimum level."
      },
      {
        "name": "lmax",
        "type": "integer",
        "description": "Maximum level."
      },
      {
        "name": "bp_lmin",
        "type": "integer",
        "description": "Minimum level of Battle Pass."
      },
      {
        "name": "bp_lmax",
        "type": "integer",
        "description": "Maximum level of Battle Pass."
      },
      {
        "name": "xbox_linkable",
        "type": "string",
        "description": "Can be linked to Xbox.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "psn_linkable",
        "type": "string",
        "description": "Can be linked to PSN.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "temp_email",
        "type": "string",
        "description": "Access to market temp mail.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "skins_shop_min",
        "type": "integer",
        "description": "Minimum number of shop skins."
      },
      {
        "name": "skins_shop_max",
        "type": "integer",
        "description": "Maximum number of shop skins."
      },
      {
        "name": "pickaxes_shop_min",
        "type": "integer",
        "description": "Minimum number of shop pickaxes."
      },
      {
        "name": "pickaxes_shop_max",
        "type": "integer",
        "description": "Maximum number of shop pickaxes."
      },
      {
        "name": "dances_shop_min",
        "type": "integer",
        "description": "Minimum number of shop dances."
      },
      {
        "name": "dances_shop_max",
        "type": "integer",
        "description": "Maximum number of shop dances."
      },
      {
        "name": "gliders_shop_min",
        "type": "integer",
        "description": "Minimum number of shop gliders."
      },
      {
        "name": "gliders_shop_max",
        "type": "integer",
        "description": "Maximum number of shop gliders."
      },
      {
        "name": "skins_shop_vbmin",
        "type": "integer",
        "description": "Minimum total cost of all skins in the shop in V-Bucks."
      },
      {
        "name": "skins_shop_vbmax",
        "type": "integer",
        "description": "Maximum total cost of all skins in the shop in V-Bucks."
      },
      {
        "name": "pickaxes_shop_vbmin",
        "type": "integer",
        "description": "Minimum total cost of all pickaxes in the shop in V-Bucks."
      },
      {
        "name": "pickaxes_shop_vbmax",
        "type": "integer",
        "description": "Maximum total cost of all pickaxes in the shop in V-Bucks."
      },
      {
        "name": "dances_shop_vbmin",
        "type": "integer",
        "description": "Minimum total cost of all dances in the shop in V-Bucks."
      },
      {
        "name": "dances_shop_vbmax",
        "type": "integer",
        "description": "Maximum total cost of all dances in the shop in V-Bucks."
      },
      {
        "name": "gliders_shop_vbmin",
        "type": "integer",
        "description": "Minimum total cost of all gliders in the shop in V-Bucks."
      },
      {
        "name": "gliders_shop_vbmax",
        "type": "integer",
        "description": "Maximum total cost of all gliders in the shop in V-Bucks."
      },
      {
        "name": "refund_credits_min",
        "type": "integer",
        "description": "Minimum number of available refund credits."
      },
      {
        "name": "refund_credits_max",
        "type": "integer",
        "description": "Maximum number of available refund credits."
      },
      {
        "name": "stw[]",
        "type": "array",
        "description": "STW edition.",
        "items": "string",
        "values": [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "name": "not_stw[]",
        "type": "array",
        "description": "Excluded STW editions.",
        "items": "string",
        "values": [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }
    ]
  },
  "escape-from-tarkov": {
    "path": "/escape-from-tarkov",
    "title": "Escape from Tarkov",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "region",
        "type": "string",
        "description": "Region.",
        "values": [
          "af",
          "as",
          "cis",
          "eu",
          "me",
          "oc",
          "us"
        ]
      },
      {
        "name": "version[]",
        "type": "array",
        "description": "List of versions.",
        "items": "string",
        "values": [
          "edge_of_darkness",
          "left_behind",
          "prepare_for_escape",
          "standard",
          "unheard_edition",
          "unheard_steam_edition"
        ]
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "level_min",
        "type": "integer",
        "description": "Minimum level."
      },
      {
        "name": "level_max",
        "type": "integer",
        "description": "Maximum level."
      },
      {
        "name": "pve",
        "type": "string",
        "description": "Access to pve.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "side",
        "type": "string",
        "description": "Side in current wipe.",
        "values": [
          "Bear",
          "Savage"
        ]
      },
      {
        "name": "sc[]",
        "type": "array",
        "description": "Secured container.",
        "items": "string",
        "values": [
          "544a11ac4bdc2d470e8b456a",
          "5857a8b324597729ab0a0e7d",
          "5857a8bc2459772bad15db29",
          "59db794186f77448bc595262",
          "5c093ca986f7740a1867ab12",
          "665ee77ccf2d642e98220bca",
          "676008db84e242067d0dc4c9"
        ]
      },
      {
        "name": "alpha_armband",
        "type": "string",
        "description": "Has Alpha armband.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "hours_min",
        "type": "integer",
        "description": "Minimum hours in game."
      },
      {
        "name": "hours_max",
        "type": "integer",
        "description": "Maximum hours in game."
      },
      {
        "name": "stash_min",
        "type": "integer",
        "description": "Minimum stash value (rubles)."
      },
      {
        "name": "stash_max",
        "type": "integer",
        "description": "Maximum stash value (rubles)."
      },
      {
        "name": "prestige_min",
        "type": "integer",
        "description": "Minimum prestige level."
      },
      {
        "name": "prestige_max",
        "type": "integer",
        "description": "Maximum prestige level."
      },
      {
        "name": "kd_min",
        "type": "integer",
        "description": "Minimum K/D."
      },
      {
        "name": "kd_max",
        "type": "integer",
        "description": "Maximum K/D."
      },
      {
        "name": "last_raid",
        "type": "integer",
        "description": "Raided within the last period."
      },
      {
        "name": "last_raid_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "achievements[]",
        "type": "array",
        "description": "Owned legendary achievements (all must be present).",
        "items": "string",
        "values": [
          "6514143d59647d2cb3213c93",
          "6514321bec10ff011f17ccac",
          "6529097eccf6aa5f8737b3d0",
          "660fe21454670811e304c045",
          "6634c8886e083a141f4aa3f4",
          "6634ca69ee506a5c3e61be56",
          "6634cae870af846d2868dada",
          "664f1f8768508d74604bf556",
          "66742c003a67b164a300fcbf",
          "668bf47c781d446fdc083711",
          "66b493bc2d8cd3b5e90a3648",
          "66e2a7e5919bad697104f4b3",
          "670feb95a4e71050310cc14b",
          "670febed5ee0fc738a0965a4",
          "675998a894008342eb04e47f",
          "676091c0f457869a94017a23",
          "676094451fec2f7426093be6",
          "67a0e57117e34930e50075f3",
          "67a0e57b972c11a3f50773b2",
          "6842c25bd02bc07d70054019",
          "6842c27a38482d35ac0bd847",
          "685d3d6b81d993fda109cdb8",
          "685d6539127e4806240f3bcd",
          "68936a7a672ffe94a509446b",
          "68d3fe84757f8967ec09099b",
          "68d3ff840531ed76e808866c",
          "68dfdeb7958a19b62b0ae460",
          "68e8f02ff3a1196d1a05f2cb",
          "68e8f042b8efa2bbeb009d89",
          "68e8f04eb841bc8ac305350a",
          "68e8f0575eb7e5ce5000ba0a",
          "68f76335c3f68167b8029c18",
          "68f76344bc0e8927900279f0",
          "68f76353c152253a5b01a612",
          "68f7635e006f73031b0336fa",
          "691212088e10a4e1fb0f48c4",
          "691213563d597b2ef80a21cf",
          "691213956b60607135006811",
          "691213c8680e04c5da0571eb",
          "691213f0dbcdbbc54402fe00",
          "6912145e52ddd29bf002d343",
          "69121487d2f0e6de2f0561ef",
          "691214c93d597b2ef80a2206",
          "691214eafc9b2bc7f3042a57",
          "69121515e329984a340f00b4",
          "6912153f761a11e52408fbd2",
          "6912156f3d597b2ef80a2209",
          "6912159adf87c6a94a0b9f34",
          "691215e8680e04c5da057e57",
          "691216216cd39d8e1d09173b",
          "6912163e680e04c5da057e5b",
          "6912168c52ddd29bf002d37a",
          "693a83434cb1cf587c0a63f9",
          "6984ab58ee0ae2c0d5075f33",
          "69de1be5d378f8aef8008409",
          "69de1c2be33584b09a098e93",
          "6a0344563743e4b101070b92",
          "6a03447fb2e3003f8706a400",
          "6a04f93d7a6a2b325906bb5c"
        ]
      },
      {
        "name": "season_level_min",
        "type": "integer",
        "description": "Minimum season level."
      },
      {
        "name": "season_level_max",
        "type": "integer",
        "description": "Maximum season level."
      },
      {
        "name": "season_prestige_min",
        "type": "integer",
        "description": "Minimum season prestige level."
      },
      {
        "name": "season_prestige_max",
        "type": "integer",
        "description": "Maximum season prestige level."
      },
      {
        "name": "pve_level_min",
        "type": "integer",
        "description": "Minimum PvE level."
      },
      {
        "name": "pve_level_max",
        "type": "integer",
        "description": "Maximum PvE level."
      },
      {
        "name": "pve_prestige_min",
        "type": "integer",
        "description": "Minimum PvE prestige level."
      },
      {
        "name": "pve_prestige_max",
        "type": "integer",
        "description": "Maximum PvE prestige level."
      }
    ]
  },
  "socialclub": {
    "path": "/socialclub",
    "title": "Social Club",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "level_min",
        "type": "integer",
        "description": "Minimum number of Social Club level."
      },
      {
        "name": "level_max",
        "type": "integer",
        "description": "Maximum number of Social Club level."
      },
      {
        "name": "cash_min",
        "type": "integer",
        "description": "Minimum number of GTA V cash"
      },
      {
        "name": "cash_max",
        "type": "integer",
        "description": "Maximum number of GTA V cash"
      },
      {
        "name": "bank_cash_min",
        "type": "integer",
        "description": "Minimum number of GTA V bank cash"
      },
      {
        "name": "bank_cash_max",
        "type": "integer",
        "description": "Maximum number of GTA V bank cash"
      },
      {
        "name": "game[]",
        "type": "array",
        "description": "List of games.",
        "items": "string"
      }
    ]
  },
  "uplay": {
    "path": "/uplay",
    "title": "Uplay",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "game[]",
        "type": "array",
        "description": "List of games.",
        "items": "string"
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "gmin",
        "type": "integer",
        "description": "Minimum count of games."
      },
      {
        "name": "gmax",
        "type": "integer",
        "description": "Maximum count of games."
      },
      {
        "name": "subscription",
        "type": "string",
        "description": "Name of subscription.",
        "values": [
          "basic",
          "premium",
          "premiumAnywhere"
        ]
      },
      {
        "name": "subscription_length",
        "type": "integer",
        "description": "Length of subscription."
      },
      {
        "name": "subscription_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "r6_level_min",
        "type": "integer",
        "description": "Minimum level in Tom Clancy's Rainbow Six Siege."
      },
      {
        "name": "r6_level_max",
        "type": "integer",
        "description": "Maximum level in Tom Clancy's Rainbow Six Siege."
      },
      {
        "name": "r6_rank_min",
        "type": "integer",
        "description": "Minimum rank points in Tom Clancy's Rainbow Six Siege.",
        "values": [
          1,
          1001,
          1100,
          1200,
          1300,
          1400,
          1500,
          1600,
          1700,
          1800,
          1900,
          2000,
          2100,
          2200,
          2300,
          2400,
          2500,
          2600,
          2700,
          2800,
          2900,
          3000,
          3100,
          3200,
          3300,
          3400,
          3500,
          3600,
          3700,
          3800,
          3900,
          4000,
          4100,
          4200,
          4300,
          4400,
          4500
        ]
      },
      {
        "name": "r6_rank_max",
        "type": "integer",
        "description": "Maximum rank points in Tom Clancy's Rainbow Six Siege.",
        "values": [
          1000,
          1099,
          1199,
          1299,
          1399,
          1499,
          1599,
          1699,
          1799,
          1899,
          1999,
          2099,
          2199,
          2299,
          2399,
          2499,
          2599,
          2699,
          2799,
          2899,
          2999,
          3099,
          3199,
          3299,
          3399,
          3499,
          3599,
          3699,
          3799,
          3899,
          3999,
          4099,
          4199,
          4299,
          4399,
          4499,
          999999
        ]
      },
      {
        "name": "r6_operators_min",
        "type": "integer",
        "description": "Minimum count of operators in Tom Clancy's Rainbow Six Siege."
      },
      {
        "name": "r6_operators_max",
        "type": "integer",
        "description": "Maximum count of operators in Tom Clancy's Rainbow Six Siege."
      },
      {
        "name": "r6_ban",
        "type": "string",
        "description": "Is account banned in Tom Clancy's Rainbow Six Siege",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "r6_smin",
        "type": "integer",
        "description": "Minimum number of skins in Tom Clancy's Rainbow Six Siege."
      },
      {
        "name": "r6_smax",
        "type": "integer",
        "description": "Maximum number of skins in Tom Clancy's Rainbow Six Siege."
      },
      {
        "name": "r6_skin[]",
        "type": "array",
        "description": "List of weapon skins in Tom Clancy's Rainbow Six Siege.",
        "items": "string"
      },
      {
        "name": "r6_operator[]",
        "type": "array",
        "description": "List of operators in Tom Clancy's Rainbow Six Siege.",
        "items": "string"
      },
      {
        "name": "xbox_connected",
        "type": "string",
        "description": "Xbox connected to account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "psn_connected",
        "type": "string",
        "description": "PSN connected to account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "steam_connected",
        "type": "string",
        "description": "Steam connected to account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "balance_min",
        "type": "number",
        "description": "Minimum balance."
      },
      {
        "name": "balance_max",
        "type": "number",
        "description": "Maximum balance."
      },
      {
        "name": "transactions",
        "type": "string",
        "description": "Has transactions.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      }
    ]
  },
  "discord": {
    "path": "/discord",
    "title": "Discord",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has linked mobile.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "nitro",
        "type": "string",
        "description": "Has nitro.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "nitro_type[]",
        "type": "array",
        "description": "Nitro type.",
        "items": "string",
        "values": [
          "basic",
          "classic",
          "full",
          "none",
          "trial"
        ]
      },
      {
        "name": "nitro_length",
        "type": "integer",
        "description": "Length of nitro."
      },
      {
        "name": "nitro_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "boosts_min",
        "type": "integer",
        "description": "Minimum number of boosts."
      },
      {
        "name": "boosts_max",
        "type": "integer",
        "description": "Maximum number of boosts."
      },
      {
        "name": "billing",
        "type": "string",
        "description": "Has billing.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "gifts",
        "type": "string",
        "description": "Has gifts.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "transactions",
        "type": "string",
        "description": "Has transactions.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "badge[]",
        "type": "array",
        "description": "List of badges.",
        "items": "string",
        "values": [
          "bug_hunter",
          "bug_hunter_level_2",
          "certificated_moderator",
          "early_supporter",
          "hypesquad",
          "partner",
          "premium_tenure_12_month",
          "premium_tenure_1_month",
          "premium_tenure_24_month",
          "premium_tenure_36_month",
          "premium_tenure_3_month",
          "premium_tenure_60_month",
          "premium_tenure_6_month",
          "premium_tenure_72_month",
          "staff",
          "verified_developer"
        ]
      },
      {
        "name": "condition[]",
        "type": "array",
        "description": "List of account conditions.",
        "items": "string",
        "values": [
          "cleaned",
          "empty",
          "nospam",
          "spam"
        ]
      },
      {
        "name": "chat_min",
        "type": "integer",
        "description": "Minimum number of chats."
      },
      {
        "name": "chat_max",
        "type": "integer",
        "description": "Maximum number of chats."
      },
      {
        "name": "min_admin_members",
        "type": "integer",
        "description": "Minimum number of subscribers in server, where account is administrator/owner."
      },
      {
        "name": "max_admin_members",
        "type": "integer",
        "description": "Maximum number of subscribers in server, where account is administrator/owner."
      },
      {
        "name": "min_admin",
        "type": "integer",
        "description": "Minimum number of servers, where account is administrator/owner."
      },
      {
        "name": "max_admin",
        "type": "integer",
        "description": "Maximum number of servers, where account is administrator/owner."
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "language[]",
        "type": "array",
        "description": "List of languages.",
        "items": "string",
        "values": [
          "ar",
          "bg",
          "cs",
          "da",
          "de",
          "el",
          "en-gb",
          "en-us",
          "es-419",
          "es-es",
          "fi",
          "fr",
          "he",
          "hi",
          "hr",
          "hu",
          "id",
          "it",
          "ja",
          "ko",
          "lt",
          "nl",
          "no",
          "pl",
          "pt-br",
          "ro",
          "ru",
          "sv-se",
          "th",
          "tr",
          "uk",
          "vi",
          "zh-cn",
          "zh-tw"
        ]
      },
      {
        "name": "not_language[]",
        "type": "array",
        "description": "List of languages that won't be included.",
        "items": "string",
        "values": [
          "ar",
          "bg",
          "cs",
          "da",
          "de",
          "el",
          "en-gb",
          "en-us",
          "es-419",
          "es-es",
          "fi",
          "fr",
          "he",
          "hi",
          "hr",
          "hu",
          "id",
          "it",
          "ja",
          "ko",
          "lt",
          "nl",
          "no",
          "pl",
          "pt-br",
          "ro",
          "ru",
          "sv-se",
          "th",
          "tr",
          "uk",
          "vi",
          "zh-cn",
          "zh-tw"
        ]
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 154
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 154
      },
      {
        "name": "min_servers",
        "type": "integer",
        "description": "Minimum count of servers."
      },
      {
        "name": "max_servers",
        "type": "integer",
        "description": "Maximum count of servers."
      },
      {
        "name": "2fa",
        "type": "string",
        "description": "Has two-factor authentication.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "min_full_credits",
        "type": "integer",
        "description": "Minimum number of Nitro full credits."
      },
      {
        "name": "max_full_credits",
        "type": "integer",
        "description": "Maximum number of Nitro full credits."
      },
      {
        "name": "min_basic_credits",
        "type": "integer",
        "description": "Minimum number of Nitro basic credits."
      },
      {
        "name": "max_basic_credits",
        "type": "integer",
        "description": "Maximum number of Nitro basic credits."
      },
      {
        "name": "min_orbs",
        "type": "integer",
        "description": "Minimum number of Discord Orbs."
      },
      {
        "name": "max_orbs",
        "type": "integer",
        "description": "Maximum number of Discord Orbs."
      },
      {
        "name": "has_badge",
        "type": "string",
        "description": "Has badges.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "min_owner_members",
        "type": "integer",
        "description": "Minimum number of subscribers in server, where account is owner."
      },
      {
        "name": "max_owner_members",
        "type": "integer",
        "description": "Maximum number of subscribers in server, where account is owner."
      },
      {
        "name": "min_owner",
        "type": "integer",
        "description": "Minimum number of servers, where account is owner."
      },
      {
        "name": "max_owner",
        "type": "integer",
        "description": "Maximum number of servers, where account is owner."
      },
      {
        "name": "username_min",
        "type": "integer",
        "description": "Minimum username length."
      },
      {
        "name": "username_max",
        "type": "integer",
        "description": "Maximum username length."
      },
      {
        "name": "nitro_length_max",
        "type": "integer",
        "description": "Maximum remaining length of nitro."
      },
      {
        "name": "nitro_period_max",
        "type": "string",
        "description": "In what notation is time measured for nitro_length_max.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "age_verification[]",
        "type": "array",
        "description": "List of age verification statuses.",
        "items": "string",
        "values": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "name": "account_standing[]",
        "type": "array",
        "description": "List of account standing states.",
        "items": "string",
        "values": [
          100,
          200,
          300,
          400
        ]
      },
      {
        "name": "collectibles_price_min",
        "type": "integer",
        "description": "Minimum total shop value of collectibles, in user currency."
      },
      {
        "name": "collectibles_price_max",
        "type": "integer",
        "description": "Maximum total shop value of collectibles, in user currency."
      },
      {
        "name": "wallet_balance_min",
        "type": "integer",
        "description": "Minimum gift card balance, in user currency."
      },
      {
        "name": "wallet_balance_max",
        "type": "integer",
        "description": "Maximum gift card balance, in user currency."
      },
      {
        "name": "collectibles_min",
        "type": "integer",
        "description": "Minimum number of collectibles."
      },
      {
        "name": "collectibles_max",
        "type": "integer",
        "description": "Maximum number of collectibles."
      },
      {
        "name": "decorations_min",
        "type": "integer",
        "description": "Minimum number of avatar decorations."
      },
      {
        "name": "decorations_max",
        "type": "integer",
        "description": "Maximum number of avatar decorations."
      },
      {
        "name": "effects_min",
        "type": "integer",
        "description": "Minimum number of profile effects."
      },
      {
        "name": "effects_max",
        "type": "integer",
        "description": "Maximum number of profile effects."
      },
      {
        "name": "nameplates_min",
        "type": "integer",
        "description": "Minimum number of nameplates."
      },
      {
        "name": "nameplates_max",
        "type": "integer",
        "description": "Maximum number of nameplates."
      },
      {
        "name": "frames_min",
        "type": "integer",
        "description": "Minimum number of profile frames."
      },
      {
        "name": "frames_max",
        "type": "integer",
        "description": "Maximum number of profile frames."
      },
      {
        "name": "limited_collectibles_min",
        "type": "integer",
        "description": "Minimum number of collectibles that are no longer sold."
      },
      {
        "name": "limited_collectibles_max",
        "type": "integer",
        "description": "Maximum number of collectibles that are no longer sold."
      },
      {
        "name": "collectible[]",
        "type": "array",
        "description": "List of collectible SKU IDs, all of them must be present.",
        "items": "string"
      }
    ]
  },
  "tiktok": {
    "path": "/tiktok",
    "title": "TikTok",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has linked mobile.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "followers_min",
        "type": "integer",
        "description": "Minimum number of followers."
      },
      {
        "name": "followers_max",
        "type": "integer",
        "description": "Maximum number of followers."
      },
      {
        "name": "post_min",
        "type": "integer",
        "description": "Minimum number of posts."
      },
      {
        "name": "post_max",
        "type": "integer",
        "description": "Maximum number of posts."
      },
      {
        "name": "like_min",
        "type": "integer",
        "description": "Minimum number of likes."
      },
      {
        "name": "like_max",
        "type": "integer",
        "description": "Maximum number of likes."
      },
      {
        "name": "coins_min",
        "type": "integer",
        "description": "Minimum number of coins."
      },
      {
        "name": "coins_max",
        "type": "integer",
        "description": "Maximum number of coins."
      },
      {
        "name": "cookie_login",
        "type": "string",
        "description": "Login by cookies.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "verified",
        "type": "string",
        "description": "Has verified.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "email",
        "type": "string",
        "description": "Has linked email.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "can_stream",
        "type": "string",
        "description": "Can stream.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "can_stream_studio",
        "type": "string",
        "description": "Can stream via Live Studio.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      }
    ]
  },
  "instagram": {
    "path": "/instagram",
    "title": "Instagram",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "autoreg",
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has linked mobile.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "cookies",
        "type": "string",
        "description": "Login by cookies.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "login_without_cookies",
        "type": "string",
        "description": "Login without cookies.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "followers_min",
        "type": "integer",
        "description": "Minimum number of followers."
      },
      {
        "name": "followers_max",
        "type": "integer",
        "description": "Maximum number of followers."
      },
      {
        "name": "post_min",
        "type": "integer",
        "description": "Minimum number of posts."
      },
      {
        "name": "post_max",
        "type": "integer",
        "description": "Maximum number of posts."
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      }
    ]
  },
  "battlenet": {
    "path": "/battlenet",
    "title": "BattleNet",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "eg",
        "type": "integer",
        "description": "Guarantee type.",
        "values": [
          0,
          1
        ]
      },
      {
        "name": "game[]",
        "type": "array",
        "description": "List of games.",
        "items": "integer"
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 155
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has linked mobile.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "edit_btag",
        "type": "string",
        "description": "Can edit BattleTag.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "changeable_fn",
        "type": "string",
        "description": "Can edit full name.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "real_id",
        "type": "string",
        "description": "Real id.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "parent_control",
        "type": "string",
        "description": "Has disabled parent control.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "no_bans",
        "type": "string",
        "description": "Has no bans.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "balance_min",
        "type": "integer",
        "description": "Minimum balance."
      },
      {
        "name": "balance_max",
        "type": "integer",
        "description": "Maximum balance."
      }
    ]
  },
  "llm": {
    "path": "/llm",
    "title": "LLM",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email_type[]",
        "type": "array",
        "description": "Email type.",
        "items": "string",
        "values": [
          "native",
          "no"
        ]
      },
      {
        "name": "item_domain",
        "type": "string",
        "description": "Domain of native/autoreg email."
      },
      {
        "name": "subscription[]",
        "type": "array",
        "description": "List of allowed subscriptions.",
        "items": "string",
        "values": [
          "chatgpteduplan",
          "chatgptenterpriseplan",
          "chatgptgoplan",
          "chatgptplusplan",
          "chatgptpro",
          "chatgptprolite",
          "chatgptpromax",
          "chatgptquorumplan",
          "chatgptteamplan",
          "claude_max_20x",
          "claude_max_5x",
          "claude_pro",
          "claude_raven",
          "cursor_enterprise",
          "cursor_pro",
          "cursor_pro_plus",
          "cursor_ultra",
          "glm_coding_lite",
          "glm_coding_max",
          "glm_coding_pro",
          "glm_team_max",
          "glm_team_pro",
          "grok_enterprise",
          "grok_pro",
          "grok_super_lite",
          "grok_super_plus",
          "grok_super_pro",
          "kimi_allegretto",
          "kimi_allegro",
          "kimi_moderato",
          "kimi_vivace",
          "perplexity_enterprise_max",
          "perplexity_enterprise_pro",
          "perplexity_max",
          "perplexity_pro",
          "windsurf_enterprise",
          "windsurf_max",
          "windsurf_pro",
          "windsurf_teams"
        ]
      },
      {
        "name": "subscription_length",
        "type": "integer",
        "description": "Length of subscription."
      },
      {
        "name": "subscription_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "autorenewal",
        "type": "string",
        "description": "Is auto renewal enabled.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "transactions",
        "type": "string",
        "description": "Has transactions.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "service[]",
        "type": "array",
        "description": "List of allowed LLM services.",
        "items": "string",
        "values": [
          "chatgpt",
          "claude",
          "cursor",
          "glm",
          "grok",
          "kimi",
          "openrouter",
          "perplexity",
          "windsurf"
        ]
      },
      {
        "name": "not_service[]",
        "type": "array",
        "description": "List of excluded LLM services.",
        "items": "string",
        "values": [
          "chatgpt",
          "claude",
          "cursor",
          "glm",
          "grok",
          "kimi",
          "openrouter",
          "perplexity",
          "windsurf"
        ]
      },
      {
        "name": "kyc_verified",
        "type": "string",
        "description": "KYC verified.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has phone number.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "cookies",
        "type": "string",
        "description": "Login by cookies.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "usage_percent_min",
        "type": "integer",
        "description": "Min API usage percent."
      },
      {
        "name": "usage_percent_max",
        "type": "integer",
        "description": "Max API usage percent."
      },
      {
        "name": "balance_min",
        "type": "integer",
        "description": "Minimum prepaid balance."
      },
      {
        "name": "balance_max",
        "type": "integer",
        "description": "Maximum prepaid balance."
      },
      {
        "name": "has_payment_method",
        "type": "string",
        "description": "Has payment method.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "rate_limit_resets_min",
        "type": "integer",
        "description": "Min number of usage limit resets."
      },
      {
        "name": "rate_limit_resets_max",
        "type": "integer",
        "description": "Max number of usage limit resets."
      }
    ]
  },
  "vpn": {
    "path": "/vpn",
    "title": "VPN",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "service[]",
        "type": "array",
        "description": "List of allowed VPN services.",
        "items": "string",
        "values": [
          "AdguardVPN",
          "PIAVPN",
          "cyberghostVPN",
          "hotspotShieldVPN",
          "mullvadVPN",
          "planetVPN",
          "pureVPN",
          "tunnelbearVPN",
          "ultraVPN",
          "vanishVPN",
          "vyprVPN",
          "windscribeVPN"
        ]
      },
      {
        "name": "subscription_length",
        "type": "integer",
        "description": "Length of subscription."
      },
      {
        "name": "subscription_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "autorenewal",
        "type": "string",
        "description": "Is auto renewal enabled.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      }
    ]
  },
  "roblox": {
    "path": "/roblox",
    "title": "Roblox",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "email",
        "type": "string",
        "description": "Has verified email.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "robux_min",
        "type": "integer",
        "description": "Minimum robux."
      },
      {
        "name": "robux_max",
        "type": "integer",
        "description": "Maximum robux."
      },
      {
        "name": "friends_min",
        "type": "integer",
        "description": "Minimum friends."
      },
      {
        "name": "friends_max",
        "type": "integer",
        "description": "Maximum friends."
      },
      {
        "name": "followers_min",
        "type": "integer",
        "description": "Minimum number of followers."
      },
      {
        "name": "followers_max",
        "type": "integer",
        "description": "Maximum number of followers."
      },
      {
        "name": "country",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 146
      },
      {
        "name": "not_country",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 146
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "subscription",
        "type": "string",
        "description": "Name of subscription.",
        "values": [
          "Blackbird",
          "RobloxPlus1000",
          "RobloxPlus2000",
          "RobloxPlus500",
          "RobloxPremium1000",
          "RobloxPremium100012Months",
          "RobloxPremium1000OneMonth",
          "RobloxPremium2200",
          "RobloxPremium2200OneMonth",
          "RobloxPremium450",
          "RobloxPremium450OneMonth"
        ]
      },
      {
        "name": "subscription_length",
        "type": "integer",
        "description": "Length of subscription."
      },
      {
        "name": "subscription_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "autorenewal",
        "type": "string",
        "description": "Is auto renewal enabled.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "xbox_connected",
        "type": "string",
        "description": "Xbox connected to account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "psn_connected",
        "type": "string",
        "description": "PSN connected to account.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "verified",
        "type": "string",
        "description": "Has verified.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "age_verified",
        "type": "string",
        "description": "Account is age verified via documents.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "incoming_robux_total_min",
        "type": "integer",
        "description": "Minimum amount of incoming robux."
      },
      {
        "name": "incoming_robux_total_max",
        "type": "integer",
        "description": "Maximum amount of incoming robux."
      },
      {
        "name": "limited_price_min",
        "type": "integer",
        "description": "Minimum limited items value."
      },
      {
        "name": "limited_price_max",
        "type": "integer",
        "description": "Maximum limited items value."
      },
      {
        "name": "gamepass_min",
        "type": "integer",
        "description": "Minimum total Robux cost of all game passes in popular Roblox games.."
      },
      {
        "name": "gamepass_max",
        "type": "integer",
        "description": "Maximum total Robux cost of all game passes in popular Roblox games.."
      },
      {
        "name": "game_donations",
        "type": "string",
        "description": "Has game donations.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "inv_min",
        "type": "integer",
        "description": "Minimum inventory value."
      },
      {
        "name": "inv_max",
        "type": "integer",
        "description": "Maximum inventory value."
      },
      {
        "name": "ugc_limited_price_min",
        "type": "integer",
        "description": "Minimum UGC limited items value."
      },
      {
        "name": "ugc_limited_price_max",
        "type": "integer",
        "description": "Maximum UGC limited items value."
      },
      {
        "name": "credit_balance_min",
        "type": "integer",
        "description": "Minimum credit balance."
      },
      {
        "name": "credit_balance_max",
        "type": "integer",
        "description": "Maximum credit balance."
      },
      {
        "name": "offsale_min",
        "type": "integer",
        "description": "Minimum offsale items count."
      },
      {
        "name": "offsale_max",
        "type": "integer",
        "description": "Maximum offsale items count."
      },
      {
        "name": "voice",
        "type": "string",
        "description": "Voice chat is available.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "age_group[]",
        "type": "array",
        "description": "List of allowed age groups.",
        "items": "string",
        "values": [
          "13+",
          "13-15",
          "16-17",
          "18+",
          "18-20",
          "21+",
          "5-8",
          "9-12",
          "<13"
        ]
      },
      {
        "name": "not_age_group[]",
        "type": "array",
        "description": "List of disallowed age groups.",
        "items": "string",
        "values": [
          "13+",
          "13-15",
          "16-17",
          "18+",
          "18-20",
          "21+",
          "5-8",
          "9-12",
          "<13"
        ]
      },
      {
        "name": "game_donation[]",
        "type": "array",
        "description": "Has donations in specific game(s) by place_id.",
        "items": "string",
        "values": [
          142823291,
          301549746,
          606849621,
          920587237,
          1537690962,
          1730877806,
          2753915549,
          2809202155,
          3260590327,
          4111023553,
          4520749081,
          4639625707,
          5233782396,
          8737899170,
          9391468976,
          10449761463,
          12886143095,
          13379208636,
          13621938427,
          13772394625,
          15002061926,
          15532962292,
          16146832113,
          16732694052,
          17625359962,
          17687504411,
          18668065416,
          18687417158,
          73956553001240,
          74260430392611,
          79546208627805,
          85896571713843,
          87039211657390,
          97598239454123,
          99567941238278,
          107573139811370,
          108533757090220,
          109983668079237,
          115461597548550,
          116495829188952,
          123662243100680,
          126884695634066,
          127742093697776,
          130739873848552
        ]
      },
      {
        "name": "donation_total",
        "type": "object",
        "description": "Minimum R$ donated per game (keyed by place_id).",
        "items": "integer"
      },
      {
        "name": "donation_total_max",
        "type": "object",
        "description": "Maximum R$ donated per game (keyed by place_id).",
        "items": "integer"
      },
      {
        "name": "pending_robux_min",
        "type": "integer",
        "description": "Minimum pending robux."
      },
      {
        "name": "pending_robux_max",
        "type": "integer",
        "description": "Maximum pending robux."
      },
      {
        "name": "group_pending_robux_min",
        "type": "integer",
        "description": "Minimum pending robux across owned groups."
      },
      {
        "name": "group_pending_robux_max",
        "type": "integer",
        "description": "Maximum pending robux across owned groups."
      },
      {
        "name": "recently_hours_min",
        "type": "integer",
        "description": "Minimum number of hours played in the last week."
      },
      {
        "name": "recently_hours_max",
        "type": "integer",
        "description": "Maximum number of hours played in the last week."
      }
    ]
  },
  "warface": {
    "path": "/warface",
    "title": "Warface",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "rank_min",
        "type": "integer",
        "description": "Minimum rank."
      },
      {
        "name": "rank_max",
        "type": "integer",
        "description": "Maximum rank."
      },
      {
        "name": "bonus_rank_min",
        "type": "integer",
        "description": "Minimum bonus rank."
      },
      {
        "name": "bonus_rank_max",
        "type": "integer",
        "description": "Maximum bonus rank."
      },
      {
        "name": "tel",
        "type": "string",
        "description": "Has linked mobile.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "daybreak",
        "type": "integer",
        "description": "Number of days the account has been offline."
      },
      {
        "name": "kredits_min",
        "type": "integer",
        "description": "Minimum amount of Kredits."
      },
      {
        "name": "kredits_max",
        "type": "integer",
        "description": "Maximum amount of Kredits."
      },
      {
        "name": "total_kredits_min",
        "type": "integer",
        "description": "Minimum total donated Kredits."
      },
      {
        "name": "total_kredits_max",
        "type": "integer",
        "description": "Maximum total donated Kredits."
      }
    ]
  },
  "minecraft": {
    "path": "/minecraft",
    "title": "Minecraft",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "subscription",
        "type": "string",
        "description": "Name of subscription.",
        "values": [
          "PC Game Pass",
          "Xbox Game Pass Ultimate"
        ]
      },
      {
        "name": "subscription_length",
        "type": "integer",
        "description": "Length of subscription."
      },
      {
        "name": "subscription_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "autorenewal",
        "type": "string",
        "description": "Is auto renewal enabled.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "java",
        "type": "string",
        "description": "Has java edition.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "bedrock",
        "type": "string",
        "description": "Has bedrock edition.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "dungeons",
        "type": "string",
        "description": "Has Minecraft Dungeons.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "legends",
        "type": "string",
        "description": "Has Minecraft Legends.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "change_nickname",
        "type": "string",
        "description": "Can change nickname.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "capes[]",
        "type": "array",
        "description": "List of capes.",
        "items": "string"
      },
      {
        "name": "capes_min",
        "type": "integer",
        "description": "Minimum number of capes."
      },
      {
        "name": "capes_max",
        "type": "integer",
        "description": "Maximum number of capes."
      },
      {
        "name": "country[]",
        "type": "array",
        "description": "List of allowed countries.",
        "items": "string",
        "valueCount": 185
      },
      {
        "name": "not_country[]",
        "type": "array",
        "description": "List of disallowed countries.",
        "items": "string",
        "valueCount": 185
      },
      {
        "name": "hypixel_ban",
        "type": "string",
        "description": "Has active Hypixel ban.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "hypixel_skyblock_api_enabled",
        "type": "string",
        "description": "Is API enabled in Hypixel Skyblock.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "rank_hypixel[]",
        "type": "array",
        "description": "Rank on hypixel.",
        "items": "string",
        "values": [
          "MVP",
          "MVP+",
          "MVP++",
          "VIP",
          "VIP+",
          "YOUTUBE"
        ]
      },
      {
        "name": "level_hypixel_min",
        "type": "integer",
        "description": "Minimum number of level hypixel."
      },
      {
        "name": "level_hypixel_max",
        "type": "integer",
        "description": "Maximum number of level hypixel."
      },
      {
        "name": "achievement_hypixel_min",
        "type": "integer",
        "description": "Minimum number of achievement hypixel."
      },
      {
        "name": "achievement_hypixel_max",
        "type": "integer",
        "description": "Maximum number of achievement hypixel."
      },
      {
        "name": "level_hypixel_skyblock_min",
        "type": "integer",
        "description": "Minimum level on Hypixel SkyBlock."
      },
      {
        "name": "level_hypixel_skyblock_max",
        "type": "integer",
        "description": "Maximum level on Hypixel SkyBlock."
      },
      {
        "name": "net_worth_hypixel_skyblock_min",
        "type": "integer",
        "description": "Minimum net worth on Hypixel SkyBlock."
      },
      {
        "name": "net_worth_hypixel_skyblock_max",
        "type": "integer",
        "description": "Maximum net worth on Hypixel SkyBlock."
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "last_login_hypixel",
        "type": "integer",
        "description": "How old is the last login account."
      },
      {
        "name": "last_login_hypixel_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      },
      {
        "name": "can_change_details",
        "type": "string",
        "description": "Can change details.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "nickname_length_min",
        "type": "integer",
        "description": "Minimum number of characters in nickname."
      },
      {
        "name": "nickname_length_max",
        "type": "integer",
        "description": "Maximum number of characters in nickname."
      },
      {
        "name": "hypixel_ban_parsed",
        "type": "string",
        "description": "Was Hypixel ban parsed by Market.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "minecoins_min",
        "type": "integer",
        "description": "Minimum number of Minecoins."
      },
      {
        "name": "minecoins_max",
        "type": "integer",
        "description": "Maximum number of Minecoins."
      }
    ]
  },
  "hytale": {
    "path": "/hytale",
    "title": "Hytale",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "edition[]",
        "type": "array",
        "description": "List of allowed editions.",
        "items": "string",
        "values": [
          "base",
          "deluxe",
          "founder"
        ]
      },
      {
        "name": "profiles_min",
        "type": "integer",
        "description": "Minimum number of profiles with game."
      },
      {
        "name": "profiles_max",
        "type": "integer",
        "description": "Maximum number of profiles with game."
      }
    ]
  },
  "onlyfans": {
    "path": "/onlyfans",
    "title": "OnlyFans",
    "filters": [
      {
        "name": "after",
        "type": "string",
        "description": "Next page cursor."
      },
      {
        "name": "pmin",
        "type": "number",
        "description": "Minimal price of account (Inclusive)."
      },
      {
        "name": "pmax",
        "type": "number",
        "description": "Maximum price of account (Inclusive)."
      },
      {
        "name": "title",
        "type": "string",
        "description": "The word or words contained in the account title."
      },
      {
        "name": "order_by",
        "type": "string",
        "description": "Order by.",
        "values": [
          "price_to_up",
          "price_to_down",
          "pdate_to_down",
          "pdate_to_up",
          "pdate_to_down_upload",
          "pdate_to_up_upload",
          "edate_to_up",
          "edate_to_down",
          "ddate_to_up",
          "ddate_to_down",
          "auto_buy_diff_to_up",
          "auto_buy_diff_to_down"
        ]
      },
      {
        "name": "tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "public_tag_id[]",
        "type": "array",
        "description": "List of tag ids (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "not_public_tag_id[]",
        "type": "array",
        "description": "List of tag ids that won't be included (Tag list is available via **GET /me**).",
        "items": "integer"
      },
      {
        "name": "origin[]",
        "type": "array",
        "description": "List of account origins.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "not_origin[]",
        "type": "array",
        "description": "List of account origins that won't be included.",
        "items": "string",
        "values": [
          "brute",
          "phishing",
          "stealer",
          "autoreg",
          "personal",
          "resale",
          "dummy",
          "self_registration",
          "retrieve_via_support"
        ]
      },
      {
        "name": "user_id",
        "type": "integer",
        "description": "Search accounts of user."
      },
      {
        "name": "nsb",
        "type": "boolean",
        "description": "Not sold before."
      },
      {
        "name": "sb",
        "type": "boolean",
        "description": "Sold before."
      },
      {
        "name": "nsb_by_me",
        "type": "boolean",
        "description": "Not sold by me before."
      },
      {
        "name": "sb_by_me",
        "type": "boolean",
        "description": "Sold by me before."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency in which the cost of the account will be searched.",
        "values": [
          "rub",
          "uah",
          "kzt",
          "byn",
          "usd",
          "eur",
          "gbp",
          "cny",
          "try",
          "jpy",
          "brl"
        ]
      },
      {
        "name": "email_login_data",
        "type": "boolean",
        "description": "Has email login data."
      },
      {
        "name": "email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "not_email_provider[]",
        "type": "array",
        "description": "Email provider.",
        "items": "string",
        "values": [
          "other",
          "rambler",
          "outlook",
          "firstmail",
          "notletters",
          "mail_ru"
        ]
      },
      {
        "name": "parse_same_item_ids",
        "type": "boolean",
        "description": "Parse same item ids."
      },
      {
        "name": "creator[]",
        "type": "array",
        "description": "List of subscribed creator ids.",
        "items": "string"
      },
      {
        "name": "subs_min",
        "type": "integer",
        "description": "Minimum count of active paid subscriptions."
      },
      {
        "name": "subs_max",
        "type": "integer",
        "description": "Maximum count of active paid subscriptions."
      },
      {
        "name": "subscribers_min",
        "type": "integer",
        "description": "Minimum count of own subscribers."
      },
      {
        "name": "subscribers_max",
        "type": "integer",
        "description": "Maximum count of own subscribers."
      },
      {
        "name": "posts_min",
        "type": "integer",
        "description": "Minimum count of own posts."
      },
      {
        "name": "posts_max",
        "type": "integer",
        "description": "Maximum count of own posts."
      },
      {
        "name": "balance_min",
        "type": "integer",
        "description": "Minimum credit balance."
      },
      {
        "name": "balance_max",
        "type": "integer",
        "description": "Maximum credit balance."
      },
      {
        "name": "kyc_verified",
        "type": "string",
        "description": "Identity verification passed.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "payout_approved",
        "type": "string",
        "description": "Payout legal approve passed.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "age_verified",
        "type": "string",
        "description": "Age verification passed.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "card_verified",
        "type": "string",
        "description": "Payment card verified.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "has_card",
        "type": "string",
        "description": "Has payment card attached.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "transactions",
        "type": "string",
        "description": "Has transactions.",
        "values": [
          "yes",
          "no",
          "nomatter"
        ]
      },
      {
        "name": "reg",
        "type": "integer",
        "description": "How old is the account."
      },
      {
        "name": "reg_period",
        "type": "string",
        "description": "In what notation is time measured.",
        "values": [
          "day",
          "month",
          "year"
        ]
      }
    ]
  }
};
