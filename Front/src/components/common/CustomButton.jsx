import React from 'react';
import '../../styles/main.css';


const CustomButton = ({className, text }) => {
  return (
    <button className={className}>
      {text}  
    </button>
    
  )
}


export default CustomButton