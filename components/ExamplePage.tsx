import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Text } from '../components/Text';
import { Layout } from '../components/Layout';
import { Dashboard } from '../components/Dashboard';
import { ThemeToggle, AccessibilitySettings } from '../components/ThemeToggle';
import { IconAccountCircle, IconBell } from '../components/icons/IconAccountCircle';

// Exemplo de página demonstrando o uso dos componentes com acessibilidade
export function ExamplePage() {
  const transactionOptions = [
    { display: 'Crédito', value: 'credito' },
    { display: 'Débito', value: 'debito' },
    { display: 'Empréstimo', value: 'emprestimo' }
  ];

  const handleTransactionChange = (value: string) => {
    console.log('Transação selecionada:', value);
  };

  const handleToggleBalance = () => {
    console.log('Saldo alternado');
  };

  const handleRefresh = () => {
    console.log('Dados atualizados');
  };

  return (
    <Layout 
      variant="default"
      spacing="medium"
      aria-label="Página de exemplo do sistema financeiro"
    >
      {/* Cabeçalho com controles de tema */}
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
          <IconAccountCircle 
            size="large" 
            color="primary"
            aria-label="Perfil do usuário"
          />
          <Text 
            variant="title-bold" 
            color="text-gray-900 dark:text-white"
            as="h1"
          >
            Sistema Financeiro
          </Text>
        </div>
        
        <div className="flex items-center gap-4">
          <IconBell 
            size="medium" 
            color="secondary"
            aria-label="Notificações"
          />
          <ThemeToggle />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dashboard */}
          <div className="lg:col-span-2">
            <Dashboard 
              onToggleBalance={handleToggleBalance}
              onRefresh={handleRefresh}
              showRefreshButton={true}
              aria-label="Painel de controle financeiro"
            />
          </div>

          {/* Formulário de transação */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <Text 
              variant="subtitle" 
              color="text-gray-900 dark:text-white"
              as="h2"
              className="mb-4"
            >
              Nova Transação
            </Text>
            
            <div className="space-y-4">
              <Input
                options={transactionOptions}
                size="G"
                placeholder="Selecione o tipo de transação"
                onSelectionChange={handleTransactionChange}
                label="Tipo de Transação"
                required={true}
                helperText="Escolha o tipo de transação que deseja realizar"
                aria-label="Selecionar tipo de transação"
              />

              <div className="flex gap-4">
                <Button
                  theme="primary"
                  size="G"
                  label="Salvar"
                  loading={false}
                  fullWidth={true}
                  aria-label="Salvar nova transação"
                />
                <Button
                  theme="outline-sky"
                  size="G"
                  label="Cancelar"
                  fullWidth={true}
                  aria-label="Cancelar criação de transação"
                />
              </div>
            </div>
          </div>

          {/* Configurações de acessibilidade */}
          <div>
            <AccessibilitySettings />
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-100 dark:bg-gray-700 p-4 text-center">
        <Text 
          variant="text-small" 
          color="text-gray-600 dark:text-gray-300"
          as="p"
        >
          Sistema Financeiro - Desenvolvido com foco em acessibilidade
        </Text>
      </footer>
    </Layout>
  );
}

// Exemplo de uso dos componentes com diferentes configurações de acessibilidade
export function AccessibilityExamples() {
  return (
    <div className="space-y-8 p-6">
      <Text variant="title-bold" color="text-gray-900 dark:text-white" as="h1">
        Exemplos de Acessibilidade
      </Text>

      {/* Botões com diferentes estados */}
      <section aria-labelledby="buttons-heading">
        <Text 
          id="buttons-heading"
          variant="subtitle" 
          color="text-gray-900 dark:text-white"
          as="h2"
          className="mb-4"
        >
          Botões com Estados de Acessibilidade
        </Text>
        
        <div className="flex flex-wrap gap-4">
          <Button
            theme="primary"
            label="Botão Normal"
            aria-label="Botão com estado normal"
          />
          
          <Button
            theme="primary"
            label="Botão Carregando"
            loading={true}
            aria-label="Botão em processo de carregamento"
          />
          
          <Button
            theme="primary"
            label="Botão Desabilitado"
            disabled={true}
            aria-label="Botão desabilitado"
          />
          
          <Button
            theme="secondary"
            label="Botão com Ícone"
            iconLeft={<IconBell size="small" />}
            aria-label="Botão com ícone de notificação"
          />
        </div>
      </section>

      {/* Inputs com diferentes estados */}
      <section aria-labelledby="inputs-heading">
        <Text 
          id="inputs-heading"
          variant="subtitle" 
          color="text-gray-900 dark:text-white"
          as="h2"
          className="mb-4"
        >
          Inputs com Estados de Acessibilidade
        </Text>
        
        <div className="space-y-4 max-w-md">
          <Input
            options={['Opção 1', 'Opção 2', 'Opção 3']}
            label="Input Normal"
            helperText="Este é um input com texto de ajuda"
            aria-label="Selecionar opção"
          />
          
          <Input
            options={['Opção 1', 'Opção 2', 'Opção 3']}
            label="Input com Erro"
            error="Este campo é obrigatório"
            aria-label="Selecionar opção com erro"
          />
          
          <Input
            options={['Opção 1', 'Opção 2', 'Opção 3']}
            label="Input Desabilitado"
            disabled={true}
            aria-label="Input desabilitado"
          />
        </div>
      </section>

      {/* Textos com diferentes variantes */}
      <section aria-labelledby="texts-heading">
        <Text 
          id="texts-heading"
          variant="subtitle" 
          color="text-gray-900 dark:text-white"
          as="h2"
          className="mb-4"
        >
          Textos com Diferentes Variantes
        </Text>
        
        <div className="space-y-2">
          <Text variant="title-bold" color="text-gray-900 dark:text-white" as="h1">
            Título Principal
          </Text>
          <Text variant="title-regular" color="text-gray-700 dark:text-gray-300" as="h2">
            Título Secundário
          </Text>
          <Text variant="subtitle" color="text-gray-600 dark:text-gray-400" as="h3">
            Subtítulo
          </Text>
          <Text variant="text-regular" color="text-gray-800 dark:text-gray-200">
            Texto regular em negrito
          </Text>
          <Text variant="text-regular-special" color="text-gray-600 dark:text-gray-400">
            Texto regular normal
          </Text>
          <Text variant="text-small" color="text-gray-500 dark:text-gray-500">
            Texto pequeno
          </Text>
        </div>
      </section>
    </div>
  );
}
