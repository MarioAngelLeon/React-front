import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Simulacion from './components/simulacion'
import Onboarding from './components/onboarding'
import Desmbolso from './components/desembolso'
import Aprobacion from './components/aprobacion'
import Pagos from './components/pagos'
import Usuario from './components/usuario'
import Reportes from './components/reportes'
import Explotacion from './components/explotacion'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Simulacion />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/aprobacion" element={<Aprobacion />} />
        <Route path="/desembolso" element={<Desmbolso />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/explotacion" element={<Explotacion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
