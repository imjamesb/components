import type { RouteConfig } from "$fresh/server.ts";
import PageBuild from "../islands/<?hash?>.tsx";
export const config: RouteConfig = {
  routeOverride: "<?pattern?>",
};
export default function Page() {
  return <PageBuild />;
}
