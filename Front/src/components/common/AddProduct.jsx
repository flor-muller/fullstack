import { useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ExtensionIcon from '@mui/icons-material/Extension';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import StyleIcon from '@mui/icons-material/Style';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WcIcon from '@mui/icons-material/Wc';
import { Button, TextField, MenuItem, Typography, FormControl, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { AdmiContext } from './AdmiContext';
import AgregarCategoria from './AgregarCategoria';
import swal from 'sweetalert';
import { endpointHost } from '../../variables/endpoint';






const ariaLabel = { 'aria-label': 'description' };




  const AddProduct = () => {












    //llamamos al contexto creado
       const { state ,dispatch } = useContext(AdmiContext);
   
       const {category , productos} = state
     
   
        const [nombreProducto, setNombreProducto] = useState('');
        const [descripcionProducto , setDescripcionProducto] = useState('');
        const [stock , setStock] = useState("")
        const [precio , setPrecio] = useState("")
        const [caracteristicas , setCaracteristicas] = useState({
          team: false,
          individual: false,
          time: false,
          cards: false,
          pocket: false,
          board: false,
          family: false,
          adult: false
      })




        const [categoria , setCategoria] = useState({
         
          catName:"",
          color:"",
          description:"",
         




         
        });
       
   
        const [ errorNombre , setErrorNombre ] = useState({
          error: false,
          mensaje: "",
         })
         const [ errorDescripcion , setErrorDescripcion ] = useState({
          error: false,
          mensaje: "",
         })
         const [ errorStock , setErrorStock ] = useState({
          error: false,
          mensaje: "",
         })
         const [ errorPrecio , setErrorPrecio ] = useState({
          error: false,
          mensaje: "",
         })
         const [ errorCategoria , setErrorCategoria ] = useState({
          error: false,
          mensaje: "",
         })


         const [datosCompletos, setDatosCompletos] = useState({});










       
         const validarNombre = (nombreProducto) =>{
         if (nombreProducto.trim() === "") {
          setErrorNombre({
            error: true,
            mensaje: "Complete el campo Nombre Producto"
          })
         }
         else {
          setErrorNombre({
            error: false,
            mensaje: '',
          });
 
 
 
          setDatosCompletos((prevDatos) => ({ ...prevDatos, nombreProducto }));
         
          console.log('Nombre OK');
        }
 
         }
 
         const validarDescripcion = (descripcionProducto) =>{
          if (descripcionProducto.trim() === "") {
           setErrorDescripcion({
             error: true,
             mensaje: "Complete el campo Descripcion Producto"
           })
          }
          else {
           setErrorDescripcion({
             error: false,
             mensaje: '',
           });
 
           setDatosCompletos((prevDatos) => ({ ...prevDatos, descripcionProducto }));
           console.log('Nombre OK');
         }
   
          }


 
            const validarStock = (stock) =>{
              if (stock.trim() === "" || stock < 0) {
               setErrorStock({
                 error: true,
                 mensaje: "Complete el campo Stock Producto, no puede ser menor a cero"
               })
              }
              else {
               setErrorStock({
                 error: false,
                 mensaje: '',
               });
               setDatosCompletos((prevDatos) => ({ ...prevDatos, stock }));
               console.log('Nombre OK');
             }
       
              }
 
              const validarPrecio = (precio) =>{
                if (precio.trim() === "" || precio < 0) {
                 setErrorPrecio({
                   error: true,
                   mensaje: "Ingrese un precio para el producto, no puede ser menor a cero"
                 })
                }
                else {
                 setErrorPrecio({
                   error: false,
                   mensaje: '',
                 });
                 setDatosCompletos((prevDatos) => ({ ...prevDatos, precio }));
                 console.log('Nombre OK');
               }
         
                }
               /* const validarCategoria = (categoria) =>{
                  if (categoria.trim() === "") {
                   setErrorCategoria({
                     error: true,
                     mensaje: "Ingrese una categoria para el producto"
                   })
                  }
                  else {
                   setErrorCategoria({
                     error: false,
                     mensaje: '',
                   });
                   setDatosCompletos((prevDatos) => ({ ...prevDatos, categoria }));
                   console.log('Nombre OK');
                 }
           
                  }*/
 
       
    const onChangeCategoria = (e) =>{




      const categoriaElegida = category.find((option) => option.catName === e.target.value);
  setCategoria(categoriaElegida);
      //setCategoria(e.target.value)
     
    }
       
   
const onChangeStockProducto = (e) =>{
  setStock(e.target.value)
}
const onChangePrecioProducto = (e) =>{
  setPrecio(e.target.value)
}
const onChangeCaracteristicasProducto = (e)=>{
  setCaracteristicas(
  {...caracteristicas,
  [e.target.name]:e.target.checked})
}






        const onChangeNombreProducto = (e) =>{
            setNombreProducto(e.target.value)
            //
           
            //  
        };
   
        const onChangeDescripcionproducto = (e) => {
        setDescripcionProducto(e.target.value)
        };
 




       //Resetea valores de checkbox luego de Submit
       const resetCaracteristicas = () => {
        setCaracteristicas((prevState) => {
            const resetState = { ...prevState };
            Object.keys(resetState).forEach((key) => {
                resetState[key] = false;
            });
            return resetState;
        });
    }  




       
    const onSubmitForm = (e) => {
            e.preventDefault();
            validarNombre(nombreProducto)
            validarDescripcion(descripcionProducto)
            validarStock(stock)
            validarPrecio(precio)
     
           
            setNombreProducto('');
            setDescripcionProducto('');
            setCategoria('')
            setPrecio('')
            setStock('')
            resetCaracteristicas()
          };
   


/*




        const InsertarImagenes = async()=>{
          const i  = new FormData()
          for (let index = 0; index < imagen.length; index++) {
            i.append("file" , imagen[index])
           
          }
 
 
          await axios.post(`${endpointHost}/product/images/upload/${nombreProducto}` , i)
          .then(response =>{
            console.log(response.data);
          })
          .catch(error=>{
            console.log(error)
          })
        }




*/




console.log(productos)






















function validarCampos() {
  if (!nombreProducto || !descripcionProducto || !categoria || !stock || !precio) {
    console.log('Hay datos faltantes');
    return false;
  }
  return true;
}


/*
function validarCampos() {
  const camposRequeridos = [
    'nombreProducto',
    'descripcionProducto',
    'imagen',
    'stock',
    'precio',
   
   
    // Agrega aquí los nombres de los campos requeridos adicionales...
  ];


  for (const campo of camposRequeridos) {
    if (!datosCompletos[campo]) {
      console.log('Hay datos faltantes');
      return false;
    }
  }


  return true;
}
*/


function agregarProducto() {


  if (!validarCampos(datosCompletos)) {
    return;  
  }
 
  const url = `${endpointHost}/products/create`;
  const data = {
    gameName: nombreProducto,
    description: descripcionProducto,
    category: categoria,
    characteristic: caracteristicas,
    stock: stock,
    //
    price: precio,
    totalScore: 0
  };




  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      dispatch({
        type: 'add_product',
        productos: {
          gameName: nombreProducto,
          description: descripcionProducto,
          category: categoria,
          characteristic: caracteristicas,
          stock: stock,
          price: precio
    //
        }
      });




      dispatch({ type: 'load_product' });




      console.log('Producto agregado con éxito', response.data);
      swal("Producto cargado", `¡El producto se ha cargado con exito!`, "success");
    })
    .catch(error => {
      console.error('Error al agregar el producto', error);
      if (error.response && error.response.status === 400) {
        swal("No se ha podido", `¡El producto no se ha podido cargar! Bad request: el producto ya existe`, "error");
      }
    });
}










return (
  <div>
     <Typography
      style={{
        fontFamily: "var(--principal-font)",
        fontSize: "18px",
        marginLeft: "6em",
        fontWeight: "700",
        padding: "10px",
        color: "#ff5f5d",
      }}
    >
      Agregar un producto nuevo
      </Typography>
    <Box
     display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      component="form"
        sx={{
        "& > :not(style)": { m: 1 },
        border: "1px solid #030000",
        borderRadius: "4px",
        padding: "5px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmitForm}
    >
      <TextField
        id="outlined-basic"
        label="Nombre Producto"
        variant="outlined"
        type="text"
        placeholder="Nombre Producto"
        error={errorNombre.error}
        helperText= {errorNombre.mensaje}
       
        onChange={onChangeNombreProducto}
        value={nombreProducto}
        sx={{ fontFamily: "var(--principal-font)", margin: "5px", width:"60em" }}
       
      />
     
        <TextField
        id="outlined-basic"
        label="Descripcion Producto"
        variant="outlined"
        type="text"
        placeholder="Descripcion"
        error={errorDescripcion.error}
        helperText= {errorDescripcion.mensaje}
        onChange={onChangeDescripcionproducto}
        value={descripcionProducto}
        sx={{ fontFamily: "var(--principal-font)", margin: "5px", width:"60em" }}
      />








<TextField
  id="outlined-basic"
  //label="Precio Producto"
  variant="outlined"
  type="number"
  placeholder="Precio "
  error={errorPrecio.error}
  helperText= {errorPrecio.mensaje}
  onChange={onChangePrecioProducto}
  value={precio}
  InputProps={{
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  }}
  sx={{ fontFamily: "var(--principal-font)", margin: "5px", width: "60em" }}
/>
















<TextField
        id="outlined-basic"
        label="Stock Producto"
        variant="outlined"
        type="number"
        placeholder="Stock Producto"
        error={errorStock.error}
        helperText= {errorStock.mensaje}
        onChange={onChangeStockProducto}
        value={stock}
        sx={{ fontFamily: "var(--principal-font)", margin: "5px", width:"60em" }}
      />








    <Box sx={{ display: 'flex', flexDirection:'column', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <span style={{ marginLeft:'8px', marginRight: '8px' }}>
            <Diversity3Icon sx={{ fontSize: '2rem', color: 'var(--second-color)', marginRight: '8px' }} />
            </span>
            <FormControlLabel control={<Checkbox />} checked={caracteristicas.team} onChange={onChangeCaracteristicasProducto} name="team" label="En Grupo" />
            <span style={{ marginLeft:'8px', marginRight: '8px' }}>
            <PersonIcon sx={{ fontSize: '2rem', color: 'var(--second-color)' }} />
            </span>
            <FormControlLabel control={<Checkbox />} checked={caracteristicas.individual} onChange={onChangeCaracteristicasProducto} name="individual" label="Individual" />
        </div>  
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <span style={{ marginLeft:'8px', marginRight: '8px' }}>
            <StyleIcon sx={{ fontSize: '2rem', color: 'var(--second-color)' }} />
            </span>
            <FormControlLabel control={<Checkbox />} checked={caracteristicas.cards} onChange={onChangeCaracteristicasProducto} name="cards" label="Cartas" />
            <span style={{ marginLeft:'8px', marginRight: '8px' }}>
            <ExtensionIcon sx={{ fontSize: '2rem', color: 'var(--second-color)' }} />
            </span>
            <FormControlLabel control={<Checkbox />} checked={caracteristicas.board} onChange={onChangeCaracteristicasProducto} name="board" label="Tablero" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <span style={{ marginLeft:'8px', marginRight: '8px' }}>
            <AccessAlarmIcon sx={{ fontSize: '2rem', color: 'var(--second-color)' }} />
            </span>
            <FormControlLabel control={<Checkbox />} checked={caracteristicas.time} onChange={onChangeCaracteristicasProducto} name="time" label="Por Tiempo" />
            <span style={{ marginLeft:'8px', marginRight: '8px' }}>
            <CardTravelIcon sx={{ fontSize: '2rem', color: 'var(--second-color)'}}/>
            </span>
            <FormControlLabel
            control={<Checkbox />} checked={caracteristicas.pocket} onChange={onChangeCaracteristicasProducto} name="pocket" label="Para Viaje"/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <span style={{ marginLeft:'8px', marginRight: '8px' }}>
            <WcIcon sx={{ fontSize: '2rem', color: 'var(--second-color)' }} />
            </span>
            <FormControlLabel control={<Checkbox />} checked={caracteristicas.adult} onChange={onChangeCaracteristicasProducto} name="adult" label="+13 años" />
            <span style={{ marginLeft:'8px', marginRight: '8px' }}>
                <FamilyRestroomIcon sx={{ fontSize: '2rem', color: 'var(--second-color)' }} />
            </span>
            <FormControlLabel control={<Checkbox />} checked={caracteristicas.family} onChange={onChangeCaracteristicasProducto} name="family" label="En Familia" />
        </div>
    </Box>
















      <div>
        <TextField
          sx={{
            width: "48em",
            marginBottom: "10px",
            fontFamily: "var(--principal-font)",
            margin: "5px",
          }}
          id="dropdown-games-categories"
          select
          label="Categoría de juegos"
          error={errorCategoria.error}
          helperText= {errorCategoria.mensaje}
          value={categoria.catName}
          onChange={onChangeCategoria}
        >




































          {state.category?.map((option) => (
            <MenuItem key={option.category_id} value={option.catName}>
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: option.color,
                  display: "inline-block",
                  verticalAlign: "middle",
                 
                }}
              />
              {option.catName} {option.color}
            </MenuItem>
          ))}
        </TextField>




        <AgregarCategoria />
      </div>




      <Button
        variant="contained"
        sx={{
          color: "#fff",
          backgroundColor: "#ff5f5d",
          borderRadius: "20px",
          margin: "5px",
          width:"20em"
         
        }}
        type="submit"
        onClick={agregarProducto}
      >
        Agregar Producto
      </Button>
    </Box>
    <br />
  </div>
);
};




export default AddProduct;