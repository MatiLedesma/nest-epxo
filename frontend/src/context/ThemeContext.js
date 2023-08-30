import React, { createContext, useContext } from "react";

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("dark");

  const toggleTheme = () => {
    setTheme((state) => (state === "dark" ? "cupcake" : "dark"));
  };

  const themeValue = { theme, toggleTheme };

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}
