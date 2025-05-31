import { define } from "@/utils.ts";
import Markdown from "@/components/Markdown.tsx";
import Layout from "@/components/Layout.tsx";

const CONTENT_URL =
  "https://raw.githubusercontent.com/denoland/deno-gfm/refs/heads/main/example/content.md";

export default define.page(async function Md() {
  return (
    <Layout>
      <main class="col-span-6 lg:col-span-9 mt-2-1">
        <Markdown content={await (await fetch(CONTENT_URL)).text()} />
      </main>
    </Layout>
  );
});
