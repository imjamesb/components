import { IS_BROWSER } from "https://deno.land/x/fresh@1.1.2/runtime.ts";
import { tw } from "twind";

export interface SidebarItem {
  name: string;
  to: string;
}

export interface SidebarConfig {
  [key: string]: {
    title?: string;
    items: SidebarItem[];
  };
}

export default function Sidebar(
  { items, url }: { items: SidebarConfig; url: string },
) {
  return (
    <div class="h-screen w-[250px] min-w-[250px] max-w-[250px] border(r-1 gray-300) p-5">
      {Object.entries(items).map(([categoryName, category]) => {
        return (
          <Category
            name={category.title || categoryName}
            items={category.items}
            url={url}
          />
        );
      })}
    </div>
  );
}

function Category(
  { items, name, url }: { items: SidebarItem[]; name: string; url: string },
) {
  return (
    <div class="select-none mt-5 first-child:(mt-0)">
      <div class="font-bold select-none mb-2">{name}</div>
      <div>
        {items.map((item) => (
          <SidebarItem name={item.name} to={item.to} url={url} />
        ))}
      </div>
    </div>
  );
}

function SidebarItem(
  { name, to, url }: { name: string; to: string; url: string },
) {
  return (
    <a href={to}>
      <div
        class={tw`pl-4 pt-1 pb-1 (border(l-2 gray-400) text-gray-700) hover:(border(l-2 gray-800) text-gray-900) ${
          url === to ? "text-blue-600 border-blue-700" : ""
        }`}
      >
        {name}
      </div>
    </a>
  );
}
