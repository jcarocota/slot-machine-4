import * as PIXI from "pixi.js";

export class FrameRateInfo extends PIXI.Container {
  private text = new PIXI.Text();

  textX: number;
  textY: number;

  constructor(x: number, y: number) {
    super();

    this.textX = x;
    this.textY = y;

    this.init();
  }

  private init = () => {
    this.draw();

    PIXI.Ticker.shared.add(
      () => (this.text.text = `FPS: ${Math.round(PIXI.Ticker.shared.FPS)}`)
    );

    this.addChild(this.text);
  };

  private draw = () => {
    this.text.x = this.textX;
    this.text.y = this.textY;

    this.text.style = {
      fontFamily: "Verdana",
      fontSize: 10,
      fill: ["#000000"],
    };
  };

  resize = () => {
    this.draw();
  };
}
