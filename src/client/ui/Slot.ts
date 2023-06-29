import * as PIXI from "pixi.js";
import { globalSettings } from "../GlobalSettings.ts";

export class Slot extends PIXI.Sprite {
  private readonly textureSemiBlurred: PIXI.Texture;
  private readonly textureBlurred: PIXI.Texture;
  private readonly textureIdle: PIXI.Texture;

  moveVertical = (step: number) => {
    this.y += step;
  };

  showIdleTexture = () => {
    this.texture = this.textureIdle;
  };

  showBlurredTexture = () => {
    this.texture = this.textureBlurred;
  };

  showSemiBlurredTexture = () => {
    this.texture = this.textureSemiBlurred;
  };

  get top(): number {
    return this.y;
  }

  get bottom(): number {
    return this.y + this.height;
  }

  get left(): number {
    return this.x;
  }

  get right(): number {
    return this.x + this.width;
  }

  private getSlotTexture = (idTexture: string) => {
    let textureIdle = globalSettings.slotTextureSheet?.textures[idTexture];
    textureIdle = textureIdle
      ? textureIdle
      : globalSettings.questionMarkTexture;

    let textureBlurred =
      globalSettings.slotBlurredTextureSheet?.textures[idTexture];
    textureBlurred = textureBlurred
      ? textureBlurred
      : globalSettings.questionMarkTexture;

    let textureSemiBlurred =
      globalSettings.slotSemiBlurredTextureSheet?.textures[idTexture];
    textureSemiBlurred = textureSemiBlurred
      ? textureSemiBlurred
      : globalSettings.questionMarkTexture;

    const textures: PIXI.Texture[] = [];
    textures.push(textureIdle);
    textures.push(textureBlurred);
    textures.push(textureSemiBlurred);

    return textures;
  };

  constructor(idTexture: string, slotWidth: number, slotHeight: number) {
    super();

    const textures: PIXI.Texture[] = this.getSlotTexture(idTexture);
    this.textureIdle = textures[0];
    this.textureBlurred = textures[1];
    this.textureSemiBlurred = textures[2];
    this.width = slotWidth;
    this.height = slotHeight;

    this.showIdleTexture();
  }
}
