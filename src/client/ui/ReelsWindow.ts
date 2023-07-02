import * as PIXI from "pixi.js";
import { Reel } from "./Reel.ts";
import { Strip } from "../ws/InterfaceResponse.ts";
import { globalSettings } from "../GlobalSettings.ts";

export class ReelsWindow extends PIXI.Container {
  private background = new PIXI.Graphics();

  private strips: Strip[];

  private reels: Reel[] = [];

  reelsWindowWidth: number;
  reelsWindowHeight: number;
  reelsWindowX: number;
  reelsWindowY: number;

  constructor(width: number, height: number, x: number, y: number) {
    super();

    this.reelsWindowWidth = width;
    this.reelsWindowHeight = height;
    this.reelsWindowX = x;
    this.reelsWindowY = y;

    this.strips = globalSettings.strips;

    this.init();
  }

  private init = () => {
    this.generateReels();
    this.draw();
    this.mask = this.background;

    //this.addChild(this.background);

    this.reels.forEach((reel) => {
      this.addChild(reel);
    });
  };

  private generateReels = () => {
    this.strips.forEach((strip, i) => {
      const reel: Reel = new Reel(
        this.reelsWindowWidth / 5,
        (this.reelsWindowHeight / 3) * 16,
        this.reelsWindowX + (this.reelsWindowWidth / 5) * i,
        this.reelsWindowY,
        strip
      );
      this.reels.push(reel);
    });
  };

  private draw = () => {
    this.background.beginFill(0xffffff);
    this.background.drawRect(
      this.reelsWindowX,
      this.reelsWindowY,
      this.reelsWindowWidth,
      this.reelsWindowHeight
    );
    this.background.endFill();

    this.reels.forEach((reel, i) => {
      reel.reelWidth = this.reelsWindowWidth / 5;
      reel.reelHeight = (this.reelsWindowHeight / 3) * 16;
      reel.reelX = this.reelsWindowX + (this.reelsWindowWidth / 5) * i;
      reel.reelY = this.reelsWindowY;
    });
  };

  resize = () => {
    this.background.clear();
    this.draw();

    this.reels.forEach((reel) => {
      reel.resize();
    });
  };
}
