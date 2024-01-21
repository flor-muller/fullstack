import "../styles/administrador.css";
import { useContext, useEffect, useState } from 'react';
import { AdmiContext } from '../components/common/AdmiContext';
import AddProduct from '../components/common/AddProduct';
import AddImages from "../components/common/AddImages";
import Button from '@mui/material/Button';
import "../styles/main.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';


//






import { TextField } from "@mui/material";
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { endpointHost } from "../variables/endpoint";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  //
  //backgroundColor:'white',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  //boxShadow: theme.shadows[5],
};
//


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Administrador = () => {
  const { state, dispatch } = useContext(AdmiContext);
  const {category , productos} = state


  const [imagenesCargadas, setImagenesCargadas] = useState([]);
  const [primeraImagenes, setPrimeraImagenes] = useState({});


  const [productosCargados, setProductosCargados] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);


  const [productoSeleccionado, setProductoSeleccionado] = useState(null);


  const [datosEditables, setDatosEditables] = useState(null);


  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);


  const [nombreImagenModal, setNombreImagenModal] = useState('');


  const [file, setFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);






  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
/*
const navigate = useNavigate();






  const verificarRolAdministrador = () => {
    const rol = localStorage.getItem('ROL DEL USUARIO');
    if (rol !== 'ADMIN') {
      alert('Debe ser administrador para ver esta página.');
      navigate('/');
    }
  };




  useEffect(() => {
    verificarRolAdministrador();
  }, []);
*/




const handleEditButtonClick = (producto) => {
  setProductoSeleccionado(producto);
  setDatosEditables({
    game_id: producto.game_id,
    gameName: producto.gameName,
    description: producto.description,
    stock: producto.stock,
    totalScore: producto.totalScore,
    category: producto.category,
    price: producto.price,
    imagesGames: producto.imagesGames,
    characteristic: producto.characteristic,
    inactive: producto.inactive
  });
  fetchProductImages(producto.game_id);
  setImagenSeleccionada(primeraImagenes[producto.game_id]);


  //setNombreImagenModal(primeraImagenes[producto.game_id].split('/')[3].split('?')[0]/*?.split('/').pop() || ''*/);
  //setNombreImagenModal(primeraImagenes[producto.game_id].split('?')[0])
  //setImagenSeleccionada(primeraImagenes[producto.game_id]);


  //const nombreImagen = setNombreImagenModal(primeraImagenes[producto.game_id]?.split('/').pop() || '').split('?');
  //const nombreSinParametros = nombreImagen.split('?')[0];
  handleOpen();
};


const fetchProductImages = async (gameId) => {
  try {
    const response = await fetch(`${endpointHost}/product/images/${gameId}/all`);


    if (!response.ok) {
      throw new Error('Error al obtener las imágenes del producto');
    }


    const data = await response.json();
    setImageUrls(data);
    console.log("MIRA",data);
  } catch (error) {
    console.error('Error al obtener las imágenes del producto:', error);
  }
};


console.log("IMAGENES", imageUrls[0]);


  const cargarImagenes = () => {
   
    if (!productosCargados) {
      return;e
    }


    const gamesIds = state.productos.map((producto) => producto.game_id);
    const imagenesCargadas = {};


    gamesIds.forEach((gameId) => {
      fetch(`${endpointHost}/product/images/${gameId}/all`)
        .then((response) => response.json())
        .then((imagenes) => {
   


          imagenesCargadas[gameId] = imagenes;
 
          if (imagenes.length > 0) {
            setPrimeraImagenes((prevImagenes) => ({
              ...prevImagenes,
              [gameId]: imagenes[0/*imagenesCargadas[0]*/],
            }));
      console.log(imagenesCargadas);    
      //      console.log(imagenes[0])
            console.log(primeraImagenes)
          }






        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  };


  useEffect(() => {
   
    if (state.productos.length > 0) {
      setProductosCargados(true);
      cargarImagenes();
    }
  }, [state.productos]);






 




































/*


  const cargarImagenes = () => {
    const gamesIds = state.productos.map((producto) => producto.game_id);
    const imagenesCargadas = {};
//console.log(...state.productos)
    gamesIds.forEach((gameId) => {
      fetch(`${endpointHost}/product/images/${gameId}/all`)
        .then((response) => response.json())
        .then((imagenes) => {
         console.log(imagenes)
         //setImagenesCargadas(imagenes)
    imagenesCargadas[gameId] = imagenes;
 
    if (imagenes.length > 0) {
      setPrimeraImagenes((prevImagenes) => ({
        ...prevImagenes,
        [gameId]: imagenes[0/*imagenesCargadas[0]],
      }));
console.log(imagenesCargadas);    
//      console.log(imagenes[0])
      console.log(primeraImagenes)
    }
    //console.log(imagenesCargadas);    
      //  setImagenesCargadas(imagenesCargadas)


         /*console.log(imagenes)
         setImagenesCargadas((prevImagenesPorProducto) => ({
          ...prevImagenesPorProducto,
          [gameId]: imagenes,
        })
       
        )


          /*setImagenesCargadas((prevImagenes) => [
            ...prevImagenes,
            { gameId, imagenes },
           
          ]);
         
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  };


  useEffect(() => {
    cargarImagenes();
  }, []);
*/


  const borrarProducto = (gameId) => {
    const producto = state.productos.find(
      (producto) => producto.game_id === gameId
    );


    if (!producto) {
      console.error('No se encontró el producto con el game_id especificado');
      return;
    }


    fetch(`${endpointHost}/products/delete/${gameId}`, {
      method: 'DELETE',
    })
      .then((response) => response/*.json()*/)
      .then((data) => {
        dispatch({
          type: 'delete_product',
          productos: producto,
        });
        dispatch({ type: 'load_product' });
        console.log('Producto borrado', data);
        swal("Producto eliminado", "El producto se ha eliminado con exito", "success");
      })
      .catch((error) => {
        console.error('Error al intentar borrar el producto', error);
        swal("Error", "No se ha podido eliminar el producto", "error");
      });
  };




 
 


  const enviarCambios = () => {
    if (datosEditables) {
     
      fetch(`${endpointHost}/products/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosEditables),
       
      })
        .then((response) => response/*.json()*/)
        .then((data) => {
         
          console.log('Cambios enviados', data);
          dispatch({ type: 'update_product' });
          swal("Producto actualizado", "Se ha actualizado el producto con exito", "success");
          window.location.reload();


       
        })
        .catch((error) => {
          console.error('Error al enviar los cambios', error);
          swal("Error", "No se pudo realizar los cambios", "error");
          window.location.reload();
        });
    }
  };
 










  const handleDeleteImage = (url, gameId) => {


    fetch(`${endpointHost}/product/images/delete/${url}`, {
      method: 'DELETE',
    })
      .then((response) => response/*.json()*/)
      .then((data) => {
        console.log('Imagen borrada', data);
       
        cargarImagenes();
        fetchProductImages(gameId);


        swal("Imagen eliminada", "¡La imagen se ha eliminado con exito!", "success");


      })
      .catch((error) => {
        console.error('Error al intentar borrar la imagen', error);
        swal("No se ha podido", "¡La imagen no se ha podido eliminar!", "error");
      });
  };
 






  console.log(primeraImagenes)
  console.log(imagenSeleccionada)
  console.log(nombreImagenModal)




  const handleSelectImage = () => {
    const input = document.querySelector('input[type="file"]');
    input.click();
  };


 /* const subirArchivo = (selectedFile) => {
    setFile(selectedFile);
    console.log(selectedFile)
  };*/
  const handleChangeImage = (event) =>{
    //setFile(event.target.files[0])


    const selectedImage = event.target.value;
        setFile(selectedImage);  
  }






 
  return (
    <div className="adminContenedor">






      <h1 className="title">Panel Administrador</h1>
      <AddProduct />
      <AddImages />
      <TableContainer component={Paper} sx={{ height: "80vh" , paddingBottom:20 }} >
        <Table  sx={{ minWidth: 500, backgroundColor: "#fff",  }}
          aria-label="customized table"
>
          <TableHead sx={{ backgroundColor: "#b5dddc" }}>
            <TableRow>
              <StyledTableCell align="center">IMAGEN</StyledTableCell>
              <StyledTableCell align="center">NOMBRE PRODUCTO</StyledTableCell>
              <StyledTableCell align="center">DESCRIPCION</StyledTableCell>
              <StyledTableCell align="center">PRECIO ($)</StyledTableCell>
              <StyledTableCell align="center">STOCK</StyledTableCell>
              <StyledTableCell align="center">CATEGORIA</StyledTableCell>
              <StyledTableCell align="center">ACCIONES</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {state.productos.length > 0 ? (
              state.productos.map((producto) => {
   
    return(
                <StyledTableRow key={producto.game_id}>


                  <StyledTableCell component="th" scope="row">
                 
                  {primeraImagenes[producto.game_id] && (
                   
                        <img
                          src=/*{primeraImagenes[producto.gameId]}*/ {primeraImagenes[producto.game_id].split('?')[0]}
                          alt="Imagen del producto"
                          style={{ width: '100px', height: 'auto' }}
                        />
                  )}
                  </StyledTableCell>




           


                  <StyledTableCell align="right">
                    {producto.gameName}
                  </StyledTableCell>


                  <StyledTableCell align="right">
                    {producto.description}
                  </StyledTableCell>




                  <StyledTableCell align="right">
                    {producto.price}
                  </StyledTableCell>


                  <StyledTableCell align="right">
                    {producto.stock}
                  </StyledTableCell>


                  <StyledTableCell align="right">
                    {producto.category.catName}
                  </StyledTableCell>




                  <div>
                   
                  <StyledTableCell align="center" >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => borrarProducto(producto.game_id)}
                    >
                      Borrar
                    </Button>


                   




  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  BackdropProps={{
    invisible: true,
  }}
>
  <Box
    sx={{
      width: '80%',
      maxWidth: 600,
      maxHeight: '80vh',
      overflowY: 'auto',
      backgroundColor: '#ffffff',
      p: 4,
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(8px)',
    }}
  >
    <Typography variant="h6" component="h2" textAlign="center" mb={2}>
      Editar Producto
    </Typography>




    <TextField
  label="Editar Nombre"
  value={datosEditables && datosEditables.gameName}
  onChange={(e) =>
    setDatosEditables({
      ...datosEditables,
      gameName: e.target.value,
    })
  }
/>


<StyledTableCell component="th" scope="row" className="imagesEdit">
{imageUrls.length > 0 ? (
  imageUrls.map((image) => (
    <div >
      <img src={image.split('?')[0]} alt={datosEditables.gameName} />
      <button className="eliminarImg" onClick={() => handleDeleteImage(image.split('/').pop().split('?')[0], datosEditables.game_id)}>Eliminar</button>
    </div>
  ))
) : (
  <p>No hay imágenes disponibles.</p>
)}
  <br />
 
 
  <input
    type="file"
    accept="image/*"
    ref={(input) => (input ? (input.value = null) : null)}
    style={{ display: 'none' }}
    onChange={(e) => handleChangeImage(e.target.files[0])}
    onClick={() =>  handleSelectImage()}
  />








</StyledTableCell>


   
   
           
    <Typography   id="modal-modal-description" sx={{ mt: 2 }}>
    Descripcion producto Actual : {productoSeleccionado && productoSeleccionado.description}
    </Typography>


    <TextField
      label="Editar Descripcion"
     
      fullWidth
      value={datosEditables && datosEditables.description}
      onChange={(e) =>
        setDatosEditables({
          ...datosEditables,
          description: e.target.value,
        })
       
      }
      />














    <Typography  id="modal-modal-description" sx={{ mt: 2 }}>
     Categoria Producto Actual :  {productoSeleccionado && productoSeleccionado.category.catName}
    </Typography>






    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
     Precio Producto Actual :  {productoSeleccionado && productoSeleccionado.price}
    </Typography>


    <TextField
      label="Editar Precio"
      type="number"
      value={datosEditables && datosEditables.price}
      onChange={(e) =>
        setDatosEditables({
          ...datosEditables,
          price: e.target.value,
        })
      }
    />




    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    Stock producto Actual : {productoSeleccionado && productoSeleccionado.stock}
    </Typography>


    <TextField
      label="Editar Stock"
      type="number"
      value={datosEditables && datosEditables.stock}
      onChange={(e) =>
        setDatosEditables({
          ...datosEditables,
          stock: e.target.value,
        })
      }
    />
 
   
   




<br />
  <Button variant="contained" color="success" /*onClick={handleClose}*/ onClick={()=>{ handleClose();enviarCambios() }}>Aplicar Cambios</Button>


  <Button variant="contained" color="error" onClick={handleClose}>Cancelar</Button>
  </Box>
</Modal>


                    <Button
                      variant="contained"
                      style={{ marginTop: "10px" }}
                      onClick={() => handleEditButtonClick(producto) }
                    >
                      EDITAR
                    </Button>




                  </StyledTableCell>


                  </div>


                </StyledTableRow>
              )
})
            ) : (
              <TableRow>
                <StyledTableCell colSpan={5} align="center">
                  Cargando productos...
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {productoEditar && <AddProduct producto={productoEditar} />}
    </div>
  );
};


export default Administrador;


