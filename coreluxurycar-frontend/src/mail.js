import emailjs from "@emailjs/browser";

export function sendEmail({ name, phone, email, pickup, dropoff, date, hour, type, psg, lg, cs, pet, note }) {
  const childs = cs ? "Yes" : "No";
  const pets = pet ? "Yes" : "No";

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name,
      phone,
      email,
      pickup,
      dropoff,
      date,
      hour,
      type,
      psg,
      lg,
      child: childs,
      pets,
      note,
    },
    {
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    }
  );
}
