import * as PIXI from "pixi.js";
//import { GameSocketClient } from "./ws/GameSocketClient.ts";
import { SlotMachine } from "./ui/SlotMachine.ts";
import { gameConfig } from "./config/GameConfig.ts";
import { globalSettings } from "./GlobalSettings.ts";

export class App extends PIXI.Application {
  private static _instance: App;

  //private readonly _gameSocketClient: GameSocketClient = new GameSocketClient();

  // @ts-ignore
  private slotMachine: SlotMachine;

  private constructor() {
    super({
      background: gameConfig.backgroundAppColor,
      resizeTo: window,
      resolution: devicePixelRatio,
    });

    this.loadApp();
    this.createUI();
    this.loadEvents();
  }

  private loadApp = () => {
    //Calculating window size for the fisrt time
    this.calculateWindowSize();
    this.calculateSlotMachineDimentions();
    this.calculateSlotMachinePosition();

    //const gameSocketClient = new GameSocketClient();
    //globals["gameSocketClient"] = gameSocketClient;
    //const idRequest = this._gameSocketClient.balance();
    //console.log("Balance... ID Request", idRequest);
  };

  private calculateWindowSize = () => {
    globalSettings.windowWidth = window.innerWidth;
    globalSettings.windowHeight = window.innerHeight;
  };

  private calculateSlotMachineDimentions = () => {
    // Calculate the aspect ratio of the screen
    const screenAspectRatio =
      globalSettings.windowWidth / globalSettings.windowHeight;

    // Calculate the width and height of the window based on a 16:9 aspect ratio
    let slotMachineWidth, slotMachineHeight;

    if (
      screenAspectRatio >=
      gameConfig.aspectRatioWidth / gameConfig.aspectRatioHeight
    ) {
      slotMachineWidth = Math.floor(
        globalSettings.windowHeight *
          (gameConfig.aspectRatioWidth / gameConfig.aspectRatioHeight)
      );
      slotMachineHeight = globalSettings.windowHeight;
    } else {
      slotMachineWidth = globalSettings.windowWidth;
      slotMachineHeight = Math.floor(
        globalSettings.windowWidth *
          (gameConfig.aspectRatioHeight / gameConfig.aspectRatioWidth)
      );
    }

    globalSettings.slotMachineWidth = slotMachineWidth;
    globalSettings.slotMachineHeight = slotMachineHeight;
  };

  private calculateSlotMachinePosition = () => {
    globalSettings.slotMachinePosX =
      (globalSettings.windowWidth - globalSettings.slotMachineWidth) / 2;
    globalSettings.slotMachinePosY =
      (globalSettings.windowHeight - globalSettings.slotMachineHeight) / 2;
  };

  private onWindowResize = () => {
    this.calculateWindowSize();
    this.calculateSlotMachineDimentions();
    this.calculateSlotMachinePosition();

    this.slotMachine.resize();
  };

  private createUI = () => {
    this.slotMachine = new SlotMachine();
    this.stage.addChild(this.slotMachine);
  };

  private loadEvents = () => {
    //Add window rezise event. Slot Machine should resize too
    window.addEventListener("resize", this.onWindowResize);
  };

  /*get gameSocketClient() {
    return this._gameSocketClient;
  }*/

  static get instance(): App {
    if (!this._instance) {
      this._instance = new App();
    }

    return this._instance;
  }
}
