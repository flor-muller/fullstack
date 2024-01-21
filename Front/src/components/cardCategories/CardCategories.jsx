import * as React from 'react';
import { CardContent, Typography, Box, CardActions, Button } from '@mui/material';
import './cardCategories.css'
import { useGetDataArray } from '../../hooks/useGetDataArray';
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { endpointHost } from '../../variables/endpoint';

export const endpointCategory = `${endpointHost}/categories/list`

export default function CardCategories() {
  
  const {values} = useGetDataArray(endpointCategory);
  console.log(values);
  
  const navigate = useNavigate();


  return (
    <Box className="main" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
    {
      values?.map((item) => (
        <div className="cardCategories" key={item.category_id}>
          <CardContent className="containerJuegos" sx={{ 
            backgroundColor: item.color, 
            textAlign: "center", 
            display: "flex", 
            alignItems: "center", 
            flexDirection: "column", 
            "&:hover": {
              backgroundColor: "var(--third-color)",
              color:"var(--fifth-color)", 
              borderRadius:"42% 58% 31% 69% / 76% 22% 78% 24%",
              }}}>
            <Typography className="titleCategories" gutterBottom variant="h5" component="div" sx={{ align: "center", fontSize: "30px", fontWeight: "bold", fontFamily:"Raleway" }}>
              {item.catName}
            </Typography>
            <Typography className="descriptionCategories" variant="body2" sx={{ fontSize:"15px" , fontFamily:"Raleway", color: "white"}}>
              {item.productQuantity} Juegos
            </Typography>
            <CardActions>
              <ExpandMoreIcon sx={{ color: "white", fontSize: "40px" }} onClick={() => navigate(`/resultscategories/${item?.catName}`)} />      
            </CardActions>
          </CardContent>

      </div>
    ))}
    </Box>
  );
}