import { define } from "@/utils.ts";
import { md } from "@lunchbox/ui";
import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";

const CONTENT_URL =
  "https://raw.githubusercontent.com/denoland/deno-gfm/refs/heads/main/example/content.md";

export default define.page(async function Md() {
  return (
    <main class="layout">
      <div class="col-span-6 lg:col-span-9 mt-2-1">
        <div
          class="prose"
          {...md({
            content: await (await fetch(CONTENT_URL)).text(),
            renderOptions: {},
            transform: (content: string) => {
              const doc = new DOMParser().parseFromString(content, "text/html");
              const body = doc.body;
              Array.from(body.children).forEach((el) => {
                if (!(el instanceof Element)) return;
                else if (
                  el.tagName.toLowerCase() === "details" &&
                  el.querySelector("summary") instanceof Element
                ) {
                  el.querySelector("summary")!.setAttribute("tabindex", "0");
                } else {
                  el.setAttribute("tabindex", "0");
                }
              });
              return body.innerHTML;
            },
          })}
        />
      </div>
    </main>
  );
});
