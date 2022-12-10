import { Head } from "$fresh/runtime.ts";
import Sidebar, { type SidebarConfig } from "./_/Sidebar.tsx";

export default function Page({
  sidebar,
  category,
  children,
  title,
}: {
  sidebar: SidebarConfig;
  category: string;
  // deno-lint-ignore no-explicit-any
  children?: any;
  title?: string;
}) {
  return (
    <>
      <Head>
        {title ? <title>{title}</title> : undefined}
      </Head>
      <div>
        <Sidebar items={sidebar} />
        <div>
          <div>{category}</div>
          {children}
        </div>
      </div>
    </>
  );
}
