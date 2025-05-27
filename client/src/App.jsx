import React, { useState } from 'react';
import FormCalculo from './components/FormCalculo';
import Grafico from './components/Grafico';
import "./App.css"
function App() {
  const [resultado, setResultado] = useState(null);
  const [datosGrafico, setDatosGrafico] = useState(null);

  return (
    <div className="app">
      <div className="header">
      <h1>Cálculo de Caudal para Llenado de Tanques</h1>
      <p>Solución numérica para sistemas de almacenamiento</p>
      </div>
      <div className="description-card">
        <h2>¿Qué resuelve esta aplicación?</h2>
        <p>
          Calcula el caudal de entrada necesario para llenar un tanque considerando pérdidas por orificios, 
          usando métodos numéricos avanzados para mayor precisión.
        </p>
        <ul>
          <li>Resuelve ecuaciones diferenciales no lineales con el método Runge-Kutta</li>
          <li>Ajusta iterativamente el caudal usando Newton-Raphson</li>
          <li>Visualiza comparaciones entre escenarios reales e ideales</li>
        </ul>
        <p>
          Ideal para ingenieros hidráulicos, diseñadores de sistemas de almacenamiento y estudiantes.
        </p>
      </div>
      <FormCalculo 
        onResultado={setResultado} 
        onDatosGrafico={setDatosGrafico} 
      />
      {resultado && (
        <div className="resultado">
          <h2>Resultado: Q = {resultado.Q.toFixed(4)} m³/s</h2>
          {datosGrafico && <Grafico datos={datosGrafico} />}
        </div>
      )}
    </div>
  );
}

export default App;