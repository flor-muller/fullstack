import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Box } from '@mui/material';

const Layout = () => {

return (
        <Box className="div-general" >
            <Header/>
            <Outlet />
            <Footer />
        </Box>   
    )
};
export default Layout;