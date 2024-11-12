// src/services/cuponService.js

export const getAllCupones = async () => {
    // Simulación de llamada a la API para obtener todos los cupones
    return [
        { id: 1, nombre: 'Descuento Santa Isabel', descripcion: '15% en compras mayores a $24.990', descuento: 15, puntos_necesarios: 200, fecha_expiracion: '2025-01-01', tienda: 'Santa Isabel' },
        { id: 2, nombre: 'Descuento Jumbo', descripcion: '10% en compras mayores a $30.000', descuento: 10, puntos_necesarios: 150, fecha_expiracion: '2025-01-01', tienda: 'Jumbo' },
    ];
};

export const createCupon = async (cupon) => {
    // Simulación de creación de un nuevo cupón
    cupon.id = Date.now();
    return cupon;
};

export const updateCupon = async (id, cupon) => {
    // Simulación de actualización de un cupón
    return cupon;
};

export const deleteCupon = async (id) => {
    // Simulación de eliminación de un cupón
    return true;
};
