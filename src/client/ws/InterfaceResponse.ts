export interface SymbolSlot {
  id: number;
  description: string;
}

export interface SymbolsResponse {
  idRequest: number;
  symbols: SymbolSlot[];
  wildcardSymbolId: number;
  wildcardBigWinSymbolId: number;
}

export type Strip = SymbolSlot[];

export interface StripsResponse {
  idRequest: number;
  strips: Strip[];
}

export interface MoneyBalanceResponse {
  idRequest: number;
  moneyBalance: number;
}
