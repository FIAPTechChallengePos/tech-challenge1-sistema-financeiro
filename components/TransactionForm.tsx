import { useState, useRef, useEffect } from 'react';
import { BaseLayoutProps } from '../src/types/components';
import { Button } from './Button';
import { Text } from './Text';
import { Input } from './Input';

interface TransactionFormData {
  descricao: string;
  valor: number | '';
  categoria: string;
  tipo: 'credito' | 'debito';
  data: string;
  arquivo?: File | null;
}

interface TransactionFormErrors {
  descricao?: string;
  valor?: string;
  categoria?: string;
  tipo?: string;
  data?: string;
  arquivo?: string;
  submit?: string;
}

interface TransactionFormProps {
  onSubmit?: (data: TransactionFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<TransactionFormData>;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
  className?: string;
}

const categorias = [
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

const tiposTransacao = [
  { display: 'Crédito', value: 'credito' },
  { display: 'Débito', value: 'debito' }
];

export function TransactionForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  submitLabel = 'Adicionar Transação',
  cancelLabel = 'Cancelar',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  tabIndex,
  ...props
}: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    descricao: initialData?.descricao || '',
    valor: initialData?.valor || '',
    categoria: initialData?.categoria || '',
    tipo: initialData?.tipo || 'debito',
    data: initialData?.data || new Date().toISOString().split('T')[0],
    arquivo: initialData?.arquivo || null
  });
  
  const [erros, setErros] = useState<TransactionFormErrors>({});
  const [categoriaSugestoes, setCategoriaSugestoes] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const categoriaInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Validação avançada e robusta
  const validarFormulario = (): boolean => {
    const novosErros: TransactionFormErrors = {};
    
    // Validação da descrição
    if (!formData.descricao.trim()) {
      novosErros.descricao = "Descrição é obrigatória.";
    } else if (formData.descricao.trim().length < 3) {
      novosErros.descricao = "Descrição deve ter pelo menos 3 caracteres.";
    } else if (formData.descricao.trim().length > 100) {
      novosErros.descricao = "Descrição deve ter no máximo 100 caracteres.";
    }
    
    // Validação do valor
    if (formData.valor === '' || formData.valor === null || formData.valor === undefined) {
      novosErros.valor = "Valor é obrigatório.";
    } else if (typeof formData.valor === 'number') {
      if (isNaN(formData.valor)) {
        novosErros.valor = "Valor deve ser um número válido.";
      } else if (formData.valor <= 0) {
        novosErros.valor = "Valor deve ser maior que zero.";
      } else if (formData.valor > 999999.99) {
        novosErros.valor = "Valor não pode ser maior que R$ 999.999,99.";
      } else if (formData.valor < 0.01) {
        novosErros.valor = "Valor deve ser pelo menos R$ 0,01.";
      }
    }
    
    // Validação da categoria
    if (!formData.categoria.trim()) {
      novosErros.categoria = "Categoria é obrigatória.";
    } else if (formData.categoria.trim().length < 2) {
      novosErros.categoria = "Categoria deve ter pelo menos 2 caracteres.";
    } else if (formData.categoria.trim().length > 50) {
      novosErros.categoria = "Categoria deve ter no máximo 50 caracteres.";
    }
    
    // Validação do tipo
    if (!formData.tipo || !['credito', 'debito'].includes(formData.tipo)) {
      novosErros.tipo = "Tipo de transação é obrigatório.";
    }
    
    // Validação da data
    if (!formData.data) {
      novosErros.data = "Data é obrigatória.";
    } else {
      const dataSelecionada = new Date(formData.data);
      const hoje = new Date();
      const dataMinima = new Date(2020, 0, 1); // 1º de janeiro de 2020
      
      if (isNaN(dataSelecionada.getTime())) {
        novosErros.data = "Data deve ser válida.";
      } else if (dataSelecionada > hoje) {
        novosErros.data = "Data não pode ser futura.";
      } else if (dataSelecionada < dataMinima) {
        novosErros.data = "Data não pode ser anterior a 2020.";
      }
    }
    
    // Validação do arquivo (opcional)
    if (formData.arquivo) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      
      if (formData.arquivo.size > maxSize) {
        novosErros.arquivo = "Arquivo deve ter no máximo 5MB.";
      } else if (!allowedTypes.includes(formData.arquivo.type)) {
        novosErros.arquivo = "Arquivo deve ser uma imagem (JPEG, PNG, GIF) ou PDF.";
      }
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      // Focar no primeiro campo com erro
      const primeiroErro = Object.keys(erros)[0];
      if (primeiroErro) {
        const campo = formRef.current?.querySelector(`[name="${primeiroErro}"]`) as HTMLElement;
        campo?.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Chamar callback de envio
      onSubmit?.(formData);
      
      // Limpar formulário após envio bem-sucedido
      setFormData({
        descricao: '',
        valor: '',
        categoria: '',
        tipo: 'debito',
        data: new Date().toISOString().split('T')[0],
        arquivo: null
      });
      setErros({});
      setCategoriaSugestoes([]);
      setShowSuggestions(false);
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setErros({ submit: 'Erro ao enviar formulário. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para lidar com mudanças nos campos
  const handleFieldChange = (field: keyof TransactionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (erros[field as keyof TransactionFormErrors]) {
      setErros(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Função para lidar com mudanças no arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFieldChange('arquivo', file);
  };

  // Função para lidar com mudanças na categoria
  const handleCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorInput = e.target.value;
    handleFieldChange('categoria', valorInput);
    
    if (valorInput.length > 0) {
      const sugestoes = categorias.filter(cat =>
        cat.toLowerCase().includes(valorInput.toLowerCase())
      );
      setCategoriaSugestoes(sugestoes);
      setShowSuggestions(sugestoes.length > 0);
    } else {
      setCategoriaSugestoes([]);
      setShowSuggestions(false);
    }
  };

  // Função para selecionar sugestão de categoria
  const handleSugestaoClick = (categoria: string) => {
    handleFieldChange('categoria', categoria);
    setCategoriaSugestoes([]);
    setShowSuggestions(false);
    categoriaInputRef.current?.focus();
  };

  // Função para cancelar
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Limpar formulário
      setFormData({
        descricao: '',
        valor: '',
        categoria: '',
        tipo: 'debito',
        data: new Date().toISOString().split('T')[0],
        arquivo: null
      });
      setErros({});
      setCategoriaSugestoes([]);
      setShowSuggestions(false);
    }
  };

  // Efeito para fechar sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriaInputRef.current && !categoriaInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Função para formatar valor monetário
  const formatCurrency = (value: number | string): string => {
    if (value === '' || value === null || value === undefined) return '';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      aria-label={ariaLabel || "Formulário de nova transação"}
      aria-describedby={ariaDescribedBy}
      role={role || "form"}
      tabIndex={tabIndex}
      {...props}
    >
      <Text variant="title-bold" color="text-gray-900 dark:text-white" as="h2" className="mb-6">
        Nova Transação
      </Text>

      {/* Campo de tipo de transação */}
      <div>
        <Text variant="text-regular" color="text-gray-700 dark:text-gray-300" as="span" className="block mb-2">
          Tipo de Transação *
        </Text>
        <Input
          options={tiposTransacao}
          size="G"
          placeholder="Selecione o tipo de transação"
          onSelectionChange={(value) => handleFieldChange('tipo', value)}
          label="Tipo de Transação"
          required={true}
          error={erros.tipo}
          helperText="Escolha se é uma entrada (crédito) ou saída (débito) de dinheiro"
          aria-label="Selecionar tipo de transação"
        />
      </div>

      {/* Campo de descrição */}
      <div>
        <Text variant="text-regular" color="text-gray-700 dark:text-gray-300" as="span" className="block mb-2">
          Descrição *
        </Text>
        <input
          type="text"
          name="descricao"
          value={formData.descricao}
          onChange={(e) => handleFieldChange('descricao', e.target.value)}
          className={`
            w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
            dark:focus:ring-blue-violet-500
            ${erros.descricao ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
          `}
          placeholder="Ex: Aluguel, Salário, Mercado..."
          required
          maxLength={100}
          aria-label="Descrição da transação"
          aria-describedby={erros.descricao ? 'descricao-error' : 'descricao-help'}
          aria-invalid={!!erros.descricao}
        />
        {erros.descricao && (
          <div id="descricao-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {erros.descricao}
          </div>
        )}
        <div id="descricao-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Descreva brevemente a transação (3-100 caracteres)
        </div>
      </div>

      {/* Campo de valor */}
      <div>
        <Text variant="text-regular" color="text-gray-700 dark:text-gray-300" as="span" className="block mb-2">
          Valor (R$) *
        </Text>
        <input
          type="number"
          name="valor"
          value={formData.valor}
          min={0.01}
          max={999999.99}
          step={0.01}
          onChange={(e) => handleFieldChange('valor', e.target.value === '' ? '' : Number(e.target.value))}
          className={`
            w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
            dark:focus:ring-blue-violet-500
            ${erros.valor ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
          `}
          placeholder="0,00"
          required
          aria-label="Valor da transação em reais"
          aria-describedby={erros.valor ? 'valor-error' : 'valor-help'}
          aria-invalid={!!erros.valor}
        />
        {erros.valor && (
          <div id="valor-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {erros.valor}
          </div>
        )}
        <div id="valor-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Valor mínimo: R$ 0,01 | Valor máximo: R$ 999.999,99
        </div>
      </div>

      {/* Campo de categoria */}
      <div className="relative">
        <Text variant="text-regular" color="text-gray-700 dark:text-gray-300" as="span" className="block mb-2">
          Categoria *
        </Text>
        <input
          ref={categoriaInputRef}
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleCategoriaChange}
          className={`
            w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
            dark:focus:ring-blue-violet-500
            ${erros.categoria ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
          `}
          placeholder="Ex: Alimentação, Transporte, Lazer..."
          required
          maxLength={50}
          autoComplete="off"
          aria-label="Categoria da transação"
          aria-describedby={erros.categoria ? 'categoria-error' : 'categoria-help'}
          aria-invalid={!!erros.categoria}
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
          role="combobox"
        />
        
        {/* Sugestões de categoria */}
        {showSuggestions && categoriaSugestoes.length > 0 && (
          <ul 
            className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto"
            role="listbox"
            aria-label="Sugestões de categoria"
          >
            {categoriaSugestoes.map((categoria) => (
              <li
                key={categoria}
                className="px-4 py-2 hover:bg-sky-100 dark:hover:bg-sky-900 cursor-pointer transition-colors"
                onClick={() => handleSugestaoClick(categoria)}
                role="option"
                aria-selected={formData.categoria === categoria}
              >
                {categoria}
              </li>
            ))}
          </ul>
        )}
        
        {erros.categoria && (
          <div id="categoria-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {erros.categoria}
          </div>
        )}
        <div id="categoria-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Categorize a transação para melhor organização
        </div>
      </div>

      {/* Campo de data */}
      <div>
        <Text variant="text-regular" color="text-gray-700 dark:text-gray-300" as="span" className="block mb-2">
          Data *
        </Text>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={(e) => handleFieldChange('data', e.target.value)}
          className={`
            w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
            dark:focus:ring-blue-violet-500
            ${erros.data ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
          `}
          required
          max={new Date().toISOString().split('T')[0]}
          min="2020-01-01"
          aria-label="Data da transação"
          aria-describedby={erros.data ? 'data-error' : 'data-help'}
          aria-invalid={!!erros.data}
        />
        {erros.data && (
          <div id="data-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {erros.data}
          </div>
        )}
        <div id="data-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Data da transação (não pode ser futura)
        </div>
      </div>

      {/* Campo de arquivo */}
      <div>
        <Text variant="text-regular" color="text-gray-700 dark:text-gray-300" as="span" className="block mb-2">
          Recibo/Documento (opcional)
        </Text>
        <input
          type="file"
          name="arquivo"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600"
          aria-label="Anexar recibo ou documento"
          aria-describedby={erros.arquivo ? 'arquivo-error' : 'arquivo-help'}
          aria-invalid={!!erros.arquivo}
        />
        {erros.arquivo && (
          <div id="arquivo-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {erros.arquivo}
          </div>
        )}
        {formData.arquivo && (
          <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <Text variant="text-small" color="text-green-700 dark:text-green-300">
              ✓ Arquivo selecionado: {formData.arquivo.name}
            </Text>
            <Text variant="text-small" color="text-green-600 dark:text-green-400">
              Tamanho: {(formData.arquivo.size / 1024 / 1024).toFixed(2)} MB
            </Text>
          </div>
        )}
        <div id="arquivo-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Formatos aceitos: JPEG, PNG, GIF, PDF (máximo 5MB)
        </div>
      </div>

      {/* Mensagem de erro geral */}
      {erros.submit && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <Text variant="text-small" color="text-red-700 dark:text-red-300" role="alert">
            {erros.submit}
          </Text>
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          theme="primary"
          size="G"
          label={submitLabel}
          loading={isSubmitting || isLoading}
          disabled={isSubmitting || isLoading}
          fullWidth={true}
          aria-label="Salvar nova transação"
        />
        <Button
          type="button"
          theme="outline-sky"
          size="G"
          label={cancelLabel}
          onClick={handleCancel}
          disabled={isSubmitting || isLoading}
          fullWidth={true}
          aria-label="Cancelar criação de transação"
        />
      </div>

      {/* Resumo da transação */}
      {formData.descricao && formData.valor && formData.categoria && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Text variant="text-small-bold" color="text-gray-700 dark:text-gray-300" className="mb-2">
            Resumo da Transação:
          </Text>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <div><strong>Descrição:</strong> {formData.descricao}</div>
            <div><strong>Valor:</strong> {formatCurrency(formData.valor)}</div>
            <div><strong>Categoria:</strong> {formData.categoria}</div>
            <div><strong>Tipo:</strong> {formData.tipo === 'credito' ? 'Crédito' : 'Débito'}</div>
            <div><strong>Data:</strong> {new Date(formData.data).toLocaleDateString('pt-BR')}</div>
          </div>
        </div>
      )}
    </form>
  );
}