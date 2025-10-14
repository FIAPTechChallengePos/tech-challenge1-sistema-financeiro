import React from 'react';
import { BaseIconProps } from '../../src/types/components';

interface IconProps extends BaseIconProps {
  children: React.ReactNode;
  title?: string;
}

export function Icon({ 
  size = 'medium', 
  color = 'current', 
  variant = 'outline',
  className = '',
  title,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
  ...props 
}: IconProps) {
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
      className={`${sizeClasses} ${colorClasses} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role="img"
      {...props}
    >
      {title && <title>{title}</title>}
      {props.children}
    </svg>
  );
}

// Componente específico para IconAccountCircle
export function IconAccountCircle({ 
  className = '',
  size = 'medium',
  color = 'current',
  'aria-label': ariaLabel = 'Ícone de conta do usuário',
  ...props 
}: Omit<BaseIconProps, 'children'>) {
  return (
    <Icon
      size={size}
      color={color}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </Icon>
  );
}

// Componente específico para IconBell
export function IconBell({ 
  className = '',
  size = 'medium',
  color = 'current',
  'aria-label': ariaLabel = 'Ícone de notificação',
  ...props 
}: Omit<BaseIconProps, 'children'>) {
  return (
    <Icon
      size={size}
      color={color}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </Icon>
  );
}

// Componente específico para IconDarkmode
export function IconDarkmode({ 
  className = '',
  size = 'medium',
  color = 'current',
  'aria-label': ariaLabel = 'Ícone de modo escuro',
  ...props 
}: Omit<BaseIconProps, 'children'>) {
  return (
    <Icon
      size={size}
      color={color}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </Icon>
  );
}

// Componente específico para IconCard
export function IconCard({ 
  className = '',
  size = 'medium',
  color = 'current',
  'aria-label': ariaLabel = 'Ícone de cartão',
  ...props 
}: Omit<BaseIconProps, 'children'>) {
  return (
    <Icon
      size={size}
      color={color}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </Icon>
  );
}
