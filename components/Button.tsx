import React from "react";

type Theme =
  | "primary"
  | "secondary"
  | "outline-sky"
  | "ghost-sky"
  | "ghost-white";
type Size = "P" | "G" | "GG";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  size?: Size;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  theme = "primary",
  size = "G",
  disabled = false,
  label,
  iconLeft,
  iconRight,
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
    P: "px-3",
    G: "px-12",
    GG: "px-28",
  }[size];

  return (
    <button
      disabled={disabled}
      className={`group py-[14px] rounded-lg font-lato text-base font-semibold transition-colors duration-300 flex items-center justify-center ${themeClasses} ${sizeClasses} ${
        label ? "gap-2" : ""
      } ${disabled ? "bg-sky-200 cursor-not-allowed !text-gray-500" : ""}`}
      {...props}
    >
      {iconLeft}
      {label && <span>{label}</span>}
      {iconRight}
    </button>
  );
} 