import { Layout } from "../components/Layout";
import { Dashboard } from "../components/Dashboard";
import { Statement } from "../components/Statement";
import { NewTransaction } from "../components/NewTransaction";
import routes from "../lib/routes";
import Link from "next/link";

export default function PanelPage() {
  return (
    <Layout>
      <section className="h-full w-full bg-gray-100 flex flex-col mt-0 xl:mt-0 overflow-x-hidden">
       {/*Desktop*/}
         <div className="w-[100%] flex gap-5 pt-6 pl-8 pb-6 font-bold">
           <Link className="text-black hover:text-green-500 hover:border-b-2 hover:border-green-500" href={routes.home}>Início</Link>
           <Link className="text-black hover:text-green-500 hover:border-b-2 hover:border-green-500" href={routes.transacoes}>Transações</Link>
        </div>
        <div className="bg-sky-200 dark:bg-blue-violet-50 flex flex-grow">
          <div className="flex w-full flex-col gap-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="flex flex-col 2md:flex-row gap-6">
              <div className="mx-auto bg-sky-900 rounded-xl shadow-md overflow-visible w-full xl:max-w-2/3">
                <Dashboard  
                  onToggleBalance={() => {}}
                  onRefresh={() => console.log('Recarregar')}
                  showRefreshButton={false}
                  aria-label="Painel de controle financeiro"
                >
                <></>
                </Dashboard>
              </div>
              <div className="order-3 2md:order-none 2md:w-1/3">
                <div className="mx-auto overflow-hidden rounded-xl shadow-md">
                  <Statement
                    showDetails={false}
                    showAllTransactions={false}
                    customTitle="Transações"
                    showLastTransactionsSubtitle={true}
                    swapColumns={false} transactions={[]}                  />
                </div>
              </div>
            </div>
            {/* Nova Transação (abaixo, ocupando largura total) */}
            <div className="order-2 2md:order-none w-full">
              <NewTransaction />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 