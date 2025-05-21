import React, { useState } from "react";

function Listar({ consejos, onSearch, onAgregarFavorito, onQuitarFavorito, favoritos = [] }) {
  const [busqueda, setBusqueda] = useState('');
  const keywords = ['life', 'love', 'money', 'success', 'happiness'];

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(busqueda);
  };

  const handleKeywordClick = (keyword) => {
    setBusqueda(keyword);
    onSearch(keyword);
  };

  const esFavorito = (id) => favoritos.some(fav => fav.id === id);

  const toggleFavorito = (item) => {
    if (esFavorito(item.id)) {
      onQuitarFavorito(item.id);
    } else {
      onAgregarFavorito(item);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar consejo (en inglés)"
        value={busqueda}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Buscar</button>

      <div style={{ margin: '10px 0' }}>
        {keywords.map((keyword) => (
          <button
            key={keyword}
            onClick={() => handleKeywordClick(keyword)}
            style={{ marginRight: 5 }}
          >
            {keyword}
          </button>
        ))}
      </div>

      {!consejos || consejos.length === 0 ? (
        <p>No hay consejos para mostrar.</p>
      ) : (
        <ul>
          {consejos.map((item) => (
            <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <span>{item.advice}</span>
              <span
                onClick={() => toggleFavorito(item)}
                style={{
                  cursor: 'pointer',
                  marginLeft: 10,
                  fontSize: '1.5rem',
                  userSelect: 'none',
                  color: esFavorito(item.id) ? 'white' : 'gray',
                  textShadow: esFavorito(item.id) ? '0 0 5px red' : 'none',
                  transition: 'color 0.3s ease',
                }}
                role="button"
                aria-label={esFavorito(item.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                ❤️
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Listar;
