import React, { useEffect, useState } from "react";
// import { TransactionChart } from "./TransactionChart"; // Crie depois
// import { useUser } from "../hooks/useUser"; // Crie depois
// import { useTransaction } from "../hooks/useTransaction"; // Crie depois

export function Dashboard() {
  // Simulação de hooks de usuário e transações
  const [userName, setUserName] = useState("Usuário");
  const [currentDate, setCurrentDate] = useState("");
  const [currentMonthName, setCurrentMonthName] = useState("");
  const [balance, setBalance] = useState("R$ 0,00");
  const [accountType] = useState("Conta Corrente");
  const [totalEntries, setTotalEntries] = useState("R$ 0,00");
  const [totalExits, setTotalExits] = useState("R$ 0,00");
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage] = useState("");
  // const [transactionData, setTransactionData] = useState([]); // Para o gráfico

  useEffect(() => {
    // Simula busca de dados
    setIsLoading(true);
    setTimeout(() => {
      setUserName("Carina");
      setBalance("R$ 1.234,56");
      setTotalEntries("R$ 2.000,00");
      setTotalExits("R$ 765,44");
      setIsLoading(false);
    }, 1000);

    // Data atual
    const weekDays = [
      "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
      "Quinta-feira", "Sexta-feira", "Sábado"
    ];
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const today = new Date();
    setCurrentDate(
      `${weekDays[today.getDay()]}, ${today.toLocaleDateString()} ${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}`
    );
    setCurrentMonthName(months[today.getMonth()]);
  }, []);

  function toggleBalance() {
    setShowBalance((prev) => !prev);
  }

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-gray-600">Carregando informações...</p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden sm:flex flex-col sm:flex-row justify-between items-start gap-6 w-full">
            <div>
              <h1 className="text-xl sm:text-2xl text-gray-900 font-bold">
                Olá, {userName}!
              </h1>
              <p className="text-gray-500 mt-2 sm:mt-3 text-xs sm:text-sm">
                {currentDate}
              </p>
            </div>
            <div className="text-right w-full sm:w-auto mt-4 sm:mt-0">
              <div className="flex items-center justify-end">
                <p className="font-medium text-gray-700 mr-3 text-xl sm:text-2xl">
                  Saldo
                </p>
                <button onClick={toggleBalance} className="focus:outline-none">
                  {/* Ícone de olho */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 mt-1 text-xs sm:text-sm">{accountType}</p>
              <p className="text-gray-900 mt-2 sm:mt-3 text-xl sm:text-2xl font-bold">
                {showBalance ? balance : "****"}
              </p>
            </div>
          </div>
          {/* Mobile */}
          <div className="flex flex-col sm:hidden items-center text-center w-full">
            <div className="flex flex-col mb-4">
              <h1 className="text-xl text-gray-900 font-bold">Olá, {userName}!</h1>
              <p className="text-gray-500 text-xs">{currentDate}</p>
            </div>
            <div className="w-full border-t-2 border-gray-200 mb-4"></div>
            <div className="flex flex-col">
              <div className="flex items-center justify-center">
                <p className="font-medium text-gray-700 text-lg">Saldo</p>
                <button onClick={toggleBalance} className="focus:outline-none ml-2">
                  {/* Ícone de olho */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 mt-1 text-xs">{accountType}</p>
              <p className="text-gray-900 text-lg font-bold">
                {showBalance ? balance : "****"}
              </p>
            </div>
          </div>
          {/* Separador */}
          <div className="px-6">
            <div className="border-t-2 border-gray-200"></div>
          </div>
          {/* Título do gráfico */}
          <div className="px-6 pt-6 pb-6">
            <h2 className="text-gray-900 text-base font-bold text-center sm:text-left">
              Transações de {currentMonthName}
            </h2>
          </div>
          {/* Gráfico de transações */}
          {/* <TransactionChart ... /> */}
          {/* Mensagem de erro */}
          {errorMessage && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md mx-6 mb-6">
              {errorMessage}
            </div>
          )}
        </>
      )}
    </div>
  );
} 