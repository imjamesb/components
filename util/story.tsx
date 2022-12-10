import type { JSX } from "preact";

type Children =
  | JSX.Element
  | string
  | number
  | boolean
  | symbol
  | null
  | undefined
  | (JSX.Element | string | number | boolean | symbol | null | undefined)[];

export class Story<C> {
  title: Children;
  description: Children;
  showcase: Children;
  examples: Children[] = [];
  reference: Children[] = [];
}

// deno-lint-ignore no-explicit-any
export function story<C extends (options: any) => JSX.Element>(
  _component: C,
): Story<C> {
  return new Story();
}

// deno-lint-ignore no-explicit-any
export function Title<S extends Story<any>>(
  {
    for: component,
    children,
  }: {
    for: S;
    children?: Children;
  },
) {
  component.title = children;
  return <></>;
}

// deno-lint-ignore no-explicit-any
export function Description<S extends Story<any>>(
  {
    for: component,
    children,
  }: {
    for: S;
    children?: Children;
  },
) {
  component.description = children;
  return <></>;
}

// deno-lint-ignore no-explicit-any
export function Showcase<S extends Story<any>>(
  {
    for: component,
    children,
  }: {
    for: S;
    children: JSX.Element | JSX.Element[];
  },
) {
  component.showcase = children;
  // todo(james bradlee): build a showcase component.
  return <></>;
}

export function ShowcaseItem({ children, title }: {
  children: JSX.Element | JSX.Element[];
  title: string;
}) {
  // todo(james bradlee): build a showcase item component.
  return <></>;
}

// deno-lint-ignore no-explicit-any
export function Example<S extends Story<any>>(
  {}: {
    for: S;
    children?: Children;
  },
) {
  return <></>;
}

// deno-lint-ignore no-explicit-any
export function Island<S extends Story<any>>(
  {}: {
    for: S;
  },
) {
  return <></>;
}
