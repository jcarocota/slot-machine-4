import * as PIXI from "pixi.js";

export class ReelsWindow extends PIXI.Container {
  private background = new PIXI.Graphics();

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

    this.init();
  }

  private init = () => {
    this.draw();
    this.mask = this.background;
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
  };
}
