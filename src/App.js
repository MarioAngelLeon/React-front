import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Simulacion from './components/simulacion'
import Onboarding from './components/onboarding'
import Desmbolso from './components/desembolso'
import Aprobacion from './components/aprobacion'
import Pagos from './components/pagos'
import Usuario from './components/usuario'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
