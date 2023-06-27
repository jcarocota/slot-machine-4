import * as PIXI from "pixi.js";
import { globalSettings } from "../GlobalSettings.ts";
import { Button } from "./Button.ts";
import { FrameRateInfo } from "./FrameRateInfo.ts";

export class SlotMachine extends PIXI.Container {
  private background = new PIXI.Graphics();
  // @ts-ignore
  private playButton: Button;

  // @ts-ignore
  private frameRateInfo: FrameRateInfo;

  constructor() {
    super();
    this.init();
  }

  private init = () => {
    this.createPlayButton();
    this.createFrameRateInfo();

    this.draw();

    this.addChild(this.background);
    this.addChild(this.playButton);
    this.addChild(this.frameRateInfo);
  };

  private draw = () => {
    this.background.beginFill(0xd5d8dc);
    this.background.drawRect(
      globalSettings.slotMachinePosX,
      globalSettings.slotMachinePosY,
      globalSettings.slotMachineWidth,
      globalSettings.slotMachineHeight
    );
    this.background.endFill();
  };

  private createPlayButton = () => {
    const { buttonWidth, buttonHeight, buttonX, buttonY } =
      this.calculateBoundsPlayButton();
    this.playButton = new Button(
      buttonWidth,
      buttonHeight,
      buttonX,
      buttonY,
      "Play"
    );
  };

  private createFrameRateInfo = () => {
    const { frameRateX, frameRateY } = this.calculateBoundsFrameRateInfo();
    this.frameRateInfo = new FrameRateInfo(frameRateX, frameRateY);
  };

  private calculateBoundsPlayButton = () => {
    const buttonWidth = globalSettings.slotMachineWidth * 0.25;
    const buttonHeight = globalSettings.slotMachineHeight * 0.2;
    const buttonX =
      globalSettings.slotMachinePosX +
      globalSettings.slotMachineWidth -
      buttonWidth;
    const buttonY =
      globalSettings.slotMachinePosY +
      globalSettings.slotMachineHeight -
      buttonHeight;

    return { buttonWidth, buttonHeight, buttonX, buttonY };
  };

  private calculateBoundsFrameRateInfo = () => {
    const frameRateX = globalSettings.slotMachinePosX;
    const frameRateY =
      globalSettings.slotMachinePosY + globalSettings.slotMachineHeight - 20;

    return { frameRateX, frameRateY };
  };

  resize = () => {
    this.background.clear();
    this.draw();

    const { buttonWidth, buttonHeight, buttonX, buttonY } =
      this.calculateBoundsPlayButton();
    this.playButton.buttonWidth = buttonWidth;
    this.playButton.buttonHeight = buttonHeight;
    this.playButton.buttonX = buttonX;
    this.playButton.buttonY = buttonY;
    this.playButton.resize();

    const { frameRateX, frameRateY } = this.calculateBoundsFrameRateInfo();
    this.frameRateInfo.textX = frameRateX;
    this.frameRateInfo.textY = frameRateY;
    this.frameRateInfo.resize();
  };
}
