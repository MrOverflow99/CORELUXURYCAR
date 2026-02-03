import {Button} from  '@mui/material'

function WhatsAppButton (){

    const phone = import.meta.env.VITE_PHONE_NUMBER_TEST;
    const message = import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE;


    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    return (
    <Button
      variant="contained"
      color="success"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
    Request On WhatsApp
    </Button>
    )


}

export default WhatsAppButton;