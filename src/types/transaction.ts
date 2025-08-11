export type TransactionType = "credito" | "debito" | "emprestimo";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string | Date;
  category?: string;
}

export interface CreateTransactionData {
  type: TransactionType;
  amount: number;
  description: string;
  category?: string;
}

export interface TransactionFilters {
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
}
