import { RoutesDocument } from "./types.ts";

export default [
  {
    serve: [
      { type: "file", file: "/other/index.tsx", route: "/" },
      { type: "file", file: "/other/intellisense.ts", manual: true },
      { type: "file", file: "/other/module.ts", manual: true },
      { type: "file", file: "/other/moduleVersion.ts", manual: true },
      { type: "redirect", pattern: "/docs", to: "/docs/introduction" },
    ],
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
    sidebar: { name: "component", title: "Components" },
    serve: [{
      type: "story",
      dir: "/",
      prefix: "/component",
      categoryName: "component",
    }],
  },
] as RoutesDocument;
