import React, { useState, useEffect } from 'react';
import styles from './RoomCard.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';



const RoomCard = ({ roomId, hotelId }) => {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rooms/${roomId}`); // Use the provided URL
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setRoom(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!room) {
    return <div>Room Not Found</div>;
  }

    return (
        <Link to={`/hotels/${hotelId}/${roomId}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={room.imageUrl} alt={room.roomType} className={styles.image} />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.nameAndPrice}>
                    <div className={styles.nameAndCity}>
                        <h2 className={styles.name}>{room.roomType}</h2>
                        <p className={styles.place}>
                            {room.place} <span role="img" aria-label="capacity">🧖🏻‍♂️</span> {room.capacity}
                        </p>
                    </div>
                    <div className={styles.priceBox}>
                        <p>₹{room.price}</p>
                    </div>
                </div>
                <p className={styles.description}>{room.description}</p>
            </div>
        </Link>
    );
};

export default RoomCard;

