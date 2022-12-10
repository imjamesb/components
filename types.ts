export type RoutesDocument = Route[];
export interface Route {
  /** relative path to where the build files should be placed inside routes. */
  outDir: string;
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
}
export interface ServeItemMarkdown {
  type: "markdown";
  layout?: string;
  dir?: string;
  file?: string;
}
export interface ServeItemStory {
  type: "story";
  layout?: string;
  dir?: string;
  file?: string;
}
