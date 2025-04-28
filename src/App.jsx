import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Aleatorios from './Componentes/Aleatorios';
import Capturados from './Componentes/Capturados';
import Favoritos from './Componentes/Favoritos';
import Listas from './Componentes/Listas';
import Libros from './Componentes/Libros'; 
import Usuarios from './Componentes/Usuarios';
import Menu from './Componentes/Menu';

import './App.css';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/Aleatorios" element={<Aleatorios />} />
        <Route path="/Capturados" element={<Capturados />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/" element={<Listas />} />
        <Route path="/Libro/:id" element={<Libros />} /> {/* Cambio importante aquí */}
        <Route path="/Usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}

export default App;
