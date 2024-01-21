import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExtensionIcon from "@mui/icons-material/Extension";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PersonIcon from "@mui/icons-material/Person";
import StyleIcon from "@mui/icons-material/Style";
import WcIcon from "@mui/icons-material/Wc";
import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import { useGetDataObject } from "../../hooks/useGetDataObject";
import { endpointHost } from "../../variables/endpoint";
import Gallery from "../Gallery/Gallery";
import PuntuacionProductos from "../PuntuacionProductos";
import CalendarProduct from "../calendar/CalendarProduct";
import AuthContext from "./../common/AuthContext";
import GameImages from "./GameImages";
import "./cardGameDetails.css";

export const endpointGame = `${endpointHost}/products/search`;

export default function CardGameDetails() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useGetDataObject(`${endpointGame}/${id}`);
  const [mostrarCaja, setMostrarCaja] = useState(false);
  const [datesSelected, setDatesSelected] = useState({
    startDate: '',
    endDate: '',
  });
  const [difference, setDifference] = useState(0);
  const [galeriaAbierta, setGaleriaAbierta] = useState(false);

  const handleDateSelect = ({ startDate, endDate, difference }) => {
    setDatesSelected({ startDate, endDate });
    setDifference({ difference });
    console.log("DIFERENCIA EN PRODUCT", difference)
  };

  const handleMostrarImagenes = () => {
    setMostrarCaja(!mostrarCaja);
    setGaleriaAbierta(!galeriaAbierta);
  };

  const handleIsLogged = () => {
    if (isLoggedIn) {
      console.log("ACA", datesSelected)
      navigate(`/rent/${id}`, {
        state: { startDate: datesSelected.startDate, endDate: datesSelected.endDate, difference: difference }
      });
    } else {
      swal({
        title: 'Iniciar sesión',
        text: 'Debes iniciar sesión para continuar',
        icon: 'warning',
        button: 'OK',
        dangerMode: true,
      })
      navigate(`/login`);
    }
  };  

  return (
    <div className="generalDetails">
          <div className="titleBackButton">

              <button
                className="backButton"
                onClick={() => navigate(-1)}
              >
                Volver
              </button>
              
         
                <h4
                  className="gameNameDetails"
                >
                  {info?.gameName}
                </h4>
          
  
      
          </div>

          <div className="contenedorImg">
            <div className="imagenContainerDetails">
              <div className="gallery">
                <Gallery gameId={id} />
              </div>

              <div className="viewMoreButtonDetails">
                <Button className="verMasButton" onClick={handleMostrarImagenes}>
                  {galeriaAbierta ? 'Ver menos' : 'Ver más'}
                </Button>
              </div>

            
              {mostrarCaja && (
                <div className="boxCardJuegos" key={id}>
                  <div className="mediaWrapper">
                    <GameImages gameId={id}/>
                  </div>
                </div>
              )}
          
            </div>
            
            <div className="backgroundContent">
              <div className="containerContent">
              
              <div className="descripcionGame">
                <h4 className="tituloJuego">DESCRIPCIÓN DEL JUEGO</h4>
                <p className="descriptionP">{info.description}</p>
              </div>

              <div className="charDetails">
              {info.characteristic && (
          <div className="containerIconos">
            {info.characteristic.team && (
              <div className="iconGroup">
                <Diversity3Icon sx={{ fontSize: '30px', color: 'var(--seventh-color)' }} />
                <p>En Grupo</p>
              </div>
            )}
            {info.characteristic.individual && (
              <div className="iconGroup">
                <PersonIcon sx={{ fontSize: '30px', color: 'var(--seventh-color)' }} />
                <p>Individual</p>
              </div>
            )}
            {info.characteristic.cards && (
              <div className="iconGroup">
                <StyleIcon sx={{ fontSize: '30px', color: 'var(--seventh-color)' }} />
                <p>Cartas</p>
              </div>
            )}
            {info.characteristic.board && (
              <div className="iconGroup">
                <ExtensionIcon sx={{ fontSize: '30px', color: 'var(--seventh-color)' }} />
                <p>Tablero</p>
              </div>
            )}
            {info.characteristic.time && (
              <div className="iconGroup">
                <AccessAlarmIcon sx={{ fontSize: '30px', color: 'var(--seventh-color)' }} />
                <p>Por Tiempo</p>
              </div>
            )}
            {info.characteristic.family && (
              <div className="iconGroup">
                <FamilyRestroomIcon sx={{ fontSize: '30px', color: 'var(--seventh-color)' }} />
                <p>En Familia</p>
              </div>
            )}
            {info.characteristic.adult && (
              <div className="iconGroup">
                <WcIcon sx={{ fontSize: '30px', color: 'var(--seventh-color)' }} />
                <p>+13 años</p>
              </div>
            )}
            {info.characteristic.pocket && (
              <div className="iconGroup">
                <CardTravelIcon sx={{ fontSize: '30px', color: 'var(--seventh-color)' }} />
                <p>Para Viaje</p>
              </div>
            )}
          </div>
              )}
              </div>
              </div>

              <div className="ratingContainer">
                <PuntuacionProductos className="ratingDetails" />
              </div>  
            </div>
          </div>

          <div className="containerCalendar" > 
              <div className="holder">
                
              </div>

              <div className="ContenedorCalendar">
                <CalendarProduct gameId={id} onDateSelect={handleDateSelect} />
              </div>

              <div className="datesButton">
              <div className='textCalendar'>
                <p>Las fechas elegidas son:</p>
                <p>Fecha de inicio: {datesSelected.startDate}</p>
                <p>Fecha de finalizacion: {datesSelected.endDate}</p>
              </div>

              <div className="botonReservar">
                <Button className="reservarButton" onClick={handleIsLogged}>
                  RESERVALO AHORA!
                </Button>
              </div>
              </div>
            </div>
    

    </div>
  );
}


