import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box } from "@mui/material";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"     
      elevation={scrolled ? 3 : 0}
      sx={{
        backgroundColor: scrolled
          ? "rgba(17, 17, 17, 0.92)"    
          : "transparent",
        backdropFilter: scrolled ? "blur(px)" : "none",
        transition: "all 0.4s ease",
        boxShadow: scrolled ? "0 4px 18px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: { xs: 60, sm: 68 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/testlogonavbar.png"
            alt="CoreLuxuryCar"
            style={{
              height: scrolled ? 38 : 48, 
              transition: "height 0.4s ease",
            }}
          />
        </Box>

      </Toolbar>
    </AppBar>
  );
}