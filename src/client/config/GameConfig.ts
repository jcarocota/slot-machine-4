import { userConfig, UserConfig } from "./UserConfig.ts";

interface GameConfig extends UserConfig {}

export const gameConfig: GameConfig = {
  aspectRatioWidth: userConfig.aspectRatioWidth,
  aspectRatioHeight: userConfig.aspectRatioHeight,
  backgroundAppColor: userConfig.backgroundAppColor,
  backgroundReelColor: userConfig.backgroundReelColor,
  debugMode: userConfig.debugMode,
  questionMarkAsset: userConfig.questionMarkAsset,
  slotMachineSheet: userConfig.slotMachineSheet,
  slotMachineBlurredSheet: userConfig.slotMachineBlurredSheet,
  slotMachineSemiBlurredSheet: userConfig.slotMachineSemiBlurredSheet,
  slotMachineDebugModeSheet: userConfig.slotMachineDebugModeSheet,
  wsUrl: userConfig.wsUrl,
  wsPort: userConfig.wsPort,
};
