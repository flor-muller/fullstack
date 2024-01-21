import React, { useState, useEffect } from 'react';
import './../../styles/gameImages.css';
import { endpointHost } from '../../variables/endpoint';

export default function GameImages({ gameId }) {
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

  const handleSlideChange = (direction) => {
    if (imageUrls.length > 0) {
      const newIndex = (activeIndex + imageUrls.length + direction) % imageUrls.length;
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="divImages">
      {loading ? (
        <p>Cargando imágenes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="carousel-container">
          {imageUrls.length > 0 ? (
            <div className="arrows">
              <button
                className={`prev-arrow ${activeIndex === 0 ? 'hidden' : ''}`}
                onClick={() => handleSlideChange(-1)}
              >
                &lt;
              </button>
              <img src={imageUrls[activeIndex].split('?')[0]} alt="Imagen del producto" />
              <button
                className={`next-arrow ${activeIndex === imageUrls.length - 1 ? 'hidden' : ''}`}
                onClick={() => handleSlideChange(1)}
              >
                &gt;
              </button>
            </div>
          ) : (
            <p>No se encontraron imágenes para este producto.</p>
          )}
        </div>
      )}
    </div>
  );
}
