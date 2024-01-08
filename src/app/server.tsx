import { Elysia, t as T } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Gradient, rgb } from "terminal/gradient";
import logger from "terminal/logger";
import { Server, URL } from "../modules/ssr";

const app = new Elysia()
  .use(cors()) // Enables CORS
  .use(staticPlugin({ prefix: "/" })) // Projects a Directory
  .get("/", async () => {
    const server = new Server("src/pages/root");
    return new Response(await server.render(), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
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
  .all("/404", async () => {
    const server = new Server("src/pages/not_found");
    return new Response(await server.render(), {
      status: 404,
      headers: { "Content-Type": "text/html" },
    });
  }) // 404 Page
  .listen(3000, (server) => {
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
