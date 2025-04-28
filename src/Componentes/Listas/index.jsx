import { useState, useEffect } from 'react';
import Filtro from '../Filtro';
import { useNavigate } from "react-router-dom";
import './style.css';

function Listas() {
    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const obtenerDatos = async () => {
        const res = await fetch("https://gutendex.com/books");
        const json = await res.json();
        setData(json.results);
      };
  
      obtenerDatos();
    }, []);

    let resultados = data;

    if (busqueda.length >= 3 && isNaN(busqueda)) {
      resultados = resultados.filter(libro =>
        libro.title.toLowerCase().includes(busqueda.toLowerCase()) ||
        (libro.authors.length > 0 && libro.authors[0].name.toLowerCase().includes(busqueda.toLowerCase()))
      );
    }

    if (!isNaN(busqueda)) {
      resultados = resultados.filter(libro =>
        String(libro.id).includes(busqueda)
      );
    }

    if (filtro) {
      resultados = resultados.filter(libro => 
        libro.subjects && libro.subjects.some(subject => subject.toLowerCase().includes(filtro.toLowerCase()))
      );
    }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar libros o autores"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onTipoChange={setFiltro} /> 

      <section className='c-lista'>
        {resultados.map((libro) => (
          <div 
            className='c-lista-pokemon'
            onClick={() => navigate(`/libro/${libro.id}`)}
            key={libro.id}
          >
            <p>ID: {libro.id}</p>
            {libro.formats["image/jpeg"] && (
              <img 
                src={libro.formats["image/jpeg"]} 
                alt={`Libro ${libro.title}`} 
                width='auto' 
                height='80' 
                loading='lazy' 
              />
            )}
            <p>{libro.title}</p>
            <p><small>{libro.authors.length > 0 ? libro.authors[0].name : 'Autor desconocido'}</small></p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Listas;
