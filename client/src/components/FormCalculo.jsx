import React, { useState } from 'react';
import axios from 'axios';

const FormCalculo = ({ onResultado, onDatosGrafico }) => {
  const [inputs, setInputs] = useState({
    A_tanque: 10,      // Área del tanque (m²)
    h_final: 5,        // Altura deseada (m)
    t_total: 20,       // Tiempo total (s)
    A_orificio: 0.1    // Área del orificio (m²)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/calcular-q/', 
        inputs
      );
      onResultado(response.data);
      
      const simResponse = await axios.post(
        'http://localhost:8000/api/simular-h/', 
        { ...inputs, Q: response.data.Q }
      );
      onDatosGrafico(simResponse.data);
    } catch (error) {
      console.error('Error:', error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <label>
          Área del tanque (m²):
          <input
            type="number"
            value={inputs.A_tanque}
            onChange={(e) => setInputs({...inputs, A_tanque: parseFloat(e.target.value) || 0})}
            step="0.01"
            min="0.01"
            required
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Altura deseada (m):
          <input
            type="number"
            value={inputs.h_final}
            onChange={(e) => setInputs({...inputs, h_final: parseFloat(e.target.value) || 0})}
            step="0.01"
            min="0.01"
            required
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Tiempo total (s):
          <input
            type="number"
            value={inputs.t_total}
            onChange={(e) => setInputs({...inputs, t_total: parseFloat(e.target.value) || 0})}
            step="0.1"
            min="0.1"
            required
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Área del orificio (m²):
          <input
            type="number"
            value={inputs.A_orificio}
            onChange={(e) => setInputs({...inputs, A_orificio: parseFloat(e.target.value) || 0})}
            step="0.001"
            min="0.001"
            required
          />
        </label>
      </div>

      <button type="submit" className="calculate-btn">Calcular Q</button>
    </form>
  );
};

export default FormCalculo;