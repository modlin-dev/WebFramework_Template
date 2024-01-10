import { edenTreaty } from "@elysiajs/eden";
import type { App } from "./server";

const app = edenTreaty<App>("http://localhost");
const chat = app.chat.subscribe();
await chat.send("Hello, world!");
chat.on("message", (message) => {
  console.log(message.data);
});

// const fetch = edenFetch<App>("http://localhost:3000");
