import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box, Container, Typography, Button, Card, CardContent, Stack,
} from "@mui/material";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/Reveal.jsx";

const MOBILE_MQ = "(max-width: 768px), (orientation: portrait)";

function useMediaSrc(mobileSrc, desktopSrc) {
  const [src, setSrc] = useState(() => {
    if (typeof window === "undefined") return desktopSrc;
    return window.matchMedia(MOBILE_MQ).matches ? mobileSrc : desktopSrc;
  });
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const handler = (e) => setSrc(e.matches ? mobileSrc : desktopSrc);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mobileSrc, desktopSrc]);
  return src;
}

function Section({ title, subtitle, children }) {
  return (
    <Box sx={{ py: { xs: 7, md: 10 } }}>
      <Reveal from="up">
        <Typography variant="h4" component="h2"
          sx={{ color: "var(--sand-primary)", fontWeight: 500, letterSpacing: 0.5, mb: 1 }}>
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

function InfoCard({ title, body }) {
  return (
    <Card sx={{
      height: "100%",
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      backdropFilter: "blur(8px)",
      transition: "all 0.3s ease",
      "&:hover": { borderColor: "rgba(214,198,161,0.25)", transform: "translateY(-4px)" },
    }}>
      <CardContent>
        <Typography variant="h6" component="h3"
          sx={{ color: "var(--sand-primary)", mb: 1.5, fontWeight: 600, letterSpacing: "0.04em" }}>
          {title}
        </Typography>
        <Typography variant="body2" component="div"
          sx={{ color: "var(--text-secondary)", lineHeight: 1.7,
            "& ul": { margin: 0, paddingLeft: "18px" }, "& li": { marginBottom: "6px" } }}>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

/* ── How it works ── */
const HOW_STEPS = [
  { number: "01", title: "Contact us", body: "Reach out via WhatsApp or our booking form. Tell us your pickup location, date, time and number of passengers." },
  { number: "02", title: "We confirm your ride", body: "You'll receive a confirmation with driver details, vehicle info and estimated arrival time." },
  { number: "03", title: "Enjoy the ride", body: "Your chauffeur arrives on time. Sit back and experience premium comfort across Ibiza." },
];

function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 7, md: 10 }, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <Reveal from="up">
        <Typography variant="h4" component="h2"
          sx={{ color: "var(--sand-primary)", fontWeight: 500, letterSpacing: 0.5, mb: 1 }}>
          How it works
        </Typography>
      </Reveal>
      <Reveal from="up" delay={0.2}>
        <Typography sx={{ color: "var(--text-secondary)", mb: 6, fontSize: 16 }}>
          Book your luxury transfer in 3 simple steps.
        </Typography>
      </Reveal>
      <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 4, md: 3 }} alignItems="stretch">
        {HOW_STEPS.map((step, i) => (
          <Reveal key={step.number} from="up" delay={0.15 * i}>
            <Box sx={{
              flex: 1, position: "relative", p: { xs: 3, md: 4 },
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)",
              transition: "border-color 0.3s",
              "&:hover": { borderColor: "rgba(214,198,161,0.2)" },
            }}>
              <Typography sx={{
                fontFamily: "serif", fontSize: { xs: 48, md: 56 }, fontWeight: 700, lineHeight: 1,
                color: "rgba(214,198,161,0.12)", position: "absolute", top: 16, right: 20, userSelect: "none",
              }}>
                {step.number}
              </Typography>
              <Typography sx={{ color: "var(--sand-primary)", fontSize: 13, letterSpacing: 2, fontWeight: 600, mb: 1.5, textTransform: "uppercase" }}>
                Step {step.number}
              </Typography>
              <Typography variant="h6" component="h3" sx={{ color: "#fff", fontWeight: 600, mb: 1.5 }}>
                {step.title}
              </Typography>
              <Typography sx={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.7 }}>
                {step.body}
              </Typography>
            </Box>
          </Reveal>
        ))}
      </Stack>
    </Box>
  );
}

/* ── Final CTA ── */
function FinalCTA() {
  return (
    <Box sx={{ mb: { xs: 2, md: 3 } }}>  {/* ← wrapper sin Reveal, solo para el spacing */}
      <Reveal from="up">
        <Box sx={{
          py: { xs: 6, md: 8 },
          px: { xs: 3, md: 8 },
          textAlign: "center",
          borderRadius: 4,
          border: "1px solid rgba(214,198,161,0.15)",
          background: "linear-gradient(135deg, rgba(214,198,161,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(12px)",
        }}>
          <Typography variant="h4" component="h2"
            sx={{ color: "#fff", fontWeight: 500, mb: 2, fontSize: { xs: 24, md: 32 }, letterSpacing: 0.5 }}>
            Ready to travel in style?
          </Typography>
          <Typography sx={{ color: "var(--text-secondary)", mb: 4, fontSize: { xs: 15, md: 17 }, maxWidth: 520, mx: "auto", lineHeight: 1.7 }}>
            Book your private chauffeur in Ibiza today — fast, easy and available 24/7 via WhatsApp.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
            <Button component={RouterLink} to="/request" variant="contained"
              sx={{ backgroundColor: "var(--sand-primary)", color: "#111", px: 5, py: 1.4, fontWeight: 700, fontSize: 15, minWidth: 200, "&:hover": { backgroundColor: "var(--sand-secondary)" } }}>
              REQUEST A RIDE
            </Button>
            <WhatsAppButton />
          </Stack>
        </Box>
      </Reveal>
    </Box>
  );
}

/* ── Hero ── */
function HeroSection() {
  const videoRef = useRef(null);
  const videoSrc = useMediaSrc("/HeroMobile1.mp4", "/Hero1080p.mp4");
  const posterSrc = useMediaSrc("/hero-poster-mobile.jpg", "/hero-poster.jpg");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.setAttribute("webkit-playsinline", "");
    const tryPlay = () => video.play().catch(() => {});
    video.load();
    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true });
    return () => document.removeEventListener("touchstart", tryPlay);
  }, [videoSrc]);

  return (
    <Box sx={{ position: "relative", height: { xs: "80vh", sm: "90vh", md: "100vh" }, display: "flex", alignItems: "center", overflow: "hidden", mt: 0, pt: 0 }}>
      <Box sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 0 }}>
        <Box ref={videoRef} component="video" autoPlay loop muted playsInline preload="auto"
          src={videoSrc} poster={posterSrc}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.78) contrast(1.12) saturate(0.65)", backgroundColor: "rgba(0,0,0,0.68)" }}
        />
      </Box>
      <Box sx={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)", zIndex: 1 }} />
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2, textAlign: "center", py: { xs: 5, md: 6 }, pt: { xs: 11, md: 13 } }}>
        <Typography component="h1" sx={{ position: "absolute", width: 1, height: 1, p: 0, m: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
          CoreLuxuryCar
        </Typography>
        <Reveal from="down" delay={0.5}>
          <Box component="img" src="/LOGO_cropped.svg" alt="CoreLuxuryCar – Luxury Chauffeur Service Ibiza"
            sx={{ width: { xs: "88%", sm: "620px", md: "740px" }, maxWidth: "94vw", height: "auto", display: "block", mx: "auto", mb: { xs: 2, sm: 2.5 }, filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.45))" }}
          />
        </Reveal>
        <Reveal from="right" delay={0.3}>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", mt: 1.1, fontSize: { xs: 15.5, sm: 18 }, letterSpacing: 0.8 }}>
            Luxury Chauffeur Service in Ibiza – Private Airport Transfers & VIP Transport
          </Typography>
        </Reveal>
        <Reveal from="up" delay={0.3}>
          <Typography sx={{ color: "var(--text-secondary)", mt: 1.4, fontSize: { xs: 16.5, sm: 18 } }}>
            Private airport transfers, VIP rides and premium transport across Ibiza — fast booking via WhatsApp or via form.
          </Typography>
        </Reveal>
        <Reveal from="up" delay={0.3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center" mt={3}>
            <Button component={RouterLink} to="/request" variant="contained"
              sx={{ backgroundColor: "var(--sand-primary)", color: "#111", px: 4, py: 1.2, "&:hover": { backgroundColor: "var(--sand-secondary)" }, fontWeight: 700, minWidth: 200 }}>
              REQUEST A RIDE
            </Button>
            <WhatsAppButton />
          </Stack>
          <Typography component="a" href={`tel:${import.meta.env.VITE_PHONE_NUMBER}`}
            sx={{ display: "block", mt: 2.5, color: "rgba(255,255,255,0.55)", fontSize: 14, letterSpacing: 1.5, textDecoration: "none", transition: "color 0.2s", "&:hover": { color: "var(--sand-primary)" } }}>
            or call us · +{import.meta.env.VITE_PHONE_NUMBER}
          </Typography>
        </Reveal>
      </Container>
    </Box>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <Box sx={{ backgroundColor: "var(--bg-primary)", overflowX: "hidden" }}>
      <SEO
        title="Luxury Chauffeur Service in Ibiza"
        description="CoreLuxuryCar provides premium chauffeur services in Ibiza: private airport transfers, VIP transport and luxury rides. Fast booking via WhatsApp."
      />
      <HeroSection />
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Box sx={{ pt: { xs: 6, md: 8} }}>
          <Reveal from="up" delay={0.3}>
            <Typography sx={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 16 }}>
              CoreLuxuryCar provides luxury chauffeur services in Ibiza, specializing in private
              airport transfers from Ibiza Airport (IBZ), VIP transport and private driver services
              with premium Mercedes V-Class experiences.
              <br /><br />
              Ideal for luxury hotel transfers, yacht marina pickups, events and tailored island
              tours — with punctuality, discretion and first-class comfort across Ibiza.
            </Typography>
          </Reveal>
        </Box>

        <HowItWorks />

        <Section title="Why choose CoreLuxuryCar – Private Chauffeur in Ibiza" subtitle="Premium transport in Ibiza designed for comfort, privacy and reliability.">
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
                <Box component="picture" sx={{ display: "block", width: "100%" }}>
                  <source srcSet="/interni.webp" type="image/webp" />
                  <Box component="img" src="/interni.png" alt="Luxury Mercedes V-Class interior Ibiza chauffeur service" loading="lazy"
                    sx={{ width: "100%", height: { xs: 260, md: 420 }, objectFit: "cover", borderRadius: 4, display: "block", boxShadow: "0 20px 40px rgba(0,0,0,0.55)" }} />
                </Box>
              </Reveal>
            </Box>
          </Stack>
        </Section>

        <Section title="Ibiza Airport Transfers & Island-Wide Private Transport" subtitle="Airport pickups, hotel transfers, villas, marinas and tailored routes.">
          <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems="center">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="left" delay={0.3}>
                <Box component="picture" sx={{ display: "block", width: "100%" }}>
                  <source srcSet="/esvedra.webp" type="image/webp" />
                  <Box component="img" src="/esvedra.png" alt="Luxury Mercedes V-Class near Es Vedra" loading="lazy"
                    sx={{ width: "100%", height: { xs: 260, md: 420 }, objectFit: "cover", borderRadius: 4, display: "block", boxShadow: "0 20px 40px rgba(0,0,0,0.55)" }} />
                </Box>
              </Reveal>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="right" delay={0.3}>
                <Stack spacing={3}>
                  <InfoCard title="Service area" body="Ibiza (Eivissa) — including Ibiza Airport, Ibiza Town, San Antonio, Santa Eulalia, marinas and villa areas." />
                  <InfoCard title="Availability" body="Flexible scheduling for transfers and private rides. Contact us anytime to check availability and rates." />
                </Stack>
              </Reveal>
            </Box>
          </Stack>
        </Section>

        <Section title="Licensed Professional Chauffeur Service in Ibiza" subtitle="We operate with a professional, safety-first approach.">
          <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems="center">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="left" delay={0.3}>
                <Stack spacing={3}>
                  <InfoCard title="Professional operations" body="Professional chauffeur service with clear booking, pickup coordination and customer support." />
                  <InfoCard title="Transparent service" body="Clear communication on pickup details, luggage, timing and route preferences — tailored to your trip." />
                  <InfoCard title="Key Features" body={
                    <>
                      <Typography variant="body2" sx={{ mb: 1 }}>Our premium chauffeur services include:</Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        <Box component="li">Private Ibiza Airport Transfers (IBZ)</Box>
                        <Box component="li">Professional Private Driver Ibiza (Hourly / Daily)</Box>
                        <Box component="li">Yacht & Marina Transfers in Ibiza</Box>
                        <Box component="li">VIP Events & Night Chauffeur Services</Box>
                      </Box>
                    </>
                  } />
                </Stack>
              </Reveal>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Reveal from="right" delay={0.3}>
                <Box component="picture" sx={{ display: "block", width: "100%" }}>
                  <source srcSet="/daltvila.webp" type="image/webp" />
                  <Box component="img" src="/daltvila.png" alt="Professional chauffeur opening Mercedes V-Class door in Ibiza"
                    sx={{ width: "100%", height: { xs: 260, md: 420 }, objectFit: "cover", borderRadius: 4, display: "block", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", filter: "brightness(0.95) contrast(1.05)" }} />
                </Box>
              </Reveal>
            </Box>
          </Stack>
        </Section>

        <FinalCTA />

      </Container>
    </Box>
  );
}