import React, { useState, useEffect } from 'react';

const CrearConvenio = ({ onClose, onSave, convenio }) => {
  const [empresa, setEmpresa] = useState(convenio ? convenio.empresa : '');
  const [producto, setProducto] = useState(convenio ? convenio.producto : '');
  const [descripcion, setDescripcion] = useState(convenio ? convenio.descripcion : '');
  const [precio, setPrecio] = useState(convenio ? convenio.precio : '');
  const [imagenProducto, setImagenProducto] = useState(null); // Almacena el archivo en lugar de la URL

  useEffect(() => {
    if (convenio) {
      setEmpresa(convenio.empresa);
      setProducto(convenio.producto);
      setDescripcion(convenio.descripcion);
      setPrecio(convenio.precio || '');
      setImagenProducto(null); // Resetea la imagen para editar
    }
  }, [convenio]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenProducto(file); // Guardar el archivo directamente
    }
  };

  const handleSave = () => {
    const convenioData = {
      empresa,
      producto,
      descripcion,
      precio, 
      imagenProducto, // Deja la imagen como parte del objeto
    };
    onSave(convenioData); // Envía los datos en formato de objeto
  };
  

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full">
      <h2 className="text-xl font-bold mb-4">{convenio ? 'Editar Convenio' : 'Crear Nuevo Convenio'}</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Empresa */}
        <div>
          <label className="block text-lg font-semibold mb-2">Empresa</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3"
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Nombre de la empresa..."
          />
        </div>

        {/* Producto */}
        <div>
          <label className="block text-lg font-semibold mb-2">Producto</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3"
            type="text"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            placeholder="Producto o servicio ofrecido..."
          />
        </div>

        {/* Descripción */}
        <div className="col-span-2">
          <label className="block text-lg font-semibold mb-2">Descripción</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del convenio..."
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-lg font-semibold mb-2">Precio</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Monto del pago por propaganda"
          />
        </div>

        {/* Imagen del producto */}
        <div className="col-span-2">
          <label className="block text-lg font-semibold mb-2">Imagen del Producto</label>
          <input
            type="file"
            className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          className="bg-gray-300 text-black py-2 px-6 rounded-full hover:bg-gray-400"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="bg-verde-chef text-white py-2 px-6 rounded-full hover:bg-green-600"
          onClick={handleSave}
        >
          {convenio ? 'Guardar Cambios' : 'Crear Convenio'}
        </button>
      </div>
    </div>
  );
};

export default CrearConvenio;
