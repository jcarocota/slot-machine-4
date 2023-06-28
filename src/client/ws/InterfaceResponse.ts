export interface Symbol {
  id: number;
  description: string;
}

export interface SymbolsResponse {
  idRequest: number;
  symbols: Symbol[];
  wildcardSymbolId: number;
  wildcardBigWinSymbolId: number;
}

export type Strip = Symbol[];

export interface StripsResponse {
  idRequest: number;
  strips: Strip[];
}

export interface MoneyBalanceResponse {
  idRequest: number;
  moneyBalance: number;
}
