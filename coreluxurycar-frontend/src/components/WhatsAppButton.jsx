import {Button} from  '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function WhatsAppButton (){

    const phone = import.meta.env.VITE_PHONE_NUMBER;
    const message = import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE;


    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    return (
    <Button
      sx={{
        color: "#111",
        px: 4,
        py: 1.2,
        fontWeight: 700
      }}
      variant="contained"
      color="success"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<WhatsAppIcon/>}
    >
    REQUEST VIA WHATSAPP
    </Button>
    )


}

export default WhatsAppButton;