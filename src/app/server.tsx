import { Elysia, t as T } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Gradient, rgb } from "terminal/gradient";
import logger from "terminal/logger";
import { URL, render } from "../modules/ssr";

const app = new Elysia()
  .use(cors()) // Enables CORS
  .use(staticPlugin({ prefix: "/" })) // Projects a Directory
  .get("/", async ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    set.status = 200;
    return await render("root");
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
  .ws("/chat", {
    message(ws, message) {
      console.log(message);
      ws.send("message");
    },
    body: T.String(),
    response: T.String(),
  })
  .all("/404", async ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    set.status = 404;
    return await render("not_found");
  }) // 404 Page
  .listen(80, (server) => {
    const Elysia = new Gradient({
      colors: [rgb(129, 140, 248), rgb(192, 132, 252)],
      midpoint: 10,
      text: "Elysia",
    });

    logger.custom(
      "[ModlinJS]",
      `${Elysia.toForgroundText()} is ready in ${Date.now() - logger.ptime} ms`
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
