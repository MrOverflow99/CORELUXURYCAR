import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'

import Home from './pages/Home.jsx'
import Request from './pages/Request.jsx'
import Thanks from './pages/Thanks.jsx'
import Privacy from './pages/Privacy.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <Box sx= {{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Box sx = {{flex: 1}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<Request />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      
      <Footer/>
    </Box>
  )
}
