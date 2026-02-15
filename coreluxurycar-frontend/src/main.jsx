import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { HelmetProvider } from "react-helmet-async"

import App from "./App.jsx"
import "./styles/theme.css"
import "./index.css"
import { muiTheme } from "./styles/muiTheme.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
)
