

function HotelDetail() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`https://hotel-booking-backend-9vmc.onrender.com/hotels/${hotelId}`); // Use the provided URL
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
      <h1>Hotel Details</h1>
      <p>Hotel ID: {hotelId}</p>
      {/* Display other hotel information */}
      <p>Name: {hotel.name}</p>
      <p>Description: {hotel.description}</p>
    </div>
  );
}

export default HotelDetail;
