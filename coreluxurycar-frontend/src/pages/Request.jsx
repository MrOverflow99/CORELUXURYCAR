import { useMemo, useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { sendEmail } from '../mail'
import Grid from '@mui/material/Grid'
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input'

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
} from '@mui/material'

const initialForm = {
  fullName: '',
  email: '',
  // viaMail: false,
  phone: '',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  tripType: '', // one_way | return
  passengers: '',
  luggage: '',
  // vehicle: 'sedan', // sedan | suv | van
  childSeat: false,
  pet: false,
  notes: '',
  acceptPrivacy: false,
}

export default function Request() {
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const errors = useMemo(() => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (form.phone && !matchIsValidTel(form.phone)) {
      e.phone = 'Invalid phone number'}
    if (!form.pickup.trim()) e.pickup = 'Required'
    if (!form.dropoff.trim()) e.dropoff = 'Required'
    if (!form.date) e.date = 'Required'
    if (!form.time) e.time = 'Required'
    if (!form.tripType) e.tripType = 'Required'           // stringa vuota ''
    if (!form.passengers) e.passengers = 'Required'      // numero (0 è falsey)
    if (!form.luggage && form.luggage !== 0) e.luggage = 'Required'
    if (!form.acceptPrivacy) e.acceptPrivacy = 'You must accept the privacy policy'

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'Invalid email'
    }

    return e
  }, [form])

  const hasError = (field) => Boolean(touched[field] && errors[field])

  const onChange = (key) => (event) => {
    const value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
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
    markAllTouched()

    if (Object.keys(errors).length > 0) return

    setSubmitting(true)

    try {
    await sendEmail({
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      pickup: form.pickup,    
      dropoff: form.dropoff, 
      date: form.date,
      hour : form.time,
      type: form.tripType,
      psg : form.passengers,
      lg: form.luggage,
      cs: form.childSeat,
      pet: form.pet,
      note: form.notes
    });

    alert("Email sent!");
  } catch (err) {
    console.error(err);
    alert("Failed to send email");
  }
  navigate('/thanks')

    /*
    try {
      // TODO: send to backend / email / Google Sheets
      //await new Promise((r) => setTimeout(r, 500))

      sessionStorage.setItem('coreluxurycar_last_request', JSON.stringify(form))
      navigate('/thanks')
    } finally {
      setSubmitting(false)
    }*/
  }
  

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ color: 'var(--sand-primary)', mb: 1, fontWeight: 500 }}>
          Request a Ride
        </Typography>

        <Typography sx={{ color: 'var(--text-secondary)', mb: 3 }}>
          Luxury chauffeur service in Ibiza. Fill in the trip details and we’ll confirm availability.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid rgba(214,198,161,0.15)',
          }}
        >
          <Box component="form" autoComplete='on' onSubmit={handleSubmit} >
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


              {/*}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={form.viaMail} onChange={onChange('viaMail')} />}
                  label="I prefer to be contacted via E-mail"
                />
              </Grid>

              {*/}

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

                  <FormHelperText>
                    {hasError('tripType') ? errors.tripType : ' '}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth error={hasError('passengers')}>
                  <InputLabel>Passengers</InputLabel>
                  <Select 
                   value={form.passengers} 
                   label="Passengers" 
                   onChange={onChange('passengers')}
                   error={hasError('passengers')}
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

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27].map((n) => (
                      <MenuItem key={n} value={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {hasError('passengers') ? 'Required' : ' '}
                  </FormHelperText>
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
                    error={hasError('luggage')}
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

                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((n) => (
                      <MenuItem key={n} value={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {hasError('luggage') ? 'Required' : ' '}
                  </FormHelperText>
                </FormControl>
              </Grid>

              

                    {/*}
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Vehicle preference</InputLabel>
                  <Select value={form.vehicle} label="Vehicle preference" onChange={onChange('vehicle')}>
                    <MenuItem value="sedan">Sedan</MenuItem>
                    <MenuItem value="suv">SUV</MenuItem>
                    <MenuItem value="van">Van</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
                    {*/}

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
                  I accept the{' '}
                  <Link component={RouterLink} to="/privacy" underline="hover">
                    privacy policy
                  </Link>
                  .
                </span>
              }
            />
            {hasError('acceptPrivacy') && (
              <Typography sx={{ color: '#ff8a80', fontSize: 12, mt: -0.5 }}>
                {errors.acceptPrivacy}
              </Typography>
            )}

            {/* ACTIONS */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  backgroundColor: 'var(--sand-primary)',
                  color: '#111',
                  '&:hover': { backgroundColor: 'var(--sand-secondary)' },
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
      </Container>
    </Box>
  )
}
