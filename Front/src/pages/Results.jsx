import React from 'react';
import { useState } from 'react';
import { CardGame } from '../components/cardGame/CardGame';
import Pagination from '@mui/material/Pagination';
import {Box} from '@mui/material';
import '../components/cardGame/cardGame.css'
import '../styles/results.css'

const Results = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box className="boxResults"> 
      <h1 className='title'>Resultados de tu búsqueda</h1> 
      <div className="boxJuegos">
        <CardGame values = {currentItems}/>
      </div>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Pagination sx={{ m: 15}} size="large" variant="outlined" color="primary" showFirstButton showLastButton count={totalPages} page={currentPage} onChange={handlePageChange} />
      </Box>
    </Box>
  );
}

export default Results