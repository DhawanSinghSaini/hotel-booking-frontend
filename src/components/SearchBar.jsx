import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIconUrl from '../assets/search.svg'; // Make sure the path is correct

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={styles.searchBar}>
      <label htmlFor="searchInput" className={styles.searchLabel}>
        Enter city or hotel name
      </label>
      <input
        type="text"
        id="searchInput"
        placeholder="Enter city or hotel name"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className={styles.searchInput}
        aria-describedby="search-instructions" // Optional: Associate with help text
      />
      <button
        onClick={handleSearchClick}
        className={styles.searchButton}
        aria-label="Search"
      >
        <img src={searchIconUrl} alt="Search" className={styles.searchIcon} />
      </button>
      {/* Optional: Add help text for screen readers */}
      {/* <div id="search-instructions" className={styles.visuallyHidden}>
        Press Enter to search after typing.
      </div> */}
    </div>
  );
}

export default SearchBar;