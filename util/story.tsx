import type { JSX } from "preact";
export { default as ShowcaseItem } from "../layout/_/ShowcaseItem.tsx";
export { default as Showcase } from "../layout/_/Showcase.tsx";

export type Children =
  | JSX.Element
  | string
  | number
  | boolean
  | null
  | undefined
  | (JSX.Element | string | number | boolean | null | undefined)[];

export class Story<C> {
  title: string;
  description: () => JSX.HTMLAttributes<HTMLDivElement>["children"];
  showcase?: () => JSX.HTMLAttributes<HTMLDivElement>["children"];
  examples: () => JSX.HTMLAttributes<HTMLDivElement>["children"][] = () => [];
  reference: () => JSX.HTMLAttributes<HTMLDivElement>["children"][] = () => [];
  tags: { text: string; className: string }[] = [];

  constructor(options: StoryOptions) {
    this.title = options.title;
    this.description = options.description;
    this.showcase = options.showcase;
    this.examples = options.examples || (() => []);
    this.reference = options.reference || (() => []);
    this.tags = options.tags || [];
    if (options.island) {
      this.tags.unshift({
        text: "Island",
        className:
          "text-sm font-normal inline-block bg-green-200 rounded px-2 mx-2",
      });
    }
  }
}

export interface StoryOptions {
  title: string;
  description: () => JSX.HTMLAttributes<HTMLDivElement>["children"];
  showcase?: () => JSX.HTMLAttributes<HTMLDivElement>["children"];
  examples?: () => JSX.HTMLAttributes<HTMLDivElement>["children"][];
  reference?: () => JSX.HTMLAttributes<HTMLDivElement>["children"][];
  tags?: { text: string; className: string }[];
  island?: boolean;
}

// deno-lint-ignore no-explicit-any
export function story<C extends (options: any) => JSX.Element>(
  options: StoryOptions,
): Story<C> {
  return new Story(options);
}
