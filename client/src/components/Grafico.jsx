import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Grafico = ({ datos }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Referencia para guardar la instancia del gráfico

  useEffect(() => {
    if (chartRef.current && datos) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destruye el gráfico anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      // Crea el nuevo gráfico y guarda la instancia
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: datos.tiempos,
          datasets: [
            {
              label: 'Altura h(t) con pérdidas',
              data: datos.alturas,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Caso ideal (sin pérdidas)',
              data: datos.alturas_ideal,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: { title: { display: true, text: 'Altura (m)' } },
            x: { title: { display: true, text: 'Tiempo (s)' } }
          }
        }
      });
    }

    // Limpieza al desmontar el componente
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [datos]);

  return <canvas ref={chartRef} width="500" height="300"/>;
};

export default Grafico;