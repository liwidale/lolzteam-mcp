import { asRecord, bool, num, records, str, type JsonRecord } from "../util/json.ts";
import { cleanText, compact, excerpt, isoDate, stripMarkup, textList } from "../util/text.ts";

function permalink(source: JsonRecord): string | undefined {
  return str(asRecord(source.links), "permalink");
}

function plainText(source: JsonRecord, prefix: string): string | undefined {
  return (
    cleanText(source[`${prefix}_plain_text`]) ??
    stripMarkup(source[`${prefix}_html`]) ??
    stripMarkup(source[prefix])
  );
}

function count(source: JsonRecord, key: string): number | undefined {
  return num(source, key) ?? num(asRecord(source[key]), "count");
}

function translation(source: JsonRecord, key: string): string | undefined {
  const original = cleanText(source[key]);
  const translated = cleanText(source[`${key}_en`]);
  return translated === original ? undefined : translated;
}

function formatContest(raw: unknown) {
  const contest = asRecord(raw);
  if (Object.keys(contest).length === 0) return undefined;
  return compact({
    prize_type: str(contest, "prize_type"),
    prize: num(contest, "prize_cost") ?? num(contest, "prize_data"),
    winners: num(contest, "count_winners"),
    members: num(contest, "now_count_members"),
    finishes_at: isoDate(contest.finish_date),
    is_finished: bool(contest, "is_finished"),
  });
}

function author(source: JsonRecord, idKey: string, nameKey: string) {
  return compact({ user_id: num(source, idKey), username: cleanText(source[nameKey]) });
}

export function formatPagination(response: JsonRecord, totalKey: string) {
  const links = asRecord(response.links);
  const page = num(links, "page");
  const pages = num(links, "pages");
  return compact({
    page,
    pages,
    total: num(response, totalKey),
    next_page: page !== undefined && pages !== undefined && page < pages ? page + 1 : undefined,
  });
}

export function formatThread(raw: unknown, textLength: number) {
  const thread = asRecord(raw);
  const firstPost = asRecord(thread.first_post);
  return compact({
    thread_id: num(thread, "thread_id"),
    title: cleanText(thread.title),
    title_en: translation(thread, "title"),
    forum: compact({ forum_id: num(thread, "node_id"), title: cleanText(thread.node_title) }),
    author: author(thread, "user_id", "username"),
    created_at: isoDate(thread.post_date),
    last_post_at: isoDate(thread.last_post_date),
    last_post_by: cleanText(thread.last_post_username),
    replies: num(thread, "reply_count"),
    views: num(thread, "view_count"),
    likes: num(thread, "first_post_likes"),
    tags: textList(thread.tags),
    prefix_ids: Array.isArray(thread.prefix_ids) ? thread.prefix_ids : undefined,
    is_sticky: bool(thread, "sticky") === true ? true : undefined,
    is_closed: bool(thread, "discussion_open") === false ? true : undefined,
    first_post_id: num(thread, "first_post_id"),
    contest: formatContest(thread.contest),
    url: str(thread, "view_url"),
    text: excerpt(plainText(firstPost, "message"), textLength),
  });
}

export function formatPost(raw: unknown, textLength: number) {
  const post = asRecord(raw);
  return compact({
    post_id: num(post, "post_id"),
    thread_id: num(post, "thread_id"),
    author: author(post, "user_id", "username"),
    created_at: isoDate(post.post_date),
    edited_at: isoDate(post.last_edit_date),
    position: num(post, "position"),
    likes: num(post, "likes"),
    comments: num(post, "comment_count"),
    is_first_post: bool(post, "is_first_post") === true ? true : undefined,
    url: str(post, "view_url"),
    text: excerpt(plainText(post, "message"), textLength),
  });
}

export function formatPostComment(raw: unknown, textLength: number) {
  const comment = asRecord(raw);
  return compact({
    comment_id: num(comment, "post_comment_id"),
    post_id: num(comment, "post_id"),
    author: author(comment, "user_id", "username"),
    created_at: isoDate(comment.comment_date),
    likes: num(comment, "likes"),
    url: str(comment, "view_url"),
    text: excerpt(plainText(comment, "message"), textLength),
  });
}

export function formatProfilePost(raw: unknown, textLength: number) {
  const post = asRecord(raw);
  return compact({
    profile_post_id: num(post, "profile_post_id"),
    author: author(post, "poster_user_id", "poster_username"),
    profile_owner: author(post, "timeline_user_id", "timeline_username"),
    created_at: isoDate(post.post_create_date),
    likes: num(post, "post_like_count"),
    comments: num(post, "post_comment_count"),
    url: permalink(post),
    text: excerpt(plainText(post, "post_body"), textLength),
  });
}

export function formatUser(raw: unknown) {
  const user = asRecord(raw);
  const scamField = records(user.fields).find((field) => field.id === "scamURL");
  return compact({
    user_id: num(user, "user_id"),
    username: cleanText(user.username),
    title: cleanText(user.custom_title) ?? cleanText(user.user_title),
    registered_at: isoDate(user.user_register_date),
    last_seen_at: isoDate(user.user_last_seen_date),
    messages: num(user, "user_message_count"),
    likes: num(user, "user_like_count"),
    likes2: num(user, "user_like2_count"),
    trophies: num(user, "trophy_count"),
    contests: num(user, "contest_count"),
    followers: count(user, "user_followers"),
    following: count(user, "user_following"),
    deposit: num(user, "user_deposit"),
    is_banned: bool(user, "is_banned") === true ? true : undefined,
    is_verified: bool(user, "user_is_verified") === true ? true : undefined,
    scam_report_url: scamField ? cleanText(scamField.value) : undefined,
    short_link: str(user, "short_link"),
    url: permalink(user),
  });
}

export interface ForumFormat {
  detailed: boolean;
  prefixes: boolean;
}

export function formatForum(raw: unknown, format: ForumFormat) {
  const forum = asRecord(raw);
  const details = asRecord(forum.type_data);
  const groups = forum.forum_prefixes ?? details.prefixes;
  const prefixes = format.prefixes
    ? records(groups).flatMap((group) =>
        records(group.group_prefixes).map((prefix) =>
          compact({
            prefix_id: num(prefix, "prefix_id"),
            title: cleanText(prefix.prefix_title),
            group: cleanText(group.group_title),
          }),
        ),
      )
    : undefined;
  const summary = {
    forum_id: num(forum, "forum_id") ?? num(forum, "node_id"),
    title: cleanText(forum.forum_title) ?? cleanText(forum.title),
    parent_node_id: num(forum, "parent_node_id"),
    threads: num(forum, "forum_thread_count") ?? num(details, "discussion_count"),
  };
  if (!format.detailed) return compact({ ...summary, prefixes });
  return compact({
    ...summary,
    title_en: translation(forum, "title"),
    description: excerpt(stripMarkup(forum.forum_description ?? forum.description), 200),
    posts: num(forum, "forum_post_count") ?? num(details, "message_count"),
    last_post_at: isoDate(details.last_post_date),
    prefixes,
    url: str(forum, "view_url") ?? permalink(forum),
  });
}

export function formatCategory(raw: unknown) {
  const category = asRecord(raw);
  return compact({
    category_id: num(category, "category_id") ?? num(category, "node_id"),
    title: cleanText(category.category_title) ?? cleanText(category.title),
    title_en: translation(category, "title"),
    description: excerpt(stripMarkup(category.category_description ?? category.description), 200),
    parent_node_id: num(category, "parent_node_id"),
    url: str(category, "view_url") ?? permalink(category),
  });
}

export function formatContent(raw: unknown, textLength: number): JsonRecord {
  const item = asRecord(raw);
  const type = str(item, "content_type");
  switch (type) {
    case "thread":
      return { type, ...formatThread(item, textLength) };
    case "post": {
      const thread = asRecord(item.thread);
      return compact({
        type,
        ...formatPost(item, textLength),
        thread: compact({
          thread_id: num(thread, "thread_id"),
          title: cleanText(thread.title),
          url: str(thread, "view_url"),
        }),
        forum: cleanText(item.node_title),
      });
    }
    case "profile_post":
      return { type, ...formatProfilePost(item, textLength) };
    default:
      return compact({ type, content_id: num(item, "content_id") });
  }
}
