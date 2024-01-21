import React, { useState, useEffect } from 'react';
import "./gallery.css"
import { endpointHost } from '../../variables/endpoint';

export default function Gallery({ gameId }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductImages();
  }, []);

  const fetchProductImages = async () => {
    try {
      const response = await fetch(`${endpointHost}/product/images/${gameId}/all`);

      if (!response.ok) {
        throw new Error('Error al obtener las imágenes del producto');
      }

      const data = await response.json();
      setImageUrls(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las imágenes del producto:', error);
      setError('Error al obtener las imágenes del producto');
      setLoading(false);
    }
  };

  return (
    <div className="gallery">
      {loading ? (
        <p>Cargando imágenes...</p>
      ) : imageUrls.length > 0 ? (
        <>
          <div className="main-image">
            <img src={imageUrls[activeIndex].split('?')[0]} alt="Imagen del producto" className='mainImage' />
          </div>
          <div className="grid-images">
            {imageUrls.slice(1, 5).map((imageUrl, index) => (
              <img key={index} src={imageUrl.split('?')[0]} alt={`Imagen del producto ${index}`} className='gridImages'/>
            ))}
          </div>
        </>
      ) : (
        <p>No se encontraron imágenes para este producto.</p>
      )}
    </div>
  );
}




