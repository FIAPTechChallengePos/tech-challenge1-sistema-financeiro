import React, { useMemo } from "react";

type TransactionData = {
  day: string;
  entries: number;
  exits: number;
};

interface TransactionChartProps {
  transactionData: TransactionData[];
  totalEntries: string;
  totalExits: string;
}

export function TransactionChart({
  transactionData,
  totalEntries,
  totalExits,
}: TransactionChartProps) {
  const chartHeight = 192; // px

  // Calcula o maior valor para o eixo Y
  const maxValue = useMemo(() => {
    let max = 500;
    for (const data of transactionData) {
      if (data.entries > max) max = data.entries;
      if (data.exits > max) max = data.exits;
    }
    max = max * 1.1;
    return Math.ceil(max / 750) * 750;
  }, [transactionData]);

  // Gera os labels do eixo Y
  const yAxisLabels = useMemo(() => {
    const roundedMax = Math.ceil(maxValue / 750) * 750;
    const step = roundedMax / 4;
    return Array.from({ length: 5 }, (_, i) => (4 - i) * step);
  }, [maxValue]);

  // Calcula altura da barra
  function calculateBarHeight(value: number) {
    const maxYAxisValue = yAxisLabels[0];
    if (maxYAxisValue === 0) return 0;
    const proportion = value / maxYAxisValue;
    return proportion * chartHeight;
  }

  function formatAxisLabel(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "decimal",
      maximumFractionDigits: 0,
    });
  }

  function formatBalance(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="relative h-48 mx-auto w-full sm:w-4/5 lg:w-4/5">
        <div className="relative h-full">
          {/* Y Axis labels */}
          <div className="absolute left-0 h-full flex flex-col justify-between pointer-events-none">
            {yAxisLabels.map((label, idx) => (
              <span
                key={idx}
                className="text-right text-xs text-white pr-1 w-10"
              >
                {formatAxisLabel(label)}
              </span>
            ))}
          </div>
          {/* Grid */}
          <div className="absolute inset-0 ml-10 border border-sky-200">
            <div className="absolute w-full h-1/4 border-b border-sky-200"></div>
            <div className="absolute w-full h-2/4 border-b border-sky-200"></div>
            <div className="absolute w-full h-3/4 border-b border-sky-200"></div>
            <div className="absolute h-full w-1/4 border-r border-sky-200"></div>
            <div className="absolute h-full w-1/2 border-r border-sky-200"></div>
            <div className="absolute h-full w-3/4 border-r border-sky-200"></div>
          </div>
          {/* Barras */}
          <div className="absolute inset-0 ml-10 flex justify-around items-end">
            {transactionData.map(
              (data, i) =>
                data.day !== "" && (
                  <div
                    className="flex items-end justify-center w-1/4 h-full"
                    key={i}
                  >
                    <div className="flex items-end space-x-1 sm:space-x-2 mb-0">
                      <div
                        className="w-3 sm:w-5 md:w-7 bg-orange-500 dark:bg-yellow-500"
                        style={{ height: calculateBarHeight(data.exits) }}
                        title={`Saídas: ${formatBalance(data.exits)}`}
                      ></div>
                      <div
                        className="w-3 sm:w-5 md:w-7 bg-sky-500 dark:bg-blue-violet-500"
                        style={{ height: calculateBarHeight(data.entries) }}
                        title={`Entradas: ${formatBalance(data.entries)}`}
                      ></div>
                    </div>
                  </div>
                )
            )}
          </div>
          {/* X Axis labels */}
          <div className="absolute w-full -bottom-6 ml-10 pr-8 grid grid-cols-4 text-center">
            {transactionData.map(
              (data, i) =>
                data.day !== "" && (
                  <span className="text-white text-xs" key={i}>
                    {data.day}
                  </span>
                )
            )}
          </div>
        </div>
      </div>
      {/* Legenda mobile */}
      <div className="flex flex-col sm:hidden justify-center gap-2 items-center mt-8">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-sky-500 dark:bg-blue-violet-500"></div>
          <div className="flex flex-col">
            <span className="text-xs">Entradas</span>
            <span className="text-sm font-bold">{totalEntries}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-orange-500 dark:bg-yellow-500"></div>
          <div className="flex flex-col">
            <span className="text-xs">Saídas</span>
            <span className="text-sm font-bold">{totalExits}</span>
          </div>
        </div>
      </div>
      {/* Legenda desktop */}
      <div className="hidden sm:flex sm:flex-row lg:flex-col gap-4 sm:justify-center sm:items-center">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-sky-500 dark:bg-blue-violet-500"></div>
          <div className="flex flex-col">
            <span className="text-xs">Entradas</span>
            <span className="text-sm font-bold">{totalEntries}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 rounded-full bg-orange-500 dark:bg-yellow-500"></div>
          <div className="flex flex-col">
            <span className="text-xs">Saídas</span>
            <span className="text-sm font-bold">{totalExits}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 