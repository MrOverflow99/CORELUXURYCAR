import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Switch,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { useConsent } from "./ConsentContext";

const MotionBox = motion.create(Box);

function Row({ title, desc, value, disabled, onChange }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between" sx={{ py: 1.4 }}>
      <Box sx={{ pr: 2, flex: 1 }}>
        <Typography sx={{ color: "var(--sand-primary)", fontWeight: 600, mb: 0.4 }}>{title}</Typography>
        <Typography sx={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>{desc}</Typography>
      </Box>
      <Switch checked={value} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />
    </Stack>
  );
}

export default function CookieSettingsModal() {
  const { isSettingsOpen, closeSettings, prefs, savePrefs, setAll } = useConsent();

  const [localAnalytics, setLocalAnalytics] = useState(prefs.analytics);
  const [localMarketing, setLocalMarketing] = useState(prefs.marketing);

  // Keep UI in sync when modal opens
  useEffect(() => {
    if (isSettingsOpen) {
      setLocalAnalytics(prefs.analytics);
      setLocalMarketing(prefs.marketing);
    }
  }, [isSettingsOpen, prefs.analytics, prefs.marketing]);

  const canSave = useMemo(
    () => localAnalytics !== prefs.analytics || localMarketing !== prefs.marketing,
    [localAnalytics, localMarketing, prefs.analytics, prefs.marketing]
  );

  return (
    <Dialog
      open={isSettingsOpen}
      onClose={closeSettings}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "rgba(10,10,10,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 3,
          boxShadow: "0 22px 60px rgba(0,0,0,0.65)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1.2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography sx={{ color: "var(--sand-primary)", fontWeight: 700 }}>
            Cookie preferences
          </Typography>
          <IconButton onClick={closeSettings} size="small" sx={{ color: "rgba(255,255,255,0.75)" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <MotionBox
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Typography sx={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: 14, mb: 2 }}>
            You can decide how we use cookies. Necessary cookies are always enabled to ensure the website functions
            properly. Learn more in our{" "}
            <Box
              component={RouterLink}
              to="/cookies"
              sx={{
                color: "var(--sand-primary)",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={closeSettings}
            >
              Cookies Policy
            </Box>
            .
          </Typography>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Row
            title="Necessary"
            desc="Required for core functionality and security. Always enabled."
            value={true}
            disabled
          />

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Row
            title="Analytics"
            desc="Helps us understand how the website is used to improve performance and content."
            value={localAnalytics}
            onChange={setLocalAnalytics}
          />

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Row
            title="Marketing"
            desc="Used to measure campaigns and deliver more relevant offers. We recommend keeping it off unless you agree."
            value={localMarketing}
            onChange={setLocalMarketing}
          />

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ pt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setAll("reject_all");
                closeSettings();
              }}
              sx={{
                borderColor: "rgba(255,255,255,0.18)",
                color: "var(--text-primary)",
                "&:hover": { borderColor: "rgba(255,255,255,0.32)" },
                borderRadius: 999,
              }}
            >
              Reject all
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setAll("accept_all");
                closeSettings();
              }}
              sx={{
                borderColor: "rgba(255,255,255,0.18)",
                color: "var(--text-primary)",
                "&:hover": { borderColor: "rgba(255,255,255,0.32)" },
                borderRadius: 999,
              }}
            >
              Accept all
            </Button>

            <Box sx={{ flex: 1 }} />

            <Button
              variant="contained"
              disabled={!canSave}
              onClick={() => {
                savePrefs({ analytics: localAnalytics, marketing: localMarketing });
                closeSettings();
              }}
              sx={{
                backgroundColor: "rgba(201, 168, 118, 0.95)",
                color: "#111",
                "&:hover": { backgroundColor: "rgba(201, 168, 118, 1)" },
                borderRadius: 999,
                fontWeight: 800,
                px: 2.6,
                opacity: canSave ? 1 : 0.6,
              }}
            >
              Save preferences
            </Button>
          </Stack>
        </MotionBox>
      </DialogContent>
    </Dialog>
  );
}
