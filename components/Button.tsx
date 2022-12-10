import type { JSX } from "preact";
import type colors from "./_/theme.ts";
import { take } from "./_/util.ts";
import { tw } from "twind";

export interface ButtonOptions {
  variant: "primary" | "secondary";
  color: keyof typeof colors;
}

const buttonStyles: Record<
  Exclude<ButtonOptions["variant"], undefined>,
  (color: ButtonOptions["color"]) => string
> = {
  primary: (color) =>
    tw`text-white (bg-${color}-500 border(2 solid ${color}-500)) (hover:(bg-${color}-600 border-${color}-600)) (focus:(bg-${color}-600 border-${color}-600)) (active:(bg-${color}-800 border-${color}-800))`,
  secondary: (color) =>
    tw`bg-transparent (text-${color}-500 border(2 solid ${color}-500)) (hover:(text-${color}-600 border-${color}-600 bg-${color}-100)) (focus:(text-${color}-600 border-${color}-600 bg-${color}-100)) (active:(text-${color}-800 border-${color}-800 bg-${color}-200))`,
};

export default function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement> & Partial<ButtonOptions>,
) {
  const clone = { ...props };
  const variant = take(clone, "variant");
  const color = take(clone, "color");
  return (
    <button
      {...clone}
      class={tw`${
        buttonStyles[variant || "primary"](color || "blue")
      } transition-colors pr-2 pl-2 pt-1 pb-1 rounded-lg focus:outline-none ${props.class} ${props.className}`}
    />
  );
}
