import { edenTreaty } from "@elysiajs/eden";
import type { App } from "./server";

const app = edenTreaty<App>("http://localhost");

const result = await app.get();
console.log(result.data);
