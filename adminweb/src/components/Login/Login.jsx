import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';  // Importar la función de login
import Fondo2 from '../../images/Fondo2.png';
import Logo from '../../images/Chef-En-Casa.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);  // Usar el servicio de login
      console.log(response.message);  // Mensaje de éxito
      navigate('/');  // Redirigir al dashboard después del login exitoso
    } catch (err) {
      setError('Error en la conexión al servidor o credenciales incorrectas');
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${Fondo2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Chef en Casa Logo" className="w-32 h-32 mb-8" />
        <h1 className="text-3xl text-white font-bold mb-4">INICIAR SESIÓN</h1>
        <div className="w-80">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-sm font-semibold mb-1" htmlFor="email">CORREO</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-semibold mb-1" htmlFor="password">CONTRASEÑA</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-chef text-white font-bold hover:bg-chef transition duration-200"
              >
                INICIAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
