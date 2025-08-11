import React, { useEffect, useState } from "react";
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
  const [transactionData, setTransactionData] = useState([]); // Para o gráfico

  useEffect(() => {
    // Simula busca de dados
    setIsLoading(true);
    setTimeout(() => {
      setUserName("Carina");
      setBalance("R$ 5.109,38");
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
        <div className="flex flex-col items-center justify-center p-12">
          <p className="text-white">Carregando informações...</p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden sm:flex flex-col sm:flex-row justify-between items-start gap-6 w-full pb-[100px]">
            <div>
              <h1 className="text-xl sm:text-2xl text-white font-bold">
                Olá, {userName}! :)
              </h1>
              <p className="text-white mt-2 sm:mt-3 text-xs sm:text-sm">
                {currentDate}
              </p>
            </div>
            <div className="text-right w-full sm:w-auto mt-[100px] mr-[100px] sm:mt-20">
              <div className="flex items-center justify-start border-b-2 border-orange-500">
                <p className="font-medium text-white mr-3 text-xl sm:text-2xl mb-2">
                  Saldo
                </p>
                <button onClick={toggleBalance} className="focus:outline-none">
                  {/* Ícone de olho */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-500 mb-2"
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
              <p className="text-white mt-2 text-xs sm:text-sm text-start">{accountType}</p>
              <p className="text-white mt-2 sm:mt-3 text-xl sm:text-2xl">
                {showBalance ? balance : "****"}
              </p>
            </div>
          </div>
          {/* Mobile */}
          <div className="flex flex-col sm:hidden items-center text-center w-full p-8">
            <div className="flex flex-col mb-4">
              <h1 className="text-xl text-white font-bold">Olá, {userName}!</h1>
              <p className="text-white text-s mt-2">{currentDate}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-start border-b-2 border-white mt-4 w-[150px]">
                <p className="font-medium text-white mr-4 text-lg mb-2">Saldo</p>
                <button onClick={toggleBalance} className="focus:outline-none ml-2">
                  {/* Ícone de olho */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-left text-white mb-2"
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
              <p className="text-white mt-2 text-left text-[16px]">{accountType}</p>
              <p className="text-white text-left text-[24px] mt-1">
                {showBalance ? balance : "****"}
              </p>
            </div>
          </div>
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