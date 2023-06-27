import * as PIXI from "pixi.js";

export class Button extends PIXI.Container {
  private background = new PIXI.Graphics();

  private text = new PIXI.Text();

  buttonWidth: number;
  buttonHeight: number;
  buttonX: number;
  buttonY: number;
  textLabel: string;

  constructor(
    width: number,
    height: number,
    x: number,
    y: number,
    textLabel: string
  ) {
    super();

    this.buttonWidth = width;
    this.buttonHeight = height;
    this.buttonX = x;
    this.buttonY = y;
    this.textLabel = textLabel;

    this.init();
  }

  private init = () => {
    this.draw();

    this.addChild(this.background);
    this.addChild(this.text);
  };

  private draw = () => {
    this.background.beginFill(0x2ecc71);
    this.background.drawRect(
      this.buttonX,
      this.buttonY,
      this.buttonWidth,
      this.buttonHeight
    );
    this.background.endFill();

    this.text.anchor.set(0.5);
    this.text.x = this.buttonX + this.buttonWidth / 2;
    this.text.y = this.buttonY + this.buttonHeight / 2;
    this.text.style = {
      fontFamily: "Verdana",
      fontSize: 20,
      fill: ["#000000"],
    };
    this.text.text = this.textLabel;
  };

  resize = () => {
    this.background.clear();
    this.draw();
  };
}
