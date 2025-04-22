import { useState } from "react";
import { searchAdvice, getRandomAdvice } from "../../services/api"; // asegúrate de tener este archivo

function Listar() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [favoritos, setFavoritos] = useState(() => {
    const almacenados = localStorage.getItem('favoritos');
    return almacenados ? JSON.parse(almacenados) : [];
  });
  
  const agregarAFavoritos = (consejo) => {
    const yaExiste = favoritos.some(fav => fav.id === consejo.id);
    if (!yaExiste) {
      const nuevosFavoritos = [...favoritos, consejo];
      setFavoritos(nuevosFavoritos);
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    }
  };
  
  const handleSearch = async () => {
    if (busqueda.trim().length < 3) {
      setMensaje("Escribe al menos 3 caracteres para buscar.");
      return;
    }

    const resultadosBusqueda = await searchAdvice(busqueda);
    if (resultadosBusqueda.length === 0) {
      setMensaje("No se encontraron consejos.");
    } else {
      setMensaje('');
    }

    setResultados(resultadosBusqueda);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscar consejo (en inglés)"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
      <button onClick={handleSearch}>Buscar</button>

      {mensaje && <p>{mensaje}</p>}

      <section className='c-lista'>
        {resultados.map((item, index) => (
        <div className='c-lista-consejo' key={index}>
            <p>{item.advice}</p>
            <button onClick={() => agregarAFavoritos(item)}>
            Agregar a favoritos
            </button>
        </div>
        ))}

      </section>
    </>
  );
}

export default Listar;
