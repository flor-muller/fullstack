import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CardCategories  from '../components/cardCategories/CardCategories'
import { CardGame } from '../components/cardGame/CardGame';
import SearchBar from '../components/searchBar/SearchBar';
import '../styles/main.css';


import { useGetDataArray } from '../hooks/useGetDataArray';
import { endpointHost } from '../variables/endpoint';



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
export const endpointGames = `${endpointHost}/products/list`

const Home = () => {
    
    const {values} = useGetDataArray(endpointGames);

    const shuffledProducts = shuffleArray(values);

    return ( 
        <div>
        <div className="boxHome">
            <div className="boxSearch">
                <h2 className="titleSearch">Búsqueda de juegos para alquilar</h2>
                <div className="boxSearchTools">
                <SearchBar />
                </div>
            </div>
            <div className="boxCategorias">
                <h2 className="titleSearch">Categorías de juegos</h2>
                <CardCategories/> 
            </div>
        </div>

        <div>
            <div className="boxHomeGames">
                <h2 className="title2">Nuestras Recomendaciones</h2> 
                <CardGame values={shuffledProducts}/>
            </div>  
        </div>  
        </div>
    )
}

export default Home
