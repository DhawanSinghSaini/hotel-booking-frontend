import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import coverImage from "../assets/cover.avif";
import feature1Image from "../assets/feature1.avif";
import feature3Image from "../assets/feature3.avif";
import feature2Image from "../assets/feature2.avif";
import HotelCard from "../components/HotelCard";

function HomePage() {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedHotels = async () => {
      try {
        const response = await fetch('http://localhost:3000/hotels'); // Use your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Get 3 random hotels
        const randomHotels = [];
        const copyData = [...data]; // Create a copy to avoid mutating original
        for (let i = 0; i < 3 && copyData.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * copyData.length);
          randomHotels.push(copyData.splice(randomIndex, 1)[0]); // Remove from copy
        }
        setFeaturedHotels(randomHotels);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching featured hotels:", error);
      }
    };

    fetchFeaturedHotels();
  }, []);

  if (loading) {
    return (
      <div className={styles.homePage}>
        <p>Loading featured hotels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.homePage}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      {/* Custom Cover Section */}
      <div className={styles.cover}>
        <div className={styles.overlay}>
          <h1 className={styles.headline}>
            Crafting Moments of Grandeur:<br></br> Experience Luxury, Redefined.
          </h1>
        </div>
      </div>

      {/* First Feature Section */}
      <div className={styles.feature1}>
        <div className={styles.feature1Text}>
          <h2 className="featurette-heading fw-normal lh-1">
            Exceptional Hospitality
          </h2>
          <p className="lead">
            Attention to detail, customized experiences, and concierge services
            that cater to individual preferences.
          </p>
        </div>
        <div className={styles.feature1Image}>
          <img
            src={feature1Image}
            alt="Exceptional Hospitality"
            className={`img-fluid ${styles.featureImage}`}
          />
        </div>
      </div>

      {/* 2nd Feature Section */}
      <div className={styles.feature1}>
        <div className={styles.feature2Image}>
          <img
            src={feature2Image}
            alt="Exceptional Hospitality"
            className={`img-fluid ${styles.featureImage}`}
          />
        </div>
        <div className={styles.feature1Text}>
          <h2 className="featurette-heading fw-normal lh-1">
            World Class Amenities
          </h2>
          <p className="lead">
            From fine dining restaurants and spas to infinity pools and
            state-of-the-art fitness centers, every facility is designed for
            indulgence and relaxation.
          </p>
        </div>
      </div>

      {/* 3rd Feature Section */}
      <div className={styles.feature1}>
        <div className={styles.feature1Text}>
          <h2 className="featurette-heading fw-normal lh-1">
            Elegant Design and Unique Atmosphere
          </h2>
          <p className="lead">
            Striking architecture, lavish interiors, and thoughtfully curated
            spaces create a serene and sophisticated environment that embodies
            luxury.
          </p>
        </div>
        <div className={styles.feature1Image}>
          <img
            src={feature3Image}
            alt="Exceptional Hospitality"
            className={`img-fluid ${styles.featureImage}`}
          />
        </div>
      </div>

      {/* Featured Hotels Section */}
      <div className={styles.featuredHotelsSection}>
        <div className="container py-5">
          <h2 className="text-center text-light mb-4">Featured Hotels</h2>
          <div className={styles.featuredHotelsRow}>
            {featuredHotels.map((hotel) => (
              <div className="col-md-4" key={hotel._id}>
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliments Section */}
      <div className={styles.complimentsSection}>
        <div className="container py-5">
          <div className={styles.complimentsRow}>
            <div className="col-md-4">
              <div className={styles.complimentCard}>
                <p className={styles.complimentText}>
                  "A truly exceptional experience. The attention to detail is
                  remarkable."
                </p>
                <p className={styles.complimentSource}>
                  - LuxuryTravelMagazine.com
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.complimentCard}>
                <p className={styles.complimentText}>
                  "The epitome of comfort and elegance. We were thoroughly
                  impressed."
                </p>
                <p className={styles.complimentSource}>- EliteVoyager.net</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.complimentCard}>
                <p className={styles.complimentText}>
                  "Unforgettable service and breathtaking ambiance. Highly
                  recommended."
                </p>
                <p className={styles.complimentSource}>
                  - GlobalLuxuryReview.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.carousel}>
        <img
          src="https://images.unsplash.com/photo-1685633224860-7655234d9cd5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 1"
          className={styles.image}
        />

        <img
          src="https://images.unsplash.com/photo-1633681926035-ec1ac984418a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 2"
          className={styles.image}
        />

        <img
          src="https://images.unsplash.com/photo-1720118509152-2df877673bee?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 3"
          className={styles.image}
        />

        <img
          src="https://images.unsplash.com/photo-1702411200201-3061d0eea802?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 4"
          className={styles.image}
        />

        <img
          src="https://images.unsplash.com/photo-1690935986319-c11e6cae84f7?q=80&w=2961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 5"
          className={styles.image}
        />

        <img
          src="https://images.unsplash.com/photo-1661354421565-74ffd9650918?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 6"
          className={styles.image}
        />

        <img
          src="https://images.unsplash.com/photo-1577969181928-69c4e557c99a?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 7"
          className={styles.image}
        />

        <img
          src="https://images.unsplash.com/photo-1590060054109-236bc2a8d3b2?q=80&w=2919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 8"
          className={styles.image}
        />
      </div>
    </div>
  );
}

export default HomePage;
