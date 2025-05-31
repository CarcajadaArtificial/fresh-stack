import type { PageProps } from "fresh";
import Navbar from "@/components/Navbar.tsx";
import KeynavStart from "@/islands/KeynavStart.tsx";

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
        <Navbar />
        <Component />
        <KeynavStart padding={100} />
      </body>
    </html>
  );
}
