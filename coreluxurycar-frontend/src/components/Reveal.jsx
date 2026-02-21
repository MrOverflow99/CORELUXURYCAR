import { motion } from "framer-motion";
import Box from "@mui/material/Box";

const MotionBox = motion.create(Box);

export default function Reveal({
  children,
  from = "left",       // "left" | "right" | "up" | "down"
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  amount = "some",
}) {
  const offset =
    from === "left"
      ? { x: -distance, y: 0 }
      : from === "right"
      ? { x: distance, y: 0 }
      : from === "up"
      ? { x: 0, y: -distance }
      : { x: 0, y: distance };

  return (
    <MotionBox
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // nice smooth ease-out
      }}
    >
      {children}
    </MotionBox>
  );
}
