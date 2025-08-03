import { Layout } from "../components/Layout";
import { Statement } from "../components/Statement";

export default function TransactionsPage() {
  return (
    <Layout>
      <section className="w-full flex flex-col mt-0 sm:mt-[52px] xl:mt-0">
        <div className="flex h-screen flex-col gap-6 p-6">
          <Statement
            showDetails={true}
            showAllTransactions={true}
            customTitle="Transações"
            swapColumns={true}
          />
        </div>
      </section>
    </Layout>
  );
} 