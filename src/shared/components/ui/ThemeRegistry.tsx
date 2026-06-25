"use client";

// The MUI theme object contains functions (e.g. theme.breakpoints.up) which cannot
// be serialized across the React Server Component → Client Component boundary.
// Wrapping ThemeProvider + CssBaseline in a dedicated client component solves this.
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/core/theme/theme";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
