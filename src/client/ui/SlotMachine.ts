import * as PIXI from "pixi.js";
import { globalSettings } from "../GlobalSettings.ts";
import { Button } from "./Button.ts";
import { FrameRateInfo } from "./FrameRateInfo.ts";
import { ReelsWindow } from "./ReelsWindow.ts";
import { Option, SelectOneBox } from "./SelectOneBox.ts";

export class SlotMachine extends PIXI.Container {
  private background = new PIXI.Graphics();
  // @ts-ignore
  private playButton: Button;

  // @ts-ignore
  private frameRateInfo: FrameRateInfo;

  // @ts-ignore
  private reelsWindow: ReelsWindow;

  // @ts-ignore
  private stakeSelectOneBox: SelectOneBox;

  constructor() {
    super();
    this.init();
  }

  private init = () => {
    this.createPlayButton();
    this.createFrameRateInfo();
    this.createReelsWindow();
    this.createStakeSelectOneBox();

    this.draw();

    this.addChild(this.background);
    this.addChild(this.playButton);
    this.addChild(this.frameRateInfo);
    this.addChild(this.reelsWindow);
    this.addChild(this.stakeSelectOneBox);
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

  private createReelsWindow = () => {
    const { reelsWindowWidth, reelsWindowHeight, reelsWindowX, reelsWindowY } =
      this.calculateBoundsReelsWindow();
    this.reelsWindow = new ReelsWindow(
      reelsWindowWidth,
      reelsWindowHeight,
      reelsWindowX,
      reelsWindowY
    );
  };

  private createStakeSelectOneBox = () => {
    const {
      stakeSelectOneBoxWidth,
      stakeSelectOneBoxHeight,
      stakeSelectOneBoxX,
      stakeSelectOneBoxY,
    } = this.calculateBoundsStakeSelectOneBox();
    const options: Option[] = [];
    options.push({ value: 1, description: "1.00 USD" });
    options.push({ value: 1.5, description: "1.50 USD" });
    options.push({ value: 2, description: "2.00 USD" });
    options.push({ value: 5, description: "5.00 USD" });
    options.push({ value: 10, description: "10.00 USD" });
    options.push({ value: 20, description: "20.00 USD" });
    options.push({ value: 50, description: "50.00 USD" });
    options.push({ value: 75, description: "75.00 USD" });
    options.push({ value: 100, description: "100.00 USD" });

    this.stakeSelectOneBox = new SelectOneBox(
      stakeSelectOneBoxWidth,
      stakeSelectOneBoxHeight,
      stakeSelectOneBoxX,
      stakeSelectOneBoxY,
      options,
      options[0],
        "Stake"
    );
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

  private calculateBoundsReelsWindow = () => {
    //const reelsWindowWidth = globalSettings.slotMachineWidth*0.8;
    const reelsWindowWidth = globalSettings.slotMachineWidth;
    const reelsWindowHeight = globalSettings.slotMachineHeight * 0.8;
    //const reelsWindowX = globalSettings.slotMachinePosX + globalSettings.slotMachineWidth*0.1;
    const reelsWindowX = globalSettings.slotMachinePosX;
    const reelsWindowY = globalSettings.slotMachinePosY;

    return { reelsWindowWidth, reelsWindowHeight, reelsWindowX, reelsWindowY };
  };

  private calculateBoundsStakeSelectOneBox = () => {
    const stakeSelectOneBoxWidth = globalSettings.slotMachineWidth * 0.2;
    const stakeSelectOneBoxHeight = globalSettings.slotMachineHeight * 0.05;
    const stakeSelectOneBoxX =
      globalSettings.slotMachinePosX +
      globalSettings.slotMachineWidth -
      globalSettings.slotMachineWidth * 0.25 -
      stakeSelectOneBoxWidth;
    const stakeSelectOneBoxY =
      globalSettings.slotMachinePosY +
      globalSettings.slotMachineHeight -
      stakeSelectOneBoxHeight;

    return {
      stakeSelectOneBoxWidth,
      stakeSelectOneBoxHeight,
      stakeSelectOneBoxX,
      stakeSelectOneBoxY,
    };
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

    const { reelsWindowWidth, reelsWindowHeight, reelsWindowX, reelsWindowY } =
      this.calculateBoundsReelsWindow();
    this.reelsWindow.reelsWindowWidth = reelsWindowWidth;
    this.reelsWindow.reelsWindowHeight = reelsWindowHeight;
    this.reelsWindow.reelsWindowX = reelsWindowX;
    this.reelsWindow.reelsWindowY = reelsWindowY;
    this.reelsWindow.resize();

    const {
      stakeSelectOneBoxWidth,
      stakeSelectOneBoxHeight,
      stakeSelectOneBoxX,
      stakeSelectOneBoxY,
    } = this.calculateBoundsStakeSelectOneBox();
    this.stakeSelectOneBox.selectOneBoxWidth = stakeSelectOneBoxWidth;
    this.stakeSelectOneBox.selectOneBoxHeight = stakeSelectOneBoxHeight;
    this.stakeSelectOneBox.selectOneBoxX = stakeSelectOneBoxX;
    this.stakeSelectOneBox.selectOneBoxY = stakeSelectOneBoxY;
    this.stakeSelectOneBox.resize();
  };
}
