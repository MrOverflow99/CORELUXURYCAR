import { createTheme } from '@mui/material/styles'

const SAND = '#d6c6a1'
const SAND_HOVER = '#e4d6b6'
const BG = '#121212'
const BG_PAPER = '#1b1b1b'
const TEXT = '#f2f2f2'
const TEXT_2 = 'rgba(255,255,255,0.72)'

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: BG, paper: BG_PAPER },
    text: { primary: TEXT, secondary: TEXT_2 },
    primary: { main: SAND },
  },
  shape: { borderRadius: 12 },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: BG },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.03)',
          borderRadius: 12,
        },
        input: { color: TEXT },
        notchedOutline: { borderColor: 'rgba(214,198,161,0.22)' },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(214,198,161,0.45)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: SAND,
          borderWidth: 1,
        },
      },
    },

   MuiInputLabel: {
  styleOverrides: {
    root: {
      color: 'rgba(255,255,255,0.65)',
      '&.Mui-focused': {
        color: SAND,
      },
    },
  },
},

    MuiFormHelperText: {
      styleOverrides: {
        root: { color: 'rgba(255,255,255,0.55)' },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: { color: 'rgba(255,255,255,0.7)' },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: { color: 'rgba(214,198,161,0.65)' },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 12 },
        containedPrimary: {
          color: '#111',
          backgroundColor: SAND,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: { color: SAND },
      },
    },
  },
})
