import React, { createContext, useContext, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { darkTheme } from "./dark-theme";
import { lightTheme } from "./default-theme";
import type { ITheme } from "./types";

const ThemeContext = createContext<ITheme>(lightTheme);

interface IThemeProviderProps {
  children: ReactNode;
  /**
   * Provide an explicit theme. When omitted the provider automatically
   * switches between lightTheme and darkTheme based on the system setting.
   */
  theme?: ITheme;
}

function ThemeProvider({ children, theme }: IThemeProviderProps) {
  const colorScheme = useColorScheme();
  const resolved = theme ?? (colorScheme === "dark" ? darkTheme : lightTheme);
  return (
    <ThemeContext.Provider value={resolved}>{children}</ThemeContext.Provider>
  );
}

function useTheme(): ITheme {
  return useContext(ThemeContext);
}

export { ThemeContext, ThemeProvider, useTheme };
