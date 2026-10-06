import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import "./styles.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A", // Royal Blue
      dark: "#172E6B",
      light: "#3B5DB5",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#800020", // Maroon
      dark: "#5C0017",
      light: "#A52A45",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F7F8FC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#172033",
      secondary: "#667085",
    },

    success: {
      main: "#15803D",
    },

    warning: {
      main: "#B45309",
    },

    error: {
      main: "#B91C1C",
    },
  },

  typography: {
    fontFamily: "Inter, Arial, Helvetica, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9,
          padding: "10px 18px",
        },

        containedPrimary: {
          boxShadow: "none",

          "&:hover": {
            backgroundColor: "#172E6B",
            boxShadow: "none",
          },
        },

        containedSecondary: {
          boxShadow: "none",

          "&:hover": {
            backgroundColor: "#5C0017",
            boxShadow: "none",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 9,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);