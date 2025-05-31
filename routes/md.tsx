import { define } from "@/utils.ts";
import { md } from "@lunchbox/ui";

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
            focusable: true,
            renderOptions: {},
          })}
        />
      </div>
    </main>
  );
});
