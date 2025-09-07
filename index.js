export { useForm } from './hooks/useForm';
export { useDimensions } from './hooks/useDimensions';
export { useTableHeight, useTableHeightModal } from './hooks/useTableHeight';
export { useNotificacao, NotificacaoProvider, NotificacaoContext, Alerta } from './context/NotificacaoContext';

// 🎨 Componentes com suporte a tema
export { default as Notificacao } from './Notificacao';
export { default as AlertaErro } from './AlertaErro';
export { default as AlertaSucesso } from './AlertaSucesso';

// 🎨 NOVO: Sistema de Temas da _react-lib (retrocompatível)
export { 
  LibThemeProvider, 
  useLibTheme, 
  useLibThemeMode 
} from './context/ThemeContext';

// 🎨 NOVO: Componente Toggle de Tema (opcional)
export { default as LibThemeToggle } from './LibThemeToggle';
