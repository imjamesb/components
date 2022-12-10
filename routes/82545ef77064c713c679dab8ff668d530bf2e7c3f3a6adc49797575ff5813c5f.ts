import { Handlers } from "$fresh/server.ts";
import { RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  routeOverride: "/x/:path*",
};

export const handler: Handlers = {
  GET(_, ctx) {
    return Response.redirect(
      new URL(
        "https://deno.land/x/component/" + ctx.params.path,
      ),
      307,
    );
  },
};
