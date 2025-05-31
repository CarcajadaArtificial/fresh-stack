import { render, Renderer } from "@deno/gfm";
import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";
import { z } from "zod/v4";

export const MarkdownSchema = z.object({
  focusable: z.boolean().optional(),
  content: z
    .string(),
  renderOptions: z
    .object({
      baseUrl: z
        .string().optional(),
      mediaBaseUrl: z
        .string().optional(),
      inline: z
        .boolean().optional(),
      allowIframes: z
        .boolean().optional(),
      allowMath: z
        .boolean().optional(),
      disableHtmlSanitization: z
        .boolean().optional(),
      renderer: z
        .instanceof(Renderer).optional(),
      allowedClasses: z
        .object().optional(),
      allowedTags: z
        .array(z.string()).optional(),
      allowedAttributes: z
        .record(z.string(), z.array(z.string()))
        .optional(),
      breaks: z
        .boolean().optional(),
    }).optional(),
});

export type MarkdownProps = z.infer<typeof MarkdownSchema>;

export default function (props: MarkdownProps) {
  let content = render(props.content, props.renderOptions);

  if (props.focusable) {
    const doc = new DOMParser().parseFromString(content, "text/html");
    if (doc) {
      const body = doc.body;
      Array.from(body.children).forEach((el) => {
        if (el instanceof Element) {
          el.setAttribute("tabindex", "0");
        }
      });
      content = body.innerHTML;
    }
  }

  return (
    <div
      class="prose"
      // deno-lint-ignore react-no-danger
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
