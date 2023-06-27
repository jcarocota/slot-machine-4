export interface UserConfig {
  aspectRatioWidth: number;
  aspectRatioHeight: number;
  backgroundAppColor: number;
  wsUrl: string;
  wsPort: number;
}

export const userConfig: UserConfig = {
  aspectRatioWidth: 16,
  aspectRatioHeight: 9,
  backgroundAppColor: 0xffffff,
  wsUrl: "localhost",
  wsPort: 3000,
};
