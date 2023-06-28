import { Strip, Symbol } from "./ws/InterfaceResponse.ts";
interface GlobalSettings {
  moneyBalance: number | undefined;
  windowWidth: number;
  windowHeight: number;
  slotMachineWidth: number;
  slotMachineHeight: number;
  slotMachinePosX: number;
  slotMachinePosY: number;
  symbols: Symbol[];
  strips: Strip[];
}

export const globalSettings: GlobalSettings = {
  moneyBalance: undefined,
  windowWidth: 0,
  windowHeight: 0,
  slotMachineWidth: 0,
  slotMachineHeight: 0,
  slotMachinePosX: 0,
  slotMachinePosY: 0,
  symbols: [],
  strips: [],
};
