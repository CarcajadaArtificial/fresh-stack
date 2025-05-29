import { render, Renderer } from "@deno/gfm";
import { z } from "zod/v4";

export const MarkdownSchema = z.object({
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
  return (
    <div
      class="prose"
      // deno-lint-ignore react-no-danger
      dangerouslySetInnerHTML={{
        __html: render(props.content, props.renderOptions),
      }}
    />
  );
}
