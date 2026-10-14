import type { McpServer } from "../mcp/server.ts";
import { s } from "../schema.ts";
import { invalidInput, LolzteamError } from "../errors.ts";
import type { ApiClient } from "../http/client.ts";
import { messages } from "../i18n/index.ts";
import { registerTool } from "../tool.ts";
import { asRecord, num, records, str } from "../util/json.ts";
import { cleanText, compact } from "../util/text.ts";
import {
  formatCategory,
  formatContent,
  formatForum,
  formatPagination,
  formatPost,
  formatPostComment,
  formatThread,
  formatUser,
} from "./format.ts";

export const FORUM_RATE_LIMITS = {
  get: { limit: 300, windowMs: 60_000 },
  post: { limit: 30, windowMs: 60_000 },
};

const id = () => s.number().int().positive();
const page = s.number().int().min(1).max(10_000).optional();
const limit = (max: number) => s.number().int().min(1).max(max).optional();
const textLength = (fallback: number) => s.number().int().min(50).max(20_000).default(fallback);
const userId = s.union([s.number().int().positive(), s.literal("me")]);

const SEARCH_PATHS = {
  all: "/search",
  threads: "/search/threads",
  posts: "/search/posts",
  profile_posts: "/search/profile-posts",
} as const;

export function registerForumTools(server: McpServer, forum: ApiClient): void {
  registerTool(server, {
    name: "forum_search",
    inputSchema: {
      query: s.string().trim().min(1).max(200).optional(),
      type: s.enum(["all", "threads", "posts", "profile_posts"]).default("all"),
      tag: s.string().trim().min(1).max(100).optional(),
      forum_id: id().optional(),
      user_id: id().optional(),
      page,
      limit: limit(50),
      text_length: textLength(500),
    },
    handler: async (args, { signal }) => {
      if (args.query === undefined && args.tag === undefined && args.user_id === undefined) {
        throw invalidInput(messages.validation.searchTarget);
      }
      if (
        args.type === "profile_posts" &&
        (args.tag !== undefined || args.forum_id !== undefined)
      ) {
        throw invalidInput(messages.validation.profilePostSearch);
      }
      const response = await forum.request({
        method: "POST",
        path: SEARCH_PATHS[args.type],
        bucket: "post",
        body: compact({
          q: args.query,
          tag: args.tag,
          forum_id: args.forum_id,
          user_id: args.user_id,
          page: args.page,
          limit: args.limit,
        }),
        signal,
      });
      return compact(
        {
          results: records(response.data).map((item) => formatContent(item, args.text_length)),
          users: records(response.users).map(formatUser),
          pagination: formatPagination(response, "data_total"),
        },
        ["results"],
      );
    },
  });

  registerTool(server, {
    name: "forum_list_categories",
    inputSchema: {
      parent_category_id: id().optional(),
      parent_forum_id: id().optional(),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: "/categories",
        bucket: "get",
        query: {
          parent_category_id: args.parent_category_id,
          parent_forum_id: args.parent_forum_id,
        },
        signal,
      });
      return {
        categories: records(response.categories).map(formatCategory),
        total: num(response, "categories_total"),
      };
    },
  });

  registerTool(server, {
    name: "forum_list_forums",
    inputSchema: {
      detailed: s.boolean().default(false),
      include_prefixes: s.boolean().default(false),
      parent_category_id: id().optional(),
      parent_forum_id: id().optional(),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: "/forums",
        bucket: "get",
        query: {
          parent_category_id: args.parent_category_id,
          parent_forum_id: args.parent_forum_id,
        },
        signal,
      });
      return {
        forums: records(response.forums).map((forum) =>
          formatForum(forum, { detailed: args.detailed, prefixes: args.include_prefixes }),
        ),
        total: num(response, "forums_total"),
      };
    },
  });

  registerTool(server, {
    name: "forum_list_threads",
    inputSchema: {
      forum_id: id().optional(),
      title: s.string().trim().min(1).max(200).optional(),
      title_only: s.boolean().optional(),
      creator_user_id: id().optional(),
      state: s.enum(["active", "closed"]).optional(),
      period: s.enum(["day", "week", "month", "year"]).optional(),
      sticky: s.boolean().optional(),
      prefix_ids: s.array(s.number().int().positive()).max(20).optional(),
      exclude_prefix_ids: s.array(s.number().int().positive()).max(20).optional(),
      tag_id: id().optional(),
      order: s
        .enum([
          "post_date",
          "last_post_date",
          "reply_count",
          "reply_count_asc",
          "first_post_likes",
          "vote_count",
        ])
        .optional(),
      direction: s.enum(["asc", "desc"]).optional(),
      page,
      limit: limit(100),
      text_length: textLength(300),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: "/threads",
        bucket: "get",
        query: {
          forum_id: args.forum_id,
          title: args.title,
          title_only: args.title_only,
          creator_user_id: args.creator_user_id,
          state: args.state,
          period: args.period,
          sticky: args.sticky,
          "prefix_ids[]": args.prefix_ids,
          "prefix_ids_not[]": args.exclude_prefix_ids,
          thread_tag_id: args.tag_id,
          order: args.order,
          direction: args.direction,
          page: args.page,
          limit: args.limit,
        },
        signal,
      });
      const section = asRecord(response.forum);
      return compact(
        {
          forum: compact({
            forum_id: num(section, "forum_id"),
            title: cleanText(section.forum_title),
          }),
          threads: records(response.threads).map((thread) =>
            formatThread(thread, args.text_length),
          ),
          pagination: formatPagination(response, "threads_total"),
        },
        ["threads"],
      );
    },
  });

  registerTool(server, {
    name: "forum_get_thread",
    inputSchema: {
      thread_id: id(),
      include_poll: s.boolean().default(false),
      text_length: textLength(8_000),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: `/threads/${args.thread_id}`,
        bucket: "get",
        signal,
      });
      const thread = formatThread(response.thread, args.text_length);
      if (!args.include_poll) return { thread };
      return { thread, poll: await fetchPoll(forum, args.thread_id, signal) };
    },
  });

  registerTool(server, {
    name: "forum_list_posts",
    inputSchema: {
      thread_id: id().optional(),
      page_of_post_id: id().optional(),
      order: s.enum(["natural", "natural_reverse", "post_likes", "post_likes_reverse"]).optional(),
      page,
      limit: limit(100),
      text_length: textLength(1_500),
    },
    handler: async (args, { signal }) => {
      if (args.thread_id === undefined && args.page_of_post_id === undefined) {
        throw invalidInput(messages.validation.threadOrPost);
      }
      const response = await forum.request({
        path: "/posts",
        bucket: "get",
        query: {
          thread_id: args.thread_id,
          page_of_post_id: args.page_of_post_id,
          order: args.order,
          page: args.page,
          limit: args.limit,
        },
        signal,
      });
      return compact(
        {
          thread: formatThread(response.thread, 300),
          posts: records(response.posts).map((post) => formatPost(post, args.text_length)),
          pagination: formatPagination(response, "posts_total"),
        },
        ["posts"],
      );
    },
  });

  registerTool(server, {
    name: "forum_get_post",
    inputSchema: {
      post_id: id(),
      text_length: textLength(20_000),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: `/posts/${args.post_id}`,
        bucket: "get",
        signal,
      });
      return { post: formatPost(response.post, args.text_length) };
    },
  });

  registerTool(server, {
    name: "forum_list_post_comments",
    inputSchema: {
      post_id: id(),
      before_comment_id: id().optional(),
      text_length: textLength(1_000),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: "/posts/comments",
        bucket: "get",
        query: { post_id: args.post_id, before_comment: args.before_comment_id },
        signal,
      });
      const comments = records(response.comments).map((comment) =>
        formatPostComment(comment, args.text_length),
      );
      const ids = comments
        .map((comment) => comment.comment_id)
        .filter((value): value is number => value !== undefined);
      return compact(
        {
          comments,
          oldest_comment_id: ids.length > 0 ? Math.min(...ids) : undefined,
        },
        ["comments"],
      );
    },
  });

  registerTool(server, {
    name: "forum_get_user",
    inputSchema: { user_id: userId },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: `/users/${args.user_id}`,
        bucket: "get",
        signal,
      });
      return { user: formatUser(response.user) };
    },
  });

  registerTool(server, {
    name: "forum_find_users",
    inputSchema: {
      username: s.string().trim().min(1).max(50),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: "/users/find",
        bucket: "get",
        query: { username: args.username },
        signal,
      });
      return { users: records(response.users).map(formatUser) };
    },
  });

  registerTool(server, {
    name: "forum_list_user_content",
    inputSchema: {
      user_id: userId,
      page,
      limit: limit(100),
      text_length: textLength(500),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: `/users/${args.user_id}/timeline`,
        bucket: "get",
        query: { page: args.page, limit: args.limit },
        signal,
      });
      return compact(
        {
          user: formatUser(response.user),
          items: records(response.data).map((item) => formatContent(item, args.text_length)),
          pagination: formatPagination(response, "data_total"),
        },
        ["items"],
      );
    },
  });

  registerTool(server, {
    name: "forum_find_tags",
    inputSchema: {
      query: s.string().trim().min(1).max(100).optional(),
    },
    handler: async (args, { signal }) => {
      if (args.query === undefined) {
        const response = await forum.request({ path: "/tags", bucket: "get", signal });
        return {
          tags: tagList(
            Object.keys(asRecord(response.tags)),
            Object.values(asRecord(response.tags)),
          ),
        };
      }
      const response = await forum.request({
        path: "/tags/find",
        bucket: "get",
        query: { tag: args.query },
        signal,
      });
      const ids = Array.isArray(response.ids) ? response.ids : [];
      const texts = Array.isArray(response.tags) ? response.tags : [];
      return { tags: tagList(ids, texts) };
    },
  });

  registerTool(server, {
    name: "forum_list_tagged_threads",
    inputSchema: {
      tag_id: id(),
      page,
      limit: limit(100),
      text_length: textLength(300),
    },
    handler: async (args, { signal }) => {
      const response = await forum.request({
        path: `/tags/${args.tag_id}`,
        bucket: "get",
        query: { page: args.page, limit: args.limit },
        signal,
      });
      const tag = asRecord(response.tag);
      return compact(
        {
          tag: compact({
            tag_id: num(tag, "tag_id"),
            text: cleanText(tag.tag_text),
            uses: num(tag, "tag_use_count"),
            url: str(asRecord(tag.links), "permalink"),
          }),
          threads: records(response.tagged).map((thread) => formatThread(thread, args.text_length)),
          pagination: formatPagination(response, "tagged_total"),
        },
        ["threads"],
      );
    },
  });
}

function tagList(ids: unknown[], texts: unknown[]) {
  return ids.flatMap((rawId, index) => {
    const tagId = Number(rawId);
    const text = cleanText(texts[index]);
    return Number.isInteger(tagId) && text !== undefined ? [{ tag_id: tagId, text }] : [];
  });
}

async function fetchPoll(forum: ApiClient, threadId: number, signal: AbortSignal) {
  try {
    const response = await forum.request({
      path: `/threads/${threadId}/poll`,
      bucket: "get",
      signal,
    });
    const poll = asRecord(response.poll);
    return compact({
      question: cleanText(poll.poll_question),
      votes: num(poll, "poll_vote_count"),
      is_open: typeof poll.poll_is_open === "boolean" ? poll.poll_is_open : undefined,
      responses: records(poll.responses).map((answer) =>
        compact({
          answer: cleanText(answer.response_answer),
          votes: num(answer, "response_vote_count"),
        }),
      ),
    });
  } catch (error) {
    if (
      error instanceof LolzteamError &&
      (error.code === "not_found" || error.code === "bad_request")
    ) {
      return null;
    }
    throw error;
  }
}
