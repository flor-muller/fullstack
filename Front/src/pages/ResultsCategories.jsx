import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CardRecommendationCategories } from '../components/cardRecommendationCategories/CardRecommendationCategories';
import CardGameCategories from '../components/cardGameCategories/CardGameCategories'
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import DropdownCategories from '../components/cardGameCategories/DropdownCategories';
import { endpointHost } from '../variables/endpoint';
import '../components/cardGameCategories/cardGameCategories.css'
import '../styles/resultsCategories.css'

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const ResultsCategories = () => {
    const [ values, setValues ] = useState([]);
    const { name } = useParams();
    
    useEffect(() => {
        const endpointGames = `${endpointHost}/products/search/category`
        axios
            .get(`${endpointGames}/${name}`)
            .then(({ data }) => {
            setValues(data);
        })
            .catch((error) => {
            console.error(error);
        });
    }, [name]);

    console.log(values);

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        };
        
    const itemsPerPage = 10;
    const totalPages = Math.ceil(values.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const shuffledProducts = shuffleArray(values);
    const currentItems = shuffledProducts.slice(indexOfFirstItem, indexOfLastItem);
    

    const recomendationCategories = values.slice(0,3)

    return (
        <div className='resultsCategoriesContainer'>

            <h1 className='titleCategoriesPage'>Resultados de la Categoría {name}</h1> 

            <div className="containerDropdownCategorias">
                <DropdownCategories/>
            </div>
            
            <CardGameCategories values={currentItems}/>

            <div className="paginationCategories">
                <Pagination sx={{ m: 15, margin: "20px" }} size="large" variant="outlined" color="primary" showFirstButton showLastButton count={totalPages} page={currentPage} onChange={handlePageChange} />
            </div>
            
            <div className="boxPageRecommendationsCategories">
                <h2 className='titlePrincipalCategories'>
                    Te recomendamos estos juegos de {name}
                </h2>
                <CardRecommendationCategories values={recomendationCategories}/>
            </div>
</div>

    )
}

export default ResultsCategories