import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cliente from './components/cliente'
import Prestamo from './components/prestamo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cliente />} />
        <Route path="/prestamo" element={<Prestamo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
