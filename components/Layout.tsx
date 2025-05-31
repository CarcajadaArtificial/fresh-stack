import { cn } from "@vyn/cn";
import { ComponentChild } from "preact";

export default function (props: { children: ComponentChild }) {
  return (
    <div
      class={cn(
        "grid",
        "grid-cols-6 lg:grid-cols-12",
        "gap-1-2 md:gap-1-1",
        "mx-1-2 md:mx-1-1 lg:mx-[20%]",
      )}
    >
      {props.children}
    </div>
  );
}
