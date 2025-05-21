import React, { useState, useEffect } from 'react';
import { getRandomAdvice, searchAdvice } from '../../services/api';
import Listar from '../listar';
import Favoritos from '../favoritos';

export default function Filtros() {
  const [resultados, setResultados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [favoritos, setFavoritos] = useState([]);

  // Carga 10 consejos aleatorios al montar el componente
  useEffect(() => {
    const cargarAleatorios = async () => {
      const aleatorios = [];
      const ids = new Set();

      while (aleatorios.length < 10) {
        const consejo = await getRandomAdvice();
        if (!ids.has(consejo.id)) {
          ids.add(consejo.id);
          aleatorios.push(consejo);
        }
      }
      setResultados(aleatorios);
      setMensaje('');
    };

    cargarAleatorios();
  }, []);

  // Buscar por término o keyword
  const handleSearch = async (term) => {
    if (!term || term.trim().length < 3) {
      setMensaje("Escribe al menos 3 caracteres para buscar.");
      setResultados([]);
      return;
    }

    const res = await searchAdvice(term);
    if (!res || res.length === 0) {
      setMensaje("No se encontraron consejos.");
      setResultados([]);
    } else {
      setMensaje('');
      setResultados(res);
    }
  };

  // Añadir a favoritos
  const agregarFavorito = (item) => {
    setFavoritos((prev) => {
      if (prev.find(fav => fav.id === item.id)) return prev; // No duplicados
      return [...prev, item];
    });
  };

  // Quitar de favoritos
  const quitarFavorito = (id) => {
    setFavoritos((prev) => prev.filter(fav => fav.id !== id));
  };

  return (
    <div>
      {mensaje && <p>{mensaje}</p>}
      <Listar
        consejos={resultados}
        onSearch={handleSearch}
        onAgregarFavorito={agregarFavorito}
        onQuitarFavorito={quitarFavorito}
        favoritos={favoritos}
      />


      <h2>Favoritos</h2>
      <Favoritos
        favoritos={favoritos}
        onQuitarFavorito={quitarFavorito}
      />
    </div>
  );
}
