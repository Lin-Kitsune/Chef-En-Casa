// Para mostrar estadísticas generales
import React, { useEffect, useState } from 'react';
import { getStatistics } from '../../services/userService';

const DashboardStats = () => {
    const [stats, setStats] = useState({ totalUsuarios: 0, totalRecetas: 0, totalIngredientes: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const statsData = await getStatistics();
            setStats(statsData);
        };

        fetchStats();
    }, []);

    return (
        <div className="stats">
            <h2>Estadísticas Generales</h2>
            <p>Total Usuarios: {stats.totalUsuarios}</p>
            <p>Total Recetas: {stats.totalRecetas}</p>
            <p>Total Ingredientes: {stats.totalIngredientes}</p>
        </div>
    );
};

export default DashboardStats;
