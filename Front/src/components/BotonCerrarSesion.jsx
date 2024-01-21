import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Tooltip } from '@mui/material';
import AuthContext from './common/AuthContext';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const BotonCerrarSesion = () => {
  const navigate = useNavigate();
  const [iniciarSesion, setIniciarSesion] = useState(false);
  const {logout} = useContext(AuthContext)


useEffect(()=> {

 
  const tokenVerif = localStorage.getItem("JWT");
    
  if (tokenVerif === localStorage.getItem("JWT")) {
    setIniciarSesion(true);
  }


} , [])
  
   

  const cerrarSesion = () =>{
    logout();
    //localStorage.removeItem("JWT")
    localStorage.removeItem("votosProductos");
    localStorage.removeItem("votoRealizado");

    swal("SESION CERRADA", "Inicie sesión nuevamente", "warning");
    
    setIniciarSesion(false)
    navigate('/login');
    
  }
  



  return (
  <>
    {iniciarSesion && (
        <Tooltip title="Cerrar sesión">
          <IconButton onClick={cerrarSesion}>
            <LogoutIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        </Tooltip>
      )}
    
  </>
  );
};

export default BotonCerrarSesion;
