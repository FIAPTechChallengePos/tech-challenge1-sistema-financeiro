import React, { useState } from "react";

type OptionItem = { display: string; value: any } | string;
type Size = "G" | "P";

interface InputProps {
  options: OptionItem[];
  size?: Size;
  placeholder?: string;
  onSelectionChange?: (value: any) => void;
}

export function Input({
  options = [],
  size = "G",
  placeholder = "Selecione o tipo de transação",
  onSelectionChange,
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  function getDisplayValue(option: OptionItem) {
    return typeof option === "string" ? option : option.display;
  }

  function selectOption(option: OptionItem) {
    setSelectedOption(getDisplayValue(option));
    setIsOpen(false);
    if (onSelectionChange) {
      onSelectionChange(typeof option === "string" ? option : option.value);
    }
  }

  return (
    <div
      className={`relative inline-block w-full ${
        size === "G" ? "max-w-[360px]" : "max-w-[290px]"
      }`}
    >
      <button
        type="button"
        className={`w-full bg-gray-100 border border-cyan-blue-500 dark:border-blue-violet-500 text-cyan-blue-500 dark:text-blue-violet-500 font-lato font-medium rounded-md p-4 flex items-center justify-between ${
          size === "G" ? "gap-[66px]" : "gap-2"
        }`}
        onClick={() => setIsOpen((v) => !v)}
      >
        {selectedOption || placeholder}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-0 w-full bg-gray-100 border border-green-dark border-t-0 rounded-b-md shadow-lg">
          <ul>
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => selectOption(option)}
                className={`px-4 py-2 cursor-pointer transition-colors font-lato text-center text-cyan-blue-500 dark:text-blue-violet-500 ${
                  getDisplayValue(option) === selectedOption
                    ? "bg-gray-100 font-semibold"
                    : "hover:bg-cyan-blue-500 dark:hover:bg-blue-violet-500 hover:text-white dark:hover:text-white hover:font-bold"
                }`}
              >
                {getDisplayValue(option)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 