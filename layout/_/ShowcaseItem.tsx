import type { JSX } from "preact";
import { tw } from "twind";

export interface ShowcaseItemOptions {
  title: string;
}

export default function Showcase(
  props:
    & Pick<JSX.HTMLAttributes<HTMLDivElement>, "children">
    & ShowcaseItemOptions,
) {
  return (
    <div>
      <p class="text-slate-500 text-sm text-center font-mono">{props.title}</p>
      <div class="flex justify-center">{props.children}</div>
    </div>
  );
}
