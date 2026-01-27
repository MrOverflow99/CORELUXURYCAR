import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Typography, Button } from '@mui/material'

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" sx={{ color: 'var(--sand-primary)', fontWeight: 500, letterSpacing: 1 }}>
          Core Luxury Car
        </Typography>
        <Typography sx={{ color: 'var(--text-secondary)', mt: 2, fontSize: 18 }}>
          Luxury chauffeur service in Ibiza — request your ride in minutes.
        </Typography>

        <Button
          component={RouterLink}
          to="/request"
          variant="contained"
          sx={{ mt: 4, backgroundColor: 'var(--sand-primary)', color: '#111', '&:hover': { backgroundColor: 'var(--sand-secondary)' } }}
        >
          REQUEST A RIDE
        </Button>
      </Container>
    </Box>
  )
}
