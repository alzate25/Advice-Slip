import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Aleatorio from './components/aleatorios'
import Detalle from './components/detalle'
import Favoritos from './components/favoritos'
import Listar from './components/listar'
import Menu from './components/menu'
import Original from './components/original'
import Usuario from './components/usuario'

import './App.css'

function App() {

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/aleatorios" element={<Aleatorio />} />
        <Route path="/detalle" element={<Detalle />} />        
        <Route path="/detalle/:name" element={<Detalle />} />        
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/listar" element={<Listar />} />
        <Route path="/original" element={<Original />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </Router>
  )
}

export default App