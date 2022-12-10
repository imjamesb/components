import type { JSX } from "preact";
import { take } from "../util/componentUtil.ts";

export interface ButtonOptions {
  importance?: "primary" | "secondary";
}

export default function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement> & ButtonOptions,
) {
  const importance = take(props, "importance");
  return (
    <button
      {...props}
    />
  );
}
