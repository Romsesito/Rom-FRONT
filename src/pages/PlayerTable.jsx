import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerTable = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    nombre: '',
    generoJuegoFavorito: '',
    ultimoVideojuegoTerminado: '',
    juegosPlatinados: 0,
  });
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem('authToken'); 
        const response = await axios.get('http://localhost:8080/api/jugadores', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlayers(response.data);
      } catch (error) {
        console.error('Error al obtener los jugadores:', error);
      }
    };

    fetchPlayers();
  }, []);

  const addPlayer = async () => {
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await axios.post(
        'http://localhost:8080/api/jugadores',
        newPlayer,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setPlayers([...players, response.data]);
      setNewPlayer({
        nombre: '',
        generoJuegoFavorito: '',
        ultimoVideojuegoTerminado: '',
        juegosPlatinados: 0,
      });
    } catch (error) {
      console.error('Error al agregar un jugador:', error);
    }
  };

  const deletePlayer = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); 
      await axios.delete(`http://localhost:8080/api/jugadores/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setPlayers(players.filter((player) => player.id !== id));
    } catch (error) {
      console.error('Error al eliminar el jugador:', error);
    }
  };

  const startEditing = (player) => {
    setEditingPlayer(player);
  };

  const updatePlayer = async () => {
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await axios.put(
        `http://localhost:8080/api/jugadores/${editingPlayer.id}`,
        editingPlayer,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setPlayers(
        players.map((player) =>
          player.id === editingPlayer.id ? response.data : player
        )
      );
      setEditingPlayer(null);
    } catch (error) {
      console.error('Error al actualizar el jugador:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Jugadores</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Género de Juego Favorito</th>
            <th>Último Videojuego Terminado</th>
            <th>Juegos Platinados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id || index}>
              <td>{player.id}</td>
              <td>{player.nombre}</td>
              <td>{player.generoJuegoFavorito}</td>
              <td>{player.ultimoVideojuegoTerminado}</td>
              <td>{player.juegosPlatinados}</td>
              <td>
                <button onClick={() => deletePlayer(player.id)}>Eliminar</button>
                <button onClick={() => startEditing(player)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Agregar Nuevo Jugador</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={newPlayer.nombre}
        onChange={(e) => setNewPlayer({ ...newPlayer, nombre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Género de Juego Favorito"
        value={newPlayer.generoJuegoFavorito}
        onChange={(e) =>
          setNewPlayer({ ...newPlayer, generoJuegoFavorito: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Último Videojuego Terminado"
        value={newPlayer.ultimoVideojuegoTerminado}
        onChange={(e) =>
          setNewPlayer({ ...newPlayer, ultimoVideojuegoTerminado: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Juegos Platinados"
        value={newPlayer.juegosPlatinados}
        onChange={(e) =>
          setNewPlayer({ ...newPlayer, juegosPlatinados: parseInt(e.target.value) })
        }
      />
      <button onClick={addPlayer}>Agregar Jugador</button>

      {editingPlayer && (
        <div>
          <h3>Editar Jugador</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={editingPlayer.nombre}
            onChange={(e) =>
              setEditingPlayer({ ...editingPlayer, nombre: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Género de Juego Favorito"
            value={editingPlayer.generoJuegoFavorito}
            onChange={(e) =>
              setEditingPlayer({
                ...editingPlayer,
                generoJuegoFavorito: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Último Videojuego Terminado"
            value={editingPlayer.ultimoVideojuegoTerminado}
            onChange={(e) =>
              setEditingPlayer({
                ...editingPlayer,
                ultimoVideojuegoTerminado: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Juegos Platinados"
            value={editingPlayer.juegosPlatinados}
            onChange={(e) =>
              setEditingPlayer({
                ...editingPlayer,
                juegosPlatinados: parseInt(e.target.value),
              })
            }
          />
          <button onClick={updatePlayer}>Guardar Cambios</button>
          <button onClick={() => setEditingPlayer(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default PlayerTable;