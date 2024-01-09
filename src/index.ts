import { Chalk } from "terminal/chalk";
import { Gradient, rgb } from "terminal/gradient";
import logger from "terminal/logger";

// Started Notice
console.clear();
logger.custom(
  new Gradient({
    colors: [rgb(129, 140, 248), rgb(192, 132, 252)],
    midpoint: 10,
    text: "[ElysiaJS]",
  }).toForgroundText("[ElysiaJS]"),
  `${Chalk.Forground.RGB(
    120,
    232,
    157,
    "API"
  )} process started at ${logger.timeSeconds()}`
);

await import("./app/server"); // Starts the Server
