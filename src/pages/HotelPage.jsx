import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./HotelPage.module.css";
import RoomCard from "../components/RoomCard";

const allAmenities = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Spa Services",
  "Fitness Center",
  "Restaurant",
  "Bar/Lounge",
  "24-Hour Room Service",
  "Concierge Service",
  "Free Parking",
  "Airport Shuttle",
  "Business Center",
  "Laundry Service",
  "Meeting Rooms",
  "Pet-Friendly",
  "Non-Smoking Rooms",
];

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]; // Corrected line
  }

  return array;
}

const HotelPage = () => {
  const shuffledAmenities = shuffleArray([...allAmenities]);
  const displayedAmenities = shuffledAmenities.slice(0, 10);
  const amenitiesLine1 = displayedAmenities.slice(0, 5);
  const amenitiesLine2 = displayedAmenities.slice(5, 10);

  const roomId = [
    "67fc0f7e27bce24ce2896161",
    "67fc0f7e27bce24ce2896162",
    "67fc0f7e27bce24ce2896163",
    "67fc0f7e27bce24ce2896164",
  ];

  const [openPolicies, setOpenPolicies] = useState({});
  const [openMainPolicy, setOpenMainPolicy] = useState(false); // State for the main "Hotel Policies" dropdown

  const togglePolicy = (policyType) => {
    setOpenPolicies((prev) => ({
      ...prev,
      [policyType]: !prev[policyType],
    }));
  };

  const toggleMainPolicy = () => {
    setOpenMainPolicy(!openMainPolicy);
  };

  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:3000/hotels/${hotelId}`); // Use the provided URL
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setHotel(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!hotel) {
    return <div>Hotel Not Found</div>;
  }

  return (
    <div>
      <div className={styles.hotelContainer}>
        <div className={styles.hotelGrid}>
          <div className={styles.hotelImageColumn}>
            <div className={styles.hotelImageWrapper}>
              <img
                src={hotel.imageUrls}
                alt={hotel.name}
                className={styles.hotelImage}
              />
            </div>
          </div>

          <div className={styles.hotelDescriptionColumn}>
            <div className={styles.hotelDescriptionCard}>
              <h1 className={styles.hotelName}>{hotel.name}</h1>
              <p className={styles.hotelAddress}>
                789 Grand Avenue, Downtown District, {hotel.place}
              </p>
              <p className={styles.hotelRating}>⭐⭐⭐⭐⭐</p>
              <p className={styles.hotelDescription}>{hotel.description}</p>
              <h3 className={styles.amenitiesSubheading}>Amenities</h3>
              <div className={styles.amenitiesListContainer}>
                <ul
                  className={
                    styles.amenitiesList + " " + styles.amenitiesListLeft
                  }
                >
                  {amenitiesLine1.map((amenity, index) => (
                    <li key={index} className={styles.amenityItem}>
                      {amenity}
                    </li>
                  ))}
                </ul>
                <ul
                  className={
                    styles.amenitiesList + " " + styles.amenitiesListRight
                  }
                >
                  {amenitiesLine2.map((amenity, index) => (
                    <li key={index + 5} className={styles.amenityItem}>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.roomsContainer}>
        <div className={styles.roomsHeading}>
          <h2>Available Rooms</h2>
          <p>Click on the respective room to book your stay</p>
        </div>
        <div className={styles.roomsList}>
          {roomId.map((roomId) => (
            <RoomCard key={roomId} roomId={roomId} hotelId = {hotelId}/>
          ))}
        </div>
      </div>

      <div className={styles.hotelPolicyContainer}>
        <div className={`${styles.hotelPolicy} ${styles.whiteBg}`}>
          {" "}
          {/* Added whiteBg */}
          <div className={styles.mainPolicyHeader} onClick={toggleMainPolicy}>
            <h2 className={`${styles.hotelPolicyLabel} ${styles.blackText}`}>
              Hotel Policies
            </h2>{" "}
            {/* Added blackText */}
            <span className={styles.chevronIcon}>
              {openMainPolicy ? "▲" : "▼"}
            </span>
          </div>
          {openMainPolicy && (
            <div className={styles.hotelPolicyContent}>
              <div className={styles.policySection}>
                <div
                  className={styles.policyHeader}
                  onClick={() => togglePolicy("general")}
                >
                  <h3 className={styles.blackText}>General Policies</h3>{" "}
                  {/* Added blackText */}
                  <span className={styles.chevronIcon}>
                    {openPolicies.general ? "▲" : "▼"}
                  </span>
                </div>
                {openPolicies.general && (
                  <div className={styles.policyBody}>
                    <p className={styles.blackText}>
                      <strong>Check-in:</strong> 11:00 AM - 12:00 AM. Guests are
                      required to present a valid government-issued photo
                      identification at check-in. The hotel reserves the right
                      to refuse check-in if valid identification is not
                      provided.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Check-out:</strong> Before 12:00 PM. Late
                      check-out is subject to availability and may incur
                      additional charges. Please contact the front desk on the
                      morning of your departure if you require a late check-out.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Early Departure:</strong> In the event of an early
                      departure, you may be charged for the full duration of
                      your original booking. Please notify the front desk as
                      soon as possible if your plans change.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Reservation Confirmation:</strong> A valid credit
                      card is required to guarantee your reservation. Please
                      ensure the name on the credit card matches the name on the
                      reservation. The hotel is not responsible for errors in
                      reservations made through third-party websites.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Cancellation:</strong> Cancellation policies vary
                      by room type and rate. Please refer to your reservation
                      confirmation for specific details. Some rates are
                      non-refundable. Cancellations must be made by the
                      specified deadline to avoid charges.
                    </p>
                    <p className={styles.blackText}>
                      <strong>No-Show Policy:</strong> In the event of a
                      no-show, the first night's stay (or the entire
                      reservation) may be charged to the credit card on file. It
                      is your responsibility to notify the hotel of any changes
                      to your arrival time.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Room Assignment:</strong> While we strive to honor
                      specific room requests (e.g., floor, view), room
                      assignments are subject to availability upon arrival and
                      cannot be guaranteed.
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.policySection}>
                <div
                  className={styles.policyHeader}
                  onClick={() => togglePolicy("payment")}
                >
                  <h3 className={styles.blackText}>Payment Policies</h3>{" "}
                  {/* Added blackText */}
                  <span className={styles.chevronIcon}>
                    {openPolicies.payment ? "▲" : "▼"}
                  </span>
                </div>
                {openPolicies.payment && (
                  <div className={styles.policyBody}>
                    <p className={styles.blackText}>
                      <strong>Accepted Payment Methods:</strong> We accept all
                      major credit cards (Visa, MasterCard, American Express,
                      Discover), and debit cards. Cash payments may be accepted,
                      but a credit card may still be required at check-in.
                      Personal checks are not accepted.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Currency:</strong> All rates are charged in INR
                      (₹). Foreign currency exchange rates are subject to
                      change.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Taxes:</strong> All rates are subject to
                      applicable taxes, including [List Specific Taxes, e.g.,
                      occupancy tax, sales tax, VAT]. Tax rates are subject to
                      change without notice.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Incidental Charges:</strong> A hold may be placed
                      on your credit card at check-in for estimated incidental
                      charges (e.g., room service, minibar, movies, damages).
                      The hold will be released upon check-out, less any actual
                      charges. The amount of the hold may vary depending on the
                      length of stay and room type.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Pre-Authorization:</strong> Your credit card may
                      be pre-authorized prior to arrival to verify the card's
                      validity and ensure sufficient funds are available. This
                      pre-authorization is not a charge, but it may temporarily
                      reduce your available credit.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Payment at Check-out:</strong> Full payment for
                      your stay, including any incidental charges, is due upon
                      check-out.
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.policySection}>
                <div
                  className={styles.policyHeader}
                  onClick={() => togglePolicy("room")}
                >
                  <h3 className={styles.blackText}>Room Occupancy</h3>{" "}
                  {/* Added blackText */}
                  <span className={styles.chevronIcon}>
                    {openPolicies.room ? "▲" : "▼"}
                  </span>
                </div>
                {openPolicies.room && (
                  <div className={styles.policyBody}>
                    <p className={styles.blackText}>
                      <strong>Maximum Occupancy:</strong> Maximum occupancy per
                      room is strictly enforced. Additional guests may be
                      subject to extra charges or may not be accommodated. Fire
                      code regulations dictate maximum occupancy limits.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Children:</strong> Children 5 and under stay free
                      when sharing a room with a paying adult, using existing
                      bedding. Cribs and rollaway beds may be available for an
                      additional fee and are subject to availability.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Rollaway Beds/Cribs:</strong> Rollaway beds and
                      cribs are available upon request and subject to
                      availability. Additional charges may apply. Please request
                      these items in advance of your arrival.
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.policySection}>
                <div
                  className={styles.policyHeader}
                  onClick={() => togglePolicy("other")}
                >
                  <h3 className={styles.blackText}>Other Policies</h3>{" "}
                  {/* Added blackText */}
                  <span className={styles.chevronIcon}>
                    {openPolicies.other ? "▲" : "▼"}
                  </span>
                </div>
                {openPolicies.other && (
                  <div className={styles.policyBody}>
                    <p className={styles.blackText}>
                      <strong>Pets:</strong> Pets are allowed in designated
                      pet-friendly rooms only, with a non-refundable surcharge
                      of ₹5000 per stay. Certain restrictions may apply (e.g.,
                      size, breed, number of pets). Guests are responsible for
                      any damage caused by their pets and must adhere to hotel
                      pet policies. Pets must be leashed in public areas.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Smoking:</strong> This is a non-smoking property.
                      Smoking is strictly prohibited in all guest rooms,
                      balconies, and public areas. A cleaning fee of [Amount]
                      will be charged for violations. This policy includes
                      e-cigarettes and vaping.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Alcohol Policy:</strong> Guests must be 20 years
                      of age or older to purchase or consume alcoholic
                      beverages. The hotel reserves the right to refuse service
                      to intoxicated guests.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Guest Behavior:</strong> Guests are expected to
                      conduct themselves in a respectful manner and not disturb
                      other guests. The hotel reserves the right to ask guests
                      to leave without a refund if their behavior is deemed
                      unacceptable, disruptive, or violates hotel policy.
                      Excessive noise, parties, or illegal activities are
                      strictly prohibited.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Damages to Hotel Property:</strong> Guests will be
                      held responsible for any damages caused to hotel property
                      during their stay, beyond normal wear and tear. The cost
                      of repairs or replacement will be charged to the guest's
                      credit card on file.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Personal Belongings:</strong> The hotel is not
                      responsible for the loss of or damage to guests' personal
                      belongings. Safes are available in guest rooms for your
                      convenience. Please do not leave valuables unattended in
                      public areas.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Accessibility:</strong> The hotel offers
                      accessible rooms and facilities. Please contact the hotel
                      directly for specific details and to request
                      accommodations. We are committed to providing reasonable
                      accommodations for guests with disabilities.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Disturbances:</strong> To ensure all guests have a
                      pleasant stay, please be mindful of noise levels,
                      especially between 10:00PM and 07:00AM (quiet hours).
                      Excessive noise during these hours may result in a warning
                      or eviction.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Force Majeure:</strong> The hotel is not
                      responsible for any failure to provide services due to
                      events beyond its control, including but not limited to
                      acts of God, natural disasters, fire, strikes, government
                      actions, or other unforeseen circumstances.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Policy Changes:</strong> These policies are
                      subject to change at any time without prior notice. It is
                      the guest's responsibility to review the most current
                      version of the hotel policies.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Fire Safety:</strong> Guests are expected to
                      familiarize themselves with the hotel's fire safety
                      procedures and emergency exits. Tampering with fire safety
                      equipment is strictly prohibited.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Housekeeping Services:</strong> Standard
                      housekeeping services are provided daily. Please notify
                      the front desk if you require additional services or wish
                      to opt out of daily service.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Internet Access:</strong> Complimentary Wi-Fi is
                      available for all guests. The hotel is not responsible for
                      the speed or reliability of the internet service. Use of
                      the internet service is subject to our terms of service.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Parking:</strong> [Parking details, e.g., Free
                      self-parking, Valet parking available for a fee, Parking
                      garage height restrictions]. The hotel is not responsible
                      for damage to or theft of vehicles parked on hotel
                      property.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Pool/Fitness Center:</strong> [Pool and Fitness
                      Center hours, rules, and any restrictions, e.g.,
                      adult-only hours, proper attire required]. Use of these
                      facilities is at your own risk.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Visitors:</strong> Hotel guests are responsible
                      for the conduct of their visitors. Visitors may be
                      required to register at the front desk and may be
                      restricted to certain areas of the hotel. Overnight
                      visitors may be subject to additional charges.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Security:</strong> The hotel employs security
                      measures to ensure the safety of our guests and staff.
                      Guests are encouraged to report any suspicious activity to
                      the front desk or security personnel.
                    </p>
                    <p className={styles.blackText}>
                      <strong>Left Items:</strong> The hotel is not responsible
                      for items left behind in guest rooms. Items found will be
                      kept for a period of [Number] days. Guests are responsible
                      for the cost of shipping any items that are requested to
                      be returned.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
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
};

export default HotelPage;
