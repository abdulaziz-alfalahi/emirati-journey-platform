
// Re-export the ThemeProvider and useTheme from the components/theme-provider
import { ThemeProvider as InternalThemeProvider, useTheme } from "@/components/theme-provider";

export { useTheme };
export const ThemeProvider = InternalThemeProvider;
