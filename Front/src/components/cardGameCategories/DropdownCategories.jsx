import React, { useState}  from 'react'
import { Box, Button, TextField, MenuItem } from '@mui/material'
import { useNavigate } from "react-router-dom";
import './cardGameCategories.css'
import { useGetDataArray } from '../../hooks/useGetDataArray';
import { endpointHost } from '../../variables/endpoint';

export const endpointCategory = `${endpointHost}/categories/list`
const DropdownCategories = () => {

    const {values} = useGetDataArray(endpointCategory);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleButtonClick = () => {
        navigate(`/resultscategories/${selectedCategory}`);
    };

    return (
        
        <Box 
        component="form"
        sx={{ 

            
            '& .MuiTextField-root': { margin: "0", m: 1, width: '25ch' },

        }}
        noValidate
        autoComplete="off"
    >

        <TextField
            sx={{ textAlign:'center', backgroundColor: "white"}}
            id="dropdown-games-categories"
            select
            label="Categoría de juegos"
            value={selectedCategory}
            onChange={handleCategoryChange}
            
        >
        
        {values.map((option) => (
            <MenuItem key={option.category_id} value={option.catName}>
            {option.catName}
            </MenuItem>
        ))}
        </TextField>

        <Button className="btnSearch" variant="contained" sx={{ 
                backgroundColor: "var(--fifth-color)", 
                color:"var(--third-color)",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                height: "56px",
                margin: "8px",
                "&:hover": {
                    backgroundColor: "var(--third-color)",
                    color: "var(--fifth-color)",
                },
        }}
        onClick={handleButtonClick}>Buscar</Button>        

    </Box>
    )
}

export default DropdownCategories