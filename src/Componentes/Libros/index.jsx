import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function Libro() {
  const { id } = useParams();
  const [datalibro, setDatalibro] = useState(null);
  const [favoritos, setFavoritos] = useState(() => {
    const stored = localStorage.getItem('favoritos');
    return stored ? JSON.parse(stored) : [];
  });

  const esFavorito = favoritos.some(libro => libro.id === datalibro?.id);

  useEffect(() => {
    fetch(`https://gutendex.com/books/${id}`)
      .then(response => response.json())
      .then(responseData => setDatalibro(responseData))
      .catch(error => console.error("Error:", error));
  }, [id]);

  const toggleFavorito = () => {
    if (!datalibro) return;

    const nuevosFavoritos = esFavorito
      ? favoritos.filter(libro => libro.id !== datalibro.id)
      : [...favoritos, { id: datalibro.id, titulo: datalibro.title, imagen: datalibro.formats["image/jpeg"] }];

    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  if (!datalibro) {
    return <p>Cargando libro...</p>;
  }

  return (
    <>
      <div>
        {datalibro.formats["image/jpeg"] && (
          <img src={datalibro.formats["image/jpeg"]} alt={datalibro.title} width="200" />
        )}
        <p><strong>Título:</strong> {datalibro.title}</p>
        <p><strong>ID:</strong> {datalibro.id}</p>
        <p><strong>Autor:</strong> {datalibro.authors.length > 0 ? datalibro.authors[0].name : 'Desconocido'}</p>

        <button onClick={toggleFavorito}>
          {esFavorito ? '❤️' : '🤍'}
        </button>
      </div>
    </>
  );
}

export default Libro;
