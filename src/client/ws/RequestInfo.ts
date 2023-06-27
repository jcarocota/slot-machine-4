export enum RequestStatus {
  pending,
  resolved,
  error,
}

export enum RequestType {
  balance,
  spin,
  strips,
  symbols,
}

export interface RequestValues {
  idRequest: number;
  action: string;
  user: string;
  stake: number;
}

export interface RequestInfo {
  idRequest: number;
  requestType: RequestType;
  requestStatus: RequestStatus;
  data: any;
}
