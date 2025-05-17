// client/src/components/HotelCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HotelCard.module.css';

function HotelCard({ hotel }) {
  return (
    <Link to={`/hotels/${hotel._id}`} className={styles.card}>
      {hotel.imageUrls && hotel.imageUrls.length > 0 && (
        <div className={styles.imageContainer}>
          <img src={hotel.imageUrls[0]} alt={hotel.name} className={styles.image} />
        </div>
      )}
      <div className={styles.infoContainer}>
        <div className={styles.nameAndPrice}>
          <div className={styles.nameAndCity}>
            <h3 className={styles.name}>{hotel.name}</h3>
            {hotel.place && <p className={styles.place}>{hotel.place}</p>}
          </div>
          {hotel.price && <p className={styles.priceBox}>${hotel.price}</p>}
        </div>
        {hotel.description && (
          <p className={styles.description}>{hotel.description.substring(0, 100)}...</p>
        )}
      </div>
    </Link>
  );
}

export default HotelCard;