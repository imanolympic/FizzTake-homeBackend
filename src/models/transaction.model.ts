export interface TransactionInfo {
  title: string;
  type: string;
  amount: number;
}

export interface Transaction {
  _id: string;
  title: string;
  type: string;
  amount: number;
  repaid: boolean;
  issuedRefund: boolean;
}

export interface TransactionEntity {
  title: string;
  type: string;
  amount: number;
  repaid: boolean;
  issuedRefund: boolean;
}
