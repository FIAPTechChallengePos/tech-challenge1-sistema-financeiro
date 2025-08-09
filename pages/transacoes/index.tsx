import TransactionList from './../../components/TransactionList';

export default function TransacoesPage() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Transações</h1>
      <TransactionList />
    </div>
  );
}
