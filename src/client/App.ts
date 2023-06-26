import * as PIXI from "pixi.js";
import { GameSocketClient } from "./ws/GameSocketClient.ts";

export class App extends PIXI.Application {
  private static _instance:App;

  private readonly _gameSocketClient: GameSocketClient = new GameSocketClient();

  private _settings = {
    appWitdh: 0,
    appHeight: 0
  }

  private constructor() {
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

    //const gameSocketClient = new GameSocketClient();
    //globals["gameSocketClient"] = gameSocketClient;
    const idRequest = this._gameSocketClient.balance();
    console.log("Balance... ID Request", idRequest);
  };

  private calculateWindowSize = () => {
    this._settings.appWitdh = window.innerWidth;
    this._settings.appHeight = window.innerHeight;
    console.log("App Settings modified:", this._settings);
  };
  private onWindowResize = () => {
    this.calculateWindowSize();
  };

  get gameSocketClient() {
    return this._gameSocketClient;
  }

  get settings() {
    return this._settings;
  }

  static get instance(): App {
    if(!this._instance) {
      this._instance = new App();
    }

    return this._instance;
  }

}
