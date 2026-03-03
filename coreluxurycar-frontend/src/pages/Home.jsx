import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/Reveal.jsx";

const MOBILE_MQ = "(max-width: 768px), (orientation: portrait)";

function useVideoSrc(mobileSrc, desktopSrc) {
  const [src, setSrc] = useState(() => {
    // SSR-safe guard (not strictly needed in Vite/CSR but good practice)
    if (typeof window === "undefined") return desktopSrc;
    return window.matchMedia(MOBILE_MQ).matches ? mobileSrc : desktopSrc;
  });

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const handler = (e) => setSrc(e.matches ? mobileSrc : desktopSrc);
    // Modern API
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mobileSrc, desktopSrc]);

  return src;
}

/* ─────────────────────────────────────────────
   Reusable section wrapper
───────────────────────────────────────────── */
function Section({ title, subtitle, children }) {
  return (
    <Box sx={{ py: { xs: 7, md: 10 } }}>
      <Reveal from="up">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: "var(--sand-primary)",
            fontWeight: 500,
            letterSpacing: 0.5,
            mb: 1,
          }}
        >
          {title}
        </Typography>
      </Reveal>

      {subtitle && (
        <Reveal from="up" delay={0.3}>
          <Typography sx={{ color: "var(--text-secondary)", mb: 4, fontSize: 16 }}>
            {subtitle}
          </Typography>
        </Reveal>
      )}

      {children}
    </Box>
  );
}

/* ─────────────────────────────────────────────
   Info card used in the sections below
───────────────────────────────────────────── */
function InfoCard({ title, body }) {
  return (
    <Card
      sx={{
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "rgba(214,198,161,0.25)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: "var(--sand-primary)",
            mb: 1.5,
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            "& ul": { margin: 0, paddingLeft: "18px" },
            "& li": { marginBottom: "6px" },
          }}
        >
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

/* ──────────────
   Hero section 
───────────────── */

function HeroSection() {
  const videoRef = useRef(null);
  const videoSrc = useVideoSrc("/HeroMobile1.mp4", "/Hero4K_4K.mp4");


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();           
    video.play().catch(() => {
    });
  }, [videoSrc]);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "80vh", sm: "90vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        mt: 0,
        pt: 0,
      }}
    >
      {/* ── Video background ── */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        
        <Box
          ref={videoRef}
          component="video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={videoSrc}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.78) contrast(1.12) saturate(0.65)",
            backgroundColor: "rgba(0, 0, 0, 0.68)",
          }}
        />
      </Box>

      {/* ── Dark overlay ── */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.52)",
          zIndex: 1,
        }}
      />

      {/* ── Hero content ── */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          py: { xs: 5, md: 6 },
          pt: { xs: 11, md: 13 },
        }}
      >
        {/* H1 for SEO (visually hidden) */}
        <Typography
          component="h1"
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            p: 0,
            m: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          CoreLuxuryCar
        </Typography>

        {/* Visible logo */}
        <Reveal from="down" delay={0.5}>
          <Box
            component="img"
            src="/LOGO_cropped.svg"
            alt="CoreLuxuryCar – Luxury Chauffeur Service Ibiza"
            sx={{
              width: { xs: "88%", sm: "620px", md: "740px" },
              maxWidth: "94vw",
              height: "auto",
              display: "block",
              mx: "auto",
              mb: { xs: 2, sm: 2.5 },
              filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.45))",
            }}
          />
        </Reveal>

        <Reveal from="right" delay={0.3}>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              mt: 1.1,
              fontSize: { xs: 15.5, sm: 18 },
              letterSpacing: 0.8,
            }}
          >
            Luxury Chauffeur Service in Ibiza – Private Airport Transfers & VIP Transport
          </Typography>
        </Reveal>

        <Reveal from="up" delay={0.3}>
          <Typography sx={{ color: "var(--text-secondary)", mt: 1.4, fontSize: { xs: 16.5, sm: 18 } }}>
            Private airport transfers, VIP rides and premium transport across Ibiza — fast booking
            via WhatsApp or via form.
          </Typography>
        </Reveal>

        <Reveal from="up" delay={0.3}>
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Button
              component={RouterLink}
              to="/request"
              variant="contained"
              sx={{
                backgroundColor: "var(--sand-primary)",
                color: "#111",
                px: 4,
                py: 1.2,
                "&:hover": { backgroundColor: "var(--sand-secondary)" },
                fontWeight: 700,
              }}
            >
              REQUEST A RIDE
            </Button>

            <WhatsAppButton />
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Home() {
  return (
    <Box sx={{ backgroundColor: "var(--bg-primary)", overflowX: "hidden" }}>
      <SEO
        title="Luxury Chauffeur Service in Ibiza"
        description="CoreLuxuryCar provides premium chauffeur services in Ibiza: private airport transfers, VIP transport and luxury rides. Fast booking via WhatsApp."
      />

      <HeroSection />

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        {/* SEO text */}
        <Box sx={{ pt: { xs: 6, md: 8 } }}>
          <Reveal from="up" delay={0.3}>
            <Typography sx={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 16 }}>
              CoreLuxuryCar provides luxury chauffeur services in Ibiza, specializing in private
              airport transfers from Ibiza Airport (IBZ), VIP transport and private driver services
              with premium Mercedes V-Class experiences.
              <br />
              <br />
              Ideal for luxury hotel transfers, yacht marina pickups, events and tailored island
              tours — with punctuality, discretion and first-class comfort across Ibiza.
            </Typography>
          </Reveal>
        </Box>

        {/* WHY US */}
        <Section
          title="Why choose CoreLuxuryCar – Private Chauffeur in Ibiza"
          subtitle="Premium transport in Ibiza designed for comfort, privacy and reliability."
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems="center">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="left" delay={0.3}>
                <Stack spacing={3}>
                  <InfoCard title="Premium service" body="Professional, discreet chauffeur service for VIP transfers." />
                  <InfoCard title="Punctual & reliable" body="On-time pickups for Ibiza Airport, villas and marinas." />
                  <InfoCard title="Fast booking" body="Request a ride in minutes via WhatsApp." />
                </Stack>
              </Reveal>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="right" delay={0.3}>
                <Box
                  component="img"
                  src="/interni.png"
                  alt="Luxury Mercedes V-Class interior Ibiza chauffeur service"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: { xs: 260, md: 420 },
                    objectFit: "cover",
                    borderRadius: 4,
                    display: "block",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.55)",
                  }}
                />
              </Reveal>
            </Box>
          </Stack>
        </Section>

        {/* WHERE ARE WE */}
        <Section
          title="Ibiza Airport Transfers & Island-Wide Private Transport"
          subtitle="Airport pickups, hotel transfers, villas, marinas and tailored routes."
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems="center">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="left" delay={0.3}>
                <Box
                  component="img"
                  src="/esvedra.png"
                  alt="Luxury Mercedes V-Class near Es Vedra"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: { xs: 260, md: 420 },
                    objectFit: "cover",
                    borderRadius: 4,
                    display: "block",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.55)",
                  }}
                />
              </Reveal>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="right" delay={0.3}>
                <Stack spacing={3}>
                  <InfoCard
                    title="Service area"
                    body="Ibiza (Eivissa) — including Ibiza Airport, Ibiza Town, San Antonio, Santa Eulalia, marinas and villa areas."
                  />
                  <InfoCard
                    title="Availability"
                    body="Flexible scheduling for transfers and private rides. Contact us anytime to check availability and rates."
                  />
                </Stack>
              </Reveal>
            </Box>
          </Stack>
        </Section>

        {/* LICENSE */}
        <Section
          title="Licensed Professional Chauffeur Service in Ibiza"
          subtitle="We operate with a professional, safety-first approach."
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems="center">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="left" delay={0.3}>
                <Stack spacing={3}>
                  <InfoCard
                    title="Professional operations"
                    body="Professional chauffeur service with clear booking, pickup coordination and customer support."
                  />
                  <InfoCard
                    title="Transparent service"
                    body="Clear communication on pickup details, luggage, timing and route preferences — tailored to your trip."
                  />
                  <InfoCard
                    title="Key Features"
                    body={
                      <>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Our premium chauffeur services include:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                          <Box component="li">Private Ibiza Airport Transfers (IBZ)</Box>
                          <Box component="li">Professional Private Driver Ibiza (Hourly / Daily)</Box>
                          <Box component="li">Yacht & Marina Transfers in Ibiza</Box>
                          <Box component="li">VIP Events & Night Chauffeur Services</Box>
                        </Box>
                      </>
                    }
                  />
                </Stack>
              </Reveal>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="right" delay={0.3}>
                <Box
                  component="img"
                  src="/daltvila.png"
                  alt="Professional chauffeur opening Mercedes V-Class door in Ibiza"
                  sx={{
                    width: "100%",
                    height: { xs: 260, md: 420 },
                    objectFit: "cover",
                    borderRadius: 4,
                    display: "block",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                    filter: "brightness(0.95) contrast(1.05)",
                  }}
                />
              </Reveal>
            </Box>
          </Stack>
        </Section>
      </Container>
    </Box>
  );
}
