import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { ThemeToggle } from '../components/ThemeToggle';
import Link from 'next/link';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

interface TransactionsPageProps {
  transactions: any[];
  categories: string[];
  lastUpdated: string;
}

export default function TransactionsPage({ transactions, categories, lastUpdated }: TransactionsPageProps) {
  const handleTransactionSubmit = (data: any) => {
    console.log('Nova transação:', data);
  };

  const handleTransactionClick = (transaction: any) => {
    console.log('Transação clicada:', transaction);
  };

  const handleLoadMore = () => {
    console.log('Carregar mais transações');
  };

  return (
    <>
      <Head>
        <title>Transações - Sistema Financeiro</title>
        <meta name="description" content="Visualize e gerencie todas as suas transações financeiras de forma organizada e acessível." />
        <meta name="keywords" content="transações, finanças, controle financeiro, débitos, créditos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Transações - Sistema Financeiro" />
        <meta property="og:description" content="Visualize e gerencie todas as suas transações financeiras de forma organizada e acessível." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Transações - Sistema Financeiro",
              "description": "Página para visualização e gerenciamento de transações financeiras",
              "url": "https://sistema-financeiro.com/transactions",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Sistema Financeiro",
                "url": "https://sistema-financeiro.com"
              }
            })
          }}
        />
      </Head>

      <Layout variant="default" spacing="medium">
        {/* Cabeçalho */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/" 
                  className="text-sky-500 hover:text-sky-600 dark:text-blue-violet-400 dark:hover:text-blue-violet-300"
                  aria-label="Voltar para página inicial"
                >
                  ← Voltar
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Transações
                </h1>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulário de nova transação */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-8">
                  <TransactionForm
                    onSubmit={handleTransactionSubmit}
                    isLoading={false}
                    submitLabel="Adicionar"
                    cancelLabel="Limpar"
                    aria-label="Formulário de nova transação"
                  />
                </div>
              </div>

              {/* Lista de transações */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <TransactionList
                    transactions={transactions}
                    onTransactionClick={handleTransactionClick}
                    onLoadMore={handleLoadMore}
                    showSearch={true}
                    showPagination={true}
                    aria-label="Lista de transações"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Rodapé */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Última atualização: {lastUpdated}
              </p>
            </div>
          </div>
        </footer>
      </Layout>
    </>
  );
}

// Função para gerar dados estáticos
export const getStaticProps: GetStaticProps = async () => {
  // Simular busca de dados
  const mockTransactions = [
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
    { id: 16, descricao: "Netflix", valor: 45, tipo: 'debito', categoria: 'Lazer', data: '2024-01-01' },
    { id: 17, descricao: "Spotify", valor: 25, tipo: 'debito', categoria: 'Lazer', data: '2023-12-31' },
    { id: 18, descricao: "Academia", valor: 120, tipo: 'debito', categoria: 'Saúde', data: '2023-12-30' },
    { id: 19, descricao: "Presente", valor: 300, tipo: 'debito', categoria: 'Outros', data: '2023-12-29' },
    { id: 20, descricao: "Bônus", valor: 1000, tipo: 'credito', categoria: 'Salário', data: '2023-12-28' },
  ];

  const categories = [
    "Alimentação",
    "Transporte", 
    "Lazer",
    "Moradia",
    "Saúde",
    "Educação",
    "Salário",
    "Investimento",
    "Outros"
  ];

  const lastUpdated = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    props: {
      transactions: mockTransactions,
      categories,
      lastUpdated
    },
    // Revalidar a cada 30 minutos (1800 segundos)
    revalidate: 1800,
  };
};