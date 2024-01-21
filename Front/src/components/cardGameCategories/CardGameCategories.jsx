import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Box, Typography, CardActions, Button, Rating, Tooltip } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ExtensionIcon from '@mui/icons-material/Extension';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import StyleIcon from '@mui/icons-material/Style';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WcIcon from '@mui/icons-material/Wc';
import './cardGameCategories.css'
import { endpointHost } from '../../variables/endpoint';




const CardGameCategories = ({ values }) => {
  const navigate = useNavigate();
  const [imageUrls, setImagesUrls] = useState([]);
  const [imageCache, setImageCache] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
    const urls = [];
    if (!values) {
      return;
    }
    for (const item of values) {
      const gameId = item.game_id;
      const endpointImages = `${endpointHost}/product/images/${gameId}/all`;
      try {
        let imageUrl = imageCache[gameId];

        if (!imageUrl) {
          const { data } = await axios.get(endpointImages);
          imageUrl = data[0].split("?")[0];
          setImageCache((prevCache) => ({
            ...prevCache,
            [gameId]: imageUrl,
          }));
        }

        urls.push(imageUrl);
      } catch (error) {
        console.error(error);
      }
    }

      setImagesUrls(urls);
    };
    fetchImages();
  }, [values, imageCache]);


return (
  <div className="boxGamesCategoriesResults">
    {values.length > 0 && values?.map((item, index) => (

  <div className="juegosCardContainer" key={item?.game_id} >
  <div className='imagenContainer'>
    {imageUrls[index] ? (
      <img
      className="imagenResultsCategories"
      src={imageUrls[index]}
      alt={item?.gameName}
      />
    ) : (
      <div className="placeholderImage" />
    )}
  </div>


  <div className="containerContent">
  
    <h5 className="gameTitle">
      {item?.gameName}
    </h5>

    <h5 className="categoryTitle">
      Categoría: <span style={{ color: "#f7b7ae"}}>{item?.category.catName}</span>
    </h5>

    <div className="categoryContainerRating">
      <h4 className="categoryTitleRating">
        Rating
      </h4>
      
      <Rating
      name="read-only"
      readOnly
      emptyIcon={null}
      value={item?.totalScore}
      style={{ color: 'var(--seventh-color)', paddingLeft: "20px", paddingTop: "0.5%"}}/>
    </div>


  <div className='containerButtonIcons'>
    <h4 className="categoryTitleCharacteristics">
      Características: 
    </h4>
    <div className='containerIcons'>
      {item.characteristic && (
        <>
        
        {item.characteristic.team && (
          <Tooltip title="En Grupo">
            <Diversity3Icon className="iconsCategories"/>
          </Tooltip>
        )}
        {item.characteristic.individual && (
          <Tooltip title="Individual">
            <PersonIcon className="iconsCategories"/>
          </Tooltip>
        )}
        {item.characteristic.cards && (
          <Tooltip title="Cartas">
            <StyleIcon className="iconsCategories" />
          </Tooltip>
        )}
        {item.characteristic.board && (
          <Tooltip title="Tablero">
            <ExtensionIcon className="iconsCategories"/>
          </Tooltip>
        )}
        {item.characteristic.time && (
          <Tooltip title="Por tiempo">
            <AccessAlarmIcon className="iconsCategories"/>
          </Tooltip>
        )}
        {item.characteristic.family && (
          <Tooltip title="En Familia">
              <FamilyRestroomIcon className="iconsCategories" />
          </Tooltip>
        )}
        {item.characteristic.adult && (
          <Tooltip title="+ 13 años">
            <WcIcon className="iconsCategories" />
          </ Tooltip>
        )}
        {item.characteristic.pocket && (
          <Tooltip title="Para viaje">
            <CardTravelIcon className="iconsCategories" />
          </Tooltip>
        )}
        </>
      )}
    </div>
    </div>

    <div className='containerDescription'> 
    <p className="cardDescription">
      {item?.description && item.description.split('.')[0] + '.'}
    </p>
    </div>
    
    <div className="buttonContainer">
      <h4 className="gamePrice">
        $ {item?.price} /día
      </h4>
        
      <button
          size="small"
          onClick={() => navigate(`/product/${item?.game_id}`)}
          className="viewMoreButton">
          Ver
        </button>
    </div>
    </div>


  </div>


  ))}
  </div>
  )
}


export default CardGameCategories