// src/components/usuario/index.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import './style.css';

export default function Usuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Carga usuario y perfil al iniciar
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        fetchProfile(data.session.user);
      }
    });

    // Escuchar cambios en la sesión (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Obtener perfil de la tabla profiles
  const fetchProfile = async (user) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setUser({ ...user, full_name: data?.full_name || '' });
      setFullName(data?.full_name || '');
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };

  // Registro con email, pass y fullName
  const handleRegister = async () => {
    setLoading(true);
    setMessage('');
    try {
      // Crear usuario en Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      // Insertar perfil extra si signUp fue exitoso
      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            full_name: fullName,
          },
        ]);
        if (profileError) throw profileError;
      }

      setMessage('Registro exitoso. Revisa tu correo para confirmar.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login con email y password
  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data.user) {
        await fetchProfile(data.user);
        setMessage('Login exitoso.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setFullName('');
    setEmail('');
    setPassword('');
    setMessage('Sesión cerrada.');
    setLoading(false);
  };

  // Actualizar perfil (solo fullName de ejemplo)
  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName, updated_at: new Date() })
        .eq('id', user.id);
      if (error) throw error;
      setMessage('Perfil actualizado.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    // Dentro del return() de Usuario:

<div className="usuario-container">
  {!user ? (
    <>
      <h2>Registrar / Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <input
        type="text"
        placeholder="Nombre completo (solo para registro)"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
      />
      <div className="botones">
        <button onClick={handleRegister}>Registrar</button>
        <button onClick={handleLogin}>Iniciar sesión</button>
      </div>
      {message && <p className="message">{message}</p>}
    </>
  ) : (
    <>
      <h2>Hola, {user.full_name}</h2>
      <input
        type="text"
        placeholder="Nombre completo"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
      />
      <div className="botones">
        <button onClick={handleUpdateProfile}>Actualizar perfil</button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      {message && <p className="message">{message}</p>}
    </>
  )}
</div>

  );
}