import React, { useState } from "react";
// import { Button } from "./Button";
// import { Text } from "./Text";
// import { Input } from "./Input";

type TransactionType = "credit" | "debit" | "loan";
const transactionOptions = [
  { display: "Receita (Câmbio de Moeda)", value: "credit" },
  { display: "Despesa (DOC/TED)", value: "debit" },
  { display: "Empréstimo (Empréstimo e Financiamento)", value: "loan" },
];

export function NewTransaction() {
  const [type, setType] = useState<TransactionType>("credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string }>({
    success: false,
    message: "",
  });

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value as TransactionType);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Formatação simples para moeda
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 12);
    while (value.length < 3) value = "0" + value;
    const cents = value.slice(-2);
    let integer = value.slice(0, -2);
    integer = integer.replace(/^0+/, "") || "0";
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setAmount(`${integer},${cents}`);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!type) {
      setSubmitStatus({ success: false, message: "Por favor, selecione o tipo de transação." });
      return;
    }
    if (!amount || parseFloat(amount.replace(/\./g, "").replace(",", ".")) <= 0) {
      setSubmitStatus({ success: false, message: "Por favor, informe um valor válido para a transação." });
      return;
    }
    if (!description.trim()) {
      setSubmitStatus({ success: false, message: "Por favor, adicione uma descrição para a transação." });
      return;
    }
    setSubmitStatus({ success: true, message: "Transação criada com sucesso!" });
    setType("credit");
    setAmount("");
    setDescription("");
    setTimeout(() => setSubmitStatus({ success: false, message: "" }), 3000);
  }

  return (
    <div className="rounded-xl shadow p-6 bg-white">
      <div className="pb-6">
        <div className="border-b-2">
          {/* <Text variant="subtitle" as="h1" color="text-gray-900" className="mb-4 border-gray-200 block">Nova Transação</Text> */}
          <span className="mb-4 border-gray-200 block text-lg font-bold text-gray-900">Nova Transação</span>
        </div>
      </div>
      <form className="flex flex-col md:flex-row" onSubmit={handleSubmit}>
        <div className="w-full md:w-1/2 md:pr-4 flex flex-col items-center md:items-start md:justify-start">
          <div className="w-full max-w-sm md:max-w-none">
            {/* Tipo de transação */}
            <div className="mb-4">
              <select
                value={type}
                onChange={handleTypeChange}
                className="w-full p-4 rounded-md border border-cyan-blue-500 text-cyan-blue-500 font-lato font-medium"
              >
                {transactionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.display}
                  </option>
                ))}
              </select>
            </div>
            {/* Valor */}
            <div className="mb-4">
              <div className="relative inline-block w-full">
                <div className="w-full bg-gray-100 border border-cyan-blue-500 text-cyan-blue-500 font-lato font-medium rounded-md p-4 flex items-center max-w-[360px]">
                  <span className="text-cyan-blue-500 mr-2">R$</span>
                  <input
                    type="text"
                    placeholder="00,00"
                    className="bg-transparent w-full outline-none text-cyan-blue-500 placeholder-cyan-blue-500 placeholder-opacity-70"
                    value={amount}
                    onChange={handleAmountChange}
                    autoComplete="off"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
            {/* Descrição */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Descrição da transação"
                className="w-full max-w-[360px] bg-gray-100 border border-cyan-blue-500 text-cyan-blue-500 font-lato font-medium rounded-md p-4"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            {/* Status */}
            {submitStatus.message && (
              <div
                className={`mb-4 p-3 rounded-md max-w-[360px] ${
                  submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            {/* Botão */}
            <button
              type="submit"
              className="w-full max-w-full sm:max-w-[360px] bg-cyan-blue-500 text-white font-bold py-3 rounded-md mt-2"
            >
              Concluir Transação
            </button>
          </div>
        </div>
        {/* Imagem ilustrativa */}
        <div className="w-full md:w-1/2 pl-4 mt-[20px] flex justify-center">
          <img
            src="/icons/vector.svg"
            alt="Ilustração de Transação"
            className="max-w-full h-auto"
          />
        </div>
      </form>
    </div>
  );
} 