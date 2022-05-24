import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Simulacion from './components/simulacion'
import Cliente from './components/cliente'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Simulacion />} />
        <Route path="/cliente" element={<Cliente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
