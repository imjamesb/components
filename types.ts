export type RoutesDocument = Route[];
export interface Route {
  // /** relative path to where the build files should be placed inside routes. */
  // outDir: string;
  sidebar: SidebarConfig;
  serve: ServeItem[];
}
export interface SidebarConfig {
  name: string;
  title?: string;
}
export interface ServeItemMapping {
  file: ServeItemFile;
  markdown: ServeItemMarkdown;
  story: ServeItemStory;
}
export type ServeItem = ServeItemMapping[keyof ServeItemMapping];
export interface ServeItemFile {
  type: "file";
  file: string;
  route: string;
  sidebarItemTitle?: string;
  manual?: boolean;
}
export interface ServeItemMarkdownDir {
  type: "markdown";
  layout?: string;
  dir: string;
}
export interface ServeItemMarkdownFile {
  type: "markdown";
  layout?: string;
  file: string;
  categoryName?: string;
  route?: string;
  title?: string;
}
export type ServeItemMarkdown = ServeItemMarkdownDir | ServeItemMarkdownFile;
export interface ServeItemStory {
  type: "story";
  layout?: string;
  dir?: string;
  file?: string;
}
