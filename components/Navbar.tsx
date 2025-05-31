import Logo from "@/components/Logo.tsx";

export default function () {
  return (
    <div class="top-0 sticky z-10 bg-base-100 noise layout">
      <nav class="navbar col-span-full items-center gap-3-4 min-h-2-1 pr-3-4">
        <a tabIndex={0} class="inline-flex gap-1-4" href="./">
          <span class="relative top-1-8">
            <Logo size={18} />
          </span>
          <span class="link">
            Lunchbox
          </span>
        </a>
        <div class="flex-1" />
        <a tabIndex={0} class="link" href="/md">Markdown</a>
      </nav>
    </div>
  );
}
