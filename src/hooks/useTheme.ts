import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeConfig, AccessibilityConfig, ThemeContextType } from '../types/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Partial<ThemeConfig>;
  defaultAccessibility?: Partial<AccessibilityConfig>;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = {},
  defaultAccessibility = {}
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeConfig>({
    mode: 'light',
    contrast: 'normal',
    colorScheme: 'default',
    fontSize: 'medium',
    reducedMotion: false,
    ...defaultTheme
  });

  const [accessibility, setAccessibilityState] = useState<AccessibilityConfig>({
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
    colorBlindFriendly: false,
    screenReader: false,
    ...defaultAccessibility
  });

  // Aplicar tema no documento
  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar modo de tema
    root.setAttribute('data-theme', theme.mode);
    root.classList.toggle('dark', theme.mode === 'dark');
    
    // Aplicar contraste
    root.setAttribute('data-contrast', theme.contrast);
    root.classList.toggle('high-contrast', theme.contrast === 'high');
    root.classList.toggle('low-contrast', theme.contrast === 'low');
    
    // Aplicar esquema de cores
    root.setAttribute('data-color-scheme', theme.colorScheme);
    root.classList.toggle('protanopia', theme.colorScheme === 'protanopia');
    root.classList.toggle('deuteranopia', theme.colorScheme === 'deuteranopia');
    root.classList.toggle('tritanopia', theme.colorScheme === 'tritanopia');
    root.classList.toggle('achromatopsia', theme.colorScheme === 'achromatopsia');
    
    // Aplicar tamanho da fonte
    root.setAttribute('data-font-size', theme.fontSize);
    root.classList.toggle('font-small', theme.fontSize === 'small');
    root.classList.toggle('font-large', theme.fontSize === 'large');
    
    // Aplicar movimento reduzido
    root.classList.toggle('reduced-motion', theme.reducedMotion || accessibility.reducedMotion);
    
    // Salvar no localStorage
    localStorage.setItem('theme-config', JSON.stringify(theme));
    localStorage.setItem('accessibility-config', JSON.stringify(accessibility));
  }, [theme, accessibility]);

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-config');
    const savedAccessibility = localStorage.getItem('accessibility-config');
    
    if (savedTheme) {
      setThemeState(JSON.parse(savedTheme));
    }
    
    if (savedAccessibility) {
      setAccessibilityState(JSON.parse(savedAccessibility));
    }
  }, []);

  const setTheme = (newTheme: Partial<ThemeConfig>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }));
  };

  const setAccessibility = (newAccessibility: Partial<AccessibilityConfig>) => {
    setAccessibilityState(prev => ({ ...prev, ...newAccessibility }));
  };

  const toggleTheme = () => {
    setTheme({ 
      mode: theme.mode === 'light' ? 'dark' : 'light' 
    });
  };

  const toggleContrast = () => {
    const contrastOrder: Array<ThemeConfig['contrast']> = ['normal', 'high', 'low'];
    const currentIndex = contrastOrder.indexOf(theme.contrast);
    const nextIndex = (currentIndex + 1) % contrastOrder.length;
    setTheme({ contrast: contrastOrder[nextIndex] });
  };

  const value: ThemeContextType = {
    theme,
    accessibility,
    setTheme,
    setAccessibility,
    toggleTheme,
    toggleContrast
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook para detectar preferências do sistema
export function useSystemPreferences() {
  const [preferences, setPreferences] = useState({
    prefersDarkMode: false,
    prefersReducedMotion: false,
    prefersHighContrast: false
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueries = {
        darkMode: window.matchMedia('(prefers-color-scheme: dark)'),
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
        highContrast: window.matchMedia('(prefers-contrast: high)')
      };

      const updatePreferences = () => {
        setPreferences({
          prefersDarkMode: mediaQueries.darkMode.matches,
          prefersReducedMotion: mediaQueries.reducedMotion.matches,
          prefersHighContrast: mediaQueries.highContrast.matches
        });
      };

      // Definir valores iniciais
      updatePreferences();

      // Adicionar listeners
      mediaQueries.darkMode.addEventListener('change', updatePreferences);
      mediaQueries.reducedMotion.addEventListener('change', updatePreferences);
      mediaQueries.highContrast.addEventListener('change', updatePreferences);

      return () => {
        mediaQueries.darkMode.removeEventListener('change', updatePreferences);
        mediaQueries.reducedMotion.removeEventListener('change', updatePreferences);
        mediaQueries.highContrast.removeEventListener('change', updatePreferences);
      };
    }
  }, []);

  return preferences;
}
