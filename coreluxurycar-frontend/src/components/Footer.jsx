import { Link as RouterLink } from "react-router-dom"
import { Box, Container, Typography, Link, Divider, Stack, Button } from "@mui/material"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { useConsent } from "../consent/ConsentContext"

export default function Footer() {
  const year = new Date().getFullYear()
  const WHATSAPP_NUMBER_INTL = import.meta.env.VITE_PHONE_NUMBER
  const EMAIL = "info@coreluxurycar.com"

  const { openSettings } = useConsent()

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        pt: { xs: 6, sm: 8 },
        pb: 4,
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid rgba(214,198,161,0.15)",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 300px at 20% 0%, rgba(214,198,161,0.10), transparent 55%), radial-gradient(700px 260px at 85% 5%, rgba(214,198,161,0.06), transparent 55%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        {/* TOP */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1px 0.85fr" },
            gap: { xs: 4, md: 0 },
            alignItems: "start",
          }}
        >
          {/* LEFT: Brand */}
          <Stack spacing={2.2} sx={{ pr: { md: 5 } }}>
            <Stack spacing={1.4}>
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.1,
                  textDecoration: "none",
                  width: "fit-content",
                  "&:hover img": { opacity: 1 },
                  "&:hover span": { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src="/LOGO_cropped.svg"
                  alt="CoreLuxuryCar"
                  sx={{
                    height: 50,
                    width: "auto",
                    display: "block",
                    filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.25))",
                    opacity: 0.92,
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    color: "var(--sand-primary)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontSize: 12,
                    lineHeight: 1,
                    opacity: 0.88,
                    userSelect: "none",
                  }}
                >
                  Ibiza
                </Typography>
              </Box>

              <Typography sx={{ color: "var(--text-secondary)", lineHeight: 1.85, maxWidth: 560 }}>
                Premium chauffeur service in Ibiza. Discreet, punctual and tailored rides with professional drivers.
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnOutlinedIcon sx={{ color: "rgba(214,198,161,0.85)" }} />
                <Link
                  href="https://maps.google.com/?q=Ibiza"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: "var(--sand-primary)", fontWeight: 800 }}
                >
                  Ibiza, Balearic Islands
                </Link>
              </Stack>
            </Stack>
          </Stack>

          {/* VERTICAL DIVIDER (desktop only) */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              backgroundColor: "rgba(255,255,255,0.06)",
              my: 1,
            }}
          />

          {/* RIGHT: Contact */}
          <Box sx={{ pl: { md: 5 }, width: "100%" }}>
            <Stack spacing={2}>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.82)",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                Contact Us
              </Typography>

              <Stack spacing={1.2} sx={{ maxWidth: 420 }}>
                <ContactRow
                  icon={<WhatsAppIcon sx={{ color: "rgba(214,198,161,0.9)", fontSize: 20 }} />}
                  href={`https://wa.me/${WHATSAPP_NUMBER_INTL}`}
                  label="Chat on WhatsApp"
                />
                <ContactRow
                  icon={<MailOutlineIcon sx={{ color: "rgba(214,198,161,0.9)", fontSize: 20 }} />}
                  href={`mailto:${EMAIL}`}
                  label={EMAIL}
                />

                <Button
                  component={RouterLink}
                  to="/request"
                  variant="outlined"
                  sx={{
                    mt: 0.5,
                    borderColor: "rgba(214,198,161,0.55)",
                    color: "var(--sand-primary)",
                    borderRadius: 2,
                    px: 2,
                    py: 1.05,
                    fontWeight: 700,
                    textTransform: "none",
                    width: "fit-content",
                    "&:hover": {
                      borderColor: "var(--sand-primary)",
                      backgroundColor: "rgba(214,198,161,0.08)",
                    },
                  }}
                >
                  Request a Ride
                </Button>

                <Typography sx={{ color: "rgba(255,255,255,0.50)", fontSize: 12, lineHeight: 1.7 }}>
                  For urgent transfers, WhatsApp is the fastest option.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* BOTTOM */}
        <Divider sx={{ my: { xs: 4, sm: 5 }, borderColor: "rgba(255,255,255,0.08)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.5,
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
            © {year} CoreLuxuryCar. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <BottomLink to="/privacy" label="Privacy" />
            <BottomLink to="/cookies" label="Cookies" />
            <BottomLink to="/legal" label="Legal" />
            <CookieSettingsLink onClick={openSettings} />
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

/* ── Sub-components ── */

function CookieSettingsLink({ onClick }) {
  return (
    <Link
      component="button"
      type="button"
      onClick={onClick}
      underline="hover"
      sx={{
        color: "rgba(214,198,161,0.78)",
        fontSize: 12,
        fontWeight: 900,
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        "&:hover": { color: "var(--sand-primary)" },
        "&:focus-visible": {
          outline: "2px solid rgba(214,198,161,0.55)",
          outlineOffset: 2,
          borderRadius: 6,
        },
      }}
    >
      Cookie settings
    </Link>
  )
}

function ContactRow({ icon, href, label }) {
  return (
    <Stack direction="row" spacing={1.1} alignItems="center">
      {icon}
      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        underline="hover"
        sx={{
          color: "var(--sand-primary)",
          fontWeight: 900,
          minWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Link>
    </Stack>
  )
}

function BottomLink({ to, label }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      underline="hover"
      sx={{ color: "rgba(214,198,161,0.78)", fontSize: 12, fontWeight: 900 }}
    >
      {label}
    </Link>
  )
}
