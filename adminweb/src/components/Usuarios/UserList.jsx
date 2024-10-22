// listar todos los usuarios
import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/userService';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const userList = await getAllUsers();
            setUsers(userList);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            await deleteUser(id);
            setUsers(users.filter(user => user._id !== id));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1>Total Usuarios: {users.length}</h1>
                <Link to="/crear-usuario">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full">Agregar Usuario</button>
                </Link>
            </div>

            <div className="user-grid">
                {users.map((user) => (
                    <div key={user._id} className="user-card">
                        <p>Nombre: {user.nombre}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
