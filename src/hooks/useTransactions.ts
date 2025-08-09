import { useState, useEffect, useCallback } from 'react';
import { Transaction, CreateTransactionData, TransactionFilters } from '../types/transaction';
import { mockTransactions, generateTransactionId, calculateBalance, calculateTransactionStats } from '../data/mockTransactions';

interface UseTransactionsReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  balance: number;
  stats: ReturnType<typeof calculateTransactionStats>;
  addTransaction: (data: CreateTransactionData) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  filterTransactions: (filters: TransactionFilters) => void;
  clearFilters: () => void;
  refreshTransactions: () => void;
}

export function useTransactions(): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({});

  // Simula carregamento inicial dos dados
  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ordena por data (mais recente primeiro)
      const sortedTransactions = [...mockTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setTransactions(sortedTransactions);
      setFilteredTransactions(sortedTransactions);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error('Erro ao carregar transações:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega transações na inicialização
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Aplica filtros quando mudarem
  useEffect(() => {
    let filtered = [...transactions];

    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= filters.startDate!);
    }

    if (filters.endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= filters.endDate!);
    }

    if (filters.minAmount !== undefined) {
      filtered = filtered.filter(t => t.amount >= filters.minAmount!);
    }

    if (filters.maxAmount !== undefined) {
      filtered = filtered.filter(t => t.amount <= filters.maxAmount!);
    }

    setFilteredTransactions(filtered);
  }, [transactions, filters]);

  // Adicionar nova transação
  const addTransaction = useCallback(async (data: CreateTransactionData) => {
    try {
      setLoading(true);
      setError(null);

      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      const newTransaction: Transaction = {
        id: generateTransactionId(),
        ...data,
        date: new Date().toISOString(),
      };

      setTransactions(prev => [newTransaction, ...prev]);
    } catch (err) {
      setError('Erro ao adicionar transação');
      console.error('Erro ao adicionar transação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar transação existente
  const updateTransaction = useCallback(async (id: string, data: Partial<Transaction>) => {
    try {
      setLoading(true);
      setError(null);

      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      setTransactions(prev =>
        prev.map(transaction =>
          transaction.id === id
            ? { ...transaction, ...data }
            : transaction
        )
      );
    } catch (err) {
      setError('Erro ao atualizar transação');
      console.error('Erro ao atualizar transação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Deletar transação
  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    } catch (err) {
      setError('Erro ao deletar transação');
      console.error('Erro ao deletar transação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros
  const filterTransactions = useCallback((newFilters: TransactionFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Limpar filtros
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Recarregar transações
  const refreshTransactions = useCallback(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Calcular estatísticas
  const balance = calculateBalance(filteredTransactions);
  const stats = calculateTransactionStats(filteredTransactions);

  return {
    transactions: filteredTransactions,
    loading,
    error,
    balance,
    stats,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filterTransactions,
    clearFilters,
    refreshTransactions,
  };
}
