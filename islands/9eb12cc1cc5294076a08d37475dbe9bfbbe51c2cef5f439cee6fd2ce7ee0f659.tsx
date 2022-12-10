import type { PageProps } from "$fresh/server.ts";
import type { Story } from "story";
import _story from "../src/Button.story.tsx";
import Layout from "../layout/DocumentationPage.tsx";
import { CSS } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { Head } from "$fresh/runtime.ts";
import sidebarConfig from ".sidebar-config";
import { tw } from "twind";

// deno-lint-ignore no-explicit-any
const story = _story as unknown as Story<any>;

const _category = `Components`;
const _title = `Button`;

export default function Page({ props }: { props: PageProps }) {
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
        class={"" + "markdown-body"}
        data-color-mode="light"
        data-light-theme="light"
        data-dark-theme="dark"
      >
        <h1 class="flex items-center">
          {story.title}
          {story.tags.map((tag) => {
            return (
              <span class={tw`${tag.className} select-none`}>{tag.text}</span>
            );
          })}
        </h1>
        {story.description?.()}
        {story.showcase?.()}
      </div>
    </Layout>
  );
}
