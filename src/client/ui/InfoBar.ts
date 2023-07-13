import * as PIXI from "pixi.js";
import { globalSettings } from "../GlobalSettings.ts";
import { gameConfig } from "../config/GameConfig.ts";

export class InfoBar extends PIXI.Container {
  private text = new PIXI.Text();
  private background = new PIXI.Graphics();

  textX: number;
  textY: number;

  barWidth: number;
  barHeight: number;
  barX: number;
  barY: number;

  constructor(
    x: number,
    y: number,
    barWidth: number,
    barHeight: number,
    barX: number,
    barY: number
  ) {
    super();

    this.textX = x;
    this.textY = y;

    this.barWidth = barWidth;
    this.barHeight = barHeight;
    this.barX = barX;
    this.barY = barY;

    this.init();
  }

  private init = () => {
    this.draw();

    PIXI.Ticker.shared.add(
      () =>
        (this.text.text = `FPS: ${Math.round(
          PIXI.Ticker.shared.FPS
        )}\t\t\tBalance: ${
          globalSettings.moneyBalance
        } USD\t\t\tLast round Stake: ${
          globalSettings.lastRoundStake
        } USD\t\t\tLast round Winning: ${globalSettings.lastRoundWinning} USD`)
    );

    this.addChild(this.background);
    this.addChild(this.text);
  };

  private draw = () => {
    this.text.anchor.y = 0.5;
    this.text.x = this.textX;
    this.text.y = this.textY;

    this.text.style = {
      fontFamily: "Verdana",
      fontSize: 12,
      fill: ["#FFFFFF"],
    };

    this.background.beginFill(gameConfig.backgroundInfoBarColor);
    this.background.drawRect(
      this.barX,
      this.barY,
      this.barWidth,
      this.barHeight
    );
    this.background.endFill();
  };

  resize = () => {
    this.draw();
  };
}
