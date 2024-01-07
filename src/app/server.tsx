import { Elysia, t as T } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Chalk } from "terminal/chalk";
import { Gradient, rgb } from "terminal/gradient";
import logger from "terminal/logger";
import { renderToReadableStream, renderToString } from "react-dom/server";
import NotFound from "../pages/not_found/not_found";
import Root from "../pages/root/root";

const app = new Elysia()
  .use(cors())
  .use(staticPlugin({ prefix: "/" }))
  .get("/", async ({ set }) => {
    await Bun.build({
      entrypoints: ["src/pages/root/root.module.tsx"],
      outdir: "public/scripts",
      naming: "root.js",
    });

    const Stream = await renderToReadableStream(<Root />);
    set.status = 200;
    return new Response(Stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .get(
    "/styles/:stylesheet",
    ({ params }) => Bun.file(`src/styles/${params.stylesheet}`),
    {
      params: T.Object({
        stylesheet: T.String(),
      }),
    }
  )
  .all("/404", async ({ set }) => {
    await Bun.build({
      entrypoints: ["src/pages/not_found/not_found.module.tsx"],
      outdir: "public/scripts",
      naming: "not_found.js",
    });

    const Stream = renderToString(<NotFound />);
    set.status = 404;
    return new Response(Stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .listen(3000, (server) => {
    logger.debug(
      `${new Gradient({
        colors: [rgb(129, 140, 248), rgb(192, 132, 252)],
        midpoint: 10,
        text: "Elysia",
      }).toForgroundText(
        "Elysia"
      )} servers are running at\n${Chalk.Forground.Cyan(
        `http://${server.hostname}:${server.port}`
      )}, ${Chalk.Forground.Magenta(`ws://${server.hostname}:${server.port}`)}`
    );
  });

export type App = typeof app;
