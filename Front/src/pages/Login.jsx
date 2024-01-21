import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
//
import AuthContext from "../components/common/AuthContext";
import { endpointHost } from "../variables/endpoint";
//
const Login = () => {
  const [errors, setErrors] = useState({ email: false, password: false });
  const [values, setValues] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
//

const {login , authenticate}  =useContext(AuthContext) 
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      // Realizar la llamada de fetch aquí y manejar la respuesta
      const response = await fetch(`${endpointHost}/user/registerProcess/${id}`);
      const message = await response.text();
      console.log(message)
      if (response.ok && message=="El usuario ha sido activado correctamente") {
        swal("Exito", message, "success");
      }else if(response.ok && message=="Han pasado más de 3 días y debe realizar el registro nuevamente") {
        swal("Error", message, "warning");
      }
    } catch (error) {
      console.log("Error en la llamada de fetch:", error);
    }
  };
//

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: !values.email,
      password: !values.password,
    };

    setErrors(newErrors);
    if (!newErrors.email && !newErrors.password) {
      try {
        const result = await authenticate(values);
        if (result.success) {
          localStorage.setItem("EMAIL DEL USUARIO", values.email)
          navigate(/*"/welcome"*/ "/");
          login(token)
        } else {
          setLoginError(true);
        }
      } catch (error) {
        setLoginError(true);
      }
             
        
        
        
        /*
        const response = await fetch(
          `${endpointHost}/user/authenticate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem("JWT", token);
          navigate("/welcome");
        } else {
          setLoginError(true)
        }
      } catch (error) {
        setLoginError(true)
      }*/
    }
  };

  const handleErrorMessageClick = () => {
    setErrors({ email: false, password: false });
  };

  return (
    <Container
      sx={{
        backgroundImage: "url(/src/assets/img/looplay_fondobusqueda.png)",
        backgroundPosition:"rigth",
        backgroundSize:"cover",
        padding: "15px",
        opacity: 0.8,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography
        align="center"
        color="#3F7C85"
        variant="h5"
        fontWeight="bold"
        mb="40px"
      >
        Iniciar sesión
        </Typography>
        {loginError && (
  <Typography align="center" color="error" variant="body1" mb="10px" fontFamily="Raleway" fontWeight="bold">
    La contraseña no coincide con nuestros registros
  </Typography>
)}
      
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "30vw",
          margin: "0 auto",
          mb: 5,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          name="email"
          size="small"
          type="text"
          label="E-mail"
          placeholder="Ingrese su e-mail"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          error={errors.email}
          helperText={errors.email ? "Este campo es requerido" : ""}
        />
        <TextField
          name="password"
          size="small"
          type="password"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          error={errors.password}
          helperText={errors.password ? "Este campo es requerido" : ""}
        />

        <Container
          className="loginButton"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            className="cancelButton"
            size="medium"
            variant="contained"
            sx={{
              backgroundColor: "#F7B7AE",
              marginBottom: "10px",
              marginRight: "20px",
              "&:hover": {
      backgroundColor: "#3f7c85" 
    }
            }}
            onClick={() => navigate("/")}
          >
            Cancelar
          </Button>
          <Button
            className="submitButton"
            size="medium"
            variant="contained"
            sx={{ backgroundColor: "#00CCBF", marginBottom: "10px",  "&:hover": {
      backgroundColor: "#ff5f5d" }
      }}
            type="submit"
          >
            Ingresar
          </Button>
        </Container>
      </Box>
      <Button className="noRegister">
        <Link 
        to="/register" 
        style={{ color: "#ff5f5d", backgroundColor: "#e2dedd" }}
        >
          ¿No tienes cuenta aún? Únete!!
        </Link>
      </Button>
    </Container>
  );
};

export default Login;
