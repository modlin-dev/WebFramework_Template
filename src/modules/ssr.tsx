import {
  type ReactDOMServerReadableStream,
  renderToReadableStream,
} from "react-dom/server";
import { join } from "path";
import { Chalk } from "terminal/chalk";

export class Server {
  path: string;
  filename: string;
  constructor(path: string) {
    const dirs = path.split("/");
    this.filename = dirs[dirs.length - 1];
    this.path = join(
      import.meta.dir,
      "../..",
      path,
      `${this.filename}.module.tsx`
    );
  }

  async render(): Promise<string | ReactDOMServerReadableStream> {
    try {
      const Component = (await import(this.path)).default;

      await Bun.build({
        entrypoints: [join(this.path, `${this.filename}.module.tsx`)],
        outdir: "public/scripts",
        naming: `${this.filename}.js`,
      });

      const Stream = await renderToReadableStream(<Component />, {
        bootstrapScripts: [`/scripts/${this.filename}.js`],
      });

      return Stream;
    } catch {
      return "Server error please refresh or contact the developer!";
    }
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
    return Chalk.Forground.Blue(`wss://${hostname}:${port}`);
  }
  if (protocol === "http") {
    return Chalk.Forground.Cyan(`http://${hostname}:${port}`);
  }

  return Chalk.Forground.Red(`https://${hostname}:${port}`);
}
