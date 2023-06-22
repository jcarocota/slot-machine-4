import * as PIXI from "pixi.js";

export class App extends PIXI.Application {
  constructor() {
    super({
      background: "#1099bb",
      resizeTo: window,
    });
  }
}
