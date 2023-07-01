export interface UserConfig {
  aspectRatioWidth: number;
  aspectRatioHeight: number;
  backgroundAppColor: number;
  backgroundReelColor: number;
  questionMarkAsset: string;
  slotMachineSheet: string;
  slotMachineBlurredSheet: string;
  slotMachineSemiBlurredSheet: string;
  wsUrl: string;
  wsPort: number;
}

export const userConfig: UserConfig = {
  aspectRatioWidth: 4,
  aspectRatioHeight: 3,
  backgroundAppColor: 0xffffff,
  backgroundReelColor: 0x0d2331,
  questionMarkAsset: "./src/client/assets/question_mark.png",
  slotMachineSheet: "./src/client/assets/fruits-normal.json", //Path of slot machine sprites' atlas
  slotMachineBlurredSheet: "./src/client/assets/fruits-full-blur.json", //Path of slot machine sprites' atlas
  slotMachineSemiBlurredSheet: "./src/client/assets/fruits-medium-blur.json", //Path of slot machine sprites' atlas
  wsUrl: "localhost",
  wsPort: 3000,
};
