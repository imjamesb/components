import { Handlers } from "$fresh/server.ts";
import { RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/.well-known/deno-import-intellisense.json",
};

export const handler: Handlers = {
  GET(_, __) {
    return doc.clone();
  },
};

const doc = new Response(
  JSON.stringify({
    version: 2,
    registries: [{
      schema: "/x/:module([a-z0-9_]+)@:version?/:path*",
      variables: [{
        key: "version",
        documentation:
          "https://apiland.deno.dev/completions/resolve/component/${{version}}",
        url:
          "https://apiland.deno.dev/completions/items/component/${{version}}",
      }, {
        key: "path",
        documentation:
          "https://apiland.deno.dev/completions/resolve/component/${{version}}/${path}",
        url:
          "https://apiland.deno.dev/completions/items/component/${{version}}/${path}",
      }],
    }, {
      schema: "/x/:path*",
      variables: [{
        key: "path",
        documentation:
          "https://apiland.deno.dev/completions/resolve/component/__latest__/${path}",
        url:
          "https://apiland.deno.dev/completions/items/component/__latest__/${path}",
      }],
    }],
  }),
  {
    status: 200,
    statusText: "Ok",
    headers: {
      "content-type": "application/json",
    },
  },
);
