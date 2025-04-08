import './App.css';
import PlayerTable from './pages/PlayerTable';
import Login from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  return (
    <Router>
      <Routes>
        {}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {}
        <Route
          path="/players"
          element={
            isAuthenticated ? (
              <PlayerTable />
            ) : (
              <Navigate to="/login" replace /> 
            )
          }
        />

        {}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
