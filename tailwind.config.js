module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    'text-white',
    'text-black-900',
    'text-sky-500',
    'text-orange-500',
    'text-green-600',
    'text-red-600',
    'font-bold',
    'text-[24px]',
    'text-[20px]',
    'text-[16px]',
    'text-[14px]',
    'leading-[20px]',
    'leading-6',
    // Classes de acessibilidade
    'focus:ring-2',
    'focus:ring-4',
    'focus:ring-offset-2',
    'focus:ring-offset-4',
    'high-contrast:focus:ring-4',
    'high-contrast:focus:ring-offset-4',
    'reduced-motion:transition-none',
    'reduced-motion:animate-none',
    // Classes de contraste
    'high-contrast',
    'low-contrast',
    'protanopia',
    'deuteranopia',
    'tritanopia',
    'achromatopsia',
    // Classes de tamanho de fonte
    'font-small',
    'font-large',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '1rem',
      },
      screens: {
        lg: '1024px',
        xl: '1326px',
      },
    },


    extend: {
      screens: {
        '2md': '1440px',
      },
      boxShadow: {
        'x-light': '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
        'white-16': 'rgba(255, 255, 255, 0.16)',
      },
      backgroundImage: {
        
        'primary-gradient': 'linear-gradient(#004D61, #ffffff);',
        'primary-gradient-dark': 'linear-gradient(to bottom, #020024 0%, #090979 50%, #00D4FF 100%)',
        'secondary-gradient': 'linear-gradient(to bottom, #dee9ea, #ffffff)',
      },
      fontFamily: {
        lato: ['"Lato"', 'sans-serif'],
      },
      colors: {
        "sky-100": "#80a6b0",
        "sky-500": "#004d61",
        "sky-900": "#004D61",

        "orange-100": "#ffa898",
        "orange-500": "#ff5031",
        "orange-900": "#cc4027",

        "gray-100": "#f8f8f8",
        "sky-200": "#dee9ea",
        "gray-250": "#ABAFBA",
        "black-600": "#767676",
        "black-700": "#444444",
        "black-900": "#131313",

        "green-600": "#47a138",
        "red-600": "#ce3426",

        "yellow-500": "#E9C300",
        "yellow-900": "#ba9c00",

        "brown-500": "#80440D",
        "brown-900": "#6b3c0a",
        
        "blue-violet-25":"#E8E9ED",
        "blue-violet-50":"#DDDEE4",
        "blue-violet-100": "#8589D6",
        "blue-violet-500": "#090979",
        "blue-violet-900": "#020024",

        // Cores para alto contraste
        "high-contrast": {
          "bg": "#000000",
          "text": "#FFFFFF",
          "primary": "#00FFFF",
          "secondary": "#FFFF00",
          "accent": "#FF00FF",
          "error": "#FF0000",
          "success": "#00FF00",
          "warning": "#FFA500",
        },

        // Cores para baixo contraste
        "low-contrast": {
          "bg": "#F5F5F5",
          "text": "#666666",
          "primary": "#999999",
          "secondary": "#CCCCCC",
          "accent": "#AAAAAA",
          "error": "#CC6666",
          "success": "#66CC66",
          "warning": "#CCAA66",
        },

        // Cores para daltonismo
        "protanopia": {
          "primary": "#0066CC",
          "secondary": "#CC6600",
          "accent": "#6600CC",
        },
        "deuteranopia": {
          "primary": "#0066CC", 
          "secondary": "#CC6600",
          "accent": "#6600CC",
        },
        "tritanopia": {
          "primary": "#CC0066",
          "secondary": "#00CC66", 
          "accent": "#CC6600",
        },
        "achromatopsia": {
          "primary": "#333333",
          "secondary": "#666666",
          "accent": "#999999",
        },
      },
    },
  },
  plugins: [],
}