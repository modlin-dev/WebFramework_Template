import { Elysia, t as T } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Chalk } from "terminal/chalk";
import { Gradient, rgb } from "terminal/gradient";
import logger from "terminal/logger";
import { renderToReadableStream, renderToString } from "react-dom/server";
import NotFound from "../pages/not_found/not_found";
import Root from "../pages/root/root";
import { createElement } from "react";

const app = new Elysia()
  .use(cors()) // Enables CORS
  .use(staticPlugin({ prefix: "/" })) // Projects a Directory
  .get("/", async ({ set }) => {
    await Bun.build({
      entrypoints: ["src/pages/root/root.module.tsx"],
      outdir: "public/scripts",
      naming: "root.js",
    }); // Bundles hydrated code to JS
    const Stream = renderToString(<Root />); // Converts JSX code to string

    return new Response(Stream, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    }); // Tells the Client "Hey, look this is a html text you should render this"
  }) // Homepage
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
    }); // Bundles hydrated code to JS
    const Stream = await renderToReadableStream(createElement(NotFound)); // Converts JSX code to string

    return new Response(Stream, {
      status: 404,
      headers: { "Content-Type": "text/html" },
    }); // Tells the Client "Hey, look this is a html text you should render this"
  }) // 404 Page
  .listen(3000, (server) => {
    function URL(
      protocol: "ws" | "wss" | "http" | "https",
      hostname: string,
      port: number
    ) {
      if (protocol === "ws")
        return Chalk.Forground.Magenta(`ws://${hostname}:${port}`);
      if (protocol === "wss")
        return Chalk.Forground.Blue(`wss://${hostname}:${port}`);
      if (protocol === "http")
        return Chalk.Forground.Cyan(`http://${hostname}:${port}`);

      return Chalk.Forground.Red(`https://${hostname}:${port}`);
    }

    const Elysia = new Gradient({
      colors: [rgb(129, 140, 248), rgb(192, 132, 252)],
      midpoint: 10,
      text: "Elysia",
    });

    logger.custom(
      "[ModlinJS]",
      `${Elysia.toForgroundText("Elysia")} is ready in ${
        Date.now() - logger.ptime
      } ms`
    );
    logger.custom(
      "          ",
      URL("ws", server.hostname, server.port),
      "\n            ",
      URL("wss", server.hostname, server.port)
    );
    logger.custom(
      "          ",
      URL("http", server.hostname, server.port),
      "\n            ",
      URL("https", server.hostname, server.port)
    );
  });

export type App = typeof app;
