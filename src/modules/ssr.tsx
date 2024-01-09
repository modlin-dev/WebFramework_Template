import {
  type ReactDOMServerReadableStream,
  renderToReadableStream,
} from "react-dom/server";
import path from "path";
import { Chalk } from "terminal/chalk";

export async function render(
  name: string
): Promise<string | ReactDOMServerReadableStream> {
  try {
    const Layout = (await import(path.join("../pages", name, "layout")))
      .default;
    const Loading = (await import("../components/loading")).default;
    const App = (await import(path.join("../pages", name, "page"))).default;

    await Bun.build({
      entrypoints: [`src/pages/${name}/script.tsx`],
      outdir: "public/scripts",
      naming: `${name}.min.js`,
      target: "browser",
      minify: true,
    });

    const Stream = await renderToReadableStream(
      <Layout>
        <Loading />
        <App />
        <script src={`/scripts/${name}.min.js`}></script>
      </Layout>
    );

    return Stream;
  } catch {
    return "Server error please refresh the page or contact developers";
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
