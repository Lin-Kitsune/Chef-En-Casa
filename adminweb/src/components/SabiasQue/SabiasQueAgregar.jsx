import React, { useState, useEffect } from 'react';

const SabiasQueAgregar = ({ onClose, onSave, sabiasQue }) => {
    const [titulo, setTitulo] = useState(sabiasQue ? sabiasQue.titulo : '');
    const [descripcion, setDescripcion] = useState(sabiasQue ? sabiasQue.descripcion : '');
    const [beneficio, setBeneficio] = useState(sabiasQue ? sabiasQue.beneficio : ''); // Campo beneficio agregado
    const [imagen, setImagen] = useState(sabiasQue ? sabiasQue.imagen : null);

    // Actualización de los estados cuando sabiasQue cambia (para editar)
    useEffect(() => {
        if (sabiasQue) {
            setTitulo(sabiasQue.titulo);
            setDescripcion(sabiasQue.descripcion);
            setBeneficio(sabiasQue.beneficio || ''); // Asegúrate de que el beneficio se actualice si existe
            setImagen(sabiasQue.imagen || null); // Resetea la imagen para editar
        }
    }, [sabiasQue]);

    // Manejo de cambios en la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setImagen(file); // Establecer la imagen en el estado
            } else {
                alert('Por favor selecciona una imagen válida.');
            }
        }
    };

    // Función de guardado (crear o editar)
    const handleSave = () => {
        // Crear el objeto de "Sabías Que" con los datos
        const sabiasQueData = { titulo, descripcion, beneficio, imagen };

        // Llamar a la función onSave (se pasa desde el componente principal)
        onSave(sabiasQueData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">{sabiasQue ? 'Editar Sabías Que' : 'Crear Nuevo Sabías Que'}</h2>

            <div className="space-y-6">
                {/* Título */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Título</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg p-3"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Título del mensaje..."
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Descripción</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-3"
                        rows="3"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Descripción del mensaje..."
                    />
                </div>

                {/* Beneficio */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Beneficio</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-3"
                        rows="3"
                        value={beneficio}
                        onChange={(e) => setBeneficio(e.target.value)}
                        placeholder="Beneficios del mensaje..."
                    />
                </div>

                {/* Imagen */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Imagen</label>
                    <input
                        type="file"
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-gray-300 bg-transparent p-2 font-normal outline-none transition file:mr-5 file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-gray-300 file:bg-white file:px-2 file:py-2 file:text-gray-700 file:hover:bg-green-600 file:hover:text-white focus:border-green-500"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Botones */}
                <div className="flex space-x-4 mt-6">
                    <button
                        className="bg-gray-400 text-white py-2 px-6 rounded-full hover:bg-gray-500"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-verde-chef text-white py-2 px-6 rounded-full hover:bg-green-600"
                        onClick={handleSave}
                    >
                        {sabiasQue ? 'Guardar cambios' : 'Agregar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SabiasQueAgregar;
