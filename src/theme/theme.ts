import { createTheme } from "@mui/material/styles";

// Mediterranean color palette: saffron gold + teal + terracotta
const theme = createTheme({
  palette: {
    primary: {
      main: "#F4C430",
      dark: "#D4A820",
      light: "#F9D97A",
      contrastText: "#1A1A2E",
    },
    secondary: {
      main: "#00A896",
      dark: "#007A6E",
      light: "#33C1B2",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAF7F0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A2E",
      secondary: "#5C5C7A",
    },
    // Terracotta used as a warm accent via custom color
    error: {
      main: "#C85C40",
    },
    divider: "rgba(0,0,0,0.08)",
  },
  typography: {
    // CSS variables set in layout.tsx via next/font
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    h1: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "var(--font-playfair), Georgia, serif",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.03em",
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: "1px solid rgba(0,0,0,0.08)" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
});

export default theme;
