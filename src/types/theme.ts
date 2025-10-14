export type ThemeMode = 'light' | 'dark' | 'auto';

export type ContrastMode = 'normal' | 'high' | 'low';

export type ColorScheme = 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface ThemeConfig {
  mode: ThemeMode;
  contrast: ContrastMode;
  colorScheme: ColorScheme;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
}

export interface AccessibilityConfig {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorBlindFriendly: boolean;
  screenReader: boolean;
}

export interface ThemeContextType {
  theme: ThemeConfig;
  accessibility: AccessibilityConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  setAccessibility: (accessibility: Partial<AccessibilityConfig>) => void;
  toggleTheme: () => void;
  toggleContrast: () => void;
}
