import React from "react";
import { Box, Button, Container, Stack, Typography, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { useConsent } from "./ConsentContext";

const MotionBox = motion.create(Box);

export default function CookieBanner() {
  const { hasDecision, setAll, openSettings } = useConsent();

  return (
    <AnimatePresence>
      {!hasDecision && (
        <MotionBox
          key="cookie-banner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45 }}
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1400,
            pb: { xs: 2, md: 3 },
            px: { xs: 1.5, md: 2 },
          }}
        >
          <Container maxWidth="lg">
            <Card
              sx={{
                backgroundColor: "rgba(10,10,10,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
              }}
            >
              <CardContent sx={{ py: 2.2, px: { xs: 2, md: 2.5 } }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ color: "var(--sand-primary)", fontWeight: 600, mb: 0.5 }}>
                      Cookies & privacy
                    </Typography>
                    <Typography sx={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: 14 }}>
                      We use necessary cookies to make the site work. With your consent, we may also use analytics and
                      marketing cookies to improve your experience. Read more in our{" "}
                      <Box
                        component={RouterLink}
                        to="/cookies"
                        sx={{
                          color: "var(--sand-primary)",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Cookies Policy
                      </Box>
                      .
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ flexShrink: 0 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setAll("reject_all")}
                      sx={{
                        borderColor: "rgba(255,255,255,0.18)",
                        color: "var(--text-primary)",
                        "&:hover": { borderColor: "rgba(255,255,255,0.32)" },
                        borderRadius: 999,
                        px: 2.2,
                      }}
                    >
                      Reject
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={openSettings}
                      sx={{
                        borderColor: "rgba(255,255,255,0.18)",
                        color: "var(--text-primary)",
                        "&:hover": { borderColor: "rgba(255,255,255,0.32)" },
                        borderRadius: 999,
                        px: 2.2,
                      }}
                    >
                      Settings
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => setAll("accept_all")}
                      sx={{
                        backgroundColor: 'var(--sand-primary)', 
                        color: "#111",
                        "&:hover": { backgroundColor: 'var(--sand-secondary)' },
                        borderRadius: 999,
                        px: 2.4,
                        fontWeight: 700,
                      }}
                    >
                      Accept all
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
