import { useState } from 'react';

export default function TransactionForm() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ descricao, valor });
    // Simular envio
    alert(`Transação adicionada: ${descricao} - R$ ${valor}`);
    setDescricao('');
    setValor(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Valor (R$)</label>
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="w-full border px-3 py-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Adicionar
      </button>
    </form>
  );
}
