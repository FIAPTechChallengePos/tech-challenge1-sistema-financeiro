import { Layout } from "../components/Layout";
import { Statement } from "../components/Statement";
import { NewTransaction } from "../components/NewTransaction";
import { useTransactions } from "../src/hooks/useTransactions";
import { Button } from "../components/Button";
import { useRouter } from "next/router";
import routes from "../lib/routes";
import Link from "next/link";


export default function TransactionsPage() {
  const { transactions, loading, error, balance, stats, addTransaction } = useTransactions();
  const router = useRouter();
  return (
    <Layout>
      <section className="w-full flex flex-col mt-0 sm:mt-[52px] xl:mt-0">
        <div className="pt-6 pl-8 pb-2 font-bold text-(black-700)">
           <Link href={routes.home}>HOME</Link>
        </div>
        <div className="flex flex-col gap-6 p-6">
          {/* Resumo Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">Saldo Atual</h3>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">Total de Receitas</h3>
              <p className="text-2xl font-bold text-green-600">
                {stats.totalCredit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">Total de Despesas</h3>
              <p className="text-2xl font-bold text-red-600">
                {stats.totalDebit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>

          {/* Nova Transação */}
          <NewTransaction onAddTransaction={addTransaction} />

          {/* Lista de Transações */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <Statement
            transactions={transactions}
            showDetails={true}
            showAllTransactions={true}
            customTitle="Todas as Transações"
            swapColumns={true}
            isLoading={loading}
          />
        </div>
      </section>
    </Layout>
  );
} 