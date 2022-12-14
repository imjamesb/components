import type { PageProps, RouteConfig } from "$fresh/server.ts";
import PageBuild from "../islands/<?hash?>.tsx";

export const config: RouteConfig = {
  routeOverride: "<?pattern?>",
};
export default function Page(props: PageProps) {
  return <PageBuild props={props} />;
}
