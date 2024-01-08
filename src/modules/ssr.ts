import { renderToReadableStream } from "react-dom/server";
import Root from "../pages/root/root";
import { createElement } from "react";

export async function render(
  element: () => JSX.Element,
  target: Element | Document | DocumentFragment,
  response?: ResponseInit
) {
  await Bun.build({
    entrypoints: ["src/pages/root/root.module.tsx"],
    outdir: "public/scripts",
    naming: "root.js",
  }); // Bundles hydrated code to JS
  const Stream = await renderToReadableStream(createElement(Root)); // Converts JSX code to string

  return new Response(Stream, response); // Tells the Client "Hey, look this is a html text you should render this"
}
