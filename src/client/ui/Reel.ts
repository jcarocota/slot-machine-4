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
        this.strip[i],
        this.reelWidth,
        this.reelHeight / 16
      );
      //console.log("this.reelHeight / 3 =", this.reelHeight / 3);
      this.slots.push(slot);
    }

    this.slots.unshift(
      new Slot(this.strip[i + 1], this.reelWidth, this.reelHeight / 3)
    );
    this.slots.unshift(
      new Slot(this.strip[i], this.reelWidth, this.reelHeight / 3)
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

  private calculateSpaceToMoveOnY = (symbolsAfterSpin: number[]) => {
    let i = 2;
    let spaceToMoveOnY = (this.reelHeight / 16)*2;
    console.log("symbolsAfterSpin=",symbolsAfterSpin)
    while(true) {
      const firstIndex = (i >= this.slots.length ? 0 : i) ;
      const secondIndex = firstIndex + 1 >= this.slots.length ? 0 : firstIndex + 1;
      const thirdIndex = secondIndex + 1 >= this.slots.length ? 0 : secondIndex + 1;

      //console.log("firstIndex=",firstIndex,"secondIndex=",secondIndex,"thirdIndex=",thirdIndex);
      if(symbolsAfterSpin[0] == this.slots[firstIndex].idTexture && symbolsAfterSpin[1] == this.slots[secondIndex].idTexture && symbolsAfterSpin[2] == this.slots[thirdIndex].idTexture) {
        break;
      } else {
        i = firstIndex+1;
        spaceToMoveOnY+=this.reelHeight / 16;
      }
    }

    //spaceToMoveOnY = (!spaceToMoveOnY ? this.reelHeight : spaceToMoveOnY);

    console.log("calculated space: spaceToMoveOnY=",spaceToMoveOnY);

    return spaceToMoveOnY;
  };

  animateReel = (
      symbolsAfterSpin: number[],
    duration: number,
    delayInMillis: number
  ) => {
    const spaceToMoveOnY = this.calculateSpaceToMoveOnY(symbolsAfterSpin);
    //console.log("this.reelHeight=", this.reelHeight);
    //console.log("spaceToMoveOnY=", spaceToMoveOnY);
    //const spaceToMoveOnY = 100;
    let lastY = 0;

    const slotYPositionLimit = this.slots[this.slots.length-1].y + this.slots[this.slots.length-1].height;

    const position = { x: 0, y: 0, rotation: 0 };
    const positionEnd = { x: 0, y: spaceToMoveOnY, rotation: 0 };

    let tween = new TWEEN.Tween(position)
      .to(positionEnd, duration)
      .delay(delayInMillis)
      .easing(TWEEN.Easing.Bounce.Out)
      .onUpdate(() => {
        const deltaPosY = position.y - lastY;
        lastY = position.y;

        //console.log("positionIni:", position);
        //console.log("positionEnd:", positionEnd);
        //console.log("deltaPosY:", deltaPosY);

        //this.reelY += deltaPosY;

        this.slots.forEach((slot) => {
          slot.showSemiBlurredTexture();
          slot.moveVertical(deltaPosY);
          //if(slot.y > las)
        });

        const lastSlot = this.slots[this.slots.length-1];

        if(lastSlot.y > slotYPositionLimit) {
          const firstSlot = this.slots[0];
          lastSlot.y = firstSlot.y - lastSlot.height;
          this.slots.pop();
          this.slots.unshift(lastSlot);
          //this.resize();
        }

        //this.resize();
      });

    tween.start();

    tween.onComplete(() => {

      this.slots.forEach((slot) => {
        slot.showIdleTexture();
      });

      if(this.slots[0].y >  this.reelY - (this.reelHeight / 16)*2) {
        const lastSlot = this.slots[this.slots.length-1];
        lastSlot.y = this.reelY - (this.reelHeight / 16)*2;
        this.slots.pop();
        this.slots.unshift(lastSlot);
        //this.resize();

      }

    });

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
