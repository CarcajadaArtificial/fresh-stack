import { useSignal } from "@preact/signals";
import { define } from "../utils.ts";
import Counter from "../islands/Counter.tsx";
import Logo from "../components/Logo.tsx";

export default define.page(function Home() {
  const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <Logo size={164} />
        <div class="prose text-center mt-2-1">
          <h1>Welcome to Fresh Lunchbox</h1>
          <p>
            Try updating this message in the
            <code class="ml-1">./routes/index.tsx</code> file, and refresh.
          </p>
        </div>
        <Counter count={count} />
      </div>
    </div>
  );
});
