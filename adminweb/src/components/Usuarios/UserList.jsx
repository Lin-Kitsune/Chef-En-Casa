import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, updateUser, createUser } from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editUserModalVisible, setEditUserModalVisible] = useState(false); // Controla la visibilidad del modal de edición
  const [addUserModalVisible, setAddUserModalVisible] = useState(false); // Controla la visibilidad del modal de agregar
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para editar
  const [newUser, setNewUser] = useState({ nombre: '', email: '', role: 'user', password: '' }); // Estado para el nuevo usuario

  // Obtener la lista de usuarios al cargar el componente
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

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditUserModalVisible(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setEditUserModalVisible(false);
  };

  const openAddUserModal = () => {
    setNewUser({ nombre: '', email: '', role: 'user', password: '' });
    setAddUserModalVisible(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalVisible(false);
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      await updateUser(selectedUser._id, selectedUser);
      setUsers(users.map(user => (user._id === selectedUser._id ? selectedUser : user)));
      closeEditModal();
    }
  };

  const handleCreateUser = async () => {
    try {
      const createdUser = await createUser(newUser);  // Llamada a la función para crear el usuario
      setUsers([...users, createdUser]);  // Agregar el nuevo usuario a la lista
      closeAddUserModal();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };  

  // Filtrar los usuarios en base a la búsqueda
  const filteredUsers = users.filter(user =>
    user.nombre && user.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsers = users.length;  // <<--- Cálculo del total de usuarios (CAMBIO 1)

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      {/* Barra de búsqueda, total de usuarios y botón "Agregar Usuario" */}
      <div className="flex justify-between items-center mb-6"> {/* CAMBIO 2 */}
        <div className="relative flex items-center w-full max-w-lg">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Mostrar el total de usuarios */}
        <div className="text-lg font-semibold">
          Total de usuarios: {totalUsers}  {/* CAMBIO 3: Muestra el total de usuarios */}
        </div>

        {/* Botón para abrir el modal de agregar usuario */}
        <button
          className="bg-verde-chef text-white py-2 px-6 rounded-full font-bold hover:bg-green-600 transition duration-300 flex items-center space-x-2"
          onClick={openAddUserModal}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar Usuario</span>
        </button>
      </div>

      {/* Grid de usuarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="user-info">
              <p className="text-lg font-semibold">Nombre: {user.nombre}</p>
              <p className="text-gray-600">Correo: {user.email}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="bg-verde-chef text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition duration-300"
                  onClick={() => openEditModal(user)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600 transition duration-300"
                >
                  <FontAwesomeIcon icon={faTrash} /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para editar usuario */}
      {editUserModalVisible && selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block mb-2 font-semibold">Nombre</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedUser.nombre}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, nombre: e.target.value })
                  }
                />
              </div>

              {/* Correo */}
              <div>
                <label className="block mb-2 font-semibold">Correo</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>

              {/* Rol */}
              <div>
                <label className="block mb-2 font-semibold">Rol</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button className="bg-gray-300 text-black py-2 px-4 rounded-full" onClick={closeEditModal}>
                Cancelar
              </button>
              <button className="bg-verde-chef text-white py-2 px-4 rounded-full" onClick={handleUpdateUser}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar usuario */}
      {addUserModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Agregar Usuario</h2>
            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block mb-2 font-semibold">Nombre</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newUser.nombre}
                  onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                />
              </div>

              {/* Correo */}
              <div>
                <label className="block mb-2 font-semibold">Correo</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block mb-2 font-semibold">Contraseña</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>

              {/* Rol */}
              <div>
                <label className="block mb-2 font-semibold">Rol</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button className="bg-gray-300 text-black py-2 px-4 rounded-full" onClick={closeAddUserModal}>
                Cancelar
              </button>
              <button className="bg-verde-chef text-white py-2 px-4 rounded-full" onClick={handleCreateUser}>
                Guardar Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
