import React from "react";
import { BaseButtonProps } from "../src/types/components";

type Theme =
  | "primary"
  | "secondary"
  | "outline-sky"
  | "ghost-sky"
  | "ghost-white";
type Size = "small" | "medium" | "large";

interface ButtonProps extends BaseButtonProps {
  theme?: Theme;
  size?: Size;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  theme = "primary",
  size = "medium",
  disabled = false,
  label,
  iconLeft,
  iconRight,
  loading = false,
  fullWidth = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  role,
  tabIndex,
  ...props
}: ButtonProps) {
  const themeClasses = {
    primary:
      "bg-sky-500 dark:bg-[#090979] hover:bg-sky-900 dark:hover:bg-blue-violet-900 text-white hover:text-sky-200",
    secondary:
      "bg-orange-500 dark:bg-yellow-500 hover:bg-orange-900 hover:dark:bg-yellow-900 dark:!text-brown-500 hover:!dark:text-brown-900 text-gray-50",
    "outline-sky":
      "bg-transparent dark:bg-transparent border dark:border border-sky-500 dark:border-[#090979] hover:bg-sky-500 dark:hover:bg-blue-violet-500 text-[#004d61] dark:text-[#090979] group-hover:text-white",
    "ghost-sky":
      "bg-transparent hover:text-sky-900 text-sky-500 hover:text-sky-900",
    "ghost-white":
      "bg-transparent hover:text-orange-500 dark:hover:text-sky-200 !text-white hover:!text-sky-200 dark:!text-sky-200 hover:!dark:text-gray-250",
  }[theme];

  const sizeClasses = {
    small: "px-1 py-1 text-sm",
    medium: "px-12 py-[14px] text-base",
    large: "px-28 py-4 text-lg",
  }[size];

  const accessibilityClasses = `
    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
    dark:focus:ring-blue-violet-500
    high-contrast:focus:ring-4 high-contrast:focus:ring-offset-4
    reduced-motion:transition-none
  `;

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={disabled || loading}
      className={`
        group rounded-lg font-lato font-semibold transition-colors duration-300 
        flex items-center justify-center gap-2
        ${themeClasses} ${sizeClasses} ${widthClasses} ${accessibilityClasses}
        ${disabled || loading ? "bg-sky-200 cursor-not-allowed !text-gray-500" : ""}
        ${loading ? "cursor-wait" : ""}
      `}
      aria-label={ariaLabel || label}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-disabled={disabled || loading}
      role={role}
      tabIndex={tabIndex}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        iconLeft
      )}
      {label && <span>{label}</span>}
      {!loading && iconRight}
    </button>
  );
} 