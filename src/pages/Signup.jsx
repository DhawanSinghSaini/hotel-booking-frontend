import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=2335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password || !username) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("https://hotel-booking-backend-9vmc.onrender.com/auth/signup", {
        //  Corrected route to /auth/signup
        email,
        password,
        username,
      });

      if (response.status === 201) {
        // Optionally, store the token and redirect
        const { token } = response.data;
        if (token) {
          localStorage.setItem("token", token);
        }
        alert("User created successfully!"); // changed to alert
        navigate("/login"); // Redirect to the login page
      } else {
        setError("Signup failed.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Signup error:", err);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpForm}>
        <h1>Step into Comfort, Sign Up Now!</h1>
        <p>
          Create your account and unlock exclusive stays, deals, and
          experiences.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.signUpImage}>
        <img src={imageUrl} alt="Relaxing Hotel Scene" />
      </div>
    </div>
  );
}

export default Signup;
