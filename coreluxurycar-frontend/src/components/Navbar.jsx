import React, { useEffect, useState } from "react"
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
  Menu,
  MenuItem,
  Collapse,
} from "@mui/material"
import Grow from "@mui/material/Grow"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import WhatsAppButton from "../components/WhatsAppButton"

// Static arrays outside the component — no reason to recreate or memoize these
const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Contact Us", to: "/request" },
]

const LEGAL_ITEMS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Cookies Policy", to: "/cookies" },
  { label: "Legal Notice", to: "/legal" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [legalAnchor, setLegalAnchor] = useState(null)
  const [legalMobileOpen, setLegalMobileOpen] = useState(false)

  const location = useLocation()
  const legalOpen = Boolean(legalAnchor)

  const isActive = (to) => location.pathname === to
  const isLegalActive = LEGAL_ITEMS.some((it) => isActive(it.to))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setLegalAnchor(null)
  }, [location.pathname])

  const openLegal = (event) => setLegalAnchor(event.currentTarget)
  const closeLegal = () => setLegalAnchor(null)

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled ? "rgba(17, 17, 17, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.25s ease",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.28)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(214,198,161,0.16)"
          : "1px solid rgba(214,198,161,0)",
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
          {/* LOGO */}
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
              src="/LOGO_cropped.svg"
              alt="CoreLuxuryCar"
              sx={{
                height: { xs: 32, sm: scrolled ? 40 : 48 },
                width: "auto",
                display: "block",
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
              Ibiza
            </Typography>
          </Box>

          {/* DESKTOP NAV */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
            {NAV_ITEMS.map((it) => (
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

            {/* LEGAL DROPDOWN */}
            <Button
              onClick={openLegal}
              disableRipple
              endIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}
              sx={{
                px: 1.6,
                py: 1,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 650,
                fontSize: 14,
                color: isLegalActive ? "var(--sand-primary)" : "var(--text-secondary)",
                backgroundColor: isLegalActive ? "rgba(214,198,161,0.10)" : "transparent",
                transition: "all .2s ease",
                "&:hover": {
                  backgroundColor: "rgba(214,198,161,0.12)",
                  color: "var(--sand-primary)",
                },
              }}
            >
              Our Policies
            </Button>

            <Menu
              anchorEl={legalAnchor}
              open={legalOpen}
              onClose={closeLegal}
              TransitionComponent={Grow}
              transitionDuration={420}
              PaperProps={{
                sx: {
                  mt: 1,
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--sand-primary)",
                  borderRadius: 2,
                  overflow: "hidden",
                  minWidth: 240,
                  boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
                },
              }}
              MenuListProps={{ sx: { py: 0.6 } }}
            >
              {LEGAL_ITEMS.map((it) => (
                <MenuItem
                  key={it.to}
                  component={RouterLink}
                  to={it.to}
                  onClick={closeLegal}
                  sx={{
                    mx: 0.8,
                    my: 0.4,
                    borderRadius: 1.6,
                    px: 1.4,
                    py: 1.15,
                    fontWeight: 700,
                    color: isActive(it.to) ? "var(--sand-primary)" : "var(--text-secondary)",
                    backgroundColor: isActive(it.to) ? "rgba(214,198,161,0.10)" : "transparent",
                    transition: "all .22s ease",
                    "&:hover": {
                      backgroundColor: "rgba(214,198,161,0.12)",
                      color: "var(--sand-primary)",
                    },
                  }}
                >
                  {it.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* RIGHT: CTA + MOBILE ICON */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <WhatsAppButton />
            </Box>

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
          {NAV_ITEMS.map((it) => (
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

          {/* LEGAL COLLAPSIBLE */}
          <ListItemButton
            onClick={() => setLegalMobileOpen((v) => !v)}
            sx={{
              mx: 1.5,
              my: 0.6,
              borderRadius: 2,
              color: isLegalActive ? "var(--sand-primary)" : "rgba(255,255,255,0.78)",
              backgroundColor: isLegalActive ? "rgba(214,198,161,0.10)" : "transparent",
              "&:hover": { backgroundColor: "rgba(214,198,161,0.12)" },
            }}
          >
            <ListItemText primary="Legal" primaryTypographyProps={{ fontWeight: 900 }} />
            {legalMobileOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>

          <Collapse in={legalMobileOpen} timeout={280} unmountOnExit>
            <List sx={{ pt: 0.2, pb: 0.8 }}>
              {LEGAL_ITEMS.map((it) => (
                <ListItemButton
                  key={it.to}
                  component={RouterLink}
                  to={it.to}
                  sx={{
                    mx: 2.5,
                    my: 0.35,
                    borderRadius: 2,
                    pl: 2.2,
                    color: isActive(it.to) ? "var(--sand-primary)" : "rgba(255,255,255,0.72)",
                    backgroundColor: isActive(it.to) ? "rgba(214,198,161,0.10)" : "transparent",
                    "&:hover": { backgroundColor: "rgba(214,198,161,0.10)" },
                  }}
                >
                  <ListItemText
                    primary={it.label}
                    primaryTypographyProps={{ fontWeight: 800, fontSize: 14 }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>

        <Box sx={{ p: 2, mt: "auto" }}>
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
