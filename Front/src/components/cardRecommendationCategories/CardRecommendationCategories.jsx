import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CardMedia, CardActions, Button, Rating  } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './cardRecommendationCategories.css';
import { endpointHost } from "../../variables/endpoint";

export const CardRecommendationCategories = ({ values }) => {
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
    <div className="boxGamesCategories">
      {values.length > 0 && values?.map((item, index) => (
        <div className="boxGamesCategoriesRecommendation" key={item?.game_id}>
          <div className="boxContentCategories">
            <div className="boxImagenCategoriesRecommendation">
              <img 
                className="imageRec"
                src={imageUrls[index]}
                alt={item?.gameName}
              />
            </div>

            <h5 className="cardTitleRecommendations" >
              {item?.gameName}
            </h5>


              <div className="ratingRec">
                <Rating
                name="read-only"
                readOnly
                emptyIcon={null}
                value={item?.totalScore}
                  style={{ color: 'var(--second-color)', paddingBottom: "3%", display:"flex", justifyContent:"center", alignItems: "center"}}/>
              </div>

          </div >
          <div className="buttonCategoriesRecommendations">
            <Button
              size="small"
              onClick={() => navigate(`/product/${item?.game_id}`)}
              
              sx={{
                width: "10rem",
                padding: "0",
                color: "var(--second-color)",
                fontWeight: "400",
                backgroundColor: "white",
                ":hover": {
                  backgroundColor: "var(--second-color)", 
                  color: "white", 
                },
              }}
            >
              ALQUILAR
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
