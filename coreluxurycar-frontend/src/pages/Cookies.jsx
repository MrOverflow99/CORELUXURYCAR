import { Container, Typography, Box, Card, CardContent, Stack, Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import SEO from "../components/SEO"
import { COOKIES_POLICY_EN } from "../content/cookiesPolicyENG"
import Reveal from "../components/Reveal"

export default function Cookies() {
  return (
    <>
      <SEO title="Cookies Policy " description="Cookies Policy for CoreLuxuryCar." />

      <Box sx={{ py: { xs: 6, sm: 8 } }}>
        <Container maxWidth="md">
          <Stack spacing={1.2} sx={{ mb: 4, mt:8 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ color: "var(--sand-primary)", fontWeight: 500, mb: 1 }}
            >
              Cookies Policy
            </Typography>

            <Typography variant="body1" sx={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Information regarding the use of cookies on this website.
            </Typography>
          </Stack>

          <Reveal from="down" delay={0.3} amount="some">
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
              <Typography
                component="div"
                sx={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  fontSize: { xs: "0.98rem", sm: "1.02rem" },
                  whiteSpace: "pre-line",
                }}
              >
                {COOKIES_POLICY_EN}
              </Typography>

              <Button
                component={RouterLink}
                to="/"
                variant="outlined"
                sx={{
                  mt: 4,
                  borderColor: "rgba(214,198,161,0.4)",
                  color: "var(--sand-primary)",
                  "&:hover": {
                    borderColor: "var(--sand-primary)",
                    backgroundColor: "rgba(214,198,161,0.08)",
                  },
                }}
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
          </Reveal>  
        </Container>
      </Box>
    </>
  )
}
