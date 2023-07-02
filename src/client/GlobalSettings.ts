import * as PIXI from "pixi.js";
import { Strip, SymbolSlot } from "./ws/InterfaceResponse.ts";
import { gameConfig } from "./config/GameConfig.ts";

interface GlobalSettings {
  moneyBalance: number | undefined;
  windowWidth: number;
  windowHeight: number;
  slotMachineWidth: number;
  slotMachineHeight: number;
  slotMachinePosX: number;
  slotMachinePosY: number;
  slotTextureSheet?: PIXI.Spritesheet;
  slotBlurredTextureSheet?: PIXI.Spritesheet;
  slotSemiBlurredTextureSheet?: PIXI.Spritesheet;
  stake: number;
  symbols: SymbolSlot[];
  strips: Strip[];
  questionMarkTexture: PIXI.Texture;
}

export const globalSettings: GlobalSettings = {
  moneyBalance: undefined,
  windowWidth: 0,
  windowHeight: 0,
  slotMachineWidth: 0,
  slotMachineHeight: 0,
  slotMachinePosX: 0,
  slotMachinePosY: 0,
  stake: 0,
  symbols: [],
  strips: [],
  questionMarkTexture: PIXI.Texture.from(gameConfig.questionMarkAsset),
};
