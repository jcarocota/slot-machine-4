import * as PIXI from "pixi.js";
import { globals } from "./Globals.ts";
import { GameSocketClient } from "./GameSocketClient.ts";

export class App extends PIXI.Application {
  constructor() {
    super({
      background: "#1099bb",
      resizeTo: window,
      resolution: devicePixelRatio,
    });

    this.loadApp();
  }

  private loadApp = () => {
    //Calculating window size for the fisrt time
    this.calculateWindowSize();

    //Add window rezise event. Slot Machine should resize too
    window.addEventListener("resize", this.onWindowResize);

    const gameSocketClient = new GameSocketClient();
    gameSocketClient.balance(123);
  };

  private calculateWindowSize = () => {
    globals.appWitdh = window.innerWidth;
    globals.appHeight = window.innerHeight;
    console.log("Globals modified:", globals);
  };
  private onWindowResize = () => {
    this.calculateWindowSize();
  };
}
