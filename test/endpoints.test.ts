import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { buildCatalog, SERVICES, specPath, type Json, type Service } from "../scripts/catalog.ts";
import { decide } from "../src/endpoints/policy.ts";
import { buildRequest, CATALOGS, findEndpoint } from "../src/endpoints/request.ts";
import { LolzteamError } from "../src/errors.ts";
import { connect, json } from "./helpers.ts";

function invalid(run: () => unknown, pattern: RegExp): void {
  assert.throws(run, (error: unknown) => {
    assert.ok(error instanceof LolzteamError);
    assert.equal(error.code, "invalid_input");
    assert.match(error.message, pattern);
    return true;
  });
}

const minimalSpec: Json = {
  info: { version: "9.9.9" },
  components: {
    parameters: {
      Page: { name: "page", in: "query", schema: { type: "integer" } },
    },
  },
  paths: {
    "/widgets": {
      get: {
        operationId: "Widgets.List",
        summary: "Get Widgets",
        description: "List widgets. Required scopes: + **read**",
        security: [{ HTTPBearer: ["read"] }],
        parameters: [
          { $ref: "#/components/parameters/Page" },
          { name: "kind[]", in: "query", schema: { type: "string", enum: ["a", "b"] } },
          {
            name: "fields_include",
            in: "query",
            explode: false,
            schema: { type: "array", items: { type: "string" } },
          },
        ],
      },
      post: { operationId: "Widgets.Create", summary: "Create Widget" },
    },
    "/widgets/{widget_id}/secret": {
      get: {
        operationId: "Widgets.Secret",
        summary: "Reveal",
        description: `> ${String.fromCodePoint(0x2757)} This action is cancelling active account guarantee`,
        parameters: [
          { name: "widget_id", in: "path", required: true, schema: { type: "integer" } },
        ],
      },
    },
    "/search/widgets": {
      post: {
        operationId: "Search.Threads",
        summary: "Search",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                properties: {
                  q: { type: "string", description: "Query." },
                  user_id: { anyOf: [{ type: "string" }, { type: "integer" }] },
                },
              },
            },
          },
        },
      },
    },
  },
};

describe("endpoint catalog generation", () => {
  it("keeps the committed catalogs in sync with the committed OpenAPI documents", async () => {
    for (const service of Object.keys(SERVICES) as Service[]) {
      const spec = JSON.parse(await readFile(specPath(service), "utf8")) as Json;
      assert.deepEqual(buildCatalog(spec), CATALOGS[service], `${service}: run npm run generate`);
    }
  });

  it("turns OpenAPI operations into catalog entries", () => {
    const catalog = buildCatalog(minimalSpec);
    assert.equal(catalog.version, "9.9.9");
    assert.deepEqual(catalog.endpoints["Widgets.List"], {
      method: "GET",
      path: "/widgets",
      summary: "Get Widgets",
      description: "List widgets.",
      scopes: ["read"],
      params: [
        { name: "page", in: "query", type: "integer", description: "" },
        {
          name: "kind[]",
          in: "query",
          type: "array",
          items: "string",
          values: ["a", "b"],
          description: "",
        },
        {
          name: "fields_include",
          in: "query",
          type: "array",
          items: "string",
          csv: true,
          description: "",
        },
      ],
    });
    assert.deepEqual(catalog.endpoints["Search.Threads"]?.params, [
      { name: "q", in: "body", type: "string", description: "Query." },
      { name: "user_id", in: "body", type: "string", description: "" },
    ]);
  });

  it("excludes writes and operations with documented side effects", () => {
    const catalog = buildCatalog(minimalSpec);
    assert.deepEqual(Object.keys(catalog.endpoints), ["Widgets.List", "Search.Threads"]);
    assert.match(catalog.excluded["Widgets.Create"] ?? "", /POST requests can change data/);
    assert.match(catalog.excluded["Widgets.Secret"] ?? "", /side effects/);
  });
});

describe("read-only policy", () => {
  const facts = { description: "", scopes: ["read"] };

  it("allows reads and the documented search endpoints", () => {
    assert.deepEqual(
      decide({ ...facts, operationId: "Threads.List", method: "get", path: "/threads" }),
      {
        allowed: true,
      },
    );
    assert.equal(
      decide({ ...facts, operationId: "Search.Posts", method: "post", path: "/search/posts" })
        .allowed,
      true,
    );
  });

  it("blocks writes, private scopes and credential endpoints", () => {
    const blocked = [
      { operationId: "Posts.Create", method: "post", path: "/posts" },
      {
        operationId: "Payments.History",
        method: "get",
        path: "/user/payments",
        scopes: ["payment"],
      },
      {
        operationId: "Conversations.List",
        method: "get",
        path: "/conversations",
        scopes: ["read", "conversate"],
      },
      { operationId: "Managing.Steam.GetMafile", method: "get", path: "/{item_id}/mafile" },
      {
        operationId: "Managing.TempEmailPassword",
        method: "get",
        path: "/{item_id}/temp-email-password",
      },
      { operationId: "Users.Current", method: "get", path: "/users/me" },
      { operationId: "Proxy.Get", method: "get", path: "/proxy" },
    ];
    for (const operation of blocked) {
      assert.equal(decide({ ...facts, ...operation }).allowed, false, operation.operationId);
    }
  });

  it("keeps every known dangerous operation out of the generated catalogs", () => {
    for (const id of [
      "Managing.Steam.GetMafile",
      "Managing.TempEmailPassword",
      "Managing.EmailCode",
      "Proxy.Get",
      "Profile.Get",
      "Purchasing.FastBuy",
    ]) {
      assert.equal(id in CATALOGS.market.endpoints, false, id);
      assert.ok(id in CATALOGS.market.excluded, id);
    }
    for (const endpoint of [
      ...Object.values(CATALOGS.forum.endpoints),
      ...Object.values(CATALOGS.market.endpoints),
    ]) {
      assert.ok(
        endpoint.method === "GET" ||
          endpoint.path.startsWith("/search") ||
          endpoint.path === "/bulk/items",
        endpoint.path,
      );
    }
  });
});

describe("endpoint requests", () => {
  it("finds operations case-insensitively and explains exclusions", () => {
    assert.equal(findEndpoint("forum", "threads.list")[0], "Threads.List");
    invalid(
      () => findEndpoint("market", "Managing.Steam.GetMafile"),
      /excluded by the read-only policy/,
    );
    invalid(() => findEndpoint("forum", "Nope.Nothing"), /api_list_endpoints/);
  });

  it("fills path parameters and rejects traversal", () => {
    const [, thread] = findEndpoint("forum", "Threads.Get");
    assert.equal(buildRequest(thread, { thread_id: 5 }).path, "/threads/5");
    invalid(() => buildRequest(thread, { thread_id: "../users/me" }), /expects a number/);
    const [, user] = findEndpoint("forum", "Users.Get");
    assert.equal(buildRequest(user, { user_id: "me" }).path, "/users/me");
    invalid(() => buildRequest(user, { user_id: "a/b" }), /must be an ID/);
    invalid(() => buildRequest(user, {}), /Missing required parameters: user_id/);
  });

  it("joins comma-separated arrays, routes bodies and rejects unknown parameters", () => {
    const [, thread] = findEndpoint("forum", "Threads.Get");
    assert.deepEqual(
      buildRequest(thread, { thread_id: 1, fields_include: ["*", "latest_posts"] }).query,
      {
        fields_include: "*,latest_posts",
      },
    );
    const [, search] = findEndpoint("forum", "Search.Threads");
    assert.deepEqual(buildRequest(search, { q: "steam", limit: 5 }), {
      path: "/search/threads",
      query: {},
      body: { q: "steam", limit: 5 },
    });
    const [, results] = findEndpoint("forum", "Search.Results");
    assert.deepEqual(buildRequest(results, { search_id: 77, page: 2 }).query, { page: 2 });
    invalid(() => buildRequest(search, { drop: 1 }), /Unknown parameter "drop"/);
  });
});

describe("endpoint tools", () => {
  it("api_list_endpoints filters the catalog", async () => {
    const { call, requests, close } = await connect(() => json({}));
    const result = await call("api_list_endpoints", {
      service: "market",
      query: "feedback comments",
    });
    assert.deepEqual(
      result.data.market.endpoints.map((item: { operation: string }) => item.operation),
      ["Feedback.Comments.List", "Feedback.Comments.Get"],
    );
    assert.equal(result.data.market.spec_version, CATALOGS.market.version);
    assert.equal(result.data.forum, undefined);
    assert.equal(requests.length, 0);
    await close();
  });

  it("api_describe_endpoint returns documented parameters", async () => {
    const { call, close } = await connect(() => json({}));
    const result = await call("api_describe_endpoint", {
      service: "forum",
      operation: "Posts.List",
    });
    assert.equal(result.data.endpoint, "GET /posts");
    const order = result.data.params.find((param: { name: string }) => param.name === "order");
    assert.deepEqual(order.values, [
      "natural",
      "natural_reverse",
      "post_likes",
      "post_likes_reverse",
    ]);
    await close();
  });

  it("api_call_endpoint calls the API and strips secrets and noise", async () => {
    const { call, requests, close } = await connect(() =>
      json({
        item: {
          item_id: 5,
          title: "Listing",
          loginData: { login: "user", password: "hunter2" },
          canBuyItem: true,
          description_html: "<b>x</b>",
          published_date: 1_700_000_000,
        },
        system_info: { visitor_id: 1 },
      }),
    );
    const result = await call("api_call_endpoint", {
      service: "market",
      operation: "Managing.Get",
      params: { item_id: 5 },
    });
    assert.equal(result.isError, false, result.text);
    assert.equal(requests[0]?.url.pathname, "/5");
    assert.deepEqual(result.data, {
      operation: "Managing.Get",
      endpoint: "GET /5",
      result: {
        item: { item_id: 5, title: "Listing", published_date: "2023-11-14T22:13:20.000Z" },
      },
    });
    assert.doesNotMatch(result.text, /hunter2/);
    await close();
  });

  it("api_call_endpoint sends search bodies with POST", async () => {
    const { call, requests, close } = await connect(() => json({ data: [], data_total: 0 }));
    await call("api_call_endpoint", {
      service: "forum",
      operation: "Search.Posts",
      params: { q: "guide", limit: 3 },
    });
    assert.equal(requests[0]?.method, "POST");
    assert.deepEqual(requests[0]?.body, { q: "guide", limit: 3 });
    await close();
  });

  it("api_call_endpoint returns a preview for oversized results", async () => {
    const big = Array.from({ length: 80 }, (_, i) => ({ thread_id: i, title: "x".repeat(500) }));
    const { call, close } = await connect(() => json({ threads: big }));
    const result = await call("api_call_endpoint", {
      service: "forum",
      operation: "Threads.List",
      params: {},
      max_chars: 1_000,
    });
    assert.equal(result.data.result_too_large, true);
    assert.equal(result.data.preview.length, 1_000);
    assert.match(result.data.hint, /limit/);
    await close();
  });

  it("api_call_endpoint refuses excluded operations without calling the API", async () => {
    const { call, requests, close } = await connect(() => json({}));
    const result = await call("api_call_endpoint", {
      service: "market",
      operation: "Managing.TempEmailPassword",
      params: { item_id: 1 },
    });
    assert.equal(result.data.error.code, "invalid_input");
    assert.equal(requests.length, 0);
    await close();
  });
});
