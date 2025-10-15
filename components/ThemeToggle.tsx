import React from 'react';
import { useTheme } from './../src/hooks/useTheme';
import { Button } from '../components/Button';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, toggleContrast } = useTheme();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          theme="ghost-sky"
          size="P"
          onClick={toggleTheme}
          aria-label={`Alternar para tema ${theme.mode === 'light' ? 'escuro' : 'claro'}`}
        >
          {theme.mode === 'light' ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </Button>
        <span className="text-sm text-white">
          {theme.mode === 'light' ? 'Claro' : 'Escuro'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          theme="ghost-sky"
          size="P"
          onClick={toggleContrast}
          aria-label={`Alternar contraste: ${theme.contrast}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </Button>
        <span className="text-sm text-white">
          Contraste: {theme.contrast === 'normal' ? 'Normal' : theme.contrast === 'high' ? 'Alto' : 'Baixo'}
        </span>
      </div>
    </div>
  );
}

interface AccessibilitySettingsProps {
  className?: string;
}

export function AccessibilitySettings({ className }: AccessibilitySettingsProps) {
  const { accessibility, setAccessibility } = useTheme();

  const toggleHighContrast = () => {
    setAccessibility({ highContrast: !accessibility.highContrast });
  };

  const toggleReducedMotion = () => {
    setAccessibility({ reducedMotion: !accessibility.reducedMotion });
  };

  const toggleColorBlindFriendly = () => {
    setAccessibility({ colorBlindFriendly: !accessibility.colorBlindFriendly });
  };

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    setAccessibility({ fontSize: size });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Configurações de Acessibilidade
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Alto Contraste
          </label>
          <button
            onClick={toggleHighContrast}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              accessibility.highContrast ? 'bg-sky-500' : 'bg-gray-200'
            }`}
            aria-pressed={accessibility.highContrast}
            aria-label="Alternar alto contraste"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Movimento Reduzido
          </label>
          <button
            onClick={toggleReducedMotion}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              accessibility.reducedMotion ? 'bg-sky-500' : 'bg-gray-200'
            }`}
            aria-pressed={accessibility.reducedMotion}
            aria-label="Alternar movimento reduzido"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                accessibility.reducedMotion ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Amigável para Daltônicos
          </label>
          <button
            onClick={toggleColorBlindFriendly}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              accessibility.colorBlindFriendly ? 'bg-sky-500' : 'bg-gray-200'
            }`}
            aria-pressed={accessibility.colorBlindFriendly}
            aria-label="Alternar modo amigável para daltônicos"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                accessibility.colorBlindFriendly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
            Tamanho da Fonte
          </label>
          <div className="flex gap-2">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <Button
                key={size}
                theme={accessibility.fontSize === size ? 'primary' : 'outline-sky'}
                size="P"
                onClick={() => setFontSize(size)}
                aria-pressed={accessibility.fontSize === size}
                aria-label={`Definir tamanho de fonte ${size}`}
              >
                {size === 'small' ? 'A' : size === 'medium' ? 'A' : 'A'}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
