import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useLibThemeMode } from './context/ThemeContext';

/**
 * Componente Toggle de Tema para _react-lib
 * ✅ RETROCOMPATÍVEL: Só aparece se LibThemeProvider estiver ativo
 * 🎨 OPCIONAL: Pode ser usado em qualquer aplicação que habilite temas
 */
const LibThemeToggle = ({ 
  size = 'medium',
  className,
  style,
  tooltipPlacement = 'bottom',
  ...props 
}) => {
  const { isDarkMode, toggleTheme, currentTheme } = useLibThemeMode();

  // Se não tem sistema de temas ativo, não renderiza nada
  if (!currentTheme || typeof toggleTheme !== 'function') {
    return null;
  }

  return (
    <Tooltip 
      title={isDarkMode ? "Alternar para tema claro" : "Alternar para tema escuro"}
      placement={tooltipPlacement}
    >
      <IconButton
        onClick={toggleTheme}
        size={size}
        className={className}
        style={style}
        sx={{
          color: currentTheme.palette.text.primary,
          '&:hover': {
            backgroundColor: currentTheme.palette.action.hover,
          },
          transition: 'all 0.3s ease',
          ...props.sx
        }}
        aria-label="toggle theme"
        {...props}
      >
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default LibThemeToggle;
