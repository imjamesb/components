import type { PageProps, RouteConfig } from "$fresh/server.ts";
import { CSS } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { Head } from "$fresh/runtime.ts";
import Layout from "../layout/DocumentationPage.tsx";
import sidebarConfig from ".sidebar-config";

export const config: RouteConfig = {
  routeOverride: "/docs/introduction",
};

const _category = `Getting Started`;
const _title = `Introduction`;

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
        dangerouslySetInnerHTML={{ __html: `<h1 id="introduction"><a class="anchor" aria-hidden="true" tabindex="-1" href="#introduction"><svg class="octicon octicon-link" viewbox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Introduction</h1><p>A component library for <a href="https://fresh.deno.dev" rel="noopener noreferrer">Deno's Fresh</a>.</p>
` }}
        data-color-mode="light"
        data-light-theme="light"
        data-dark-theme="dark"
        class={"" + "markdown-body"}
      />
    </Layout>
  );
}
