// Importação dos hooks necessários do React
import { createContext, useState, useContext, useEffect } from "react";

// Criação do contexto para gerenciar o tema da aplicação
const ThemeContext = createContext();

// Componente Provider que gerencia o estado do tema
export function ThemeProvider({ children }) {
  // Estado que controla se o tema escuro está ativo, inicializado com valor do localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Efeito que atualiza o localStorage e o atributo data-theme quando o tema muda
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  // Função para alternar entre tema claro e escuro
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Provedor do contexto com os valores necessários
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// Hook personalizado para facilitar o uso do contexto do tema
export function useTheme() {
  return useContext(ThemeContext);
}

