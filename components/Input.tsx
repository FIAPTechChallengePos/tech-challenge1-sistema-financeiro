import React, { useState, useRef, useEffect } from "react";
import { BaseInputProps } from "../src/types/components";

type OptionItem = { display: string; value: any } | string;
type Size = "G" | "P";

interface InputProps extends Omit<BaseInputProps, 'onChange'> {
  options: OptionItem[];
  size?: Size;
  placeholder?: string;
  onSelectionChange?: (value: any) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Input({
  options = [],
  size = "G",
  placeholder = "Selecione o tipo de transação",
  onSelectionChange,
  error,
  helperText,
  required = false,
  disabled = false,
  label,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-required': ariaRequired,
  role,
  tabIndex,
  ...props
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  function getDisplayValue(option: OptionItem) {
    return typeof option === "string" ? option : option.display;
  }

  function selectOption(option: OptionItem) {
    setSelectedOption(getDisplayValue(option));
    setIsOpen(false);
    setFocusedIndex(-1);
    if (onSelectionChange) {
      onSelectionChange(typeof option === "string" ? option : option.value);
    }
  }

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação por teclado
  function handleKeyDown(event: React.KeyboardEvent) {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          selectOption(options[focusedIndex]);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
    }
  }

  const hasError = !!error;
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = hasError ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className={`relative inline-block w-full ${
      size === "G" ? "max-w-[360px]" : "max-w-[290px]"
    }`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="obrigatório">*</span>}
        </label>
      )}
      
      <button
        ref={buttonRef}
        type="button"
        id={inputId}
        disabled={disabled}
        className={`
          w-full bg-gray-100 border text-sky-500 dark:text-blue-violet-500 
          font-lato font-medium rounded-md p-4 flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
          dark:focus:ring-blue-violet-500
          high-contrast:focus:ring-4 high-contrast:focus:ring-offset-4
          reduced-motion:transition-none
          ${size === "G" ? "gap-[66px]" : "gap-2"}
          ${hasError 
            ? "border-red-500 dark:border-red-400" 
            : "border-sky-500 dark:border-blue-violet-500"
          }
          ${disabled 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-gray-50 dark:hover:bg-gray-200"
          }
        `}
        onClick={() => !disabled && setIsOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel || label}
        aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
        aria-expanded={isOpen}
        aria-required={required}
        aria-haspopup="listbox"
        role="combobox"
        tabIndex={tabIndex}
        {...props}
      >
        <span className="truncate">
          {selectedOption || placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="absolute z-10 mt-0 w-full bg-gray-100 border border-green-dark border-t-0 rounded-b-md shadow-lg"
          role="listbox"
          aria-label="Opções disponíveis"
        >
          <ul ref={listRef}>
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => selectOption(option)}
                className={`
                  px-4 py-2 cursor-pointer transition-colors font-lato text-center 
                  text-sky-500 dark:text-blue-violet-500
                  focus:outline-none focus:bg-sky-500 dark:focus:bg-blue-violet-500 
                  focus:text-white dark:focus:text-white
                  ${getDisplayValue(option) === selectedOption
                    ? "bg-gray-100 font-semibold"
                    : "hover:bg-sky-500 dark:hover:bg-blue-violet-500 hover:text-white dark:hover:text-white hover:font-bold"
                  }
                  ${focusedIndex === idx ? "bg-sky-500 dark:bg-blue-violet-500 text-white dark:text-white font-bold" : ""}
                `}
                role="option"
                aria-selected={getDisplayValue(option) === selectedOption}
                tabIndex={-1}
              >
                {getDisplayValue(option)}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {error && (
        <div 
          id={errorId}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div 
          id={helperId}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </div>
      )}
    </div>
  );
} 