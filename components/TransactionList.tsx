"use client";

import { useState } from "react";

const mockTransaction = [
  { id: 1, descricao: "Aluguel", valor: 1200 },
  { id: 2, descricao: "Mercado", valor: 450.75 },
  { id: 3, descricao: "Salário", valor: 5000 },
  { id: 4, descricao: "Transporte", valor: 200 },
  { id: 5, descricao: "Luz", valor: 150 },
  { id: 6, descricao: "Internet", valor: 100 },
  { id: 7, descricao: "Água", valor: 80 },
  { id: 8, descricao: "Restaurante", valor: 250 },
  { id: 9, descricao: "Farmácia", valor: 90 },
  { id: 10, descricao: "Cinema", valor: 60 },
  { id: 1, descricao: "Aluguel", valor: 1200 },
  { id: 2, descricao: "Mercado", valor: 450.75 },
  { id: 3, descricao: "Salário", valor: 5000 },
  { id: 4, descricao: "Transporte", valor: 200 },
  { id: 5, descricao: "Luz", valor: 150 },
  { id: 6, descricao: "Internet", valor: 100 },
  { id: 7, descricao: "Água", valor: 80 },
  { id: 8, descricao: "Show do BTS", valor: 2500 },
  { id: 9, descricao: "Farmácia", valor: 90 },
  { id: 10, descricao: "Cinema", valor: 60 },
];

const PAGE_SIZE = 3;

export default function TransactionList() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");

  const filteredTransactions = mockTransaction.filter((tx) =>
    tx.descricao.toLowerCase().includes(search.toLowerCase())
  );

  const visibleTransactions = filteredTransactions.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setVisibleCount(PAGE_SIZE); // Reinicia a paginação ao buscar
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar transação"
        value={search}
        onChange={handleSearch}
        className="mb-4 px-3 py-2 border rounded w-full"
      />
      <ul className="space-y-2">
        {visibleTransactions.map((tx, idx) => (
          <li key={idx + tx.descricao} className="border p-3 rounded shadow-sm">
            <div className="font-semibold">{tx.descricao}</div>
            <div className="text-gray-600">R$ {tx.valor.toFixed(2)}</div>
          </li>
        ))}
      </ul>
      {visibleCount < filteredTransactions.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-sky-500 text-white rounded"
        >
          Carregar mais
        </button>
      )}
    </div>
  );
}