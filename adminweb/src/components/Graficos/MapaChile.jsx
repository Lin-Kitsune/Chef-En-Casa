// components/Graficos/MapaConsumoGeografico.js
import React, { useRef } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip } from 'react-leaflet';

const data = [
  { region: 'Metropolitana', lat: -33.45, lng: -70.65, uso: 3000, consumo: 2500 },
  { region: 'Valparaíso', lat: -33.04, lng: -71.62, uso: 1800, consumo: 1500 },
  { region: 'Biobío', lat: -36.82, lng: -73.05, uso: 1200, consumo: 1100 },
  { region: 'Araucanía', lat: -38.74, lng: -72.59, uso: 800, consumo: 700 },
  { region: 'Los Lagos', lat: -41.47, lng: -72.94, uso: 700, consumo: 650 },
  { region: 'Coquimbo', lat: -29.95, lng: -71.34, uso: 600, consumo: 500 },
  { region: 'O’Higgins', lat: -34.17, lng: -70.74, uso: 500, consumo: 450 },
];

const MapaChile = () => {
  const mapRef = useRef(null);

  const handleZoomToRegion = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 8, { duration: 1.5 });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6 text-black-700">Patrones de Consumo por Ubicación Geográfica</h2>
      
      {/* Contenedor principal en dos columnas */}
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-7xl">
        
        {/* Columna de tarjetas de regiones con scroll */}
        <div className="w-full lg:w-1/3 p-4 space-y-4" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <h3 className="text-lg font-semibold text-green-700">Seleccione las Regiones para Analizar:</h3>
          {data.map((item, index) => (
            <div
              key={index}
              className="border-2 border-green-500 bg-green-100 p-4 rounded-lg shadow-lg cursor-pointer transition transform hover:bg-green-200 hover:scale-105"
              onClick={() => handleZoomToRegion(item.lat, item.lng)}
            >
              <h3 className="font-bold text-green-700">{item.region}</h3>
              <p>Uso de la App: <span className="font-medium text-gray-700">{item.uso}</span></p>
              <p>Consumo de Recetas: <span className="font-medium text-gray-700">{item.consumo}</span></p>
            </div>
          ))}
        </div>

        {/* Columna del mapa de Chile */}
        <div className="w-full lg:w-2/3 p-4">
          <MapContainer
            center={[-33.45, -70.65]}
            zoom={5}
            style={{ height: '500px', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map((item, index) => (
              <Circle
                key={index}
                center={[item.lat, item.lng]}
                radius={item.uso * 10}
                color="green"
                fillColor="green"
                fillOpacity={0.4}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                  <div className="text-center">
                    <strong className="text-green-700">{item.region}</strong><br />
                    Uso de la App: <span className="font-medium text-gray-700">{item.uso}</span><br />
                    Consumo de Recetas: <span className="font-medium text-gray-700">{item.consumo}</span>
                  </div>
                </Tooltip>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapaChile;
