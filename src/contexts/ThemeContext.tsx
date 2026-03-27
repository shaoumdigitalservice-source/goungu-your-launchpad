import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "default" | "alt";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "default", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("goungue-theme") as Theme) || "default";
    }
    return "default";
  });

  useEffect(() => {
    localStorage.setItem("goungue-theme", theme);
    document.documentElement.classList.toggle("theme-alt", theme === "alt");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "default" ? "alt" : "default"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
