import { Box, Container, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Thanks() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', py: 8 }}>
      <Container maxWidth="sm">
        <Typography variant="h3" sx={{ color: 'var(--sand-primary)', mb: 2 }}>
          Request received
        </Typography>
        <Typography sx={{ color: 'var(--text-secondary)', mb: 3 }}>
          We’ll contact you shortly to confirm availability and details.
        </Typography>
        <Button variant="outlined" component={RouterLink} to="/" sx={{ borderColor: 'var(--sand-primary)', color: 'var(--sand-primary)' }}>
          Back to Home
        </Button>
      </Container>
    </Box>
  )
}
