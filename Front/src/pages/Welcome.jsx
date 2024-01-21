import React, { useContext } from "react";
import { Box } from "@mui/material";
//
//import AuthContext from "../components/common/AuthContext";
//
const Welcome = () => {

  /*const { isLoggedIn } = useContext(AuthContext);

  if(!isLoggedIn){
    return ("No estas Logueado")
  }*/


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    
    >
      <div>
        <h1>tu perfil</h1>
      </div>
    </Box>
  );
};

export default Welcome;
