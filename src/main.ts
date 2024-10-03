import "./style.css";
import { createMobxRects, drawRectsToDomMobx } from "./mobx_based_rendering.ts";
import {
  createGameDevRects,
  drawRectsToDomGameDev,
} from "./game_based_rendering.ts";

// if query params contains mobx, use mobx
// get count from query params

const searchParams = new URLSearchParams(window.location.search);
const count = parseInt(searchParams.get("count")!);
const useMobx = searchParams.has("mobx");

if (useMobx) {
  drawRectsToDomMobx(
    document.querySelector<HTMLDivElement>("#app")!,
    createMobxRects(count),
  );
} else {
  drawRectsToDomGameDev(
    document.querySelector<HTMLDivElement>("#app")!,
    createGameDevRects(count),
  );
}
