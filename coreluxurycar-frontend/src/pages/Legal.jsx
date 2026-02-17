import { Container, Typography, Box, Card, CardContent, Stack, Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import SEO from "../components/SEO"
import { LEGAL_NOTICE_EN } from "../content/legalNoticeENG"
import Reveal from "../components/Reveal"

export default function Legal() {
  return (
    <>
      <SEO title="Legal Notice | CoreLuxuryCar" description="Legal Notice for CoreLuxuryCar." />

      <Box sx={{ py: { xs: 6, sm: 8 } }}>
        <Container maxWidth="md">
          <Stack spacing={1.2} sx={{ mb: 4, mt:8 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ color: "var(--sand-primary)", mb: 1, fontWeight: 500}}
            >
              Legal Notice
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Legal information regarding the use of this website.
            </Typography>
          </Stack>

        <Reveal from="down" delay={0.3} amount="some">
          
          
            <Card
              sx={{
                // 
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
              }}
            >
              {/* Accent bar like the other pages */}

              <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
                <Typography
                  component="pre"
                  sx={{
                    m: 0,
                    whiteSpace: "pre-line",
                    lineHeight: 1.8,
                    color: "var(--text-secondary)",
                    fontSize: { xs: "0.98rem", sm: "1.02rem" },
                    fontFamily: "inherit",
                  }}
                >
                  {LEGAL_NOTICE_EN}
                </Typography>

                <Button
                  component={RouterLink}
                  to="/"
                  variant="outlined"
                  sx={{
                    mt: 4,
                    borderColor: "rgba(214,198,161,0.6)",
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
