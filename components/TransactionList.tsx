"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { Text } from "./Text";

export interface Transaction {
  id: number;
  descricao: string;
  valor: number;
  tipo?: 'credito' | 'debito';
  categoria?: string;
  data?: string;
}

interface TransactionListProps {
  transactions?: Transaction[];
  pageSize?: number;
  onLoadMore?: () => void;
  onTransactionClick?: (transaction: Transaction) => void;
  showSearch?: boolean;
  showPagination?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
  className?: string;
}

const mockTransaction: Transaction[] = [
  { id: 1, descricao: "Aluguel", valor: 1200, tipo: 'debito', categoria: 'Moradia', data: '2024-01-15' },
  { id: 2, descricao: "Mercado", valor: 450.75, tipo: 'debito', categoria: 'Alimentação', data: '2024-01-14' },
  { id: 3, descricao: "Salário", valor: 5000, tipo: 'credito', categoria: 'Salário', data: '2024-01-10' },
  { id: 4, descricao: "Transporte", valor: 200, tipo: 'debito', categoria: 'Transporte', data: '2024-01-13' },
  { id: 5, descricao: "Luz", valor: 150, tipo: 'debito', categoria: 'Moradia', data: '2024-01-12' },
  { id: 6, descricao: "Internet", valor: 100, tipo: 'debito', categoria: 'Moradia', data: '2024-01-11' },
  { id: 7, descricao: "Água", valor: 80, tipo: 'debito', categoria: 'Moradia', data: '2024-01-10' },
  { id: 8, descricao: "Restaurante", valor: 250, tipo: 'debito', categoria: 'Alimentação', data: '2024-01-09' },
  { id: 9, descricao: "Farmácia", valor: 90, tipo: 'debito', categoria: 'Saúde', data: '2024-01-08' },
  { id: 10, descricao: "Cinema", valor: 60, tipo: 'debito', categoria: 'Lazer', data: '2024-01-07' },
  { id: 11, descricao: "Show do BTS", valor: 2500, tipo: 'debito', categoria: 'Lazer', data: '2024-01-06' },
  { id: 12, descricao: "Freelance", valor: 800, tipo: 'credito', categoria: 'Salário', data: '2024-01-05' },
  { id: 13, descricao: "Gasolina", valor: 120, tipo: 'debito', categoria: 'Transporte', data: '2024-01-04' },
  { id: 14, descricao: "Livros", valor: 180, tipo: 'debito', categoria: 'Educação', data: '2024-01-03' },
  { id: 15, descricao: "Investimento", valor: 1000, tipo: 'debito', categoria: 'Investimento', data: '2024-01-02' },
];

const DEFAULT_PAGE_SIZE = 5;

export function TransactionList({
  transactions = mockTransaction,
  pageSize = DEFAULT_PAGE_SIZE,
  onLoadMore,
  onTransactionClick,
  showSearch = true,
  showPagination = true,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  tabIndex,
  ...props
}: TransactionListProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<'data' | 'valor' | 'descricao'>('data');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'todos' | 'credito' | 'debito'>('todos');
  const [isLoading, setIsLoading] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Função para filtrar e ordenar transações
  const getFilteredAndSortedTransactions = () => {
    const filtered = transactions.filter((tx) => {
      const matchesSearch = tx.descricao.toLowerCase().includes(search.toLowerCase()) ||
                           tx.categoria?.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'todos' || tx.tipo === filterType;
      return matchesSearch && matchesType;
    });

    // Ordenação
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;  
      
      switch (sortBy) {
        case 'data':
          aValue = new Date(a.data || '');
          bValue = new Date(b.data || '');
          break;
        case 'valor':
          aValue = a.valor;
          bValue = b.valor;
          break;
        case 'descricao':
          aValue = a.descricao.toLowerCase();
          bValue = b.descricao.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredTransactions = getFilteredAndSortedTransactions();
  const visibleTransactions = filteredTransactions.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTransactions.length;

  // Função para carregar mais transações
  const handleLoadMore = async () => {
    setIsLoading(true);
    
    // Simular delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setVisibleCount((prev) => prev + pageSize);
    setIsLoading(false);
    
    // Chamar callback se fornecido
    onLoadMore?.();
  };

  // Função para buscar transações
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setVisibleCount(pageSize); // Reinicia a paginação ao buscar
  };

  // Função para alternar ordenação
  const handleSort = (field: 'data' | 'valor' | 'descricao') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Função para filtrar por tipo
  const handleFilterType = (type: 'todos' | 'credito' | 'debito') => {
    setFilterType(type);
    setVisibleCount(pageSize);
  };

  // Função para clicar em uma transação
  const handleTransactionClick = (transaction: Transaction) => {
    onTransactionClick?.(transaction);
  };

  // Função para limpar busca
  const clearSearch = () => {
    setSearch("");
    setVisibleCount(pageSize);
    searchInputRef.current?.focus();
  };

  // Função para scroll suave para o topo
  const scrollToTop = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Efeito para scroll automático quando carregar mais
  useEffect(() => {
    if (visibleCount > pageSize) {
      const lastItem = document.querySelector('[data-transaction-item]:last-child');
      lastItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [visibleCount, pageSize]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto p-4"
      aria-label={ariaLabel || "Lista de transações"}
      aria-describedby={ariaDescribedBy}
      role={role || "region"}
      tabIndex={tabIndex}
      {...props}
    >
      {/* Cabeçalho com controles */}
      <div className="mb-6 space-y-4">
        <Text variant="title-bold" color="text-gray-900 dark:text-white" as="h2">
          Transações
        </Text>
        
        {/* Barra de busca */}
        {showSearch && (
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar por descrição ou categoria..."
              value={search}
              onChange={handleSearch}
              className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                       dark:focus:ring-blue-violet-500"
              aria-label="Buscar transações"
              aria-describedby="search-help"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600
                         focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
                aria-label="Limpar busca"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            <div id="search-help" className="sr-only">
              Digite para buscar transações por descrição ou categoria
            </div>
          </div>
        )}

        {/* Filtros e ordenação */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Filtro por tipo */}
          <div className="flex gap-2 items-center">
            <Text variant="text-small" color="text-gray-600 dark:text-gray-400" as="span">
              Tipo:
            </Text>
            {(['todos', 'credito', 'debito'] as const).map((type) => (
              <Button
                key={type}
                label={type}
                theme={filterType === type ? 'primary' : 'outline-sky'}
                size="small"
                onClick={() => handleFilterType(type)}
                aria-pressed={filterType === type}
                aria-label={`Filtrar por ${type === 'todos' ? 'todos os tipos' : type === 'credito' ? 'créditos' : 'débitos'}`}
              >
                {type === 'todos' ? 'Todos' : type === 'credito' ? 'Créditos' : 'Débitos'}
              </Button>
            ))}
          </div>

          {/* Ordenação */}
          <div className="flex gap-2 items-center">
            <Text variant="text-small" color="text-gray-600 dark:text-gray-400" as="p">
              Ordenar por:
            </Text>
            {(['data', 'valor', 'descricao'] as const).map((field) => (
              <Button
                key={field}
                label={field}
                theme={sortBy === field ? 'primary' : 'outline-sky'}
                size="small"
                onClick={() => handleSort(field)}
                aria-pressed={sortBy === field}
                aria-label={`Ordenar por ${field === 'data' ? 'data' : field === 'valor' ? 'valor' : 'descrição'}`}
              >
                {field === 'data' ? 'Data' : field === 'valor' ? 'Valor' : 'Nome'}
                {sortBy === field && (
                  <span className="ml-1" aria-label={`Ordem ${sortOrder === 'asc' ? 'crescente' : 'decrescente'}`}>
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Informações de resultados */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {visibleTransactions.length} de {filteredTransactions.length} transações
          {search && ` para "${search}"`}
        </div>
      </div>

      {/* Lista de transações */}
      <ul 
        ref={listRef}
        className="space-y-3"
        role="list"
        aria-label="Lista de transações"
      >
        {visibleTransactions.map((tx, idx) => (
          <li 
            key={`${tx.id}-${idx}`}
            data-transaction-item
            className={`
              border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm
              hover:shadow-md transition-shadow duration-200
              cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500
              dark:focus:ring-blue-violet-500
              ${tx.tipo === 'credito' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'}
            `}
            onClick={() => handleTransactionClick(tx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTransactionClick(tx);
              }
            }}
            tabIndex={0}
            role="listitem"
            aria-label={`Transação: ${tx.descricao}, valor ${formatCurrency(tx.valor)}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Text 
                  variant="text-regular" 
                  color="text-gray-900 dark:text-white"
                  className="mb-1"
                >
                  {tx.descricao}
                </Text>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {tx.categoria && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {tx.categoria}
                    </span>
                  )}
                  {tx.data && (
                    <span>{formatDate(tx.data)}</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <Text 
                  variant="text-regular" 
                  color={tx.tipo === 'credito' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
                  className="font-semibold"
                >
                  {tx.tipo === 'credito' ? '+' : '-'}{formatCurrency(tx.valor)}
                </Text>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {tx.tipo === 'credito' ? 'Crédito' : 'Débito'}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Mensagem quando não há resultados */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <Text variant="text-regular" color="text-gray-500 dark:text-gray-400">
            Nenhuma transação encontrada
          </Text>
          {search && (
            <Button
              theme="ghost-sky"
              size="small"
              onClick={clearSearch}
              className="mt-2"
              aria-label="Limpar busca e mostrar todas as transações"
            >
              Limpar busca
            </Button>
          )}
        </div>
      )}

      {/* Botão para carregar mais */}
      {showPagination && hasMore && (
        <div className="mt-6 text-center">
          <Button
            label="Carregar mais transações"
            theme="primary"
            size="small"
            onClick={handleLoadMore}
            loading={isLoading}
            disabled={isLoading}
            aria-label="Carregar mais transações"
          >
            {isLoading ? 'Carregando...' : 'Carregar mais'}
          </Button>
        </div>
      )}

      {/* Botão para voltar ao topo */}
      {visibleCount > pageSize && (
        <div className="mt-4 text-center">
          <Button
            theme="ghost-sky"
            size="small"
            onClick={scrollToTop}
            aria-label="Voltar ao topo da lista"
          >
            ↑ Voltar ao topo
          </Button>
        </div>
      )}
    </div>
  );
}