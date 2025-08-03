import { Layout } from "../components/Layout";
import { Dashboard } from "../components/Dashboard";
import { Statement } from "../components/Statement";
import { NewTransaction } from "../components/NewTransaction";

export default function PanelPage() {
  return (
    <Layout>
      <section className="h-full w-full bg-gray-100 flex flex-col mt-0 sm:mt-[52px] xl:mt-0 overflow-x-hidden">
        <div className="bg-gray-200 dark:bg-blue-violet-50 flex flex-grow">
          <div className="flex w-full flex-col gap-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="flex flex-col 2md:flex-row gap-6">
              <div className="mx-auto bg-white rounded-xl shadow-md overflow-visible w-full xl:max-w-2/3">
                <Dashboard />
              </div>
              <div className="order-3 2md:order-none 2md:w-1/3">
                <div className="mx-auto overflow-hidden rounded-xl shadow-md">
                  <Statement
                    showDetails={false}
                    showAllTransactions={false}
                    customTitle="Transações"
                    showLastTransactionsSubtitle={true}
                    swapColumns={false}
                  />
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