import { define } from "@/utils.ts";
import Markdown from "@/components/Markdown.tsx";

const CONTENT_URL =
  "https://raw.githubusercontent.com/denoland/deno-gfm/refs/heads/main/example/content.md";

export default define.page(async function Md() {
  return (
    <main>
      <Markdown content={await (await fetch(CONTENT_URL)).text()} />
    </main>
  );
});
