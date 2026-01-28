import { Link as RouterLink } from "react-router-dom"
import { Box, Container, Typography, Button, Grid, Card, CardContent } from "@mui/material"
import { motion } from "framer-motion"

// Simple reusable reveal wrapper (in this same file)
const MotionBox = motion(Box)

function Reveal({
  children,
  from = "left", // "left" | "right" | "up" | "down"
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
      : { x: 0, y: distance }

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
  )
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
  )
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
  )
}

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "var(--bg-primary)" }}>
      {/* HERO (your original block, just wrapped in Reveal) */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
          <Reveal from="left">
            <Typography
              variant="h2"
              sx={{ color: "var(--sand-primary)", fontWeight: 500, letterSpacing: 1 }}
            >
              Core Luxury Car
            </Typography>
          </Reveal>

          <Reveal from="right" delay={0.08}>
            <Typography sx={{ color: "var(--text-secondary)", mt: 2, fontSize: 18 }}>
              Luxury chauffeur service in Ibiza — request your ride in minutes.
            </Typography>
          </Reveal>

          <Reveal from="up" delay={0.16}>
            <Button
              component={RouterLink}
              to="/request"
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: "var(--sand-primary)",
                color: "#111",
                "&:hover": { backgroundColor: "var(--sand-secondary)" },
              }}
            >
              REQUEST A RIDE
            </Button>
          </Reveal>
        </Container>
      </Box>

      {/* CONTENT BELOW HERO */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        {/* WHY US */}
        <Section
          title="Why us?"
          subtitle="Placeholder content to test scroll animations. Replace with your real copy later."
        >
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

        {/* RATINGS */}
        <Section
          title="Ratings from our customers"
          subtitle="Fake testimonials for now — just to see the effect."
        >
          <Grid container spacing={3}>
            {[
              { title: "⭐️⭐️⭐️⭐️⭐️", body: "“Perfect service, super smooth.” — Alex" },
              { title: "⭐️⭐️⭐️⭐️⭐️", body: "“On time and very professional.” — Martina" },
              { title: "⭐️⭐️⭐️⭐️⭐️", body: "“Best chauffeur in Ibiza.” — Javier" },
            ].map((c, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Reveal from={i % 2 === 0 ? "right" : "left"} delay={i * 0.08}>
                  <InfoCard title={c.title} body={c.body} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* WHERE ARE WE */}
        <Section
          title="Where are we"
          subtitle="Later you can swap this for a map embed. For now: cards."
        >
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
        <Section
          title="Our license"
          subtitle="Random body content just to test layout + animation."
        >
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
  )
}
