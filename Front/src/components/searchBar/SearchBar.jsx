import React from 'react';
import './searchBar.css';
import DropdownCategories from '../cardGameCategories/DropdownCategories';

const SearchBar = () => {

    return (

    <div className="boxJuegos">
        <DropdownCategories />
    </div>

    )
}

export default SearchBar