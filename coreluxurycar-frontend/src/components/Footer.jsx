import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Typography, Link, Divider } from '@mui/material'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid rgba(214,198,161,0.15)',
      }}
    >
      <Container maxWidth="md">
         <Link component={RouterLink} to="/home" underline="hover" sx={{ color: 'var(--sand-primary)' }}>
              CoreLuxuryCar
            </Link>

        <Typography sx={{ color: 'var(--text-secondary)', mb: 2, mt:2}}>
          Luxury chauffeur service in <Link href="https://maps.google.com/?q=Ibiza">Ibiza</Link> — booking requests & private transfers.
        </Typography>

      

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Link component={RouterLink} to="/home" underline="hover" sx={{ color: 'var(--sand-primary)' }}>
              Home
            </Link>
            <Link component={RouterLink} to="/request" underline="hover" sx={{ color: 'var(--sand-primary)' }}>
              Request a Ride
            </Link>
            <Link component={RouterLink} to="/privacy" underline="hover" sx={{ color: 'var(--sand-primary)' }}>
              Privacy Policy
            </Link>
          </Box>

          <Typography sx={{ color: 'var(--text-secondary)', fontSize: 12 }}>
            © {year} CoreLuxuryCar. All rights reserved.
          </Typography>
        </Box>

      </Container>
    </Box>
    </>
  )
}
