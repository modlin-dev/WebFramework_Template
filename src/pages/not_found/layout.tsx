import type { Metadata } from "next";
import "../../styles/tailwind.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Opps, seems like you entered the wrong page!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title?.toString() ?? "ElysiaJS"}</title>
        <meta
          name="description"
          content={
            metadata.description?.toString() ?? "Ergonomic Framework for Humans"
          }
        />
        <link
          rel="icon"
          href={metadata.icons?.toString() ?? "favicon.ico"}
          type="image/x-icon"
        />
        <link rel="stylesheet" href="/styles/tailwind.css" />
        <script src="/scripts/htmx.min.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}