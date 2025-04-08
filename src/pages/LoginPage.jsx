import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {

        await axios.post('http://localhost:8080/api/auth/register', form);
        alert('Usuario registrado con éxito');
      } else {
     
        const response = await axios.post('http://localhost:8080/api/auth/login', form);
        const token = response.data; 
        localStorage.setItem('authToken', token); 
        alert('Inicio de sesión exitoso');
        setIsAuthenticated(true); 
        navigate('/players'); 
      }
      setForm({ username: '', password: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Registro' : 'Inicio de Sesión'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};

export default Login;