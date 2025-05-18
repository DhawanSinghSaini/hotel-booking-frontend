import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BookingPage.module.css";
import HotelCard from "../components/HotelCard"; 
import RoomCard from "../components/RoomCard"; 
import razorpay from "../assets/Razorpay.svg";

const BookingPage = () => {
  const navigate = useNavigate();
  const { hotelId, roomId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [numPeople, setNumPeople] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // **Redirect if not logged in**
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchHotelAndRoom = async () => {
      try {
        const hotelResponse = await axios.get(`https://hotel-booking-backend-9vmc.onrender.com/hotels/${hotelId}`);
        setHotel(hotelResponse.data);

        const roomResponse = await axios.get(`https://hotel-booking-backend-9vmc.onrender.com/rooms/${roomId}`);
        setRoom(roomResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelAndRoom();
  }, [hotelId, roomId]);

  const isPaymentReady = checkInDate && checkOutDate && numPeople > 0;

  const handleConfirmBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Please log in first.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("https://hotel-booking-backend-9vmc.onrender.com/bookings", {
        hotel: hotelId,
        roomType: room.roomType,
        checkInDate,
        checkOutDate,
        numberOfGuests: numPeople,
        totalPrice: totalCost,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        alert("Booking successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const handlePayAtHotel = () => {
    setShowConfirm(true);
  };

  const handleRazorpayPayment = () => {
    setShowConfirm(false); // Disable "Confirm" button
    alert("Razorpay payment is currently disabled.");
  };

  const getRoomsNeeded = () => {
    if (!room || numPeople <= 0) return 0;
    return Math.ceil(numPeople / room.capacity);
  };

  const getNightCount = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return Math.max(1, (checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const totalCost = room ? getNightCount() * getRoomsNeeded() * room.price : 0;

  return (
    <div className={styles.parentContainer}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Confirm Your Booking</h1>
        <h2 className={styles.subheading}>Review your details and proceed to payment</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>{hotel && <HotelCard hotel={hotel} />}</div>
          <div className={styles.gridItem}>{room && <RoomCard hotelId={hotelId} roomId={roomId} />}</div>
          <div className={styles.gridItem}>
            <div className={styles.inputContainer}>
              <label htmlFor="numPeople" className={styles.label}>Number of People</label>
              <input
                type="number"
                id="numPeople"
                min="1"
                max="6"
                className={styles.inputField}
                value={numPeople}
                onChange={(e) => setNumPeople(Math.min(6, Math.max(1, e.target.value)))}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="checkInDate" className={styles.label}>Check-in Date</label>
              <input
                type="date"
                id="checkInDate"
                className={styles.inputField}
                min={new Date().toISOString().split("T")[0]}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="checkOutDate" className={styles.label}>Check-out Date</label>
              <input
                type="date"
                id="checkOutDate"
                className={styles.inputField}
                min={checkInDate || new Date().toISOString().split("T")[0]}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                disabled={!checkInDate}
              />
            </div>

            {isPaymentReady && (
              <div>
                <div className={styles.priceContainer}>
                  <div className={styles.priceRow}><span>Room Cost:</span> ₹{room?.price}</div>
                  <div className={styles.priceRow}><span>No of People:</span> {numPeople}</div>
                  <div className={styles.priceRow}><span>No of Rooms:</span> {getRoomsNeeded()}</div>
                  <div className={styles.priceRow}><span>No of Nights:</span> {getNightCount()}</div>
                  <hr />
                  <div className={styles.priceRow}><strong>Total Cost:</strong> ₹{totalCost}</div>
                </div>

                <div className={styles.paymentContainer}>
                  <h2 className={styles.paymentHeading}>Confirm and Pay</h2>
                  <div className={styles.paymentGrid}>
                    <button className={styles.payAtHotel} onClick={handlePayAtHotel}>Pay at Hotel</button>
                    <button className={styles.disabledPayment} onClick={handleRazorpayPayment}>
                      <img src={razorpay} alt="RazorPay" className={styles.paymentIcon}/>
                    </button>
                  </div>
                  {showConfirm && (
                    <button className={styles.confirmButton} onClick={handleConfirmBooking}>
                      Confirm Booking
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
