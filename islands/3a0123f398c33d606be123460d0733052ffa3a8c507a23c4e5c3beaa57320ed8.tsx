import type { PageProps } from "$fresh/server.ts";
import PageBuild from "../src/other/index.tsx";
export default function Page({ props }: { props: PageProps }) {
  return <PageBuild props={props} />;
}
