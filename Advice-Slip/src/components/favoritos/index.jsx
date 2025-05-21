import React from 'react';

function Favoritos({ favoritos, onQuitarFavorito }) {
  if (!favoritos || favoritos.length === 0) {
    return <p>No tienes consejos favoritos.</p>;
  }

  return (
    <ul>
      {favoritos.map((item) => (
        <li
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10,
            justifyContent: 'space-between',
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#222',
            color: '#fff',
          }}
        >
          <span>{item.advice}</span>
          <span
            onClick={() => onQuitarFavorito(item.id)}
            style={{
              cursor: 'pointer',
              marginLeft: 10,
              fontSize: '1.5rem',
              userSelect: 'none',
              color: 'white',
              textShadow: '0 0 5px red',
              transition: 'transform 0.2s ease',
            }}
            role="button"
            aria-label="Quitar de favoritos"
            title="Quitar de favoritos"
          >
            ❤️
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Favoritos;
