import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import BookingCard from "../components/BookingCard.jsx"; // Import BookingCard component

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userData = localStorage.getItem("user"); // Get user object as string
        const token = localStorage.getItem("token"); // Get JWT token
  
        if (!userData || !token) {
          setError("Missing user data or authentication token.");
          setLoading(false);
          return;
        }
  
        const user = JSON.parse(userData); // Convert string to object
        const userId = user._id; // Extract _id
  
        const response = await fetch(`https://hotel-booking-backend-9vmc.onrender.com/bookings/${userId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setBookings(data);
        } else {
          setError(data.message || "Error fetching bookings.");
        }
      } catch (error) {
        setError("An error occurred while fetching bookings.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, []);
  

  return (
    <div className={styles.dashboardContainer}>
      {/* Header Section */}
      <div className={styles.dashboardHeader}>
        <h1>My Bookings</h1>
      </div>

      {/* Booking Cards Section */}
      <div className={styles.bookingList}>
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p>{error}</p>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => <BookingCard key={booking._id} booking={booking} />)
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


