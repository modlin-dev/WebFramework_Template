import { edenTreaty, edenFetch } from "@elysiajs/eden";
import type { App } from "./server";

const app = edenTreaty<App>("http://localhost:3000");

const fetch = edenFetch<App>("http://localhost:3000");
