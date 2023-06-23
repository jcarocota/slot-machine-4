import { Payline } from "./Payline.js";

export class GottenPaylineInfo {
  payline: Payline;
  numberOfCoincidences: number;
  numberOfBigWins: number;
  amountWinByLine: number;

  constructor(
    payline: Payline,
    numberOfCoincidences: number,
    numberOfBigWins: number,
    amountWinByLine: number
  ) {
    this.payline = payline;
    this.numberOfCoincidences = numberOfCoincidences;
    this.numberOfBigWins = numberOfBigWins;
    this.amountWinByLine = amountWinByLine;
  }
}
