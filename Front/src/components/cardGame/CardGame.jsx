import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './cardGame.css';
import { endpointHost } from "../../variables/endpoint";

export const CardGame = ({ values }) => {
  const navigate = useNavigate();
  const [imageUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const requests = values.map(async (item) => {
        const gameId = item.game_id;
        const endpointImages = `${endpointHost}/product/images/${gameId}/all`;

        try {
          const { data } = await axios.get(endpointImages);
          if (data && data.length > 0 && data[0]) {
            const imageUrl = data[0]?.split('?')[0];
            return imageUrl;
          }
        } catch (error) {
          console.error(error);
        }

        return null;
      });

      try {
        const urls = await Promise.all(requests);
        setImagesUrls(urls);
      } catch (error) {
        console.error(error);
        setImagesUrls([]);
      }
    };

    if (values && values.length > 0) {
      fetchImages();
    }
  }, [values]);

  return (
    <div className="boxHomeGames">
      {values.length > 0 && values?.map((item, index) => (
        <div className="containerGamesHome"  key={item?.game_id}>
         
            <div className="containerImages">         
            <img
              height="150"
              width="150"
              className="imagesHome"
              src={imageUrls[index]}
              alt={item?.gameName}
            />
            </div>

            <div className="containerContentGames">
            <h5 className="card-title" >
              {item?.gameName}
            </h5>

            <h5 className="card-category">
              {item?.category.catName}
            </h5>
      

            <div className="buttonHomeGames">
            <button
              size="small"
              onClick={() => navigate(`/product/${item?.game_id}`)}
              className="MoreButton a"
            >
              Ver Más
            </button>
            </div>
            </div>
       
        </div>
      ))}
    </div>
  );
};
