import './style.css'

import { useEffect, useState } from 'react';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const almacenados = localStorage.getItem('favoritos');
    if (almacenados) {
      setFavoritos(JSON.parse(almacenados));
    }
  }, []);

  return (
    <section className='c-lista'>
      <h2>Consejos Favoritos</h2>
      {favoritos.map((item, index) => (
        <div key={index} className='c-lista-consejo'>
          <p>{item.advice}</p>
        </div>
      ))}
    </section>
  );
}

export default Favoritos;
