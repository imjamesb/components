import { RoutesDocument } from "./types.ts";

export default [
  { serve: [{ type: "file", file: "/index.tsx", route: "/" }] },
  {
    serve: [{
      type: "file",
      file: "/deno-import-intellisense.ts",
      route: "/.well-known/deno-import-intellisense.json",
      manual: true,
    }],
  },
  {
    sidebar: { name: "getting-started", title: "Getting Started" },
    serve: [{
      type: "markdown",
      layout: "./layout/DocumentationPage.tsx",
      dir: "/docs",
    }],
  },
  {
    sidebar: { name: "components", title: "Components" },
    serve: [{
      type: "story",
      dir: "/stories",
      layout: "./layout/DocumentationPage.tsx",
    }],
  },
] as RoutesDocument;
