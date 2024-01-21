import React, { useState, useContext, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from './common/AuthContext';

const MenuMobile = ({ rol }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/listUser")) {
      handleMenuClose();
    }
  }, [location]);
  const cerrarSesion = () =>{
    logout();
    //localStorage.removeItem("JWT")
    localStorage.removeItem("votosProductos");
    localStorage.removeItem("votoRealizado");

    swal("SESION CERRADA", "Inicie sesión nuevamente", "warning");
    
    navigate('/login');
    
  }

  const menuAnchorOrigin = { vertical: 'top', horizontal: 'left' };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            paddingRight: '0',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={menuAnchorOrigin}
        transformOrigin={menuAnchorOrigin}
      >
        {rol === 'ADMIN' && isLoggedIn ? (
          [
            <MenuItem
              key="home"
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </MenuItem>,
            <MenuItem
              key="lista-usuarios"
              onClick={() => {
                navigate('/listUser');
              }}
            >
              Lista usuarios
            </MenuItem>,
            <MenuItem
              key="perfil"
              onClick={() => {
                navigate('/profile');
              }}
            >
              Perfil
            </MenuItem>,
             <MenuItem
               key="sesion"
               onClick={() => {
                 cerrarSesion();
               }}
             >
               Cerrar sesion
             </MenuItem>
          ]
        ) : rol === 'USER' && isLoggedIn ? (
          [
            <MenuItem
              key="home"
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </MenuItem>,
            <MenuItem
              key="perfil"
              onClick={() => {
                navigate('/profile');
              }}
            >
              Perfil
            </MenuItem>,
             <MenuItem
             key="sesion"
             onClick={() => {
               cerrarSesion();
             }}
           >
             Cerrar sesion
           </MenuItem>
          ]
        ) : (
          [
            <MenuItem
              key="home"
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </MenuItem>,
            <MenuItem
              key="login"
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </MenuItem>,
            <MenuItem
              key="register"
              onClick={() => {
                navigate('/register');
              }}
            >
              Register
            </MenuItem>
          ]
        )}
      </Menu>
    </div>
  );
};

export default MenuMobile;
