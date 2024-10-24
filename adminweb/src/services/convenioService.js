// services/convenioService.js

let convenios = [
    {
      _id: 1,
      empresa: 'Sal de Mar S.A.',
      producto: 'Sal de mar natural',
      descripcion: 'Proveedor de sal marina de alta calidad',
      imagenProducto: 'https://www.estoy.cl/wp-content/uploads/2020/02/Saldemar-LosCisnes-Cahuil_2-1024x491.jpg'  // Ejemplo de URL de imagen
    },
    {
      _id: 2,
      empresa: 'Aceites del Valle',
      producto: 'Aceite de oliva',
      descripcion: 'Aceite de oliva extra virgen',
      imagenProducto: 'https://www.aceitealicanto.cl/wp-content/uploads/2024/02/07.jpg'  // Ejemplo de URL de imagen
    }
  ];
  
  export const getAllConvenios = async () => {
    return convenios;
  };
  
  export const createConvenio = async (convenio) => {
    convenios.push(convenio);
    return convenio;
  };
  
  export const updateConvenio = async (id, updatedConvenio) => {
    convenios = convenios.map(c => (c._id === id ? updatedConvenio : c));
    return updatedConvenio;
  };
  
  export const deleteConvenio = async (id) => {
    convenios = convenios.filter(c => c._id !== id);
  };
  