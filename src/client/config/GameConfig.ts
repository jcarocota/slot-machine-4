import {userConfig, UserConfig} from "./UserConfig.ts";

interface GameConfig extends UserConfig {

}

export const gameConfig: GameConfig = {
    wsUrl: userConfig.wsUrl,
    wsPort: userConfig.wsPort,
}