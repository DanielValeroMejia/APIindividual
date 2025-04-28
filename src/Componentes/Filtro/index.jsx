function Filtro({ onTipoChange }) {
    const categorias = [
      "All",
      "Science Fiction",
      "Fantasy",
      "Adventure",
      "Children",
      "Romance",
      "History",
      "Mystery"
    ];
  
    return (
      <div className="c-filtro">
        {categorias.map((unaCategoria, index) => (
          <button 
            className='' 
            key={index} 
            onClick={() => onTipoChange(unaCategoria)}
          >
            {unaCategoria}
          </button>
        ))}
      </div>
    );
  }
  
  export default Filtro;
  