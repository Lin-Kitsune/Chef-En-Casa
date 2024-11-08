// services/dashboardService.js

export const getDailyUserActivity = async () => {
  // Simulación de datos diarios
  return [120, 150, 180, 200, 170, 220, 250];
};

export const getMonthlyUserActivity = async () => {
  // Simulación de datos mensuales
  return [3000, 3200, 3500, 3400, 3100, 3300, 3600]; // Datos de usuarios activos durante semanas del mes
};

export const getHourlyUserActivity = async () => {
  // Simulación de datos por hora
  return [30, 20, 25, 15, 10, 5, 10, 50, 80, 120, 150, 170, 160, 140, 130, 125, 150, 180, 200, 190, 180, 160, 100, 50];
};
 
    
  export const getNewUsersDaily = async () => {
    return [5, 10, 8, 6, 12, 15, 20];
  };
  
  export const getNewUsersMonthly = async () => {
    return [50, 60, 70, 80, 90, 110, 120]; // Nuevos usuarios por semanas del mes
  };
  
// Simulación de datos diarios y mensuales para recetas
export const getRecipeTrends = async (period = 'daily') => {
    if (period === 'daily') {
      // Datos de recetas más preparadas (diarias)
      return {
        labels: ['Ensalada César', 'Tacos de Pollo', 'Pizza Margarita', 'Sushi de Salmón', 'Hamburguesas'],
        data: [50, 45, 40, 35, 30], // Veces preparadas (diarias)
      };
    } else {
      // Datos de recetas más preparadas (mensuales)
      return {
        labels: ['Ensalada César', 'Paella', 'Sopa de Lentejas', 'Pizza Margarita', 'Tacos de Camarón'],
        data: [500, 480, 460, 450, 420], // Veces preparadas (mensuales)
      };
    }
  };
  
 // Simulación de datos diarios y mensuales para ingredientes
export const getIngredientRankings = async (period = 'daily') => {
    if (period === 'daily') {
      // Datos de ingredientes más usados (diarios)
      return {
        labels: ['Pollo', 'Lechuga', 'Aguacate', 'Tomate', 'Aceite de Oliva'],
        data: [400, 350, 300, 200, 150], // Cantidad de veces usado (diarias)
      };
    } else {
      // Datos de ingredientes más usados (mensuales)
      return {
        labels: ['Pollo', 'Carne de Res', 'Espinaca', 'Tomate', 'Aceite'],
        data: [3000, 2800, 2600, 2400, 2200], // Cantidad de veces usado (mensuales)
      };
    }
  };