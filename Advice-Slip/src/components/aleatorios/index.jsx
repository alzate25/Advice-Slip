import { useState } from 'react';
import './style.css';

function Aleatorio() {
  const [advice, setAdvice] = useState('');

  const obtenerConsejo = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => {
        setAdvice(data.slip.advice);
      })
      .catch(err => {
        console.error('Error al obtener el consejo:', err);
        setAdvice('No se pudo cargar el consejo.');
      });
  };

  return (
    <>
      <h1>Consejo Aleatorio</h1>
      <p>{advice || 'Haz clic en el botón para obtener un consejo.'}</p>
      <button onClick={obtenerConsejo}>Obtener Consejo</button>
    </>
  );
}

export default Aleatorio;
