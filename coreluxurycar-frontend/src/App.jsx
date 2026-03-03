import { Routes, Route, Navigate } from "react-router-dom"
import { Box } from "@mui/material"
import CookieBanner from "./consent/CookieBanner"
import CookieSettingsModal from "./consent/CookieSettingsModal"

import Home from "./pages/Home.jsx"
import Request from "./pages/Request.jsx"
import Privacy from "./pages/Privacy.jsx"
import Footer from "./components/Footer.jsx"
import Navbar from "./components/Navbar.jsx"
import Cookies from "./pages/Cookies"
import Legal from "./pages/Legal.jsx"

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<Request />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

      <Footer />

      {/* Modals and overlays outside the content flow */}
      <CookieSettingsModal />
      <CookieBanner />
    </Box>
  )
}
