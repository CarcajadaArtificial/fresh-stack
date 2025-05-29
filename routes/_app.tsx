import type { PageProps } from "fresh";
import Navbar from "@/components/Navbar.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>stack</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="max-w-4xl mx-auto mt-2-1">
          <Navbar />
          <div class="mt-2-1">
            <Component />
          </div>
        </div>
      </body>
    </html>
  );
}
