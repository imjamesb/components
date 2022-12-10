import type { PageProps, RouteConfig } from "$fresh/server.ts";
import PageBuild from "../islands/9eb12cc1cc5294076a08d37475dbe9bfbbe51c2cef5f439cee6fd2ce7ee0f659.tsx";

export const config: RouteConfig = {
  routeOverride: "/component/button",
};
export default function Page(props: PageProps) {
  return <PageBuild props={props} />;
}
