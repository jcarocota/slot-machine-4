import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import { Slot } from "./Slot.ts";
import { gameConfig } from "../config/GameConfig.ts";

export class Reel extends PIXI.Container {
  private slots: Slot[] = [];

  private strip: number[];

  private background = new PIXI.Graphics();

  reelWidth: number;
  reelHeight: number;
  reelX: number;
  reelY: number;

  constructor(
    width: number,
    height: number,
    x: number,
    y: number,
    strip: number[]
  ) {
    super();

    this.reelWidth = width;
    this.reelHeight = height;
    this.reelX = x;
    this.reelY = y;
    this.strip = strip;

    this.init();
  }

  private init = () => {
    this.generateSlots();
    this.draw();

    this.addChild(this.background);
    this.slots.forEach((slot) => {
      this.addChild(slot);
    });
  };

  private generateSlots = () => {
    let i;
    for (i = 0; i < this.strip.length - 2; i++) {
      const slot: Slot = new Slot(
        `${this.strip[i]}`,
        this.reelWidth,
        this.reelHeight / 16
      );
      //console.log("this.reelHeight / 3 =", this.reelHeight / 3);
      this.slots.push(slot);
    }

    this.slots.unshift(
      new Slot(`${this.strip[i + 1]}`, this.reelWidth, this.reelHeight / 3)
    );
    this.slots.unshift(
      new Slot(`${this.strip[i]}`, this.reelWidth, this.reelHeight / 3)
    );

    /*this.strip.forEach((idSymbol) => {
      const slot: Slot = new Slot(
        `${idSymbol}`,
        this.reelWidth,
        this.reelHeight / 3
      );
      this.slots.push(slot);
    });*/
  };

  private draw = () => {
    this.background.beginFill(gameConfig.backgroundReelColor);
    this.background.drawRect(
      this.reelX,
      this.reelY,
      this.reelWidth,
      this.reelHeight
    );
    this.background.endFill();

    this.slots.forEach((slot, i) => {
      slot.width = this.reelWidth;
      slot.height = this.reelHeight / 16;
      slot.x = this.reelX;
      slot.y = this.reelY + slot.height * i - slot.height * 2;
    });
  };

  animateReel = (
    visibleSymbols: number[][],
    duration: number,
    detayInMillis: number
  ) => {
    const spaceToMoveOnY = (this.reelHeight / 16) * 3;
    console.log("this.reelHeight=", this.reelHeight);
    console.log("spaceToMoveOnY=", spaceToMoveOnY);
    //const spaceToMoveOnY = 100;
    let lastY = 0;

    const position = { x: 0, y: 0, rotation: 0 };
    const positionEnd = { x: 0, y: spaceToMoveOnY, rotation: 0 };

    let tween = new TWEEN.Tween(position)
      .to(positionEnd, duration)
      .delay(detayInMillis)
      .easing(TWEEN.Easing.Elastic.InOut)
      .onUpdate(() => {
        const deltaPosY = position.y - lastY;
        lastY = position.y;

        //console.log("positionIni:", position);
        //console.log("positionEnd:", positionEnd);
        //console.log("deltaPosY:", deltaPosY);

        //this.reelY += deltaPosY;

        this.slots.forEach((slot) => {
          slot.moveVertical(deltaPosY);
        });

        //this.resize();
      });

    tween.start();

    const animate = (time: number) => {
      tween.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  resize = () => {
    this.background.clear();
    this.draw();
  };
}
