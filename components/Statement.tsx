import React, { useMemo, useState } from "react";
import { Button } from "./Button";
import { useRouter } from "next/router";
// import { Text } from "./Text";
// import { IconDollar, IconArrowDownLeft, IconArrowPencil, IconBin, IconArrowRight } from "./icons";
// import { DeleteModal } from "./modal/DeleteModal";
// import { EditModal } from "./modal/EditModal";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string | Date;
};

interface StatementProps {
  transactions: Transaction[];
  showDetails?: boolean;
  showAllTransactions?: boolean;
  customTitle?: string;
  showLastTransactionsSubtitle?: boolean;
  swapColumns?: boolean;
  isLoading?: boolean;
}

export function Statement({
  transactions = [],
  showDetails = true,
  showAllTransactions = false,
  customTitle = "Transações",
  showLastTransactionsSubtitle = false,
  swapColumns = false,
  isLoading = false,
}: StatementProps) {
  // Estado para modais e alertas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  // Ordena e limita as transações
  const recentTransactions = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return showAllTransactions ? sorted : sorted.slice(0, 6);
  }, [transactions, showAllTransactions]);

  // Funções utilitárias
  function isDeposit(transaction: Transaction) {
    // Adapte para sua lógica de tipos
    return transaction.type === "credito";
  }
  function formatDate(date: Date | string) {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString();
  }
  function formatBRL(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  // Handlers de modal (placeholders)
  function openDeleteModal(id: string) {
    setTransactionToDelete(id);
    setIsModalOpen(true);
  }
  function onConfirmDelete() {
    setIsModalOpen(false);
    setTransactionToDelete(null);
    setShowAlert(true);
    setAlertMessage("Transação deletada com sucesso!");
    setTimeout(() => setShowAlert(false), 2000);
  }
  function onCancelDelete() {
    setIsModalOpen(false);
    setTransactionToDelete(null);
  }
  function openEditModal(transaction: Transaction) {
    setTransactionToEdit(transaction);
    setIsEditModalOpen(true);
  }
  function onSaveEdit(updated: Transaction) {
    setIsEditModalOpen(false);
    setTransactionToEdit(null);
    setShowAlert(true);
    setAlertMessage("Transação atualizada com sucesso!");
    setTimeout(() => setShowAlert(false), 2000);
  }
  function onCancelEdit() {
    setIsEditModalOpen(false);
    setTransactionToEdit(null);
  }
  const router = useRouter();

  return (
    <>
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 bg-white text-sky-500 p-4 text-center z-50">
          {alertMessage}
        </div>
      )}
      <div className="rounded-xl shadow p-4 sm:p-6 bg-white">
        <div className="flex items-end flex-wrap">
          {/* <Text variant="subtitle" as="h2" color="text-gray-900" className="text-base sm:text-lg">
            {customTitle}
          </Text> */}
          <span className="text-base sm:text-lg font-bold text-gray-900">{customTitle}</span>
          {showLastTransactionsSubtitle && (
            // <Text variant="text-small" color="text-gray-400" className="pl-2 sm:pl-3 text-xs">
            //   (últimas 6 transações)
            // </Text>
            <span className="pl-2 sm:pl-3 text-xs text-gray-400">(últimas 6 transações)</span>
          )}
        </div>
        {isLoading ? (
          // <Text color="text-gray-600">Carregando transações...</Text>
          <div className="text-center py-4 text-gray-600">Carregando transações...</div>
        ) : recentTransactions.length > 0 ? (
          <div className={showAllTransactions ? "max-h-[400px] overflow-y-auto mt-2 sm:mt-3" : ""}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-t-2 mt-2 sm:mt-3 pt-2 sm:pt-3">
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b-2 last:border-none">
                      {/* Ícones e tipo */}
                      <td className="py-2 sm:py-4 pr-1 sm:pr-2">
                        {/* <IconDollar /> ou <IconArrowDownLeft /> */}
                        <span
                          className={
                            isDeposit(transaction)
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {isDeposit(transaction) ? "+" : "-"}
                        </span>
                      </td>
                      <td className="py-2 sm:py-4 pr-1 sm:pr-2">
                        <span
                          className={
                            isDeposit(transaction)
                              ? "text-green-600 text-xs sm:text-sm whitespace-nowrap"
                              : "text-red-600 text-xs sm:text-sm whitespace-nowrap"
                          }
                        >
                          <span className="sm:hidden">
                            {isDeposit(transaction) ? "Depósito" : "Saque"}
                          </span>
                          <span className="hidden sm:inline">
                            {transaction.type}
                          </span>
                        </span>
                      </td>
                      {showDetails && (
                        <td className="py-2 sm:py-4 pr-1 sm:pr-2 hidden sm:table-cell">
                          <span
                            className={
                              isDeposit(transaction)
                                ? "text-green-600 text-xs sm:text-sm"
                                : "text-red-600 text-xs sm:text-sm"
                            }
                          >
                            {transaction.description}
                          </span>
                        </td>
                      )}
                      <td className="py-2 sm:py-4 pr-1 sm:pr-2">
                        <span
                          className={
                            isDeposit(transaction)
                              ? "text-green-600 text-xs sm:text-sm whitespace-nowrap"
                              : "text-red-600 text-xs sm:text-sm whitespace-nowrap"
                          }
                        >
                          {formatBRL(transaction.amount)}
                        </span>
                      </td>
                      <td className="py-2 sm:py-4 pr-1 sm:pr-2 hidden xs:table-cell">
                        <span
                          className={
                            isDeposit(transaction)
                              ? "text-green-600 text-xs sm:text-sm whitespace-nowrap"
                              : "text-red-600 text-xs sm:text-sm whitespace-nowrap"
                          }
                        >
                          {formatDate(transaction.date)}
                        </span>
                      </td>
                      {/* Editar/Deletar */}
                      <td className="py-2 sm:py-4 text-center pl-1">
                        <button onClick={() => openEditModal(transaction)}>
                          {/* <IconArrowPencil /> */}
                          ✏️
                        </button>
                      </td>
                      <td className="py-2 sm:py-4 text-center pl-1">
                        <button onClick={() => openDeleteModal(transaction.id)}>
                          {/* <IconBin /> */}
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-600">Nenhuma transação encontrada</div>
        )}
        {/* Link para listar todas as transações */}
        {!showDetails && !showAllTransactions && (
          <div className="flex justify-end mt-4">
            <Button label="Listar" onClick={() => router.push("/transactions")} />
          </div>
        )}
      </div>
      {/* Modais (placeholders) */}
      {/* <DeleteModal isOpen={isModalOpen} onConfirm={onConfirmDelete} onCancel={onCancelDelete} /> */}
      {/* <EditModal isOpen={isEditModalOpen} transaction={transactionToEdit} onSave={onSaveEdit} onCancel={onCancelEdit} /> */}
    </>
  );
} 