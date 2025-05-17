import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logoImage from '../assets/logo3.png'; // Import your logo

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a user token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Event listeners for login/logout actions
    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    };

    window.addEventListener('login', handleLogin);
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('login', handleLogin);
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.company}>
          <img src={logoImage} alt="Ivory Stays Logo" className={styles.logo} />
          <p className={styles.slogan}>Your destination for unforgettable hotel experiences.</p>
        </div>

        <div className={styles.links}>
          <Link to="/hotels">Hotels</Link>
          <Link to="/about">About</Link>
          <a href="https://www.linkedin.com/in/dhawan-singh-saini/">Linkedin</a>

          {/* Conditional rendering of login/logout links */}
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/" onClick={() => window.dispatchEvent(new Event('logout'))}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Made By Dhawan Singh Saini
      </div>
    </footer>
  );
}

export default Footer;
