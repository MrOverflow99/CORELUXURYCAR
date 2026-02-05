import React from "react";
import { AppBar, Toolbar, Box, IconButton } from '@mui/material'


export default function Navbar (){

return(
    
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/testlogonavbar.png" 
            alt="Logo" 
            style={{ height: 40 }}
          />
        </Box>

        {/* Icon 
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        */}

      </Toolbar>
    </AppBar>
)
}