"use client"

import type React from "react"

import { createContext, useMemo, useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Create a context for the color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
})

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light")

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    [],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#4169e1", // Royal Blue as requested
            light: "#6f8ce5", // Lighter variant
            dark: "#2a4cad", // Darker variant
            contrastText: "#fff",
          },
          secondary: {
            main: "#20639B", // Complementary blue
            light: "#4D8AC0",
            dark: "#173F63",
            contrastText: "#fff",
          },
          background: {
            default: mode === "light" ? "#f8f9fa" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "rgba(255, 255, 255, 0.87)",
            secondary: mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.6)",
          },
          error: {
            main: "#ED553B", // Coral red
          },
          warning: {
            main: "#F6D55C", // Mustard yellow
          },
          info: {
            main: "#3CAEA3", // Teal
          },
          success: {
            main: "#3AAA35", // Green
          },
        },
        components: {
          MuiRadio: {
            styleOverrides: {
              root: {
                color: "#4169e1",
                "&.Mui-checked": {
                  color: "#4169e1",
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 500,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow:
                  mode === "light"
                    ? "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 6px rgba(0, 0, 0, 0.05)"
                    : "0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.2)",
              },
            },
          },
          MuiCardHeader: {
            styleOverrides: {
              root: {
                padding: 20,
              },
            },
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                padding: 20,
                "&:last-child": {
                  paddingBottom: 20,
                },
              },
            },
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 700,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 500,
          },
          h6: {
            fontWeight: 500,
          },
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
