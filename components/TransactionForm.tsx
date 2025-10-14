import { useState } from 'react';

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

export default function TransactionForm() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number | ''>('');
  const [file, setFile] = useState<File | null>(null);
  const [categoria, setCategoria] = useState('');
  const [categoriaSugestoes, setCategoriaSugestoes] = useState<string[]>([]);
  const [erros, setErros] = useState<{descricao?: string, valor?: string, categoria?: string}>({});

  // Validação avançada
  const validar = () => {
    const novosErros: typeof erros = {};
    if (!descricao.trim()) {
      novosErros.descricao = "Descrição é obrigatória.";
    }
    if (valor === '' || isNaN(Number(valor)) || Number(valor) <= 0) {
      novosErros.valor = "Informe um valor válido maior que zero.";
    }
    if (!categoria.trim()) {
      novosErros.categoria = "Categoria é obrigatória.";
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    // Simular envio
    alert(
      `Transação adicionada: ${descricao} - R$ ${valor}\nCategoria: ${categoria}` +
      (file ? `\nArquivo: ${file.name}` : '')
    );
    setDescricao('');
    setValor('');
    setCategoria('');
    setFile(null);
    setCategoriaSugestoes([]);
    setErros({});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Sugestão automática de categorias
  const handleCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorInput = e.target.value;
    setCategoria(valorInput);
    if (valorInput.length > 0) {
      setCategoriaSugestoes(
        categorias.filter(cat =>
          cat.toLowerCase().includes(valorInput.toLowerCase())
        )
      );
    } else {
      setCategoriaSugestoes([]);
    }
  };

  const handleSugestaoClick = (cat: string) => {
    setCategoria(cat);
    setCategoriaSugestoes([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />
        {erros.descricao && <div className="text-red-600 text-sm">{erros.descricao}</div>}
      </div>
      <div>
        <label className="block mb-1">Valor (R$)</label>
        <input
          type="number"
          value={valor}
          min={0.01}
          step={0.01}
          onChange={(e) => setValor(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full border px-3 py-2"
          required
        />
        {erros.valor && <div className="text-red-600 text-sm">{erros.valor}</div>}
      </div>
      <div className="relative">
        <label className="block mb-1">Categoria</label>
        <input
          type="text"
          value={categoria}
          onChange={handleCategoriaChange}
          className="w-full border px-3 py-2"
          autoComplete="off"
          required
        />
        {categoriaSugestoes.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
            {categoriaSugestoes.map((cat) => (
              <li
                key={cat}
                className="px-3 py-2 hover:bg-sky-100 cursor-pointer"
                onClick={() => handleSugestaoClick(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
        {erros.categoria && <div className="text-red-600 text-sm">{erros.categoria}</div>}
      </div>
      <div>
        <label className="block mb-1">Recibo/Documento (opcional)</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="w-full"
        />
        {file && (
          <div className="mt-1 text-green-700 text-sm">
            Arquivo selecionado: {file.name}
          </div>
        )}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Adicionar
      </button>
    </form>
  );
}