import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Aleatorio from './components/aleatorios';
import Filtros from './components/filtros';
import Favoritos from './components/favoritos';
import Listar from './components/listar';
import Menu from './components/menu';
import Original from './components/original';
import Usuario from './components/usuario';

import './App.css';

function App() {
  const [consejos, setConsejos] = useState([]);

  const handleSearch = async (query) => {
    if (query.trim().length < 3) {
      setConsejos([]);
      return;
    }
    try {
      const res = await fetch(`https://api.adviceslip.com/advice/search/${query}`, { cache: "no-cache" });
      const data = await res.json();
      setConsejos(data.slips || []);
    } catch (error) {
      console.error(error);
      setConsejos([]);
    }
  };

  return (
    <Router>
      <Menu />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/listar" />} />
          <Route path="/aleatorios" element={<Aleatorio />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/listar" element={<Filtros />} />
          <Route path="/original" element={<Original />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
