import React, { useState, useEffect } from 'react';
import { MenuItem, Button, InputLabel, Select } from "@mui/material";
import swal from 'sweetalert';
import { endpointHost } from '../../variables/endpoint';


const AddImages = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);


  const getGames = async () => {
    try {
      const response = await fetch(`${endpointHost}/products/list`);
      const data = await response.json();
      setGames(data);
      // Seleccionar el primer juego por defecto
      if (data.length > 0) {
        setSelectedGame(data[0].game_id);
      }
    } catch (error) {
      console.error('Error al obtener los juegos', error);
    }
  };


  useEffect(() => {
    getGames();
  }, []);


  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();


    const formData = new FormData();
    formData.append('file', selectedImage);


    try {
      const response = await fetch(`${endpointHost}/product/images/upload/${selectedGame}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      console.log('Imagen cargada exitosamente', data);
      swal("Imagen cargada", "¡La imagen se ha cargado con exito!", "success");
    } catch (error) {
      console.error('Error al cargar la imagen', error);
      swal("No se ha podido", "¡La imagen no se ha podido cargar!", "error");
    }
  };


  return (
    <form style={{marginLeft: '10%'}} onSubmit={handleSubmit}>
      <div>
        <InputLabel id="game-selected" style={{ fontFamily: "var(--principal-font)", fontWeight: "bold" }}>Seleccione un juego:</InputLabel>
        {games?.length ? (
          <Select
            labelId="game-select-game"
            id="game-select"
            value={selectedGame}
            onChange={handleGameChange}
            style={{ fontFamily: "var(--principal-font)", fontWeight:"500", width:"30em", margin:"8px" }}
          >
            {games.map((game) => (
              <MenuItem key={game.game_id} value={game.game_id}>
                {game.gameName}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <p style={{ fontFamily: "var(--principal-font)" }}>No hay juegos disponibles</p>


        )}
      </div>
      <div>
      <input
  type="file"
  onChange={handleImageChange}
  style={{
    padding: "8px",
    borderRadius: "4px",
    width: "500px",
    fontSize:"15px"
  }}
/>


      </div>
      <Button
  type="submit"
  variant="contained"
  color="primary"
  style={{
    backgroundColor: "#f7b7ae",
    margin: "10px",
    fontWeight: "bold",
    borderRadius: "4px",
  }}
>
  Guardar
</Button>
    </form>
  );
};


export default AddImages;
