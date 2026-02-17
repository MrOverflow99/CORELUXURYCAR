import { Container, Typography, Box, Button, Stack } from "@mui/material"
import SEO from "../components/SEO"
import { PRIVACY_POLICY_EN } from "../content/privacyPolicyENG"
import { Link as RouterLink } from "react-router-dom"
import Reveal from "../components/Reveal"

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Privacy Policy (GDPR) for CoreLuxuryCar." />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack spacing={1.2} sx={{ mb: 4, mt: 8 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: "var(--sand-primary)", mb: 1, fontWeight: 500 }}
          >
            Privacy Policy
          </Typography>

          <Typography variant="body1" sx={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Transparency and trust are part of our service. Here you can find how we handle and protect your personal information.
          </Typography>
        </Stack>

        <Reveal from="down" delay={0.3}>
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 2,
              p: { xs: 2, sm: 4 },
              mt: 2,
            }}
          >
            <Typography
              component="div"
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                fontSize: { xs: "0.95rem", sm: "1rem" },
              }}
            >
              {PRIVACY_POLICY_EN}
            </Typography>

            <Button
              variant="outlined"
              component={RouterLink}
              to="/"
              sx={{
                mt: 3,
                borderColor: "rgba(214,198,161,0.6)",
                color: "var(--sand-primary)",
                "&:hover": { borderColor: "var(--sand-primary)" },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Reveal>
      </Container>
    </>
  )
}
