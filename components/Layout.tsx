import React from "react";
import { BaseLayoutProps } from "../src/types/components";

interface LayoutProps extends BaseLayoutProps {
  children: React.ReactNode;
  variant?: "default" | "centered" | "sidebar" | "grid";
  spacing?: "none" | "small" | "medium" | "large";
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
}

export function Layout({ 
  children, 
  variant = "default",
  spacing = "medium",
  showSidebar = false,
  sidebarContent,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  tabIndex,
  ...props 
}: LayoutProps) {
  const spacingClasses = {
    none: "",
    small: "p-2",
    medium: "p-4",
    large: "p-6"
  }[spacing];

  const variantClasses = {
    default: "flex flex-col",
    centered: "flex flex-col items-center justify-center",
    sidebar: "flex flex-row",
    grid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
  }[variant];

  const accessibilityClasses = `
    focus:outline-none
    reduced-motion:transition-none
  `;

  return (
    <div 
      className={`min-h-screen ${variantClasses} ${accessibilityClasses}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      role={role || "main"}
      tabIndex={tabIndex}
      {...props}
    >
      <div className="bg-sky-200 dark:bg-blue-violet-50 flex flex-1">
        {showSidebar && sidebarContent && (
          <aside 
            className="hidden xl:block w-64 bg-white dark:bg-gray-800 shadow-lg"
            aria-label="Navegação lateral"
            role="complementary"
          >
            {sidebarContent}
          </aside>
        )}
        <main 
          className={`flex flex-col flex-1 ${spacingClasses}`}
          aria-label="Conteúdo principal"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  );
} 