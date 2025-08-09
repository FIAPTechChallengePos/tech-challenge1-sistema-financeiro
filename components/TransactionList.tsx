const mockTransaction = [
  { id: 1, descricao: 'Aluguel', valor: 1200 },
  { id: 2, descricao: 'Mercado', valor: 450.75 },
  { id: 3, descricao: 'Salário', valor: 5000 },
];

export default function TransactionList() {
  return (
    <ul className="space-y-2">
      {mockTransaction.map((tx) => (
        <li key={tx.id} className="border p-3 rounded shadow-sm">
          <div className="font-semibold">{tx.descricao}</div>
          <div className="text-gray-600">R$ {tx.valor.toFixed(2)}</div>
        </li>
      ))}
    </ul>
  );
}
