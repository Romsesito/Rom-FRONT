import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PlayerTable from './pages/PlayerTable'; // Ruta correcta
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to Vite + React</h1>
              <p>Click on the navigation links to explore the app.</p>
            </div>
          }
        />
        <Route path="/players" element={<PlayerTable />} />
      </Routes>
    </Router>
  );
}

export default App;
