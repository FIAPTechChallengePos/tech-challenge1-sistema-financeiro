import React from "react";
import { BaseIconProps } from "../../src/types/components";

interface IconAccountCircleProps extends Omit<BaseIconProps, 'children'> {
  className?: string;
}

export function IconAccountCircle({ 
  className = "",
  size = "medium",
  color = "current",
  'aria-label': ariaLabel = "Ícone de conta do usuário",
  ...props
}: IconAccountCircleProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  }[size];

  const colorClasses = {
    current: 'text-current',
    primary: 'text-sky-500 dark:text-blue-violet-500',
    secondary: 'text-orange-500',
    error: 'text-red-600',
    warning: 'text-yellow-500',
    success: 'text-green-600',
    info: 'text-blue-600'
  }[color];

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className={`${sizeClasses} ${colorClasses} ${className}`}
      aria-label={ariaLabel}
      aria-hidden="true"
      role="img"
      {...props}
    >
      <g clipPath="url(#clip0_13_10)">
        <path 
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 7.57 19.18 5.86 17.12C7.55 15.8 9.68 15 12 15C14.32 15 16.45 15.8 18.14 17.12C16.43 19.18 14.03 20 12 20Z" 
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_13_10">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
} 