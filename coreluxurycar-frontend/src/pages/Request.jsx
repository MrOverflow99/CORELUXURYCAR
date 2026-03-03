import { useMemo, useState, forwardRef, useRef } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { sendEmail } from '../mail'
import Grid from '@mui/material/Grid'
import CloseIcon from '@mui/icons-material/Close'
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import Reveal from '../components/Reveal'

import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Button,
  Divider,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Slide,
  IconButton,
} from '@mui/material'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  tripType: '',
  passengers: '',
  luggage: '',
  childSeat: false,
  pet: false,
  notes: '',
  acceptPrivacy: false,
}

const TransitionUp = forwardRef(function TransitionUp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Request() {
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('Failed to send email. Please try again.')
  const [submitted, setSubmitted] = useState(false)
  const privacyRef = useRef(null)

  const errors = useMemo(() => {
    const e = {}

    if (!form.fullName.trim()) e.fullName = 'Required'

    // Consolidated email validation — single if/else chain, no order dependency
    if (!form.email.trim()) {
      e.email = 'Required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'Invalid email'
    }

    // Phone is optional — only validate format if provided
    if (form.phone && !matchIsValidTel(form.phone)) {
      e.phone = 'Invalid phone number'
    }

    if (!form.pickup.trim()) e.pickup = 'Required'
    if (!form.dropoff.trim()) e.dropoff = 'Required'
    if (!form.date) e.date = 'Required'
    if (!form.time) e.time = 'Required'
    if (!form.tripType) e.tripType = 'Required'

    if (form.passengers === '' || form.passengers === null || form.passengers === undefined)
      e.passengers = 'Required'
    if (form.luggage === '' || form.luggage === null || form.luggage === undefined)
      e.luggage = 'Required'

    if (!form.acceptPrivacy) e.acceptPrivacy = 'You must accept the privacy policy'

    return e
  }, [form])


  const hasError = (field) => Boolean(submitted || (touched[field] && errors[field]))

  const onChange = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onBlur = (key) => () => setTouched((prev) => ({ ...prev, [key]: true }))

  const markAllTouched = () => {
    const all = {}
    Object.keys(initialForm).forEach((k) => (all[k] = true))
    setTouched(all)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    markAllTouched()

    if (Object.keys(errors).length > 0) {
      if (errors.acceptPrivacy) {
        scrollToPrivacy()
      }
      return
    }

    setSubmitting(true)

    try {
      await sendEmail({
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        pickup: form.pickup,
        dropoff: form.dropoff,
        date: form.date,
        hour: form.time,
        type: form.tripType,
        psg: form.passengers,
        lg: form.luggage,
        cs: form.childSeat,
        pet: form.pet,
        note: form.notes,
      })

      setSuccessOpen(true)
      setForm(initialForm)
      setTouched({})
      setSubmitted(false)
    } catch (err) {
      console.error(err)
      setErrorMsg('Failed to send email. Please try again.')
      setErrorOpen(true)
    } finally {
      setSubmitting(false)
    }
  }

  const scrollToPrivacy = () => {
    if (privacyRef.current) {
      privacyRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', py: 6, mt: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ color: 'var(--sand-primary)', mb: 1, fontWeight: 500 }}>
          Request a Ride
        </Typography>

        <Typography sx={{ color: 'var(--text-secondary)', mb: 3 }}>
          Luxury chauffeur service in Ibiza. Fill in the trip details and we'll confirm availability.
        </Typography>

        <Reveal from="down" delay={0.3}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid rgba(214,198,161,0.15)',
            }}
          >
            <Box component="form" autoComplete="on" onSubmit={handleSubmit}>
              {/* CONTACT */}
              <Typography sx={{ color: 'var(--text-primary)', fontWeight: 600, mb: 1 }}>
                Contact details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Full name"
                    value={form.fullName}
                    onChange={onChange('fullName')}
                    onBlur={onBlur('fullName')}
                    error={hasError('fullName')}
                    helperText={hasError('fullName') ? errors.fullName : ' '}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <MuiTelInput
                    fullWidth
                    label="Phone (WhatsApp)"
                    defaultCountry="ES"
                    value={form.phone}
                    onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                    onBlur={onBlur('phone')}
                    error={hasError('phone')}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 48 * 8,
                          mt: 1,
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--sand-primary)',
                          borderRadius: 2,
                        },
                      },
                    }}
                    helperText={hasError('phone') ? errors.phone : ' '}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={form.email}
                    onChange={onChange('email')}
                    onBlur={onBlur('email')}
                    error={hasError('email')}
                    helperText={hasError('email') ? errors.email : ' '}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />

              {/* TRIP */}
              <Typography sx={{ color: 'var(--text-primary)', fontWeight: 600, mb: 1 }}>
                Trip details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Pickup location"
                    placeholder="e.g., Ibiza Airport (IBZ), Hotel name, address..."
                    value={form.pickup}
                    onChange={onChange('pickup')}
                    onBlur={onBlur('pickup')}
                    error={hasError('pickup')}
                    helperText={hasError('pickup') ? errors.pickup : ' '}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Dropoff location"
                    placeholder="e.g., Marina Botafoch, Sant Antoni, etc."
                    value={form.dropoff}
                    onChange={onChange('dropoff')}
                    onBlur={onBlur('dropoff')}
                    error={hasError('dropoff')}
                    helperText={hasError('dropoff') ? errors.dropoff : ' '}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    InputLabelProps={{ shrink: true }}
                    value={form.date}
                    onChange={onChange('date')}
                    onBlur={onBlur('date')}
                    error={hasError('date')}
                    helperText={hasError('date') ? errors.date : ' '}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Time"
                    InputLabelProps={{ shrink: true }}
                    value={form.time}
                    onChange={onChange('time')}
                    onBlur={onBlur('time')}
                    error={hasError('time')}
                    helperText={hasError('time') ? errors.time : ' '}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth error={hasError('tripType')}>
                    <InputLabel>Trip type</InputLabel>
                    <Select
                      value={form.tripType}
                      label="Trip type"
                      onChange={onChange('tripType')}
                      onBlur={onBlur('tripType')}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            mt: 1,
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--sand-primary)',
                            borderRadius: 2,
                          },
                        },
                      }}
                    >
                      <MenuItem value="one_way">One-way</MenuItem>
                      <MenuItem value="return">Return</MenuItem>
                    </Select>
                    <FormHelperText>{hasError('tripType') ? errors.tripType : ' '}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth error={hasError('passengers')}>
                    <InputLabel>Passengers</InputLabel>
                    <Select
                      value={form.passengers}
                      label="Passengers"
                      onChange={onChange('passengers')}
                      onBlur={onBlur('passengers')}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 48 * 8,
                            mt: 1,
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--sand-primary)',
                            borderRadius: 2,
                          },
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select number of passengers</em>
                      </MenuItem>
                      {[...Array(27)].map((_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{hasError('passengers') ? errors.passengers : ' '}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth error={hasError('luggage')}>
                    <InputLabel>Luggages</InputLabel>
                    <Select
                      value={form.luggage}
                      label="Luggage"
                      onChange={onChange('luggage')}
                      onBlur={onBlur('luggage')}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 48 * 8,
                            mt: 1,
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--sand-primary)',
                            borderRadius: 2,
                          },
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select number of Luggages</em>
                      </MenuItem>
                      {[...Array(21)].map((_, i) => (
                        <MenuItem key={i} value={i}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{hasError('luggage') ? errors.luggage : ' '}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    control={<Checkbox checked={form.childSeat} onChange={onChange('childSeat')} />}
                    label="Child seat required"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    control={<Checkbox checked={form.pet} onChange={onChange('pet')} />}
                    label="Traveling with a Pet"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Notes (optional)"
                    multiline
                    minRows={3}
                    value={form.notes}
                    onChange={onChange('notes')}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />

              {/* PRIVACY */}
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.10)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                }}
              >
                <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 600, mb: 0.6 }}>
                  Data protection summary
                </Typography>

                <Typography sx={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.75 }}>
                  <b>Controller:</b> CoreLuxuryCar. <br />
                  <b>Purpose:</b> Handle your booking request and contact you to confirm availability and provide a quote. <br />
                  <b>Legal basis:</b> Your consent (Art. 6(1)(a) GDPR). <br />
                  <b>Recipients:</b> Data is processed by EmailJS (email delivery provider) to send your request. No data is sold or shared for marketing purposes. <br />
                  <b>Rights:</b> Access, rectification, erasure, objection, restriction and portability.
                </Typography>

                <Typography sx={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.75, mt: 1 }}>
                  More details in our{' '}
                  <Link
                    component={RouterLink}
                    to="/privacy"
                    underline="hover"
                    sx={{ fontWeight: 800, color: 'var(--sand-primary)' }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </Typography>
              </Box>

              <Box ref={privacyRef}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.acceptPrivacy}
                      onChange={onChange('acceptPrivacy')}
                      onBlur={onBlur('acceptPrivacy')}
                    />
                  }
                  label={
                    <span>
                      I have read and accept the{' '}
                      <Link component={RouterLink} to="/privacy" underline="hover" sx={{ fontWeight: 700 }}>
                        Privacy Policy
                      </Link>{' '}
                      to process my request.
                    </span>
                  }
                />
                {hasError('acceptPrivacy') && (
                  <Typography sx={{ color: '#ff8a80', fontSize: 12, mt: -0.5 }}>
                    {errors.acceptPrivacy}
                  </Typography>
                )}
              </Box>

              {/* ACTIONS */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting || !form.acceptPrivacy}
                  sx={{
                    backgroundColor: 'var(--sand-primary)',
                    color: '#111',
                    '&:hover': { backgroundColor: 'var(--sand-secondary)' },
                    fontWeight: 700,
                    opacity: submitting || !form.acceptPrivacy ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Sending...' : 'Send request'}
                </Button>

                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/"
                  sx={{
                    borderColor: 'rgba(214,198,161,0.6)',
                    color: 'var(--sand-primary)',
                    '&:hover': { borderColor: 'var(--sand-primary)' },
                  }}
                >
                  Back to Home
                </Button>
              </Box>

              <Typography sx={{ color: 'var(--text-secondary)', mt: 2, fontSize: 12 }}>
                This form is for booking requests. We will confirm availability and final price after review.
              </Typography>
            </Box>
          </Paper>
        </Reveal>

        {/* SUCCESS DIALOG */}
        <Dialog
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          TransitionComponent={TransitionUp}
          keepMounted
          PaperProps={{
            sx: {
              borderRadius: 3,
              backgroundColor: 'rgba(16,16,16,0.92)',
              border: '1px solid rgba(214,198,161,0.20)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
              overflow: 'hidden',
              minWidth: { xs: '92vw', sm: 520 },
            },
          }}
          BackdropProps={{ sx: { backgroundColor: 'rgba(0,0,0,0.62)' } }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1.2} alignItems="center">
                <CheckCircleOutlineRoundedIcon sx={{ color: 'var(--sand-primary)' }} />
                <Typography sx={{ color: 'var(--sand-primary)', fontWeight: 600 }}>Request sent</Typography>
              </Stack>
              <IconButton onClick={() => setSuccessOpen(false)} sx={{ color: 'rgba(255,255,255,0.65)' }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Typography sx={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              We received your booking request. We'll contact you shortly to confirm the details.
            </Typography>

            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.10)',
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
            >
              <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>
                Thank you for choosing CoreLuxuryCar.
              </Typography>
              <Typography sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
                You can return to the homepage whenever you're ready.
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, pt: 1.5 }}>
            <Button
              variant="contained"
              onClick={() => {
                setSuccessOpen(false)
                navigate('/')
              }}
              sx={{
                backgroundColor: 'var(--sand-primary)',
                color: '#111',
                fontWeight: 700,
                px: 2.2,
                '&:hover': { backgroundColor: 'var(--sand-secondary)' },
              }}
            >
              Back to Home
            </Button>
          </DialogActions>
        </Dialog>

        {/* ERROR DIALOG */}
        <Dialog
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          TransitionComponent={TransitionUp}
          keepMounted
          PaperProps={{
            sx: {
              borderRadius: 3,
              backgroundColor: 'rgba(16,16,16,0.92)',
              border: '1px solid rgba(255,120,120,0.25)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
              overflow: 'hidden',
              minWidth: { xs: '92vw', sm: 520 },
            },
          }}
          BackdropProps={{ sx: { backgroundColor: 'rgba(0,0,0,0.62)' } }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1.2} alignItems="center">
                <ErrorOutlineRoundedIcon sx={{ color: 'rgba(255,120,120,0.95)' }} />
                <Typography sx={{ color: 'rgba(255,220,220,0.95)', fontWeight: 600 }}>
                  Couldn't send request
                </Typography>
              </Stack>
              <IconButton onClick={() => setErrorOpen(false)} sx={{ color: 'rgba(255,255,255,0.65)' }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Typography sx={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{errorMsg}</Typography>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, pt: 1.5 }}>
            <Button
              variant="outlined"
              onClick={() => setErrorOpen(false)}
              sx={{
                borderColor: 'rgba(214,198,161,0.35)',
                color: 'var(--sand-primary)',
                px: 2.2,
                '&:hover': { borderColor: 'rgba(214,198,161,0.65)' },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}
