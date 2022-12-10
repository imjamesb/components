import type { JSX } from "preact";
import { tw } from "twind";

export default function Showcase(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const children = props["children"];
  return (
    <div
      class={tw`relative mt-10 bg-gray-50 border(1 gray-300) rounded-lg`}
    >
      <div
        class={tw`absolute h-full w-full opacity-10`}
        style={`background-position: calc(100% + 5px) calc(100% + 29px); background-image: url(/grid.svg);`}
      />
      <div class={tw`relative space-y-3 py-20 px-10`}>
        <div class={tw`grid grid-cols-1 gap-12 mx-auto`}>
          {(Array.isArray(children) ? children : [children]).map((child) => (
            <div class="space-y-3">{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
