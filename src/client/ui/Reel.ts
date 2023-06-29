import * as PIXI from "pixi.js";
import {Slot} from "./Slot.ts";
import {gameConfig} from "../config/GameConfig.ts";
import {Strip} from "../ws/InterfaceResponse.ts";

export class Reel extends PIXI.Container {
    private slots: Slot[] = [];

    private strip:Strip;

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
        strip:Strip
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
        for(const [,symbolSlot] of this.strip.entries()) {
            const slot:Slot = new Slot(`${symbolSlot.id}`, this.reelWidth, this.reelHeight/3);
            this.slots.push(slot);
        }
    }

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
            slot.height = this.reelHeight/16;
            slot.x = this.reelX;
            slot.y = this.reelY + (slot.height*i);
        });
    }

    resize = () => {
        this.background.clear();
        this.draw();
    };


}
