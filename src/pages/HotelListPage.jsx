import React, { useState, useEffect } from 'react';
import styles from './HotelListPage.module.css';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import HotelCard from '../components/HotelCard'; // Assuming HotelCard is in components

function HotelListPage() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recommended');
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);    // Add error state

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:3000/hotels'); // Use your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHotels(data);
        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        setError(error); // Set error state
        setLoading(false);
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  // Handle search term changes
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle sort option changes
  const handleSortOption = (option) => {
    setSortOption(option);
  };

  // Function to filter hotels by search term
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to sort hotels
  const sortHotels = (hotelsToSort) => {
    switch (sortOption) {
      case 'priceLowToHigh':
        return [...hotelsToSort].sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return [...hotelsToSort].sort((a, b) => b.price - a.price);
      case 'recommended':
        return [...hotelsToSort]; // No actual sorting, just returns a new array
      case 'mostPopular':
        return [...hotelsToSort].sort(() => Math.random() - 0.5); // Shuffle the array
      default:
        return hotelsToSort;
    }
  };

  const sortedAndFilteredHotels = sortHotels(filteredHotels);

  if (loading) {
    return (
      <div className={styles.hotelListPageContainer}>
        <p>Loading hotels...</p> {/* Simple loading indicator */}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.hotelListPageContainer}>
        <p>Error: {error.message}</p> {/* Display error message */}
      </div>
    );
  }


  return (
    <div className={styles.hotelListPageContainer}>
      <div className={styles.searchSection}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <hr />
      <div className={styles.filterAndList}>
        <div className={styles.filterSection}>
          <FilterSidebar onSort={handleSortOption} />
        </div>
        <div className={styles.hotelGrid}>
          {sortedAndFilteredHotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelListPage;

