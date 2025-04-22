import { Link } from 'react-router-dom'

import './style.css'

function Menu() {

  return (
    <nav className='c-menu'>
      <Link to="./aleatorios">Aleatorio</Link>
      <Link to="./detalle">Detalle</Link>
      <Link to="./favoritos">Favorito</Link>
      <Link to="./listar">Listar</Link>
      <Link to="./original">Original</Link>
      <Link to="./usuario">Usuario</Link>
    </nav>
  )
}

export default Menu