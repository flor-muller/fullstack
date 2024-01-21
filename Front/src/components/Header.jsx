import React, { useContext, useEffect, useState } from "react";
import "../styles/header.css";
import MenuMobile from './MenuMobile.jsx'
import looplayLogo from '../assets/img/looplayLogo.png'
import { useNavigate } from "react-router-dom";
import BotonCerrarSesion from "./BotonCerrarSesion";
import AuthContext from "./common/AuthContext";
import { Box, Button, MenuItem, Select, ThemeProvider, createTheme } from "@mui/material";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [iniciales, setIniciales] = useState("");
  const [rol, setRol] = useState('')
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AuthContext)

  function obtenerInicialesAndRol() {
    if (isLoggedIn) {
      const letras = localStorage.getItem("INICIALES USUARIO")
      const rol = localStorage.getItem("ROL DEL USUARIO")
      setIniciales(letras)
      setRol(rol)
    }
  }

  useEffect(() => {
    obtenerInicialesAndRol();
  }, [isLoggedIn]);

  const handleDropdownItemClick = (route) => {
    navigate(route); // Navegar a la ruta deseada
  };

  // Define tu tema personalizado
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <header className="header-fix">
        <div className="logo">
          <button className="logoLink">
            <img src={looplayLogo} alt="LOGO" onClick={() => navigate("/")} />
          </button>
        </div>
        <div className="buttons-container">
          {isLoggedIn ? (
            <div className="button-login">
              {rol === "ADMIN" && (
                <Box sx={{ minWidth: 200 }}>
                  <Select
                    value="" // El valor seleccionado del Select
                    onChange={(e) => handleDropdownItemClick(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Herramientas Administrador
                    </MenuItem>
                    <MenuItem value="/listUser">Lista Usuarios</MenuItem>
                    <MenuItem value="/admin">Panel Administrador</MenuItem>
                  </Select>
                </Box>
              )}
               <button className="username" onClick={() => navigate("/profile")}>
                {iniciales}
              </button>
              <BotonCerrarSesion />
            </div>
          ) : (
            <div className="button-login">
              <button onClick={() => navigate("/register")}>crear cuenta</button>
              <button onClick={() => navigate("/login")}>iniciar sesión</button>
            </div>
          )}
        <MenuMobile rol={rol} logeado={isLoggedIn} />
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Header;
