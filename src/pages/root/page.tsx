import { createSignal, type JSX } from "solid-js";
import { edenTreaty } from "@elysiajs/eden";
import { type App } from "../../app/server";
import React from "react";

function Root(): JSX.Element {
  // --
  const [count, setCount] = createSignal(0);
  const [isConnected, setConnected] = createSignal(false);

  const app = edenTreaty<App>("http://localhost");
  const server = app.server.subscribe();

  server.on("message", message => {
    console.log(message.data);
    // eslint-disable-next-line no-eval
    eval(message.data);
  });

  server.on("open", () => {
    setConnected(true);
    console.log("[WS] Connected");
  });

  server.on("close", () => {
    setConnected(false);
    console.log("[WS] Disconnected");
  });
  // --
  return (
    <main class="flex justify-start items-center gap-6 flex-col h-screen">
      <nav class="w-full h-20 bg-slate-50 border-b border-slate-700 dark:bg-black dark:border-slate-300" />
      <button
        class="bg-blue-400 rounded-full p-4 pt-2 pb-2 text-white"
        onClick={() => {
          setCount(count => count + 1);
          if (isConnected()) server.send(`Checking for updates ${count()}`);
        }}
      >
        {count()}. Click Me!
      </button>
      <img
        alt="Catboy"
        width={256}
        height={256}
        decoding="async"
        data-nimg="1"
        src={"/images/catboy.webp"}
      />
    </main>
  );
}

export default Root;
