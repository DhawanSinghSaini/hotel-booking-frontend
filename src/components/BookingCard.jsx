import React, { useEffect, useState } from "react";
import styles from "./BookingCard.module.css";
import HotelCard from "./HotelCard"; // Import HotelCard component
import RoomCard from "./RoomCard"; // Import RoomCard component

const roomTypeMapping = {
  "Grand Suite": "67fc0f7e27bce24ce2896161",
  "Elite Suite": "67fc0f7e27bce24ce2896162",
  "Silver Suite": "67fc0f7e27bce24ce2896163",
  "Executive Suite": "67fc0f7e27bce24ce2896164"
};

const BookingCard = ({ booking, onCancel }) => {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`https://hotel-booking-backend-9vmc.onrender.com/hotels/${booking.hotel._id}`);
        const data = await response.json();

        if (response.ok) {
          setHotel(data);
        } else {
          console.error("Error fetching hotel details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotel();
  }, [booking.hotel._id]);

  // Get today's date for comparison
  const today = new Date();
  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);

  // Determine the appropriate note based on booking timeline
  let bookingNote = "";
  if (today < checkInDate) {
    bookingNote = `✨ We can't wait to welcome you to ${booking.hotel.name}! Your adventure begins soon, and we’re excited to make it unforgettable. Get ready for an amazing stay! 🏨🌟`;
  } else if (today >= checkInDate && today <= checkOutDate) {
    bookingNote = `😊 We hope you're having an incredible stay at ${booking.hotel.name}! If there's anything we can do to make it even better, just let us know. Enjoy every moment! 🛏️💙`;
  } else {
    bookingNote = `🌅 We truly hope you had an amazing time at ${booking.hotel.name}! Thank you for choosing us, and we'd love to welcome you back soon for another unforgettable experience. 💫✨`;
  }

  // Determine status dynamically: If check-in has passed by at least one day, mark as "Confirmed"
  const status = booking.status === "Pending" && today > checkInDate ? "Confirmed" : booking.status;

  // Cancel Booking Function
  const handleCancelBooking = async () => {
    try {
      const token = localStorage.getItem("token"); // Authentication token

      if (!token) {
        console.error("Missing authentication token.");
        return;
      }

      const response = await fetch(`http://localhost:3000/bookings/${booking._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Booking cancelled successfully:", data);
        if (onCancel) onCancel(booking._id); // Update UI after cancellation
      } else {
        console.error("Error cancelling booking:", data.message);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className={styles.bookingCard}>
      {/* Hotel Section */}
      <div className={styles.bookingHotel}>
        {hotel ? <HotelCard hotel={hotel} /> : <p>Loading hotel details...</p>}
      </div>

      {/* Room Section */}
      <div className={styles.bookingRoom}>
        <RoomCard roomId={roomTypeMapping[booking.roomType]} hotelId={booking.hotel._id} />
      </div>

      {/* Booking Details Section */}
      <div className={styles.bookingDetails}>
        <p>📅 Booking Date : {new Date(booking.createdAt).toLocaleDateString()}</p>
        <p>📥 Check-in : {checkInDate.toLocaleDateString()}</p>
        <p>📤 Check-out    : {checkOutDate.toLocaleDateString()}</p>
        <p>💰 Cost         : ₹{booking.totalPrice}</p>
        <p>👥 Guests: {booking.numberOfGuests}</p>
        <p className={`${styles.status} ${styles[status.toLowerCase()]}`}>🧐 Status : {status}</p>
        <p className={styles.bookingNote}>{bookingNote}</p> {/* Dynamic note */}
        
        {/* Show Cancel Button only if check-in has not happened yet */}
        {today < checkInDate && (
          <button className={styles.cancelButton} onClick={handleCancelBooking}>
            ❌ Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
