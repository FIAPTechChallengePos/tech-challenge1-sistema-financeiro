import { useState, useEffect } from "react";

export type Transaction = {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string | Date;
  id_user: string;
};

export function useTransactions(userId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule fetch de dados (substitua por fetch real ou API)
    setLoading(true);
    setTimeout(() => {
      setTransactions([
        {
          id: "1",
          type: "credit",
          amount: 1000,
          description: "Salário",
          date: new Date(),
          id_user: userId,
        },
        {
          id: "2",
          type: "debit",
          amount: 200,
          description: "Supermercado",
          date: new Date(),
          id_user: userId,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [userId]);

  // Métodos para criar, atualizar, deletar (simulados)
  function createTransaction(tx: Omit<Transaction, "id">) {
    setTransactions((prev) => [
      ...prev,
      { ...tx, id: String(Date.now()) },
    ]);
  }

  function updateTransaction(id: string, updated: Partial<Transaction>) {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updated } : tx))
    );
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }

  return {
    transactions,
    loading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
} 