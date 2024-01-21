import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Container, Alert, Typography, Button } from '@mui/material';
import './formRegister.css';
import { endpointHost } from '../../variables/endpoint';

const validationSchema = Yup.object({
    firstname: Yup.string()
      .required('El nombre es obligatorio')
      .min(3, 'El nombre debe tener al menos 3 caracteres'),
    lastname: Yup.string().required('El apellido es obligatorio'),
    email: Yup.string().email('Ingrese un email válido').required('El email es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
      .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
      .matches(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial')
      .required('La contraseña es obligatoria'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirme su contraseña'),
    dni: Yup.string()
    .matches(/^[0-9]{7,8}$/, 'El DNI debe contener entre 7 y 8 dígitos numéricos')
    .required('El DNI es obligatorio'),
  });

    const FormRegister = () => {
      const navigate = useNavigate();
      const [ view, setView ] = useState("form")
      // const [ values, setValues ] = useState({ 
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   password: "",
      //   passwordConfirmation: ""
      // })

      const formik = useFormik({
        initialValues: {
          firstname: '',
          lastname: '',
          email: '',
          dni:'',
          password: '',
          passwordConfirmation: '',
        },
        validationSchema: validationSchema,
        onSubmit: async ({ firstname, lastname, email, password, dni }) => {  
          try {
            const response = await fetch(`${endpointHost}/user/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ firstname, lastname, email, dni, password }),
            });
      
            if (response.ok) {
              setView('message');
            } else {
              console.log('Error:', response.status);
            }
          } catch (error) {
            console.log('Fetch error:', error);
          }
        },
      });

      useEffect(() => {
        if (view === 'message') {
          const timeout = setTimeout(() => {
            navigate('/login');
          }, 7000);
    
          return () => clearTimeout(timeout);
        }
      }, [view, navigate]);
    



      // const handleRegister = (e) => {
      //   e.preventDefault();
      //   console.log(formik.values);
      //   // setValues({
      //   //   firstName: "",
      //   //   lastName: "",
      //   //   email: "",
      //   //   password: "",
      //   //   passwordConfirmation: ""
      //   // });
      //   setView("message");
      // }

      // const handleInputChange = (e) => {
      //   const { name, value } = e.target;
      //   setValues({ ...values, [name]: value });
      // };



      // const onSubmit = (values) => {setView("message")}

      return (
        <div className="bigContainer">
                   
         { 
          view === "form" ? (
              <>
                <h1 className="title">Crea tu cuenta</h1> 
                <form id="registerForm" className="formRegisterContainer" onSubmit={formik.handleSubmit} >
                  <div className="nameContainer">
                    <TextField
                      className="inputRegister"
                      name='firstname'
                      size='small'
                      type="text"
                      label="Nombre"
                      placeholder='Ingrese su nombre'
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.firstname && formik.errors.firstname}
                      helperText={formik.touched.firstname && formik.errors.firstname}
                      required
                    />
                    <TextField
                      className="inputRegister"
                      name='lastname'
                      size='small'
                      type="text"
                      label="Apellido"
                      placeholder='Ingrese su apellido'
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.lastname && formik.errors.lastname}
                      helperText={formik.touched.lastname && formik.errors.lastname}
                      required
                    />
                  </div>
                    <TextField
                      className="inputRegister"
                      name='email'
                      size='small'
                      type="text"
                      label="E-mail"
                      placeholder='Ingrese su e-mail'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                      required
                    />
                     <TextField
                      className="inputRegister"
                      name='dni'
                      size='small'
                      type="text"
                      label="DNI"
                      placeholder='Ingrese su dni'
                      value={formik.values.dni}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.dni && formik.errors.dni}
                      helperText={formik.touched.dni && formik.errors.dni}
                      required
                    />
                    <TextField
                      className="inputRegister"
                      name='password'
                      size='small'
                      type="password"
                      label="Contraseña"
                      placeholder='Ingrese su contraseña'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && formik.errors.password}
                      helperText={formik.touched.password && formik.errors.password}
                      required
                    />
                    <TextField
                      className="inputRegister"
                      name='passwordConfirmation'
                      size='small'
                      type="password"
                      label="Confirme su contraseña"
                      placeholder='Confirme su contraseña'
                      value={formik.values.passwordConfirmation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                      helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                      required
                    />
                </form>

                <div className="botonContainer">
                    <button
                      // onClick={() => navigate(`/product/${item?.id}`)}
                      className="botonCrearCuenta"
                      type="submit"
                      form="registerForm"
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      Crear Usuario
                    </button>
                </div> 

                {formik.touched.firstname && formik.errors.firstname && (
                    <Typography sx={{ fontSize: '12px', color: 'red' }}>
                        {formik.errors.firstname}
                    </Typography>
                )}

                <div className="loginContainerRegister">
                  <Typography sx={{ 
                    fontSize:"12px", 
                    fontFamily:"var(--principal-font)", 
                    color:"var(--second-color)"}}>
                    Tienes cuenta?
                  </Typography>
                  <Button variant="text"
                    sx={{ 
                      fontSize:"12px", 
                      padding:"0", 
                      textTransform: 'lowercase',
                      fontFamily:"var(--principal-font)", 
                      color:"var(--second-color)",
                      textDecoration: 'underline',
                      }}
                    onClick={() => navigate("/login")}
                  >Inicia sesión</Button>

                </div>
                  </>
    ) : (
                <Container sx={{ width: "40vW", paddingTop: "40px"}}>
                <Alert severity="success">Tus datos fueron enviados con éxito! Te enviaremos un mail para que actives tu cuenta.</Alert>
                </Container>
    )
         }
          </div>
      )
    }

    export default FormRegister