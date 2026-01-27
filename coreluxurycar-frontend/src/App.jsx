import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Request from './pages/Request.jsx'
import Thanks from './pages/Thanks.jsx'
import Privacy from './pages/Privacy.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request" element={<Request />} />
      <Route path="/thanks" element={<Thanks />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
