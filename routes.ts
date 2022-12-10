import { RoutesDocument } from "./types.ts";

export default [
  {
    outDir: "/",
    serve: [{ type: "file", file: "/index.tsx", route: "/" }],
  },
  {
    outDir: "/docs",
    sidebar: { name: "getting-started", title: "Getting Started" },
    serve: [{
      type: "markdown",
      layout: "./layout/DocumentationPage.tsx",
      dir: "/docs",
    }],
  },
  {
    outDir: "/docs",
    sidebar: { name: "components", title: "Components" },
    serve: [{
      type: "story",
      dir: "/stories",
      layout: "./layout/DocumentationPage.tsx",
    }],
  },
] as RoutesDocument;
