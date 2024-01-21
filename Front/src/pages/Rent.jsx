import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Rating } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ExtensionIcon from '@mui/icons-material/Extension';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import StyleIcon from '@mui/icons-material/Style';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WcIcon from '@mui/icons-material/Wc';
import CalendarProduct from './../components/calendar/CalendarProduct';
import GameImages from './../components/cardGameDetails/GameImages';
import { useGetDataObject } from './../hooks/useGetDataObject';
import './../styles/rent.css';
import swal from 'sweetalert';
import { endpointHost } from '../variables/endpoint';
import UserRent from '../components/userRent/UserRent';


export const endpointGame = `${endpointHost}/products/search`;


const Rent = () => {
  const location = useLocation();
  const { startDate, endDate, difference } = location.state ?? {};
  console.log("DIFERENCIA EN RENT", difference?.difference);
  console.log("FECHA START EN RENT", startDate);
  console.log("FECHA END EN RENT", endDate);


  const email = localStorage.getItem("EMAIL DEL USUARIO");
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useGetDataObject(`${endpointGame}/${id}`);
  const [direccion, setDireccion] = useState({
    calle: "",
    numero: "",
    ciudad: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    dni: "",
  });
  const [datesSelected, setDatesSelected] = useState({
    startDateRent: startDate,
    endDateRent: endDate,
  });
  const [differenceRent, setDifferenceRent] = useState(difference?.difference);


  const handleDateSelect = ({ startDate, endDate, difference }) => {
    console.log("DIFERENCIA EN CAMBIO", difference);
    console.log("START EN CAMBIO", startDate);
    console.log("END EN CAMBIO", endDate);
    setDatesSelected({ startDateRent: startDate, endDateRent: endDate });
    setDifferenceRent(difference);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${endpointHost}/user/searchUserEmail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );


        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error al realizar la petición al servidor");
      }
    };


    if (email) {
      fetchUserData();
    }
  }, [email]);


  const handleChangeDireccion = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };


  const totalPrice = (differenceRent + 1) * info.price;
  console.log("TOTAL", totalPrice);


  const handleSubmit = async () => {
    // Verificar si las fechas de inicio y fin están seleccionadas
    if (!datesSelected.startDateRent || !datesSelected.endDateRent) {
      swal("Error", "Debes seleccionar las fechas de inicio y fin de la reserva", "error");
      return;
    } else if (userData.role == "ADMIN") {
      swal("Error", "No se pudo realizar la reserva ya que eres administrador", "warning");
      return;
    }


    console.log(direccion);
    console.log(userData.user_id);
    const reservationData = {
      user_id: userData.user_id,
      game_id: id,
      street: direccion.calle,
      number: direccion.numero,
      city: direccion.ciudad,
      startDate: datesSelected.startDateRent,
      returnDate: datesSelected.endDateRent,
      totalPrice: totalPrice,
    };


    try {
      const response = await fetch(`${endpointHost}/rents/createrent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });


      if (response.ok) {
        swal("Reserva exitosa", "¡La reserva se ha realizado con éxito!", "success");
        navigate("/");
      } else {
        console.error("Error al realizar la reserva");
        swal("Error", "No se pudo realizar la reserva", "error");
      }
    } catch (error) {
      console.error("Error al realizar la petición al servidor", error);
      swal("Error", "No se pudo conectar con el servidor", "error");
    }
  };


  const handleCancel = () => {
    swal({
      title: "¿Estás seguro?",
      text: "Si cancelas la reserva, se perderán todos los datos ingresados. ¿Deseas continuar?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        navigate(`/`);
      } else {
        // Permanecer en la misma página
      }
    });
  };


  return (
    <div className='principalContainer'>


      <div className='columnaUno' >
        <div>
          <div>
              <div className="titulo">
                <h1>DATOS PERSONALES</h1>
              </div>
          </div>
          <div className='datosPersonales'>
              <UserRent user={userData} />
              <div>
              <Typography variant="h6" ><strong>Ingresá tu dirección de envío:</strong></Typography>
              <form className="formDireccion">
                <TextField
                  className="textFieldDireccion"
                  name="calle"
                  label="Calle (opcional)"
                  value={direccion.calle}
                  onChange={handleChangeDireccion}
                />
                <TextField
                  className="textFieldDireccion"
                  name="numero"
                  label="Número (opcional)"
                  value={direccion.numero}
                  onChange={handleChangeDireccion}
                />
                <TextField
                  className="textFieldDireccion"
                  name="ciudad"
                  label="Ciudad (opcional)"
                  value={direccion.ciudad}
                  onChange={handleChangeDireccion}
                />
              </form>
              </div>
          </div>
         
        </div>
        <div>
          <div>
            <div className="titulo">
              <h1>DETALLES DE TU JUEGO</h1>
            </div>
          </div>
          <div className="datosJuego">
            <GameImages gameId={id} />
            <div className='textoJuego'>
              <Typography variant="h5" style={{ color:'var(--sixth-color)' }}>{info.gameName}</Typography>
              <p className='descripcion'>{info.description}</p>
              <p className='precioDia'>Precio por día: $ {info.price}</p>
            </div>
          </div>
        </div>
      </div>


      <div className='columnaDos'>
        <div>
          <div className="titulo">
            <h1>FECHAS DE TU RESERVA</h1>
          </div>
          <div  className='datosFechas'>
              <div className='datosDevolu'>
                <Typography variant="body1" style={{ fontFamily: 'var(--principal-font)', fontWeight: 'bold', color: 'var(--fifth-color)' }}>Las fechas seleccionadas son:</Typography>
                <Typography variant="body1" style={{ marginLeft:'20px',fontFamily: 'var(--principal-font)', fontWeight: 'bold', color: 'var(--sixth-color)' }}>Fecha de Inicio de Reserva: {datesSelected.startDateRent}</Typography>
                <Typography variant="body1" style={{ marginLeft:'20px',fontFamily: 'var(--principal-font)', fontWeight: 'bold', color: 'var(--sixth-color)' }}>Fecha de Fin de Reserva: {datesSelected.endDateRent}</Typography>
              </div>
                <Typography variant="h6" ><strong>¿Querés cambiar las fechas? Elegí nuevas en el calendario</strong></Typography>
              <CalendarProduct gameId={id} onDateSelect={handleDateSelect} />
              <Typography variant="h6" ><strong>Precio total de tu reserva: $ {totalPrice}</strong></Typography>
          </div>
        </div>
        <div className="buttonsContainer">
          <Button className='cancelarButton' variant="contained" startIcon={<AccessAlarmIcon />} onClick={handleCancel}>
            Cancelar
          </Button>
          <Button className='reservarButton' variant="contained" endIcon={<ExtensionIcon />} onClick={handleSubmit}>
            Confirmar Reserva
          </Button>
        </div>
      </div>
    </div>
  );
};


export default Rent;