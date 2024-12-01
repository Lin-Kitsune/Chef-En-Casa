import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const Gauge = ({ percentage = 75.94 }) => {
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
      {/* Etiqueta Sobresaliente */}
      <div className="bg-gradient-to-r from-[#00a651] to-[#8dc63f] text-white px-12 py-2 rounded-md text-lg font-bold shadow-md absolute -top-4">
        USUARIOS ACTIVOS
      </div>

      {/* Gráfico del Velocímetro */}
      <div className="mt-6">
        <ReactSpeedometer
          maxValue={100}
          value={percentage}
          needleColor="black"
          segments={5}
          startColor="#00a651" // Verde
          endColor="#ff4d4f" // Rojo
          customSegmentStops={[0, 20, 40, 60, 80, 100]} // Divisiones
          ringWidth={15}
          width={260} // Ancho del velocímetro ajustado
          height={160} // Altura del velocímetro ajustada
          textColor="#000"
          needleTransitionDuration={800}
          needleTransition="easeQuadInOut"
        />
      </div>
    </div>
  );
};

export default Gauge;
