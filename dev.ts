#!/usr/bin/env -S deno run -A --watch=static/,routes/

import type { SidebarConfig } from "./layout/_/Sidebar.tsx";
import type { ServeItem, ServeItemMapping } from "./types.ts";
import dev from "$fresh/dev.ts";
import routes from "./routes.ts";
import { fromFileUrl, join, resolve } from "std/path/mod.ts";

const base = resolve(fromFileUrl(import.meta.resolve("./")));
const baseRoutes = join(base, "routes");
const baseIslands = join(base, "islands");
const srcDir = join(base, "src");

await Deno.remove(baseRoutes, { recursive: true }).catch(() => {});
await Deno.mkdir(baseRoutes, { recursive: true });

await Deno.remove(baseIslands, { recursive: true }).catch(() => {});
await Deno.mkdir(baseIslands, { recursive: true });

function relative(base: string, to: string) {
  return join(to, resolve("/", base).substring(1));
}

interface BuildConfig<C = ServeItem> {
  base: string;
  outRoute: string;
  outIsland: string;
  srcDir: string;
  category?: SidebarConfig[string];
  serveItem: C;
}

const builders: {
  [key in keyof ServeItemMapping]: (
    config: BuildConfig<ServeItemMapping[key]>,
  ) => Promise<void>;
} = {
  file: async (config) => {
    console.log(config);
  },
  markdown: async (config) => {
    console.log(config);
  },
  story: async (config) => {
    console.log(config);
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
  const outRoute = relative(route.outDir, baseIslands);
  let category: undefined | SidebarConfig[string] = undefined;
  if (route.sidebar) {
    category = sidebarConfig[route.sidebar.name] = {
      items: [],
    } as SidebarConfig[string];
    if (route.sidebar.title) category.title = route.sidebar.title;
  }
  for (const serveItem of route.serve) {
    await build({
      outRoute,
      outIsland: baseIslands,
      base,
      srcDir,
      category,
      serveItem,
    });
  }
}

await dev(import.meta.url, "./main.ts");
