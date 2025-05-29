import Logo from "@/components/Logo.tsx";

export default function () {
  return (
    <nav class="top-2-1 sticky z-10 navbar glass rounded px-1-1 items-center">
      <div class="flex-1">
        <a class="inline-flex gap-1-4 px-1-8" href="./">
          <Logo size={24} />
          <span class="link">
            Lunchbox
          </span>
        </a>
      </div>
      <div class="flex-none pr-1-2 flex gap-1-2">
        <a class="link" href="/md">Markdown</a>
      </div>
    </nav>
  );
}
