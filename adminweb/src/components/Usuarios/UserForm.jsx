//Para crear o editar usuarios
import React, { useState } from 'react';
import { createUser, updateUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ user }) => {
    const [nombre, setNombre] = useState(user ? user.nombre : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(user ? user.role : 'user');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { nombre, email, password, role };

        if (user) {
            await updateUser(user._id, userData);
        } else {
            await createUser(userData);
        }

        // Redirigir a la lista de usuarios después de crear/actualizar
        navigate('/usuarios');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select>
            <button type="submit">{user ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
};

export default UserForm;
