import React from 'react';
import {} from '../styles/footer.css'
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import looplayLogoCirculo from '../assets/img/looplayLogoCirculo.png';
import { IconButton } from '@mui/material';

const Footer = () => {
  return (
    <footer>
    <div className='logo-footer'>
      <img src={looplayLogoCirculo} alt="logoFace" />
      <p>COPYRIGHT 2023 GRUPO 6</p>
    </div>
    
      <div className="social-media">
        <IconButton href="https://www.facebook.com/" className="social-icon">
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com/" className="social-icon">
          <Twitter />
        </IconButton>
        <IconButton href="https://www.instagram.com/" className="social-icon">
          <Instagram />
        </IconButton>
      </div>
    </footer>
  );
};

export default Footer;
