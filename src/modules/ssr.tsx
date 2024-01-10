import path from "path";
import { Chalk } from "terminal/chalk";
import { renderToString } from "solid-js/web";
import React from "react";

export async function render(name: string): Promise<Response> {
  try {
    const Layout = (await import(path.join("../pages", name, "layout"))).default;
    const Loading = (await import("../components/loading")).default;
    const App = (await import(path.join("../pages", name, "page"))).default;

    /*
    await Bun.build({
      entrypoints: [`src/pages/${name}/script.tsx`],
      outdir: "public/scripts",
      naming: `${name}.min.js`,
      target: "browser",
      minify: true
    });
    */

    const component = (
      <Layout>
        <Loading />
        <App />
      </Layout>
    );
    const html = renderToString(() => (
      <Layout>
        <Loading />
        <App />
      </Layout>
    ));
    console.log(component);
    // <script src={`/scripts/${name}.min.js`} />

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" }
    });
  } catch (e) {
    console.error(e);
    return new Response("Server error please refresh the page or contact developers", {
      status: 500
    });
  }
}
export function URL(
  protocol: "ws" | "wss" | "http" | "https",
  hostname: string,
  port: number
): string {
  if (protocol === "ws") {
    return Chalk.Forground.Magenta(`ws://${hostname}:${port}`);
  }
  if (protocol === "wss") {
    return Chalk.Forground.Orange(`wss://${hostname}:${port}`);
  }
  if (protocol === "http") {
    return Chalk.Forground.Cyan(`http://${hostname}:${port}`);
  }

  return Chalk.Forground.Red(`https://${hostname}:${port}`);
}
