import { Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function WhatsAppButton() {
  const phone = import.meta.env.VITE_PHONE_NUMBER?.replace(/\D/g, "");
  const message = import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      endIcon={<WhatsAppIcon sx={{ fontSize: 20 }} />}
      sx={{
        color: "var(--sand-primary)",
        borderColor: "var(--sand-primary)",
        borderWidth: "1.5px",
        px: 4,
        py: 1.2,
        fontWeight: 700,
        minWidth: 200,
        letterSpacing: 0.5,
        transition: "all 0.25s ease",
        "&:hover": {
          backgroundColor: "rgba(214,198,161,0.08)",
          borderColor: "var(--sand-secondary)",
          borderWidth: "1.5px",
          color: "var(--sand-secondary)",
        },
      }}
    >
      REQUEST VIA WHATSAPP
    </Button>
  );
}

export default WhatsAppButton;