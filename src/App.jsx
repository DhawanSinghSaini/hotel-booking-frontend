import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; // Import HomePage
import Login from './pages/Login'; // Import the Login component
import Signup from './pages/Signup';
import HotelListPage from './pages/HotelListPage';
import './components/RoomCard.module.css';
import HotelPage from './pages/HotelPage.JSX';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <div>
      <Navbar />
        {/* Route for HomePage component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup/>}/>
          <Route path="/hotels" element={<HotelListPage/>}/>
          <Route path="/hotels/:hotelId" element={<HotelPage />} />
          <Route path="/hotels/:hotelId/:roomId" element={<BookingPage />} />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/about' element={ <AboutUs /> } />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
