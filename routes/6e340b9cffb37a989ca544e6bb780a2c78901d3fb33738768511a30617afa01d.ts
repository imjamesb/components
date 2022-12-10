import { Handler, RouteConfig } from "$fresh/server.ts";

const pattern = `/docs`;
const redirectUrl = `/docs/introduction`;
const status = parseInt("307") || 307;

export const config: RouteConfig = {
  routeOverride: pattern,
};

export const handler: Handler = (req) => {
  return Response.redirect(new URL(redirectUrl, req.url), status);
};
