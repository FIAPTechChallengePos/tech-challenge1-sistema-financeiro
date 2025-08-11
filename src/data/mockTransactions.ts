import { Transaction } from '../types/transaction';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credito',
    amount: 2500.00,
    description: 'Salário - Empresa XYZ',
    date: '2024-01-15T10:30:00Z',
    category: 'Salário'
  },
  {
    id: '2',
    type: 'debito',
    amount: 350.75,
    description: 'Supermercado - Compras do mês',
    date: '2024-01-14T14:22:00Z',
    category: 'Alimentação'
  },
  {
    id: '3',
    type: 'credito',
    amount: 150.00,
    description: 'Freelance - Projeto Web',
    date: '2024-01-13T16:45:00Z',
    category: 'Freelance'
  },
  {
    id: '4',
    type: 'debito',
    amount: 89.90,
    description: 'Conta de Luz - Janeiro',
    date: '2024-01-12T09:15:00Z',
    category: 'Utilidades'
  },
  {
    id: '5',
    type: 'debito',
    amount: 45.50,
    description: 'Uber - Transporte',
    date: '2024-01-11T18:30:00Z',
    category: 'Transporte'
  },
  {
    id: '6',
    type: 'credito',
    amount: 75.00,
    description: 'Cashback - Cartão de Crédito',
    date: '2024-01-10T12:00:00Z',
    category: 'Cashback'
  },
  {
    id: '7',
    type: 'emprestimo',
    amount: 1000.00,
    description: 'Empréstimo Pessoal - Banco ABC',
    date: '2024-01-09T11:20:00Z',
    category: 'Empréstimo'
  },
  {
    id: '8',
    type: 'debito',
    amount: 120.00,
    description: 'Academia - Mensalidade',
    date: '2024-01-08T07:45:00Z',
    category: 'Saúde'
  },
  {
    id: '9',
    type: 'credito',
    amount: 300.00,
    description: 'Venda - Produto Online',
    date: '2024-01-07T20:15:00Z',
    category: 'Vendas'
  },
  {
    id: '10',
    type: 'debito',
    amount: 25.90,
    description: 'Netflix - Assinatura Mensal',
    date: '2024-01-06T23:59:00Z',
    category: 'Entretenimento'
  },
  {
    id: '11',
    type: 'debito',
    amount: 180.00,
    description: 'Farmácia - Medicamentos',
    date: '2024-01-05T15:30:00Z',
    category: 'Saúde'
  },
  {
    id: '12',
    type: 'credito',
    amount: 500.00,
    description: 'Dividendos - Investimentos',
    date: '2024-01-04T10:00:00Z',
    category: 'Investimentos'
  },
  {
    id: '13',
    type: 'debito',
    amount: 67.80,
    description: 'Restaurante - Jantar',
    date: '2024-01-03T19:45:00Z',
    category: 'Alimentação'
  },
  {
    id: '14',
    type: 'debito',
    amount: 39.99,
    description: 'Spotify - Assinatura Premium',
    date: '2024-01-02T08:20:00Z',
    category: 'Entretenimento'
  },
  {
    id: '15',
    type: 'credito',
    amount: 200.00,
    description: 'Presente - Aniversário',
    date: '2024-01-01T16:30:00Z',
    category: 'Presentes'
  }
];

// Função para gerar ID único
export function generateTransactionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para calcular saldo total
export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((balance, transaction) => {
    switch (transaction.type) {
      case 'credito':
        return balance + transaction.amount;
      case 'debito':
        return balance - transaction.amount;
      case 'emprestimo':
        return balance + transaction.amount; // Empréstimo aumenta saldo temporariamente
      default:
        return balance;
    }
  }, 0);
}

// Função para calcular estatísticas
export function calculateTransactionStats(transactions: Transaction[]) {
  const totalCredit = transactions
    .filter(t => t.type === 'credito')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalDebit = transactions
    .filter(t => t.type === 'debito')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalLoan = transactions
    .filter(t => t.type === 'emprestimo')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalCredit,
    totalDebit,
    totalLoan,
    balance: calculateBalance(transactions),
    transactionCount: transactions.length
  };
}
