import TransactionForm from './../../components/TransactionForm';

export default function CadastroPage() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Cadastrar Transação</h1>
      <TransactionForm />
    </div>
  );
}
