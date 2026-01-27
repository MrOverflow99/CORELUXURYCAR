import { Box, Container, Typography } from '@mui/material'

export default function Privacy() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ color: 'var(--sand-primary)', mb: 2 }}>
          Privacy Policy
        </Typography>
        <Typography sx={{ color: 'var(--text-secondary)' }}>
          Coming soon.
        </Typography>
      </Container>
    </Box>
  )
}
