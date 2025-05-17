import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logoImage from '../assets/logo3.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login after logout
    };

    window.addEventListener('login', handleLogin);
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('login', handleLogin);
      window.removeEventListener('logout', handleLogout);
    };
  }, [navigate]);

  const logoutUser = () => {
    window.dispatchEvent(new Event('logout')); // Trigger logout event
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImage} alt="Ivory Hotel Logo" className={styles.logoImage} />
        </Link>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link to="/hotels" className={styles.navLink}>Hotels</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about" className={styles.navLink}>About</Link>
          </li>
        </ul>
      </div>

      <div className={styles.authSection}>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className={styles.authLink}>Dashboard</Link>
            <button onClick={logoutUser} className={styles.authLink} style={{ cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.authLink}>Login</Link>
            <Link to="/register" className={styles.authLink}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
