import './App.css';
import PlayerTable from './pages/PlayerTable';
import Login from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Ruta protegida para PlayerTable */}
        <Route
          path="/players"
          element={
            isAuthenticated ? (
              <PlayerTable />
            ) : (
              <Navigate to="/login" replace /> // Redirige al login si no está autenticado
            )
          }
        />

        {/* Redirige a /login por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
