import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { ThemeToggle, AccessibilitySettings } from '../components/ThemeToggle';
import { Dashboard } from '../components/Dashboard';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';

interface HomePageProps {
  transactions: any[];  
  categories: string[];
  lastUpdated: string;
}

export default function HomePage({ transactions, categories, lastUpdated }: HomePageProps) {
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
        <title>Sistema Financeiro - Controle suas Finanças</title>
        <meta name="description" content="Sistema completo para controle financeiro pessoal com interface acessível e moderna." />
        <meta name="keywords" content="finanças, controle financeiro, transações, dinheiro, orçamento" />
        <meta name="author" content="Sistema Financeiro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sistema-financeiro.com/" />
        <meta property="og:title" content="Sistema Financeiro - Controle suas Finanças" />
        <meta property="og:description" content="Sistema completo para controle financeiro pessoal com interface acessível e moderna." />
        <meta property="og:image" content="https://sistema-financeiro.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sistema-financeiro.com/" />
        <meta property="twitter:title" content="Sistema Financeiro - Controle suas Finanças" />
        <meta property="twitter:description" content="Sistema completo para controle financeiro pessoal com interface acessível e moderna." />
        <meta property="twitter:image" content="https://sistema-financeiro.com/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Sistema Financeiro",
              "description": "Sistema completo para controle financeiro pessoal",
              "url": "https://sistema-financeiro.com",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "BRL"
              },
              "accessibilityFeature": [
                "alternativeText",
                "highContrastDisplay",
                "largePrint",
                "screenReader"
              ],
              "accessibilityHazard": "none",
              "accessibilityAPI": "ARIA"
            })
          }}
        />
      </Head>

      <Layout variant="default" spacing="medium">
        {/* Cabeçalho */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Sistema Financeiro
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <AccessibilitySettings className="hidden md:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Dashboard */}
              <div className="lg:col-span-1">
                <Dashboard  
                  onToggleBalance={() => {}}
                  onRefresh={() => console.log('Recarregar')}
                  showRefreshButton={false}
                  aria-label="Painel de controle financeiro"
                >
                <></>
                </Dashboard>
        </div>

              {/* Formulário de transação */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                  <TransactionForm
                    onSubmit={handleTransactionSubmit}
                    isLoading={false}
                    submitLabel="Adicionar Transação"
                    cancelLabel="Limpar Formulário"
                    aria-label="Formulário de nova transação"
                  />
                </div>

                {/* Lista de transações */}
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sistema Financeiro
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Controle suas finanças de forma simples e eficiente com nossa plataforma acessível.
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                  Recursos
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Controle de transações</li>
                  <li>• Relatórios detalhados</li>
                  <li>• Interface acessível</li>
                  <li>• Modo escuro/claro</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                  Acessibilidade
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Alto contraste</li>
                  <li>• Navegação por teclado</li>
                  <li>• Leitores de tela</li>
                  <li>• Tamanhos de fonte ajustáveis</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  © 2024 Sistema Financeiro. Todos os direitos reservados.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  Última atualização: {lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </Layout>
    </>
  );
}

// Função para gerar dados estáticos
export const getStaticProps: GetStaticProps = async () => {
  // Simular busca de dados (em produção, isso viria de uma API ou banco de dados)
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
    // Revalidar a cada 1 hora (3600 segundos)
    revalidate: 3600,
  };
};