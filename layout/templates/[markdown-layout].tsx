import type { PageProps, RouteConfig } from "$fresh/server.ts";
import { CSS } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { Head } from "$fresh/runtime.ts";
import Layout from "<?relativeLayoutPath?>";
import sidebarConfig from ".sidebar-config";

export const config: RouteConfig = {
  routeOverride: "<?route?>",
};

const _category = `<?category?>`;
const _title = `<?title?>`;

export default function Page(props: PageProps) {
  return (
    <Layout
      sidebar={sidebarConfig}
      category={_category ? _category : undefined}
      props={props}
    >
      <Head>
        {_title ? <title>{_title}</title> : undefined}
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <div
        dangerouslySetInnerHTML={{ __html: `<?content?>` }}
        data-color-mode="light"
        data-light-theme="light"
        data-dark-theme="dark"
        class={"" + "markdown-body"}
      />
    </Layout>
  );
}
