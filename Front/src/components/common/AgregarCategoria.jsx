import React, { useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import { AdmiContext } from "./AdmiContext";
import { useContext } from "react";
import "../../styles/agregarCat.css";
import axios from 'axios';
import { SketchPicker } from 'react-color'
import swal from 'sweetalert';
import { endpointHost } from "../../variables/endpoint";


const AgregarCategoria = () => {
  const { state, dispatch } = useContext(AdmiContext);
  const { category } = state;


  const [nuevaCategoria, SetNuevaCategoria] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [colorCategoria, setColorCategoria] = useState("");
  const [nuevoColor, setNuevoColor] = useState("");
  const [descriptionCategoria , setDescriptionCategoria ]= useState("")
  const [displayColorPicker, setDisplayColorPicker] = useState(false);


  const handleCancelar = () => {
    setNombreCategoria('');
    setColorCategoria('');
    setNuevoColor('');
    setMostrarFormulario(false);
  };
 
  const handleDescriptionCategoriaChange = (event) => {
    setDescriptionCategoria(event.target.value)
  }


  const handleNuevoColorChange = (event) => {
    setNuevoColor(event.target.value);
  };


  const handleNuevaCategoria = (event) => {
    SetNuevaCategoria(event.target.value);
  };


  const handleAgregarCategoria = () => {
    setMostrarFormulario(true);
  };


  const handleNombreCategoriaChange = (event) => {
    setNombreCategoria(event.target.value);
  };


  const handleColorCategoriaChange = (event) => {
    const colorelegido = event.target.value;
    setColorCategoria(colorelegido);
  };


  const handleColorPickerClick = () => {
    setDisplayColorPicker(true);
  };


  const handleColorChange = (color) => {
    setNuevoColor(color.hex);
  };


  const handleSubmit = (event) => {
    event.preventDefault();


    if (!nombreCategoria || !colorCategoria || !descriptionCategoria) {
      swal("Error", "Todos los campos son obligatorios", "error");
      return;
    }


    axios.post(`${endpointHost}/categories/createcategory`, {
      catName: nombreCategoria,
      color: nuevoColor,
      description: descriptionCategoria,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        dispatch({
          type: 'add_category',
          category: {
            catName: nombreCategoria,
            color: nuevoColor,
            description: descriptionCategoria,
          },
        });
        dispatch({ type: "load_category" });


        console.log('Categoria agregada exitosamente', response.data);
        swal("Categoria creada", "¡La categoría se ha creado con éxito!", "success");
        setMostrarFormulario(false);
      })
      .catch((error) => {
        console.error('Error al agregar la categoría', error);
        if (error.response && error.response.status === 400) {
          swal("No se ha podido", `¡La categoría no se ha podido cargar! Bad request: la categoría ya existe`, "error");
        }
      });
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      component="form"
      onSubmit={handleSubmit}
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!mostrarFormulario ? (
        <Button variant="contained" color="primary" onClick={handleAgregarCategoria}>Crear Nueva Categoría</Button>
      ) : (
        <div className="imputCat" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}>
          <TextField
            type="text"
            fullWidth
            label="Nombre de la categoría"
            onChange={handleNombreCategoriaChange}
            value={nombreCategoria}
            sx={{ width: "25em" }}
          />
          <br />


          <TextField
            sx={{
              width:"25em"
            }}
            type="text"
            label="Descripción categoría"
            onChange={handleDescriptionCategoriaChange}
            value={descriptionCategoria}
            fullWidth
          />


          <TextField
            sx={{ textAlign: "center", backgroundColor: "white" }}
            id="dropdown-games-categories"
            select
            label="Color Categoría"
            value={colorCategoria}
            onChange={handleColorCategoriaChange}
            fullWidth
          >
            {category?.map((option) => (
              <MenuItem key={option.id} value={option.color} disabled>
                {option.color}
              </MenuItem>
            ))}
            <MenuItem value={nuevoColor}>Agregar Nuevo Color</MenuItem>
          </TextField>


          <TextField
            label="Nuevo color"
            fullWidth
            value={nuevoColor}
            onClick={handleColorPickerClick}
            readOnly
            onChange={handleNuevoColorChange}
          />
          {displayColorPicker && ( // Muestra la paleta de colores solo cuando displayColorPicker es true
            <SketchPicker
              color={nuevoColor}
              onChange={handleColorChange} // Agrega el manejador de eventos onChange
            />
          )}


          <br />
          <Button
            onClick={handleSubmit}
            sx={{
              background: "#a4b8bf",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius:"15px",
              width: "150px",
              height: "35px",
              marginTop:"15px",
            }}
          >
            Guardar
          </Button>
          <Button variant="contained" color="error" onClick={handleCancelar}>
            Cancelar
          </Button>
        </div>
      )}
    </Box>
  );
};


export default AgregarCategoria;


