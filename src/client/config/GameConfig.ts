import { userConfig, UserConfig } from "./UserConfig.ts";

interface GameConfig extends UserConfig {}

export const gameConfig: GameConfig = {
  aspectRatioWidth: userConfig.aspectRatioWidth,
  aspectRatioHeight: userConfig.aspectRatioHeight,
  backgroundAppColor: userConfig.backgroundAppColor,
  wsUrl: userConfig.wsUrl,
  wsPort: userConfig.wsPort,
};
