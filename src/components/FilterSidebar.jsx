import React, { useState } from 'react';
import styles from './FilterSidebar.module.css';

function FilterSidebar({ onSort }) {
  const [selectedOption, setSelectedOption] = useState('recommended');

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSort(value);
  };

  return (
    <div className={styles.filterSidebar}>
      <h2 className={styles.filterTitle}>Sort By</h2>
      <div className={styles.optionsContainer}>
        <label className={styles.filterOption}>
          <input
            type="radio"
            value="recommended"
            checked={selectedOption === 'recommended'}
            onChange={handleOptionChange}
            className={styles.visuallyHidden} // Hide the default radio button
          />
          <span className={`${styles.customRadio} ${selectedOption === 'recommended' ? styles.radioSelected : ''}`}></span>
          Recommended
        </label>
        <label className={styles.filterOption}>
          <input
            type="radio"
            value="mostPopular"
            checked={selectedOption === 'mostPopular'}
            onChange={handleOptionChange}
            className={styles.visuallyHidden}
          />
          <span className={`${styles.customRadio} ${selectedOption === 'mostPopular' ? styles.radioSelected : ''}`}></span>
          Most Popular
        </label>
        <label className={styles.filterOption}>
          <input
            type="radio"
            value="priceLowToHigh"
            checked={selectedOption === 'priceLowToHigh'}
            onChange={handleOptionChange}
            className={styles.visuallyHidden}
          />
          <span className={`${styles.customRadio} ${selectedOption === 'priceLowToHigh' ? styles.radioSelected : ''}`}></span>
          Price: Low to High
        </label>
        <label className={styles.filterOption}>
          <input
            type="radio"
            value="priceHighToLow"
            checked={selectedOption === 'priceHighToLow'}
            onChange={handleOptionChange}
            className={styles.visuallyHidden}
          />
          <span className={`${styles.customRadio} ${selectedOption === 'priceHighToLow' ? styles.radioSelected : ''}`}></span>
          Price: High to Low
        </label>
      </div>
    </div>
  );
}

export default FilterSidebar;
