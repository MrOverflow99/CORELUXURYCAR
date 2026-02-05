import emailjs from "@emailjs/browser";

export function sendEmail({ name,phone,email,pickup,dropoff,date,hour,type,psg,lg,cs,note}) {

    var childs = 'No'


    if(cs){ 
      childs = 'Yes'
    }

   

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name: name,
      phone: phone,
      email: email,
      pickup: pickup,    
      dropoff: dropoff, 
      date: date,
      hour : hour,
      type: type,
      psg : psg,
      lg: lg,
      child: childs,
      note: note
    },
    {
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    }
  );
}

