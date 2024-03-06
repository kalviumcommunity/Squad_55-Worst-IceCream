// import { useState } from 'react'
import './App.css'
import Landing from './components/Landing'
import Form from './components/Form'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
