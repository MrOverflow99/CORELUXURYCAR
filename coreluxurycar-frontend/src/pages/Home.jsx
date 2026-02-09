import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import WhatsAppButton from "../components/WhatsAppButton";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// ── Reusable reveal wrapper ────────────────────────────────────────
const MotionBox = motion(Box);

function Reveal({
  children,
  from = "left",
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
}) {
  const offset =
    from === "left"
      ? { x: -distance, y: 0 }
      : from === "right"
      ? { x: distance, y: 0 }
      : from === "up"
      ? { x: 0, y: -distance }
      : { x: 0, y: distance };

  return (
    <MotionBox
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionBox>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <Box sx={{ py: { xs: 7, md: 10 } }}>
      <Reveal from="up">
        <Typography
          variant="h4"
          sx={{ color: "var(--sand-primary)", fontWeight: 500, letterSpacing: 0.5, mb: 1 }}
        >
          {title}
        </Typography>
      </Reveal>

      {subtitle && (
        <Reveal from="up" delay={0.05}>
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
    <Card
      sx={{
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ color: "var(--sand-primary)", mb: 1, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const desktopVideo = "/Hero4K_4K.mp4";         
  const mobileVideo  = "/HeroMobile1.mp4";

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: '80vh', sm: '90vh', md: '100vh' },  
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        mt: 0,
        pt: 0,
      }}
    >
<Box
  component="video"
  autoPlay
  loop
  muted
  playsInline
  key={isMobile ? 'mobile-video' : 'desktop-video'} 
  sx={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    objectFit: "contain",
    filter: "brightness(0.78) contrast(1.12) saturate(0.65)",
    inset: 0,
    background: "rgba(0, 0, 0, 0.68)",
    zIndex: 0,
  }}
>
  <source src={isMobile ? mobileVideo : desktopVideo} type="video/mp4" />
</Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.52)", 
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,                   
          textAlign: "center",
          py: 8,
        }}
      >
        <Reveal from="left">
          <Typography
            variant="h2"
            sx={{ color: "var(--sand-primary)", fontWeight: 500, letterSpacing: 1,
              fontSize: { 
                xs: '2.4rem',     
                sm: '3.2rem',    
                md: '4.5rem',     
              },
             }}
          >
            CoreLuxuryCar
          </Typography>
        </Reveal>

        <Reveal from="right" delay={0.08}>
          <Typography sx={{ color: "var(--text-secondary)", mt: 2, fontSize: 18 }}>
            This webpage is still under development. We are COREstructing for you.
          </Typography>
        </Reveal>

        <Reveal from="up" delay={0.16}>
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            mt={4}
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

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "var(--bg-primary)" }}>
      <HeroSection />

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        {/* WHY US */}
        <Section title="Why us?" subtitle="Lorem Ipsum">
          <Grid container spacing={3}>
            {[
              { title: "Premium fleet", body: "Top-tier vehicles, always clean and ready (placeholder)." },
              { title: "Professional chauffeurs", body: "Punctual, discreet, and experienced (placeholder)." },
              { title: "Fast booking", body: "Request in minutes, confirm quickly (placeholder)." },
            ].map((c, i) => (
              <Grid item xs={12} md={4} key={c.title}>
                <Reveal from={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
                  <InfoCard title={c.title} body={c.body} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* WHERE ARE WE */}
        <Section title="Where are we" subtitle="Lorem Ipsum">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Reveal from="left">
                <InfoCard
                  title="Location"
                  body="Ibiza, Spain (placeholder). Add address + map later."
                />
              </Reveal>
            </Grid>
            <Grid item xs={12} md={6}>
              <Reveal from="right" delay={0.08}>
                <InfoCard
                  title="Availability"
                  body="24/7 service (placeholder). Replace with your real schedule."
                />
              </Reveal>
            </Grid>
          </Grid>
        </Section>

        {/* LICENSE */}
        <Section title="Our license" subtitle="Lorem Ipsum">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Reveal from="left">
                <InfoCard title="License ID" body="CLC-IBZ-00123 (placeholder)" />
              </Reveal>
            </Grid>
            <Grid item xs={12} md={8}>
              <Reveal from="right" delay={0.08}>
                <InfoCard
                  title="Compliance"
                  body="We operate under local regulations and provide documentation on request (placeholder)."
                />
              </Reveal>
            </Grid>
          </Grid>
        </Section>
      </Container>
    </Box>
  );
}