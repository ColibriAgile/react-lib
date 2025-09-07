import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// 🎨 TEMA PADRÃO (LIGHT) - Mantém compatibilidade total com aplicações existentes
const defaultLightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5F259F',
      light: '#9f68DC',
      dark: '#4A1D7C',
    },
    secondary: {
      main: '#259F9C',
      light: '#68DCD9',
      dark: '#1d7c7A',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
    divider: '#e0e7ff',
    action: {
      hover: '#f8fafc',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: '1px solid #e5e7eb',
        },
      },
    },
  },
});

// 🌙 TEMA ESCURO - Novo recurso opcional
const defaultDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9f68DC',
      light: '#c084e8',
      dark: '#7c4dff',
    },
    secondary: {
      main: '#68DCD9',
      light: '#8fe5e3',
      dark: '#4db6ac',
    },
    background: {
      default: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      paper: 'linear-gradient(145deg, #1e293b, #0f172a)',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: '#334155',
    action: {
      hover: 'linear-gradient(145deg, #334155, #1e293b)',
    },
    grey: {
      50: '#374151',
      100: '#1f2937',
      200: '#374151',
      300: '#4b5563',
      400: '#94a3b8',
      500: '#94a3b8',
      600: '#64748b',
      700: '#475569',
      800: '#334155',
      900: '#1e293b',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #2d3748, #1a202c)', // Mais contrastante
          border: '1px solid #4a5568', // Borda mais visível
          boxShadow: '0 6px 16px rgba(0,0,0,0.5), 0 3px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(226, 232, 240, 0.1)',
          '&:hover': {
            boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(226, 232, 240, 0.2), 0 0 0 1px rgba(34, 197, 94, 0.4)',
            borderColor: '#22c55e',
            background: 'linear-gradient(145deg, #374151, #1f2937)', // Mais claro no hover
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1e293b, #0f172a)',
          border: '1px solid #334155',
        },
      },
    },
  },
});

// 🎯 Context para temas da _react-lib
const LibThemeContext = createContext(null);

/**
 * Hook para usar temas da _react-lib
 * ✅ RETROCOMPATÍVEL: Se não tem provider, retorna tema padrão light
 */
export const useLibTheme = () => {
  const context = useContext(LibThemeContext);
  // Se não tem provider (aplicações antigas), usa tema padrão
  return context?.currentTheme || defaultLightTheme;
};

/**
 * Hook para controlar modo de tema (apenas se habilitado)
 * ✅ RETROCOMPATÍVEL: Só funciona se LibThemeProvider estiver ativo
 */
export const useLibThemeMode = () => {
  const context = useContext(LibThemeContext);
  if (!context) {
    // Aplicações antigas não têm acesso ao toggle
    return {
      isDarkMode: false,
      toggleTheme: () => {},
      currentTheme: defaultLightTheme,
    };
  }
  return context;
};

/**
 * Provider de temas da _react-lib
 * ✅ RETROCOMPATÍVEL: enableThemes=false mantém comportamento atual
 * 🆕 NOVO RECURSO: enableThemes=true ativa sistema de temas
 */
export const LibThemeProvider = ({ 
  children, 
  enableThemes = false,
  storageKey = 'react-lib-theme-mode',
  defaultMode = 'light'
}) => {
  // Estado do tema (sempre necessário)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (!enableThemes) return false;
    
    try {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return defaultMode === 'dark';
    } catch {
      return defaultMode === 'dark';
    }
  });

  const toggleTheme = () => {
    if (!enableThemes) return;
    
    setIsDarkMode(prev => {
      const newMode = !prev;
      try {
        localStorage.setItem(storageKey, newMode ? 'dark' : 'light');
      } catch {
        // Ignora erros de localStorage
      }
      return newMode;
    });
  };

  const currentTheme = isDarkMode && enableThemes ? defaultDarkTheme : defaultLightTheme;

  // Detecta preferência do sistema se não há configuração salva
  useEffect(() => {
    if (!enableThemes) return;
    
    try {
      if (!localStorage.getItem(storageKey)) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        
        const handleChange = (e) => {
          setIsDarkMode(e.matches);
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    } catch {
      // Ignora erros de localStorage/mediaQuery
    }
  }, [storageKey, enableThemes]);

  const value = {
    isDarkMode: enableThemes ? isDarkMode : false,
    toggleTheme,
    currentTheme,
  };

  return (
    <LibThemeContext.Provider value={value}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </LibThemeContext.Provider>
  );
};

export default LibThemeContext;
