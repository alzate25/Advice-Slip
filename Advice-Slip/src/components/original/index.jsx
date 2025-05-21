import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

import './style.css';

export default function Original() {
  const [advice, setAdvice] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [consejos, setConsejos] = useState([]);

  const handleGuardar = async () => {
    setMensaje('');
    if (!advice.trim()) {
      setMensaje('Por favor escribe un consejo.');
      return;
    }

    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMensaje('Debes iniciar sesión para guardar un consejo.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('original_advices')
      .insert({
        advice,
        user_id: user.id,
      });

    if (error) {
      setMensaje('Error al guardar el consejo.');
    } else {
      setMensaje('¡Consejo guardado con éxito!');
      setAdvice('');
      fetchConsejos(user.id);
    }
    setLoading(false);
  };

  const fetchConsejos = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('original_advices')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        setMensaje('Error al obtener consejos.');
      } else {
        setConsejos(data);
      }
    } catch (err) {
      setMensaje('Error al obtener consejos.');
    }
  };

  const handleEliminar = async (id) => {
    setMensaje('');
    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMensaje('Debes iniciar sesión para eliminar un consejo.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('original_advices')
      .delete()
      .eq('id', Number(id))  // Conversión a número
      .eq('user_id', user.id);

    if (error) {
      setMensaje(`Error al eliminar el consejo: ${error.message}`);
    } else {
      setMensaje('Consejo eliminado.');
      fetchConsejos(user.id);
    }
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        fetchConsejos(user.id);
      }
    });
  }, []);

  return (
    <div className="form-container">
      <h2>Escribe tu propio consejo</h2>
      <textarea
        placeholder="Comparte tu sabiduría aquí..."
        value={advice}
        onChange={(e) => setAdvice(e.target.value)}
        rows="4"
        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
      />
      <button onClick={handleGuardar} disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar Consejo'}
      </button>

      {mensaje && <p>{mensaje}</p>}

      <h3>Tus consejos guardados:</h3>
      <ul>
        {consejos.length === 0 && <li>No tienes consejos guardados aún.</li>}
        {consejos.map((c) => (
          <li key={c.id} style={{ marginBottom: '1rem' }}>
            {c.advice}{' '}
            <button
              onClick={() => handleEliminar(c.id)}
              disabled={loading}
              style={{
                marginLeft: '10px',
                backgroundColor: 'tomato',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
