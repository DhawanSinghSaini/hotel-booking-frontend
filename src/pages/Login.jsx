import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const imageUrl = "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('https://hotel-booking-backend-9vmc.onrender.com//auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event('login'));
        navigate('/');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginImage}>
        <img src={imageUrl} alt="Hotel Poolside" />
      </div>
      <div className={styles.loginContent}>
        <h1>Welcome Back to Your Escape!</h1>
        <p>Log in to continue exploring our world of unforgettable hospitality.</p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
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
          <button type="submit" className={styles.submitButton}>SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
