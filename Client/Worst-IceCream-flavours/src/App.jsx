// import { useState } from 'react'
import './App.css'
import Landing from './components/Landing'
import Form from './components/Form'
import FormUpdate from './components/FormUpdate'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/form" element={<Form />} />
      <Route path="/update/:id" element={<FormUpdate/>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>

    </Routes>
  </BrowserRouter>
  )
}

export default App
