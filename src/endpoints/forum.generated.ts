import type { EndpointCatalog } from "./types.ts";

export const forumCatalog: EndpointCatalog = {
  "version": "1.1.46a",
  "endpoints": {
    "Assets.Css": {
      "method": "GET",
      "path": "/css",
      "summary": "Get CSS",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "css",
          "in": "query",
          "type": "array",
          "description": "The names or identifiers of the CSS selectors to retrieve.",
          "items": "string",
          "csv": true
        }
      ],
      "description": "Gets css rulesets for requested selectors."
    },
    "Categories.List": {
      "method": "GET",
      "path": "/categories",
      "summary": "Get Categories",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "parent_category_id",
          "in": "query",
          "type": "integer",
          "description": "Id of parent category. If exists, filter categories that are direct children of that category."
        },
        {
          "name": "parent_forum_id",
          "in": "query",
          "type": "integer",
          "description": "Id of parent forum. If exists, filter categories that are direct children of that forum."
        },
        {
          "name": "order",
          "in": "query",
          "type": "string",
          "description": "Ordering of categories.",
          "values": [
            "natural",
            "list"
          ]
        }
      ],
      "description": "List of all categories in the system."
    },
    "Categories.Get": {
      "method": "GET",
      "path": "/categories/{category_id}",
      "summary": "Get Category",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "category_id",
          "in": "path",
          "type": "integer",
          "description": "Id of category.",
          "required": true
        }
      ],
      "description": "Detail information of a category."
    },
    "Forums.List": {
      "method": "GET",
      "path": "/forums",
      "summary": "Get Forums",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "parent_category_id",
          "in": "query",
          "type": "integer",
          "description": "Id of parent category. If exists, filter forums that are direct children of that category."
        },
        {
          "name": "parent_forum_id",
          "in": "query",
          "type": "integer",
          "description": "Id of parent forum. If exists, filter forums that are direct children of that forum."
        },
        {
          "name": "order",
          "in": "query",
          "type": "string",
          "description": "Ordering of forums.",
          "values": [
            "natural",
            "list"
          ]
        }
      ],
      "description": "List of all forums in the system."
    },
    "Forums.Grouped": {
      "method": "GET",
      "path": "/forums/grouped",
      "summary": "Get Forums Tree",
      "scopes": [
        "read"
      ],
      "params": [],
      "description": "Returns grouped forums."
    },
    "Forums.Get": {
      "method": "GET",
      "path": "/forums/{forum_id}",
      "summary": "Get Forum",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "forum_id",
          "in": "path",
          "type": "integer",
          "description": "Id of forum.",
          "required": true
        }
      ],
      "description": "Detail information of a forum."
    },
    "Forums.Followers": {
      "method": "GET",
      "path": "/forums/{forum_id}/followers",
      "summary": "Get Followers",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "forum_id",
          "in": "path",
          "type": "integer",
          "description": "Id of forum.",
          "required": true
        }
      ],
      "description": "List of a forum's followers. For privacy reason, only the current user will be included in the list (if the user follows the specified forum)."
    },
    "Forums.Followed": {
      "method": "GET",
      "path": "/forums/followed",
      "summary": "Get Followed Forums",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "total",
          "in": "query",
          "type": "boolean",
          "description": "If included in the request, only the forum count is returned as forums_total."
        }
      ],
      "description": "List of followed forums by current user."
    },
    "Forums.GetFeedOptions": {
      "method": "GET",
      "path": "/forums/feed/options",
      "summary": "Get Feed Options",
      "scopes": [
        "read"
      ],
      "params": [],
      "description": "Returns available options for the forums feed."
    },
    "Links.List": {
      "method": "GET",
      "path": "/link-forums",
      "summary": "Get Links Forum",
      "scopes": [
        "read"
      ],
      "params": [],
      "description": "List of all link forums."
    },
    "Links.Get": {
      "method": "GET",
      "path": "/link-forums/{link_id}",
      "summary": "Get Link Forum",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "link_id",
          "in": "path",
          "type": "integer",
          "description": "Id of link forum.",
          "required": true
        }
      ],
      "description": "Detail information of a link forum."
    },
    "Pages.List": {
      "method": "GET",
      "path": "/pages",
      "summary": "Get Pages",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "parent_page_id",
          "in": "query",
          "type": "integer",
          "description": "Id of parent page. If exists, filter pages that are direct children of that page."
        },
        {
          "name": "order",
          "in": "query",
          "type": "string",
          "description": "Ordering of pages.",
          "values": [
            "natural",
            "list"
          ]
        }
      ],
      "description": "List of all pages in the system."
    },
    "Pages.Get": {
      "method": "GET",
      "path": "/pages/{page_id}",
      "summary": "Get Page",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "page_id",
          "in": "path",
          "type": "integer",
          "description": "Id of page.",
          "required": true
        }
      ],
      "description": "Detail information of a page."
    },
    "Threads.List": {
      "method": "GET",
      "path": "/threads",
      "summary": "Get Threads",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "forum_id",
          "in": "query",
          "type": "integer",
          "description": "Id of the containing forum."
        },
        {
          "name": "tab",
          "in": "query",
          "type": "string",
          "description": "Tab to get threads from."
        },
        {
          "name": "state",
          "in": "query",
          "type": "string",
          "description": "Thread state. Works only if forum_id is set.",
          "values": [
            "active",
            "closed"
          ]
        },
        {
          "name": "period",
          "in": "query",
          "type": "string",
          "description": "Filter to get only threads created within the selected period. Works only if forum_id is set.",
          "values": [
            "day",
            "week",
            "month",
            "year"
          ]
        },
        {
          "name": "title",
          "in": "query",
          "type": "string",
          "description": "Thread title."
        },
        {
          "name": "title_only",
          "in": "query",
          "type": "boolean",
          "description": "Search only in titles."
        },
        {
          "name": "creator_user_id",
          "in": "query",
          "type": "integer",
          "description": "Filter to get only threads created by the specified user."
        },
        {
          "name": "sticky",
          "in": "query",
          "type": "boolean",
          "description": "Filter to get only sticky or non-sticky threads. By default, all threads will be included and sticky ones will be at the top of the result on the first page. In mixed mode, sticky threads are not counted towards threads_total and does not…"
        },
        {
          "name": "prefix_ids[]",
          "in": "query",
          "type": "array",
          "description": "Filter to get only threads with the specified prefix.",
          "items": "integer"
        },
        {
          "name": "prefix_ids_not[]",
          "in": "query",
          "type": "array",
          "description": "Filter to get only threads without the specified prefix.",
          "items": "integer"
        },
        {
          "name": "thread_tag_id",
          "in": "query",
          "type": "integer",
          "description": "Filter to get only threads with the specified tag."
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of threads."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of threads in a page."
        },
        {
          "name": "order",
          "in": "query",
          "type": "string",
          "description": "Ordering of threads.",
          "values": [
            "post_date",
            "last_post_date",
            "reply_count",
            "reply_count_asc",
            "first_post_likes",
            "vote_count"
          ]
        },
        {
          "name": "direction",
          "in": "query",
          "type": "string",
          "description": "Direction of threads ordering.",
          "values": [
            "asc",
            "desc"
          ]
        },
        {
          "name": "thread_create_date",
          "in": "query",
          "type": "integer",
          "description": "Filter threads by creation date. Only works with 'thread_create_date' and 'thread_create_date_reverse' ordering."
        },
        {
          "name": "thread_update_date",
          "in": "query",
          "type": "integer",
          "description": "Filter threads by update date. Only works with 'thread_update_date' and 'thread_update_date_reverse' ordering."
        },
        {
          "name": "fields_include",
          "in": "query",
          "type": "array",
          "description": "List of fields to include.",
          "items": "string",
          "values": [
            "*",
            "latest_posts"
          ],
          "csv": true
        }
      ],
      "description": "List of threads in a forum (with pagination)."
    },
    "Threads.Get": {
      "method": "GET",
      "path": "/threads/{thread_id}",
      "summary": "Get Thread",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "thread_id",
          "in": "path",
          "type": "integer",
          "description": "Id of thread.",
          "required": true
        },
        {
          "name": "fields_include",
          "in": "query",
          "type": "array",
          "description": "List of fields to include.",
          "items": "string",
          "values": [
            "*",
            "latest_posts"
          ],
          "csv": true
        }
      ],
      "description": "Detail information of a thread."
    },
    "Threads.Followers": {
      "method": "GET",
      "path": "/threads/{thread_id}/followers",
      "summary": "Get Thread Followers",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "thread_id",
          "in": "path",
          "type": "integer",
          "description": "Id of thread.",
          "required": true
        }
      ],
      "description": "List of a thread's followers. For privacy reason, only the current user will be included in the list."
    },
    "Threads.Followed": {
      "method": "GET",
      "path": "/threads/followed",
      "summary": "Get Followed Threads",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "total",
          "in": "query",
          "type": "boolean",
          "description": "If included in the request, only the thread count is returned as threads_total."
        },
        {
          "name": "fields_include",
          "in": "query",
          "type": "array",
          "description": "List of fields to include.",
          "items": "string",
          "values": [
            "*",
            "latest_posts"
          ],
          "csv": true
        }
      ],
      "description": "List of followed threads by current user."
    },
    "Threads.Poll.Get": {
      "method": "GET",
      "path": "/threads/{thread_id}/poll",
      "summary": "Get Poll",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "thread_id",
          "in": "path",
          "type": "integer",
          "description": "Id of thread.",
          "required": true
        }
      ],
      "description": "Detail information of a poll."
    },
    "Threads.Unread": {
      "method": "GET",
      "path": "/threads/new",
      "summary": "Get Unread Threads",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Maximum number of result threads. The limit may get decreased if the value is too large (depending on the system configuration)."
        },
        {
          "name": "forum_id",
          "in": "query",
          "type": "integer",
          "description": "Id of the container forum to search for threads. Child forums of the specified forum will be included in the search."
        },
        {
          "name": "data_limit",
          "in": "query",
          "type": "integer",
          "description": "Number of thread data to be returned. Default value is 20."
        }
      ],
      "description": "List of unread threads (must be logged in)."
    },
    "Threads.Recent": {
      "method": "GET",
      "path": "/threads/recent",
      "summary": "Get Recent Threads",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "days",
          "in": "query",
          "type": "integer",
          "description": "Maximum number of days to search for threads."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Maximum number of result threads. The limit may get decreased if the value is too large."
        },
        {
          "name": "forum_id",
          "in": "query",
          "type": "integer",
          "description": "Id of the container forum to search for threads. Child forums of the specified forum will be included in the search."
        },
        {
          "name": "data_limit",
          "in": "query",
          "type": "integer",
          "description": "Number of thread data to be returned. Default value is 20."
        }
      ],
      "description": "List of recent threads."
    },
    "Posts.List": {
      "method": "GET",
      "path": "/posts",
      "summary": "Get Posts",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "thread_id",
          "in": "query",
          "type": "integer",
          "description": "Id of the containing thread."
        },
        {
          "name": "page_of_post_id",
          "in": "query",
          "type": "integer",
          "description": "Id of a post, posts that are in the same page with the specified post will be returned. thread_id may be skipped."
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of posts."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of posts in a page."
        },
        {
          "name": "order",
          "in": "query",
          "type": "string",
          "description": "Ordering of posts.",
          "values": [
            "natural",
            "natural_reverse",
            "post_likes",
            "post_likes_reverse"
          ]
        }
      ],
      "description": "List of posts in a thread (with pagination)."
    },
    "Posts.Get": {
      "method": "GET",
      "path": "/posts/{post_id}",
      "summary": "Get Post",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "post_id",
          "in": "path",
          "type": "integer",
          "description": "Id of post.",
          "required": true
        }
      ],
      "description": "Detail information of a post."
    },
    "Posts.Likes": {
      "method": "GET",
      "path": "/posts/{post_id}/likes",
      "summary": "Get Post Likes",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "post_id",
          "in": "path",
          "type": "integer",
          "description": "Id of post.",
          "required": true
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of users."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of users in a page."
        }
      ],
      "description": "List of users who liked a post."
    },
    "Posts.ReportReasons": {
      "method": "GET",
      "path": "/posts/{post_id}/report",
      "summary": "Get Post Report Reasons",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "post_id",
          "in": "path",
          "type": "integer",
          "description": "Id of post.",
          "required": true
        }
      ],
      "description": "Get post report reasons."
    },
    "Posts.Comments.Get": {
      "method": "GET",
      "path": "/posts/comments",
      "summary": "Get Post Comments",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "post_id",
          "in": "query",
          "type": "integer",
          "description": "Id of a post."
        },
        {
          "name": "post_comment_id",
          "in": "query",
          "type": "integer",
          "description": "Id of a post comment."
        },
        {
          "name": "before",
          "in": "query",
          "type": "integer",
          "description": "The time in milliseconds (e.g. 1652177794083) before last comment date."
        },
        {
          "name": "before_comment",
          "in": "query",
          "type": "integer",
          "description": "Comment id to get older comments."
        }
      ],
      "description": "List of post comments in a thread."
    },
    "Posts.Comments.ReportReasons": {
      "method": "GET",
      "path": "/posts/comments/report",
      "summary": "Get Post Comment Report Reasons",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "post_comment_id",
          "in": "query",
          "type": "integer",
          "description": "Id of post comment.",
          "required": true
        }
      ],
      "description": "Get a post comment report reasons."
    },
    "Users.List": {
      "method": "GET",
      "path": "/users",
      "summary": "Get Users",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of users."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of users in a page."
        },
        {
          "name": "fields_include",
          "in": "query",
          "type": "array",
          "description": "List of fields to include.",
          "items": "string",
          "values": [
            "*",
            "alerts"
          ],
          "csv": true
        }
      ],
      "description": "List of users (with pagination)."
    },
    "Users.Fields": {
      "method": "GET",
      "path": "/users/fields",
      "summary": "Get User Fields",
      "scopes": [
        "read"
      ],
      "params": [],
      "description": "List of user fields."
    },
    "Users.Find": {
      "method": "GET",
      "path": "/users/find",
      "summary": "Find Users",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "username",
          "in": "query",
          "type": "string",
          "description": "Username to filter. Usernames start with the query will be returned."
        },
        {
          "name": "custom_fields",
          "in": "query",
          "type": "object",
          "description": "Custom fields to filter. Example: custom_fields[telegram]=telegramLogin.",
          "items": "string"
        },
        {
          "name": "fields_include",
          "in": "query",
          "type": "array",
          "description": "List of fields to include.",
          "items": "string",
          "values": [
            "*",
            "alerts"
          ],
          "csv": true
        }
      ],
      "description": "List of users filtered by username, email or custom fields."
    },
    "Users.Get": {
      "method": "GET",
      "path": "/users/{user_id}",
      "summary": "Get User",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "user_id",
          "in": "path",
          "type": "string",
          "description": "User ID. You can use shortlink me to interact with your profile.",
          "required": true
        },
        {
          "name": "fields_include",
          "in": "query",
          "type": "array",
          "description": "List of fields to include.",
          "items": "string",
          "values": [
            "*",
            "alerts"
          ],
          "csv": true
        }
      ],
      "description": "Detail information of a user."
    },
    "Users.Claims": {
      "method": "GET",
      "path": "/users/{user_id}/claims",
      "summary": "Get User Claims",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "user_id",
          "in": "path",
          "type": "string",
          "description": "User ID. You can use shortlink me to interact with your profile.",
          "required": true
        },
        {
          "name": "type",
          "in": "query",
          "type": "string",
          "description": "Filter claims by their type.",
          "values": [
            "market",
            "nomarket"
          ]
        },
        {
          "name": "claim_state",
          "in": "query",
          "type": "string",
          "description": "Filter claims by their state.",
          "values": [
            "active",
            "solved",
            "rejected",
            "settled"
          ]
        }
      ],
      "description": "Get user claims."
    },
    "Users.Followers": {
      "method": "GET",
      "path": "/users/{user_id}/followers",
      "summary": "Get User Followers",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "user_id",
          "in": "path",
          "type": "string",
          "description": "User ID. You can use shortlink me to interact with your profile.",
          "required": true
        },
        {
          "name": "order",
          "in": "query",
          "type": "string",
          "description": "Ordering of followers.",
          "values": [
            "natural",
            "follow_date",
            "follow_date_reverse"
          ]
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of followers."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of followers in a page."
        }
      ],
      "description": "List of a user's followers."
    },
    "Users.Followings": {
      "method": "GET",
      "path": "/users/{user_id}/followings",
      "summary": "Get Followed Users By User",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "user_id",
          "in": "path",
          "type": "string",
          "description": "User ID. You can use shortlink me to interact with your profile.",
          "required": true
        },
        {
          "name": "order",
          "in": "query",
          "type": "string",
          "description": "Ordering of users.",
          "values": [
            "natural",
            "follow_date",
            "follow_date_reverse"
          ]
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of users."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of users in a page."
        }
      ],
      "description": "List of users whom are followed by a user."
    },
    "Users.Likes": {
      "method": "GET",
      "path": "/users/{user_id}/likes",
      "summary": "Get User Likes",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "user_id",
          "in": "path",
          "type": "string",
          "description": "User ID. You can use shortlink me to interact with your profile.",
          "required": true
        },
        {
          "name": "node_id",
          "in": "query",
          "type": "integer",
          "description": "Filter by forum section."
        },
        {
          "name": "like_type",
          "in": "query",
          "type": "string",
          "description": "Like type.",
          "values": [
            "like",
            "like2"
          ]
        },
        {
          "name": "type",
          "in": "query",
          "type": "string",
          "description": "Likes type.",
          "values": [
            "gotten",
            "given"
          ]
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number."
        },
        {
          "name": "content_type",
          "in": "query",
          "type": "string",
          "description": "Content type.",
          "values": [
            "post",
            "post_comment",
            "profile_post",
            "profile_post_comment"
          ]
        },
        {
          "name": "search_user_id",
          "in": "query",
          "type": "integer",
          "description": "Get only likes from specified user."
        },
        {
          "name": "stats",
          "in": "query",
          "type": "boolean",
          "description": "Show weekly statistics."
        }
      ],
      "description": "Get information about user likes."
    },
    "Users.Ignored": {
      "method": "GET",
      "path": "/users/ignored",
      "summary": "Get Ignored Users",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "total",
          "in": "query",
          "type": "boolean",
          "description": "If included in the request, only the user count is returned as users_total."
        }
      ],
      "description": "List of ignored users of current user."
    },
    "Users.Contents": {
      "method": "GET",
      "path": "/users/{user_id}/timeline",
      "summary": "Get Contents",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "user_id",
          "in": "path",
          "type": "string",
          "description": "User ID. You can use shortlink me to interact with your profile.",
          "required": true
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of contents."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of contents in a page."
        }
      ],
      "description": "List of contents created by user (with pagination)."
    },
    "Users.Trophies": {
      "method": "GET",
      "path": "/users/{user_id}/trophies",
      "summary": "Get Trophies",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "user_id",
          "in": "path",
          "type": "string",
          "description": "User ID. You can use shortlink me to interact with your profile.",
          "required": true
        }
      ],
      "description": "List of user trophies."
    },
    "Users.SecretAnswerTypes": {
      "method": "GET",
      "path": "/users/secret-answer/types",
      "summary": "Get Secret Answer Types",
      "scopes": [
        "read"
      ],
      "params": [],
      "description": "Get available secret answer types for user account security."
    },
    "ProfilePosts.List": {
      "method": "GET",
      "path": "/users/{user_id}/profile-posts",
      "summary": "Get Profile Posts",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "user_id",
          "in": "path",
          "type": "string",
          "description": "User ID. You can use shortlink me to interact with your profile.",
          "required": true
        },
        {
          "name": "posts_user_id",
          "in": "query",
          "type": "integer",
          "description": "Filter to get only posts from the specified user."
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of contents."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of contents in a page."
        },
        {
          "name": "fields_include",
          "in": "query",
          "type": "array",
          "description": "List of fields to include.",
          "items": "string",
          "values": [
            "*",
            "latest_comments"
          ],
          "csv": true
        }
      ],
      "description": "List of profile posts (with pagination)."
    },
    "ProfilePosts.Get": {
      "method": "GET",
      "path": "/profile-posts/{profile_post_id}",
      "summary": "Get Profile Post",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "profile_post_id",
          "in": "path",
          "type": "integer",
          "description": "Id of profile post.",
          "required": true
        }
      ],
      "description": "Detail information of a profile post."
    },
    "ProfilePosts.ReportReasons": {
      "method": "GET",
      "path": "/profile-posts/{profile_post_id}/report",
      "summary": "Get Profile Post Report Reasons",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "profile_post_id",
          "in": "path",
          "type": "integer",
          "description": "Id of profile post.",
          "required": true
        }
      ],
      "description": "Get Profile Post Report Reasons."
    },
    "ProfilePosts.Likes": {
      "method": "GET",
      "path": "/profile-posts/{profile_post_id}/likes",
      "summary": "Get Profile Post Likes",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "profile_post_id",
          "in": "path",
          "type": "integer",
          "description": "Id of profile post.",
          "required": true
        }
      ],
      "description": "List of users who liked a profile post."
    },
    "ProfilePosts.Comments.List": {
      "method": "GET",
      "path": "/profile-posts/comments",
      "summary": "Get Profile Post Comments",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "profile_post_id",
          "in": "query",
          "type": "integer",
          "description": "ID of profile post."
        },
        {
          "name": "comment_id",
          "in": "query",
          "type": "integer",
          "description": "ID of a profile post comment."
        },
        {
          "name": "page_of_comment_id",
          "in": "query",
          "type": "integer",
          "description": "ID of a profile post comment, comments that are in the same page with the specified comment will be returned."
        },
        {
          "name": "before",
          "in": "query",
          "type": "integer",
          "description": "Date to get older comments. Please note that this entry point does not support the page parameter but it still does support limit."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of profile posts in a page."
        }
      ],
      "description": "List of comments of a profile post."
    },
    "ProfilePosts.Comments.Get": {
      "method": "GET",
      "path": "/profile-posts/{profile_post_id}/comments/{comment_id}",
      "summary": "Get Profile Post Comment",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "profile_post_id",
          "in": "path",
          "type": "integer",
          "description": "Id of profile post.",
          "required": true
        },
        {
          "name": "comment_id",
          "in": "path",
          "type": "integer",
          "description": "Id of profile post comment.",
          "required": true
        }
      ],
      "description": "Detail information of a profile post comment."
    },
    "ProfilePosts.Comments.ReportReasons": {
      "method": "GET",
      "path": "/profile-posts/comments/report",
      "summary": "Get Profile Post Comment Report Reasons",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "comment_id",
          "in": "query",
          "type": "integer",
          "description": "Id of profile post comment.",
          "required": true
        }
      ],
      "description": "Get profile post comment report reasons."
    },
    "Notifications.List": {
      "method": "GET",
      "path": "/notifications",
      "summary": "Get Notifications",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "type",
          "in": "query",
          "type": "string",
          "description": "Filter notifications by their type.",
          "values": [
            "market",
            "nomarket"
          ]
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of notifications."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of notifications in a page."
        }
      ],
      "description": "List of notifications (both read and unread)."
    },
    "Notifications.Get": {
      "method": "GET",
      "path": "/notifications/{notification_id}/content",
      "summary": "Get Notification",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "notification_id",
          "in": "path",
          "type": "integer",
          "description": "Id of notification.",
          "required": true
        }
      ],
      "description": "Get associated content of notification. The response depends on the content type."
    },
    "Tags.Popular": {
      "method": "GET",
      "path": "/tags",
      "summary": "Get Popular Tags",
      "scopes": [
        "read"
      ],
      "params": [],
      "description": "List of popular tags (no pagination)."
    },
    "Tags.List": {
      "method": "GET",
      "path": "/tags/list",
      "summary": "Get Tags",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of tags list."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of results in a page."
        }
      ],
      "description": "List of tags."
    },
    "Tags.Get": {
      "method": "GET",
      "path": "/tags/{tag_id}",
      "summary": "Get Tagged Content",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "tag_id",
          "in": "path",
          "type": "integer",
          "description": "Id of tag.",
          "required": true
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of tagged contents."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of tagged contents in a page."
        }
      ],
      "description": "List of tagged contents."
    },
    "Tags.Find": {
      "method": "GET",
      "path": "/tags/find",
      "summary": "Get Filtered Content",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "tag",
          "in": "query",
          "type": "string",
          "description": "tag to filter. Tags start with the query will be returned.",
          "required": true
        }
      ],
      "description": "Filtered list of tags."
    },
    "Search.All": {
      "method": "POST",
      "path": "/search",
      "summary": "Search",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "q",
          "in": "body",
          "type": "string",
          "description": "Search query. Can be skipped if user_id is set."
        },
        {
          "name": "tag",
          "in": "body",
          "type": "string",
          "description": "Tag to search for tagged contents."
        },
        {
          "name": "forum_id",
          "in": "body",
          "type": "integer",
          "description": "Id of the container forum to search for contents. Child forums of the specified forum will be included in the search."
        },
        {
          "name": "user_id",
          "in": "body",
          "type": "string",
          "description": ""
        },
        {
          "name": "page",
          "in": "body",
          "type": "integer",
          "description": "Page number of results."
        },
        {
          "name": "limit",
          "in": "body",
          "type": "integer",
          "description": "Number of results in a page."
        },
        {
          "name": "before",
          "in": "body",
          "type": "integer",
          "description": "The time in milliseconds (e.g. 1767214800) before last content date."
        }
      ],
      "description": "Search for all supported contents."
    },
    "Search.Threads": {
      "method": "POST",
      "path": "/search/threads",
      "summary": "Search Thread",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "q",
          "in": "body",
          "type": "string",
          "description": "Search query. Can be skipped if user_id is set."
        },
        {
          "name": "tag",
          "in": "body",
          "type": "string",
          "description": "Tag to search for tagged contents."
        },
        {
          "name": "forum_id",
          "in": "body",
          "type": "integer",
          "description": "Id of the container forum to search for contents. Child forums of the specified forum will be included in the search."
        },
        {
          "name": "user_id",
          "in": "body",
          "type": "string",
          "description": ""
        },
        {
          "name": "page",
          "in": "body",
          "type": "integer",
          "description": "Page number of results."
        },
        {
          "name": "limit",
          "in": "body",
          "type": "integer",
          "description": "Number of results in a page."
        },
        {
          "name": "data_limit",
          "in": "body",
          "type": "integer",
          "description": "Number of thread data to be returned."
        },
        {
          "name": "before",
          "in": "body",
          "type": "integer",
          "description": "The time in milliseconds (e.g. 1767214800) before last content date."
        }
      ],
      "description": "Search for threads."
    },
    "Search.Posts": {
      "method": "POST",
      "path": "/search/posts",
      "summary": "Search Post",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "q",
          "in": "body",
          "type": "string",
          "description": "Search query. Can be skipped if user_id is set."
        },
        {
          "name": "tag",
          "in": "body",
          "type": "string",
          "description": "Tag to search for tagged contents."
        },
        {
          "name": "forum_id",
          "in": "body",
          "type": "integer",
          "description": "Id of the container forum to search for contents. Child forums of the specified forum will be included in the search."
        },
        {
          "name": "user_id",
          "in": "body",
          "type": "string",
          "description": ""
        },
        {
          "name": "page",
          "in": "body",
          "type": "integer",
          "description": "Page number of results."
        },
        {
          "name": "limit",
          "in": "body",
          "type": "integer",
          "description": "Number of results in a page."
        },
        {
          "name": "data_limit",
          "in": "body",
          "type": "integer",
          "description": "Number of post data to be returned."
        },
        {
          "name": "before",
          "in": "body",
          "type": "integer",
          "description": "The time in milliseconds (e.g. 1767214800) before last content date."
        }
      ],
      "description": "Search for posts."
    },
    "Search.Users": {
      "method": "POST",
      "path": "/search/users",
      "summary": "Search Users",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "q",
          "in": "body",
          "type": "string",
          "description": "Search query."
        }
      ],
      "description": "Search for users."
    },
    "Search.ProfilePosts": {
      "method": "POST",
      "path": "/search/profile-posts",
      "summary": "Search Profile Posts",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "q",
          "in": "body",
          "type": "string",
          "description": "Search query. Can be skipped if user_id is set."
        },
        {
          "name": "user_id",
          "in": "body",
          "type": "integer",
          "description": "User ID to filter profile posts."
        },
        {
          "name": "page",
          "in": "body",
          "type": "integer",
          "description": "Page number of results."
        },
        {
          "name": "limit",
          "in": "body",
          "type": "integer",
          "description": "Number of results in a page."
        },
        {
          "name": "before",
          "in": "body",
          "type": "integer",
          "description": "The time in milliseconds (e.g. 1767214800) before last content date."
        }
      ],
      "description": "Search for profile posts."
    },
    "Search.Tagged": {
      "method": "POST",
      "path": "/search/tagged",
      "summary": "Search Tagged",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "tag",
          "in": "body",
          "type": "string",
          "description": "Tag to search for tagged contents."
        },
        {
          "name": "tags",
          "in": "body",
          "type": "array",
          "description": "Array of tags to search for tagged contents.",
          "items": "string"
        },
        {
          "name": "page",
          "in": "body",
          "type": "integer",
          "description": "Page number of results."
        },
        {
          "name": "limit",
          "in": "body",
          "type": "integer",
          "description": "Number of results in a page."
        }
      ],
      "description": "Search for tagged contents."
    },
    "Search.Results": {
      "method": "GET",
      "path": "/search/{search_id}/results",
      "summary": "Get Search Results",
      "scopes": [
        "post"
      ],
      "params": [
        {
          "name": "search_id",
          "in": "path",
          "type": "string",
          "description": "Search ID.",
          "required": true
        },
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of results."
        },
        {
          "name": "limit",
          "in": "query",
          "type": "integer",
          "description": "Number of results in a page."
        }
      ],
      "description": "List of search results (with pagination)."
    },
    "Chatbox.Index": {
      "method": "GET",
      "path": "/chatbox",
      "summary": "Get Chats",
      "scopes": [
        "chatbox"
      ],
      "params": [
        {
          "name": "room_id",
          "in": "query",
          "type": "integer",
          "description": "Room id.",
          "values": [
            1,
            2,
            3,
            4,
            13
          ]
        }
      ],
      "description": "Get chat rooms."
    },
    "Chatbox.GetMessages": {
      "method": "GET",
      "path": "/chatbox/messages",
      "summary": "Get Chat Messages",
      "scopes": [
        "chatbox"
      ],
      "params": [
        {
          "name": "room_id",
          "in": "query",
          "type": "integer",
          "description": "Room id.",
          "values": [
            1,
            2,
            3,
            4,
            13
          ],
          "required": true
        },
        {
          "name": "before_message_id",
          "in": "query",
          "type": "integer",
          "description": "Message id to get older chat messages."
        }
      ],
      "description": "Get chat messages."
    },
    "Chatbox.Online": {
      "method": "GET",
      "path": "/chatbox/messages/online",
      "summary": "Get Chat Online",
      "scopes": [
        "chatbox"
      ],
      "params": [
        {
          "name": "room_id",
          "in": "query",
          "type": "integer",
          "description": "Room id.",
          "values": [
            1,
            2,
            3,
            4,
            13
          ],
          "required": true
        }
      ],
      "description": "Get chat Online Users."
    },
    "Chatbox.ReportReasons": {
      "method": "GET",
      "path": "/chatbox/messages/{message_id}/report",
      "summary": "Get Chat Message Report Reasons",
      "scopes": [
        "chatbox"
      ],
      "params": [
        {
          "name": "message_id",
          "in": "path",
          "type": "integer",
          "description": "Message id.",
          "required": true
        }
      ],
      "description": "Report chat message."
    },
    "Chatbox.GetLeaderboard": {
      "method": "GET",
      "path": "/chatbox/messages/leaderboard",
      "summary": "Get Chat Leaderboard",
      "scopes": [
        "chatbox"
      ],
      "params": [
        {
          "name": "duration",
          "in": "query",
          "type": "string",
          "description": "Duration.",
          "values": [
            "day",
            "week",
            "month"
          ]
        }
      ],
      "description": "Get chat leaderboard."
    },
    "Chatbox.GetIgnore": {
      "method": "GET",
      "path": "/chatbox/ignore",
      "summary": "Get Ignored Chat Users",
      "scopes": [
        "chatbox"
      ],
      "params": [],
      "description": "Get list of ignored chat users."
    },
    "Forms.List": {
      "method": "GET",
      "path": "/forms",
      "summary": "Get Forms List",
      "scopes": [
        "read"
      ],
      "params": [
        {
          "name": "page",
          "in": "query",
          "type": "integer",
          "description": "Page number of forms."
        }
      ]
    },
    "Uptime.Info": {
      "method": "GET",
      "path": "/api/status-page/lzt",
      "summary": "Get Status Page Info",
      "scopes": [],
      "params": [],
      "description": "Provide data for published public status pages."
    },
    "Uptime.Heartbeat": {
      "method": "GET",
      "path": "/api/status-page/heartbeat/lzt",
      "summary": "Get Status Page Heartbeats & Uptime",
      "scopes": [],
      "params": [],
      "description": "Get heartbeat and uptime."
    }
  },
  "excluded": {
    "OAuth.Token": "POST /oauth/token: POST requests can change data",
    "Forums.Follow": "POST /forums/{forum_id}/followers: POST requests can change data",
    "Forums.Unfollow": "DELETE /forums/{forum_id}/followers: DELETE requests can change data",
    "Forums.EditFeedOptions": "PUT /forums/feed/options: PUT requests can change data",
    "Threads.Create": "POST /threads: POST requests can change data",
    "Threads.CreateContest": "POST /contests: POST requests can change data",
    "Threads.Claim": "POST /claims: POST requests can change data",
    "Threads.Edit": "PUT /threads/{thread_id}: PUT requests can change data",
    "Threads.Delete": "DELETE /threads/{thread_id}: DELETE requests can change data",
    "Threads.Move": "POST /threads/{thread_id}/move: POST requests can change data",
    "Threads.Bump": "POST /threads/{thread_id}/bump: POST requests can change data",
    "Threads.Hide": "POST /threads/{thread_id}/hide: POST requests can change data",
    "Threads.Star": "POST /threads/{thread_id}/star: POST requests can change data",
    "Threads.Unstar": "DELETE /threads/{thread_id}/star: DELETE requests can change data",
    "Threads.Follow": "POST /threads/{thread_id}/followers: POST requests can change data",
    "Threads.Unfollow": "DELETE /threads/{thread_id}/followers: DELETE requests can change data",
    "Threads.Poll.Vote": "POST /threads/{thread_id}/poll/votes: POST requests can change data",
    "Threads.Finish": "POST /contests/{thread_id}/finish: POST requests can change data",
    "Posts.Create": "POST /posts: POST requests can change data",
    "Posts.Edit": "PUT /posts/{post_id}: PUT requests can change data",
    "Posts.Delete": "DELETE /posts/{post_id}: DELETE requests can change data",
    "Posts.Like": "POST /posts/{post_id}/likes: POST requests can change data",
    "Posts.Unlike": "DELETE /posts/{post_id}/likes: DELETE requests can change data",
    "Posts.Report": "POST /posts/{post_id}/report: POST requests can change data",
    "Posts.Comments.Create": "POST /posts/comments: POST requests can change data",
    "Posts.Comments.Edit": "PUT /posts/comments: PUT requests can change data",
    "Posts.Comments.Delete": "DELETE /posts/comments: DELETE requests can change data",
    "Posts.Comments.Report": "POST /posts/comments/report: POST requests can change data",
    "Users.Current": "GET /users/me: returns private account data or binary content",
    "Users.Edit": "PUT /users/{user_id}: PUT requests can change data",
    "Users.Avatar.Upload": "POST /users/{user_id}/avatar: POST requests can change data",
    "Users.Avatar.Delete": "DELETE /users/{user_id}/avatar: DELETE requests can change data",
    "Users.Avatar.Crop": "POST /users/{user_id}/avatar/crop: POST requests can change data",
    "Users.Background.Upload": "POST /users/{user_id}/background: POST requests can change data",
    "Users.Background.Delete": "DELETE /users/{user_id}/background: DELETE requests can change data",
    "Users.Background.Crop": "POST /users/{user_id}/background/crop: POST requests can change data",
    "Users.Follow": "POST /users/{user_id}/followers: POST requests can change data",
    "Users.Unfollow": "DELETE /users/{user_id}/followers: DELETE requests can change data",
    "Users.Ignore": "POST /users/{user_id}/ignore: POST requests can change data",
    "Users.IgnoreEdit": "PUT /users/{user_id}/ignore: PUT requests can change data",
    "Users.Unignore": "DELETE /users/{user_id}/ignore: DELETE requests can change data",
    "Users.SA.Reset": "POST /account/secret-answer/reset: POST requests can change data",
    "Users.SA.CancelReset": "DELETE /account/secret-answer/reset: DELETE requests can change data",
    "ProfilePosts.Edit": "PUT /profile-posts/{profile_post_id}: PUT requests can change data",
    "ProfilePosts.Delete": "DELETE /profile-posts/{profile_post_id}: DELETE requests can change data",
    "ProfilePosts.Report": "POST /profile-posts/{profile_post_id}/report: POST requests can change data",
    "ProfilePosts.Create": "POST /profile-posts: POST requests can change data",
    "ProfilePosts.Stick": "POST /profile-posts/{profile_post_id}/stick: POST requests can change data",
    "ProfilePosts.Unstick": "DELETE /profile-posts/{profile_post_id}/stick: DELETE requests can change data",
    "ProfilePosts.Like": "POST /profile-posts/{profile_post_id}/likes: POST requests can change data",
    "ProfilePosts.Unlike": "DELETE /profile-posts/{profile_post_id}/likes: DELETE requests can change data",
    "ProfilePosts.Comments.Create": "POST /profile-posts/comments: POST requests can change data",
    "ProfilePosts.Comments.Edit": "PUT /profile-posts/comments: PUT requests can change data",
    "ProfilePosts.Comments.Delete": "DELETE /profile-posts/comments: DELETE requests can change data",
    "ProfilePosts.Comments.Report": "POST /profile-posts/comments/report: POST requests can change data",
    "Conversations.List": "GET /conversations: requires the private conversate scope",
    "Conversations.Create": "POST /conversations: POST requests can change data",
    "Conversations.Update": "PUT /conversations: PUT requests can change data",
    "Conversations.Delete": "DELETE /conversations: DELETE requests can change data",
    "Conversations.Start": "POST /conversations/start: POST requests can change data",
    "Conversations.Save": "POST /conversations/save: POST requests can change data",
    "Conversations.Get": "GET /conversations/{conversation_id}: requires the private conversate scope",
    "Conversations.ShareContent": "GET /conversations/share-content: requires the private conversate scope",
    "Conversations.Messages.List": "GET /conversations/{conversation_id}/messages: requires the private conversate scope",
    "Conversations.Messages.Create": "POST /conversations/{conversation_id}/messages: POST requests can change data",
    "Conversations.Search": "POST /conversations/search: POST requests can change data",
    "Conversations.Messages.Get": "GET /conversations/messages/{message_id}: requires the private conversate scope",
    "Conversations.Messages.Edit": "PUT /conversations/{conversation_id}/messages/{message_id}: PUT requests can change data",
    "Conversations.Messages.Delete": "DELETE /conversations/{conversation_id}/messages/{message_id}: DELETE requests can change data",
    "Conversations.Invite": "POST /conversations/{conversation_id}/invite: POST requests can change data",
    "Conversations.Kick": "POST /conversations/{conversation_id}/kick: POST requests can change data",
    "Conversations.Read": "POST /conversations/{conversation_id}/read: POST requests can change data",
    "Conversations.ReadAll": "POST /conversations/read-all: POST requests can change data",
    "Conversations.Messages.Stick": "POST /conversations/{conversation_id}/messages/{message_id}/stick: POST requests can change data",
    "Conversations.Messages.Unstick": "DELETE /conversations/{conversation_id}/messages/{message_id}/stick: DELETE requests can change data",
    "Conversations.Star": "POST /conversations/{conversation_id}/star: POST requests can change data",
    "Conversations.Unstar": "DELETE /conversations/{conversation_id}/star: DELETE requests can change data",
    "Conversations.Alerts.Enable": "POST /conversations/{conversation_id}/alerts: POST requests can change data",
    "Conversations.Alerts.Disable": "DELETE /conversations/{conversation_id}/alerts: DELETE requests can change data",
    "Notifications.Read": "POST /notifications/read: POST requests can change data",
    "Batch.Execute": "POST /batch: POST requests can change data",
    "Chatbox.PostMessage": "POST /chatbox/messages: POST requests can change data",
    "Chatbox.EditMessage": "PUT /chatbox/messages/{message_id}: PUT requests can change data",
    "Chatbox.DeleteMessage": "DELETE /chatbox/messages/{message_id}: DELETE requests can change data",
    "Chatbox.Report": "POST /chatbox/messages/{message_id}/report: POST requests can change data",
    "Chatbox.PostIgnore": "POST /chatbox/ignore: POST requests can change data",
    "Chatbox.DeleteIgnore": "DELETE /chatbox/ignore: DELETE requests can change data",
    "Forms.Create": "POST /forms/save: POST requests can change data",
    "App.Get": "GET /app: returns private account data or binary content",
    "App.PushSubscription": "PUT /app/push-subscription: PUT requests can change data"
  }
};
