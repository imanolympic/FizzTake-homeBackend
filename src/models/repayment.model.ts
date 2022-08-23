export interface Repayment {
  _id: string;
  amount: number;
  transactionsCovered: number;
  recipient: string;
}

export interface RepaymentEntity {
  amount: number;
  transactionsCovered: number;
  recipient: string;
}
