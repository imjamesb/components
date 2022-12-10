import type { PageProps, RouteConfig } from "$fresh/server.ts";
import PageBuild from "../islands/3a0123f398c33d606be123460d0733052ffa3a8c507a23c4e5c3beaa57320ed8.tsx";

export const config: RouteConfig = {
  routeOverride: "/",
};
export default function Page(props: PageProps) {
  return <PageBuild props={props} />;
}
