import React, { useEffect, useMemo, useState } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import WhatsAppButton from "../components/WhatsAppButton"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const navItems = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "Contact", to: "/Request" },
      { label: "Privacy", to: "/privacy" },
    ],
    []
  )

  const isActive = (to) => location.pathname === to

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // chiudi menu mobile quando cambi pagina
    setOpen(false)
  }, [location.pathname])

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled ? "rgba(17, 17, 17, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none", // ✅ fix blur(px)
        transition: "all 0.25s ease",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.28)" : "none",
        borderBottom: scrolled ? "1px solid rgba(214,198,161,0.16)" : "1px solid rgba(214,198,161,0)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: 64, sm: 72 },
            px: { xs: 0, sm: 0 },
          }}
          disableGutters
        >
          {/* LEFT: LOGO */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              gap: 1.2,
            }}
          >
            <Box
              component="img"
              src="/testlogonavbar.png"
              alt="CoreLuxuryCar"
              sx={{
                height: scrolled ? 38 : 48,
                transition: "height 0.25s ease",
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.25))",
              }}
            />
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                color: "var(--sand-primary)",
                letterSpacing: "0.18em",
                fontSize: 12,
                textTransform: "uppercase",
                opacity: scrolled ? 0.95 : 0.85,
                userSelect: "none",
              }}
            >
              CoreLuxuryCar Ibiza
            </Typography>
          </Box>

          {/* CENTER: LINKS (DESKTOP) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {navItems.map((it) => (
              <Button
                key={it.to}
                component={RouterLink}
                to={it.to}
                disableRipple
                sx={{
                  px: 1.6,
                  py: 1,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 650,
                  fontSize: 14,
                  color: isActive(it.to) ? "var(--sand-primary)" : "var(--text-secondary)",
                  backgroundColor: isActive(it.to) ? "rgba(214,198,161,0.10)" : "transparent",
                  transition: "all .2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(214,198,161,0.12)",
                    color: "var(--sand-primary)",
                  },
                }}
              >
                {it.label}
              </Button>
            ))}
          </Box>

          {/* RIGHT: CTA + MOBILE MENU */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* WhatsApp CTA (desktop) */}
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <WhatsAppButton />
            </Box>

            {/* Mobile menu icon */}
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "var(--sand-primary)",
                border: "1px solid rgba(214,198,161,0.22)",
                borderRadius: 2,
                "&:hover": { backgroundColor: "rgba(214,198,161,0.08)" },
              }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            backgroundColor: "rgba(12,12,12,0.92)",
            backdropFilter: "blur(14px)",
            borderLeft: "1px solid rgba(214,198,161,0.16)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
          <Typography sx={{ color: "var(--sand-primary)", fontWeight: 900, letterSpacing: ".10em" }}>
            MENU
          </Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "var(--sand-primary)" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(214,198,161,0.12)" }} />

        <List sx={{ py: 1 }}>
          {navItems.map((it) => (
            <ListItemButton
              key={it.to}
              component={RouterLink}
              to={it.to}
              sx={{
                mx: 1.5,
                my: 0.6,
                borderRadius: 2,
                color: isActive(it.to) ? "var(--sand-primary)" : "rgba(255,255,255,0.78)",
                backgroundColor: isActive(it.to) ? "rgba(214,198,161,0.10)" : "transparent",
                "&:hover": { backgroundColor: "rgba(214,198,161,0.12)" },
              }}
            >
              <ListItemText primary={it.label} primaryTypographyProps={{ fontWeight: 800 }} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ p: 2, mt: "auto" }}>
          {/* WhatsApp CTA (mobile) */}
          <Box sx={{ width: "100%" }}>
            <WhatsAppButton />
          </Box>

          <Typography sx={{ mt: 1.5, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
            Premium transfers & private chauffeur service in Ibiza.
          </Typography>
        </Box>
      </Drawer>
    </AppBar>
  )
}
