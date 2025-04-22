import React, { useState } from 'react';
import { searchAdvice } from '../../services/api';
import './style.css';

export default function Filtros() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await searchAdvice(query);
    setResults(res);
  };

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.advice}</li>
        ))}
      </ul>
    </div>
  );
}
