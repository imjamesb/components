#!/usr/bin/env -S deno run -A --watch=static/,routes/

import type { SidebarConfig } from "./layout/_/Sidebar.tsx";
import type {
  ServeItem,
  ServeItemMapping,
  ServeItemMarkdownDir,
  ServeItemMarkdownFile,
} from "./types.ts";
import dev from "$fresh/dev.ts";
import routes from "./routes.ts";
import {
  extname,
  fromFileUrl,
  join,
  relative as _relativeTo,
  resolve,
} from "std/path/mod.ts";
import { expandGlob } from "std/fs/expand_glob.ts";
import { parseTemplateFromFile } from "./util/templates.ts";
import { parse } from "https://deno.land/x/frontmatter@v0.1.5/mod.ts";
import { render } from "https://deno.land/x/gfm@0.1.26/mod.ts";

const base = resolve(fromFileUrl(import.meta.resolve("./")));
const baseRoutes = join(base, "routes");
const baseIslands = join(base, "islands");
const srcDir = join(base, "src");

await Deno.remove(baseRoutes, { recursive: true }).catch(() => {});
await Deno.remove(baseIslands, { recursive: true }).catch(() => {});

await Deno.mkdir(baseRoutes, { recursive: true });
await Deno.mkdir(baseIslands, { recursive: true });

function relative(base: string, to: string) {
  if (to.startsWith(base + "/")) return to;
  return join(base, resolve("/", to).substring(1));
}

function relativeTo(from: string, to: string): string {
  const path = _relativeTo(from, to);
  if (
    path.substring(0, 3) === "../" ||
    path.substring(0, 2) === "./"
  ) return path;
  return "./" + path;
}

interface BuildConfig<C = ServeItem> {
  base: string;
  outRoute: string;
  outIsland: string;
  srcDir: string;
  category?: SidebarConfig[string];
  serveItem: C;
}

const e = new TextEncoder();
async function sha2(contents: string): Promise<string> {
  return [
    ...new Uint8Array(
      await crypto.subtle.digest({ name: "SHA-256" }, e.encode(contents)),
    ),
  ].map((n) => n.toString(16).padStart(2, "0")).join("");
}

const fileRouteTmpl = await parseTemplateFromFile<"hash" | "pattern">(
  "./layout/templates/[file-route].tsx",
);
const fileIslandTmpl = await parseTemplateFromFile<"relativePath">(
  "./layout/templates/[file-island].tsx",
);
const mdTmpl = await parseTemplateFromFile<
  "content" | "title" | "relativeLayoutPath" | "category" | "route"
>(
  "./layout/templates/[markdown-layout].tsx",
);
const storyTmpl = await parseTemplateFromFile(
  "./layout/templates/[story].tsx",
);

const builders: {
  [key in keyof ServeItemMapping]: (
    config: BuildConfig<ServeItemMapping[key]>,
  ) => Promise<void>;
} = {
  file: async (config) => {
    const item = { ...config.serveItem };
    item.file = relative(config.srcDir, item.file);
    const hash = await sha2(item.file);
    if (item.manual !== true) {
      await Deno.writeTextFile(
        join(config.outIsland, hash + extname(item.file)),
        fileIslandTmpl({
          relativePath: relativeTo(config.outIsland, item.file),
        }),
      );
      item.route = item.route.toLowerCase();
      await Deno.writeTextFile(
        join(config.outRoute, hash + extname(item.file)),
        fileRouteTmpl({ hash, pattern: item.route }),
      );
      if (item.sidebarItemTitle && config.category) {
        config.category.items.push({
          to: item.route,
          name: item.sidebarItemTitle,
        });
      }
    } else {
      await Deno.copyFile(
        item.file,
        join(config.outRoute, hash + extname(item.file)),
      );
    }
    console.log(
      "Build (file ): %s -> %s",
      relativeTo(config.base, item.file),
      item.route,
    );
  },
  markdown: async (config) => {
    const item = { ...config.serveItem };
    // deno-lint-ignore no-explicit-any
    if ((item as any).dir) {
      // deno-lint-ignore no-explicit-any
      (item as any).dir = relative(config.srcDir, (item as any).dir);
    }
    // deno-lint-ignore no-explicit-any
    if ((item as any).file) {
      // deno-lint-ignore no-explicit-any
      (item as any).file = relative(config.srcDir, (item as any).file);
    }
    // deno-lint-ignore no-explicit-any
    if ((item as any).dir && (item as any).file) {
      throw new Error("Either use file or dir, not both (on md)!");
    }
    item.layout = relative(
      config.base,
      item.layout || "./layout/DocumentationPage.ts",
    );
    // deno-lint-ignore no-explicit-any
    if ((item as any).dir) {
      const i = item as ServeItemMarkdownDir;
      for await (
        const entry of expandGlob(
          join(i.dir, "**/*.md"),
        )
      ) {
        if (!entry.isFile) continue;
        const proposedUrl = "/" +
          _relativeTo(config.srcDir, entry.path).slice(0, -3);
        await builders.markdown({
          ...config,
          serveItem: {
            ...item,
            dir: undefined,
            file: entry.path,
            route: proposedUrl,
          },
        });
      }
    } else {
      const i = item as ServeItemMarkdownFile;
      const mdFile = parse(await Deno.readTextFile(i.file)) as {
        // deno-lint-ignore no-explicit-any
        data: any;
        content: string;
      };
      mdFile.data = mdFile.data || {};
      mdFile.content = render(mdFile.content);
      const hash = await sha2(i.file);
      i.route = (mdFile.data.route || i.route || "").toLowerCase();
      if (!i.route) {
        console.debug(i);
        throw new Error("No route to file!");
      }
      i.categoryName = i.categoryName || mdFile.data.category;
      i.title = i.title || mdFile.data.title;
      let categoryTitle = mdFile.data.categoryTitle;
      if (i.categoryName && i.categoryName in sidebarConfig) {
        if (categoryTitle) {
          sidebarConfig[i.categoryName].title = categoryTitle;
        }
        categoryTitle = sidebarConfig[i.categoryName].title || i.categoryName;
      } else if (i.categoryName && !(i.categoryName in sidebarConfig)) {
        const config = sidebarConfig[i.categoryName] = {
          items: [],
        } as SidebarConfig[string];
        if (categoryTitle) {
          config.title = categoryTitle;
        }
      }
      if (i.categoryName && i.categoryName in sidebarConfig && i.title) {
        sidebarConfig[i.categoryName].items.push({
          name: i.title,
          to: i.route,
        });
      }
      await Deno.writeTextFile(
        relative(config.outRoute, hash + ".tsx"),
        mdTmpl({
          content: mdFile.content,
          title: mdFile.data.title || i.route,
          relativeLayoutPath: relativeTo(config.outRoute, i.layout!),
          category: categoryTitle || "",
          route: i.route,
        }),
      );
      console.log(
        "Build (md   ): %s -> %s",
        relativeTo(config.base, i.file),
        i.route,
      );
    }
  },
  story: async (config) => {
  },
};

async function build(config: BuildConfig) {
  if (!(config.serveItem.type in builders)) {
    throw new Error(`${config.serveItem.type} is not a valid build type!`);
  }
  // deno-lint-ignore no-explicit-any
  await builders[config.serveItem.type](config as any);
}

const sidebarConfig: SidebarConfig = {};
for (const route of routes) {
  let category: undefined | SidebarConfig[string] = undefined;
  if (route.sidebar) {
    category = sidebarConfig[route.sidebar.name] = {
      items: [],
    } as SidebarConfig[string];
    if (route.sidebar.title) category.title = route.sidebar.title;
  }
  for (const serveItem of route.serve) {
    await build({
      outRoute: baseRoutes,
      outIsland: baseIslands,
      base,
      srcDir,
      category,
      serveItem,
    });
  }
}

await Deno.writeTextFile(
  ".sidebar.ts",
  `import type { SidebarConfig } from "./layout/_/Sidebar.tsx";
export default ${JSON.stringify(sidebarConfig)} as SidebarConfig;
`,
);

await dev(import.meta.url, "./main.ts");
