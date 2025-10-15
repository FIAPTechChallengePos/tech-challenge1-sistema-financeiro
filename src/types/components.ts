import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes, JSX, SVGProps } from 'react';

// Tipos base para acessibilidade
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  // 'aria-atomic' is omitted to avoid conflict with HTMLAttributes
  tabIndex?: number;
}

// Tipos para componentes de botão
export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, AccessibilityProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

// Tipos para componentes de input
export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement>, AccessibilityProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
}

// Tipos para componentes de texto
export interface BaseTextProps extends HTMLAttributes<HTMLElement>, AccessibilityProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'label' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  as?: keyof JSX.IntrinsicElements;
}

// Tipos para componentes de layout
export interface BaseLayoutProps extends HTMLAttributes<HTMLDivElement>, AccessibilityProps {
  children: ReactNode;
  variant?: 'default' | 'centered' | 'sidebar' | 'grid';
  spacing?: 'none' | 'small' | 'medium' | 'large';
}

// Tipos para componentes de ícones
export interface BaseIconProps extends SVGProps<SVGSVGElement>, AccessibilityProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'current' | 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  variant?: 'outline' | 'filled' | 'duotone';
}

// Tipos para componentes de formulário
export interface FormFieldProps extends AccessibilityProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

// Tipos para componentes de navegação
export interface NavigationProps extends HTMLAttributes<HTMLElement>, AccessibilityProps {
  items: NavigationItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'tabs' | 'breadcrumb';
}

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  disabled?: boolean;
  children?: NavigationItem[];
}

// Tipos para componentes de modal/dialog
export interface ModalProps extends HTMLAttributes<HTMLDivElement>, AccessibilityProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  closable?: boolean;
}

// Tipos para componentes de tabela
export interface TableProps extends HTMLAttributes<HTMLTableElement>, AccessibilityProps {
  data?: any[];  
  columns?: TableColumn[];
  sortable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
}

export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;  
  width?: string | number;
}
