import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cliente from './components/cliente'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cliente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
