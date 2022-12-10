import { Handler, RouteConfig } from "$fresh/server.ts";

const pattern = `<?pattern?>`;
const redirectUrl = `<?url?>`;
const status = parseInt("<?status?>") || 307;

export const config: RouteConfig = {
  routeOverride: pattern,
};

export const handler: Handler = (req) => {
  return Response.redirect(new URL(redirectUrl, req.url), status);
};
