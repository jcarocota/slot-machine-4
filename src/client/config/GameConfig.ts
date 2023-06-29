import { userConfig, UserConfig } from "./UserConfig.ts";

interface GameConfig extends UserConfig {}

export const gameConfig: GameConfig = {
  aspectRatioWidth: userConfig.aspectRatioWidth,
  aspectRatioHeight: userConfig.aspectRatioHeight,
  backgroundAppColor: userConfig.backgroundAppColor,
  backgroundReelColor: userConfig.backgroundReelColor,
  questionMarkAsset: userConfig.questionMarkAsset,
  slotMachineSheet: userConfig.slotMachineSheet,
  slotMachineBlurredSheet: userConfig.slotMachineBlurredSheet,
  slotMachineSemiBlurredSheet: userConfig.slotMachineSemiBlurredSheet,
  wsUrl: userConfig.wsUrl,
  wsPort: userConfig.wsPort,
};
