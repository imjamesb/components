import { Head } from "$fresh/runtime.ts";
import Sidebar, { type SidebarConfig } from "./_/Sidebar.tsx";
import { PageProps } from "$fresh/server.ts";

export default function Page({
  sidebar,
  category,
  children,
  title,
  props,
}: {
  sidebar: SidebarConfig;
  category?: string;
  // deno-lint-ignore no-explicit-any
  children?: any;
  title?: string;
  props: PageProps;
}) {
  return (
    <>
      <Head>
        {title ? <title>{title}</title> : undefined}
      </Head>
      <div class="flex">
        <Sidebar items={sidebar} url={props.url.pathname} />
        <div class="block w-full max-w-screen-lg p-8 overflow-y-auto">
          {category ? <div>{category}</div> : undefined}
          {children}
        </div>
      </div>
    </>
  );
}
