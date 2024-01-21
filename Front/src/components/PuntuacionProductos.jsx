    import React, { useState, useEffect } from 'react';
    import Box from '@mui/material/Box';
    import Rating from '@mui/material/Rating';
    import Typography from '@mui/material/Typography';
    import { useParams } from 'react-router-dom';
    import { Button } from '@mui/material';
    import './../styles/puntuacion.css'
    import { endpointHost } from '../variables/endpoint';

    export const PuntuacionProductos = () => {

      const numberId = useParams();
      const targetId = parseInt(numberId.id);
    //  console.log(targetId);
    const [value, setValue] = React.useState(0);


      const [votosProductos, setVotosProductos] = useState([]);
      const [votoRealizado, setVotoRealizado] = useState(false);

      const [valorVoto , setValorVoto ] = useState(null)
      const [promedioVotos , setPromedioVotos] = useState(0)



    useEffect(()=>{
    
      calcularPromedioVotos()
    } , [targetId])





    const calcularPromedioVotos = async() => {
      try{
        const response= await fetch(`${endpointHost}/product/scores/avg/${targetId}`);
        if(response.ok){
          const promedio = await response.json();
          console.log("Solicitud para obtener promedio votos del producto exitosa");
          setPromedioVotos(promedio.toFixed(2))
          console.log("Promedio " + promedio.toFixed(2))
          return promedio.toFixed(2)
        }
      }catch (error) {
        console.log('Error al realizar la solicitud:', error);
      }
    };







    useEffect(() => {
      const obtenerVotos = async () => {
        try {
          const response = await fetch(`${endpointHost}/product/scores/${targetId}`);
          if (response.ok) {
            const votos = await response.json();
            console.log("Solicitud exitosa");
            votos.map((voto) => {
              console.log("Valor del voto:", voto.stars);
              setValue(voto.stars)
              setValorVoto(votos.stars);
            // localStorage.setItem("votoUsuario", JSON.stringify(voto.stars))
              return null; // Se debe retornar un valor en la función map, en este caso, null.
            });
            setValorVoto(votos.stars);
          } else {
            console.log('Error al obtener los votos desde el backend');
          }
        } catch (error) {
          console.log('Error al realizar la solicitud:', error);
        }
      };

      obtenerVotos();
    }, []);


























      
      useEffect(() => {
        const almacenamientoVotosProductos = localStorage.getItem('votosProductos');
        const tokenVerificado = localStorage.getItem('JWT');

        if (almacenamientoVotosProductos) {
          setVotosProductos(JSON.parse(almacenamientoVotosProductos));
        }

        if (tokenVerificado) {
          setVotoRealizado(true);
        }

        
      }, []);









    const contarVotos = async (event, newValue) => {
      const tokenVerificado = localStorage.getItem('JWT');

      if (tokenVerificado) {
        const existeVoto = votosProductos.some((voto) => voto.score_id/*productoId*/ === targetId);

        if (existeVoto) {
          swal("No es posible votar nuevamente", "Ya has dado tu valoración al producto", "warning");
          
        } else {
          const voto = {
            score_id: targetId,
            stars: newValue,
          };
          setValorVoto(newValue);

          setVotosProductos([...votosProductos, voto]);

          setVotoRealizado(true);

          localStorage.setItem('votosProductos', JSON.stringify([...votosProductos, voto]));

          localStorage.setItem('votoRealizado', 'true');

          //alert('Gracias por realizar tu voto con: ' + newValue + ' Estrellas');
          swal("Gracias!", "Gracias por realizar el voto con " + newValue + " estrellas", "success");

          try {
            const response = await fetch(`${endpointHost}/product/scores/createscore/${targetId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(voto),
            });

            if (response.ok) {
              console.log('Voto guardado en la base de datos');
              swal("Voto registrado", "Muchas gracias!", "success");
              calcularPromedioVotos();
            } else {
              console.log('Error al guardar el voto en la base de datos');
              swal("No se ha podido votar", "Por favor, intenta nuevamente", "error");
            }
          } catch (error) {
            console.log('Error al realizar la solicitud:', error);
          }
        }
      } else {
        //alert('Solo los usuarios registrados pueden votar. Inicia sesión');
        swal("Inicia sesión", "Solo usuarios loggeados pueden votar", "error");
      }
    };



    /*

    const restablecerVoto = () => {
      const nuevoVotosProductos = votosProductos.filter((voto) => voto.productoId !== targetId);
      setVotosProductos(nuevoVotosProductos);
      setVotoRealizado(false);
      localStorage.setItem('votosProductos', JSON.stringify(nuevoVotosProductos));
      localStorage.removeItem('votoRealizado');
      setValorVoto(null)
      alert('Voto restablecido');
    
    };




    */




    //entiendo que esta fallando porque no puedo conectarme al fetch 

    const restablecerVoto = async () => {
      try {
        const tokenVerificado = localStorage.getItem('JWT');

        if (tokenVerificado) {
          const voto = votosProductos.find((voto) => voto.score_id === targetId);

    //console.log(voto)
    //console.log(voto.stars)
          if (voto) {
            console.log(voto)
            console.log(voto.stars)
            const response = await fetch(`${endpointHost}/product/scores/deletescore/${voto.score_id}`, {
              method: 'DELETE',
            });

            if (response.ok) {
              setVotosProductos(votosProductos.filter((v) => v.score_id !== targetId));
              setVotoRealizado(false);
              localStorage.setItem('votosProductos', JSON.stringify(votosProductos.filter((v) => v.score_id !== targetId)));
              localStorage.removeItem('votoRealizado');

              //
              

              //
              //alert('Voto eliminado de la base de datos');
              swal("Voto eliminado", "El voto se ha eliminado con exito", "success");

              calcularPromedioVotos();
              setVotoRealizado(false);
           
            } else {
              console.log('Error al eliminar el voto de la base de datos');
            }
          } else {
            //alert('No se encontró el voto para eliminar');
            swal("Voto no eliminado", "No se encontró el voto para eliminar", "error");
          }
        } else {
          //alert('Solo los usuarios registrados pueden eliminar votos. Inicia sesión');
          swal("Voto no eliminado", "Solo los usuarios loggeados pueden eliminar votos. Inicia sesión", "error");
        }
      } catch (error) {
        console.log('Error al realizar la solicitud:', error);
      }
    };





      return (
        <div className="reseñas">
          <h2 className="tituloResenas">Califica este Juego!</h2>
          <Box sx={{ '& > legend': { mt: 2 } }}>
            <Typography component="legend" sx={{ fontFamily:"var(--principal-font)", color: "var(--second-color)"}}>Puntua el Producto</Typography>
            <Rating name="simple-controlled"value={promedioVotos !== null ? promedioVotos : 0}  onChange={contarVotos} />
          </Box>
          <p className="avgp">Promedio exacto de votos: {promedioVotos !== null ? promedioVotos : 'Cargando...'}</p>
          {votoRealizado && votosProductos.length > 0 && (
          
          <Button
                type="submit"
                variant="contained"

              
                onClick={restablecerVoto}
                
              >
                Restablecer tu voto {/*promedioVotos !== null ? promedioVotos : 0*/ /*value*/}
              </Button>
          )}
        </div>
      );
    };

    export default PuntuacionProductos;
