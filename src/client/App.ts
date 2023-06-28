import * as PIXI from "pixi.js";
import { GameSocketClient } from "./ws/GameSocketClient.ts";
import { SlotMachine } from "./ui/SlotMachine.ts";
import { gameConfig } from "./config/GameConfig.ts";
import { globalSettings } from "./GlobalSettings.ts";
import {
  MoneyBalanceResponse,
  StripsResponse,
  SymbolsResponse,
} from "./ws/InterfaceResponse.ts";

export class App extends PIXI.Application {
  private static _instance: App;
  // @ts-ignore
  private slotMachine: SlotMachine;

  private gameSocketClient: GameSocketClient = GameSocketClient.instance;

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
    this.loadGameData();

    this.calculateWindowSize();
    this.calculateSlotMachineDimentions();
    this.calculateSlotMachinePosition();

    //const gameSocketClient = new GameSocketClient();
    //globals["gameSocketClient"] = gameSocketClient;
    //const idRequest = this._gameSocketClient.balance();
    //console.log("Balance... ID Request", idRequest);
  };

  private loadGameData = () => {
    const setStrips = (data: any) => {
      const stripsResponse: StripsResponse = data;
      globalSettings.strips = stripsResponse.strips;
      console.log("globalSettings.strips=", globalSettings.strips);
    };

    const setMoneyBalance = (data: any) => {
      const moneyBalanceResponse: MoneyBalanceResponse = data;
      globalSettings.moneyBalance = moneyBalanceResponse.moneyBalance;
      console.log("globalSettings.moneyBalance=", globalSettings.moneyBalance);
    };

    const setSymbols = (data: any) => {
      const symbolsResponse: SymbolsResponse = data;
      globalSettings.symbols = symbolsResponse.symbols;
      console.log("globalSettings.symbols=", globalSettings.symbols);
    };

    const checkIfAppLoaded = () => {
      console.log(
        "globalSettings.symbols.length=",
        globalSettings.symbols.length,
        "globalSettings.strips.length=",
        globalSettings.strips.length,
        "globalSettings.moneyBalance=",
        globalSettings.moneyBalance
      );
      if (
        globalSettings.symbols.length > 0 &&
        globalSettings.strips.length > 0 &&
        globalSettings.moneyBalance
      ) {
        PIXI.Ticker.shared.remove(checkIfAppLoaded);
        console.log("App Loaded");
        this.onWindowResize();
      }
    };

    PIXI.Ticker.shared.add(checkIfAppLoaded);

    //Load Symbols Info
    const idRequestSymbols = this.gameSocketClient.symbols(setSymbols);
    console.info("Retrieving symbol's ID. Request ID:", idRequestSymbols);

    const idRequestStrips = this.gameSocketClient.strips(setStrips);
    console.info("Retrieving Strips. Request ID:", idRequestStrips);

    const idRequestMoneyBalance =
      this.gameSocketClient.balance(setMoneyBalance);
    console.info(
      "Retrieving Money Balance. Request ID:",
      idRequestMoneyBalance
    );
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

  //------

  static get instance(): App {
    if (!this._instance) {
      this._instance = new App();
    }

    return this._instance;
  }
}
