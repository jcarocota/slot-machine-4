export interface UserConfig {
    wsUrl: string;
    wsPort: number;
}

export const userConfig:UserConfig = {
    wsUrl: "localhost",
    wsPort: 3000
}