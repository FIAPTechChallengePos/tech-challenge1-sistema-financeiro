import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { ThemeToggle, AccessibilitySettings } from '../components/ThemeToggle';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

interface ConfigurationsPageProps {
  lastUpdated: string;
}

export default function ConfigurationsPage({ lastUpdated }: ConfigurationsPageProps) {
  const handleExportData = () => {
    console.log('Exportar dados');
    // Implementar lógica de exportação
  };

  const handleImportData = () => {
    console.log('Importar dados');
    // Implementar lógica de importação
  };

  const handleBackupData = () => {
    console.log('Backup dos dados');
    // Implementar lógica de backup
  };

  const handleResetData = () => {
    if (confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      console.log('Resetar dados');
      // Implementar lógica de reset
    }
  };

  return (
    <>
      <Head>
        <title>Configurações - Sistema Financeiro</title>
        <meta name="description" content="Configure suas preferências de acessibilidade, tema e outras opções do sistema financeiro." />
        <meta name="keywords" content="configurações, acessibilidade, tema, preferências, sistema financeiro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Configurações - Sistema Financeiro" />
        <meta property="og:description" content="Configure suas preferências de acessibilidade, tema e outras opções do sistema financeiro." />
        <meta property="og:type" content="website" />
      </Head>

      <Layout variant="default" spacing="medium">
        {/* Cabeçalho */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <a 
                  href="/" 
                  className="text-sky-500 hover:text-sky-600 dark:text-blue-violet-400 dark:hover:text-blue-violet-300"
                  aria-label="Voltar para página inicial"
                >
                  ← Voltar
                </a>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Configurações
                </h1>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              
              {/* Configurações de Acessibilidade */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <Text variant="title-bold" color="text-gray-900 dark:text-white" as="h2" className="mb-6">
                  Acessibilidade
                </Text>
                <AccessibilitySettings />
              </section>

              {/* Configurações de Tema */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <Text variant="title-bold" color="text-gray-900 dark:text-white" as="h2" className="mb-6">
                  Tema e Aparência
                </Text>
                <div className="space-y-4">
                  <div>
                    <Text variant="text-regular" color="text-gray-700 dark:text-gray-300" as="label" className="block mb-2">
                      Modo de Exibição
                    </Text>
                    <ThemeToggle />
                  </div>
                  
                  <div>
                    <Text variant="text-regular" color="text-gray-700 dark:text-gray-300" as="label" className="block mb-2">
                      Cores Personalizadas
                    </Text>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: 'Azul', color: 'bg-blue-500' },
                        { name: 'Verde', color: 'bg-green-500' },
                        { name: 'Roxo', color: 'bg-purple-500' },
                        { name: 'Laranja', color: 'bg-orange-500' }
                      ].map((theme) => (
                        <button
                          key={theme.name}
                          className={`${theme.color} w-12 h-12 rounded-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-sky-500`}
                          aria-label={`Aplicar tema ${theme.name}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Configurações de Dados */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <Text variant="title-bold" color="text-gray-900 dark:text-white" as="h2" className="mb-6">
                  Gerenciamento de Dados
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    theme="primary"
                    size="G"
                    label="Exportar Dados"
                    onClick={handleExportData}
                    iconLeft={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    }
                    aria-label="Exportar todos os dados do sistema"
                  />
                  
                  <Button
                    theme="outline-sky"
                    size="G"
                    label="Importar Dados"
                    onClick={handleImportData}
                    iconLeft={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    }
                    aria-label="Importar dados de arquivo"
                  />
                  
                  <Button
                    theme="secondary"
                    size="G"
                    label="Backup Automático"
                    onClick={handleBackupData}
                    iconLeft={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                    }
                    aria-label="Configurar backup automático dos dados"
                  />
                  
                  <Button
                    theme="ghost-sky"
                    size="G"
                    label="Resetar Dados"
                    onClick={handleResetData}
                    iconLeft={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                    }
                    aria-label="Resetar todos os dados do sistema"
                  />
                </div>
              </section>

              {/* Informações do Sistema */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <Text variant="title-bold" color="text-gray-900 dark:text-white" as="h2" className="mb-6">
                  Informações do Sistema
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Text variant="text-small-bold" color="text-gray-700 dark:text-gray-300" className="mb-2">
                      Versão
                    </Text>
                    <Text variant="text-small" color="text-gray-600 dark:text-gray-400">
                      1.0.0
                    </Text>
                  </div>
                  
                  <div>
                    <Text variant="text-small-bold" color="text-gray-700 dark:text-gray-300" className="mb-2">
                      Última Atualização
                    </Text>
                    <Text variant="text-small" color="text-gray-600 dark:text-gray-400">
                      {lastUpdated}
                    </Text>
                  </div>
                  
                  <div>
                    <Text variant="text-small-bold" color="text-gray-700 dark:text-gray-300" className="mb-2">
                      Compatibilidade
                    </Text>
                    <Text variant="text-small" color="text-gray-600 dark:text-gray-400">
                      WCAG 2.1 AA
                    </Text>
                  </div>
                  
                  <div>
                    <Text variant="text-small-bold" color="text-gray-700 dark:text-gray-300" className="mb-2">
                      Suporte
                    </Text>
                    <Text variant="text-small" color="text-gray-600 dark:text-gray-400">
                      Chrome, Firefox, Safari, Edge
                    </Text>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </main>

        {/* Rodapé */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sistema Financeiro - Configurações atualizadas em {lastUpdated}
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
  const lastUpdated = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    props: {
      lastUpdated
    },
    // Revalidar a cada 24 horas (86400 segundos)
    revalidate: 86400,
  };
};