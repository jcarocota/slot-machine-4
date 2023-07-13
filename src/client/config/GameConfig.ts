interface GameConfig {
  aspectRatioWidth: number;
  aspectRatioHeight: number;
  backgroundAppColor: number;
  backgroundSlotMachineColor: number;
  backgroundReelColor: number;
  backgroundButtonDefaultColor: number;
  backgroundInfoBarColor: number;
  backgroundPlayButtonIdleColor: number;
  backgroundPlayButtonDisabledColor: number;
  backgroundPlayButtonHoverColor: number;
  textPlayButtonIdle: string;
  textPlayButtonDisabled: string;
  textPlayButtonHover: string;
  debugMode: number;
  questionMarkAsset: string;
  slotMachineSheet: string;
  slotMachineBlurredSheet: string;
  slotMachineSemiBlurredSheet: string;
  slotMachineDebugModeSheet: string;
  wsUrl: string;
  wsPort: number;
}

export const gameConfig: GameConfig = {
  aspectRatioWidth: 4,
  aspectRatioHeight: 3,
  backgroundAppColor: 0xffffff,
  backgroundSlotMachineColor: 0xd5d8dc,
  backgroundReelColor: 0x0d2331,
  backgroundButtonDefaultColor: 0x2ecc71,
  backgroundInfoBarColor: 0x5d5d5d,
  backgroundPlayButtonIdleColor: 0x2ecc71,
  backgroundPlayButtonDisabledColor: 0x566573,
  backgroundPlayButtonHoverColor: 0xf4d03f,
  textPlayButtonIdle: "Ready to play!",
  textPlayButtonDisabled: "Spinning...",
  textPlayButtonHover: "Click now!",
  debugMode: 1,
  questionMarkAsset: "./src/client/assets/question_mark.png",
  slotMachineSheet: "./src/client/assets/fruits-normal.json", //Path of slot machine sprites' atlas
  slotMachineBlurredSheet: "./src/client/assets/fruits-full-blur.json", //Path of slot machine sprites' atlas
  slotMachineSemiBlurredSheet: "./src/client/assets/fruits-medium-blur.json", //Path of slot machine sprites' atlas
  slotMachineDebugModeSheet:
    "./src/client/assets/fruits-normal-debug-mode.json", //Path of slot machine sprites' atlas
  wsUrl: "192.168.1.106",
  wsPort: 3000,
};
