import type { PageProps } from "$fresh/server.ts";
import PageBuild from "<?relativePath?>";
export default function Page({ props }: { props: PageProps }) {
  return <PageBuild props={props} />;
}
