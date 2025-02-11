import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({}); // To store fetched images for each hotel

  const PEXELS_API_KEY = '5jKOGLgqwUWrz6d4PPZnJnwS0D87oxlJEaKbsp0uSN5tTSfb71dnI07M'; // Replace with your Pexels API key

  // Function to fetch image for a hotel
  const fetchHotelImage = async (hotelName) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: PEXELS_API_KEY, // Use your Pexels API key
        },
        params: {
          query: hotelName, // Use the hotel name or address as the query
          per_page: 1, // Fetch only 1 image
        },
      });
      const imageUrl = response.data.photos[0]?.src?.medium; // Get the medium-sized image
      if (imageUrl) {
        setHotelImages((prevImages) => ({
          ...prevImages,
          [hotelName]: imageUrl, // Save image URL for this hotel
        }));
      } else {
        setHotelImages((prevImages) => ({
          ...prevImages,
          [hotelName]: '/images/default-image.jpg', // Fallback image
        }));
      }
    } catch (error) {
      console.error('Error fetching hotel image:', error);
      setHotelImages((prevImages) => ({
        ...prevImages,
        [hotelName]: '/images/default-image.jpg', // Fallback image in case of error
      }));
    }
  };

  // Fetch images for each hotel when component mounts or trip data changes
  useEffect(() => {
    if (trip?.tripData?.hotelOptions) {
      trip.tripData.hotelOptions.forEach((hotel) => {
        if (hotel?.hotelName && !hotelImages[hotel.hotelName]) {
          fetchHotelImage(hotel.hotelName); // Fetch image for the hotel
        }
      });
    }
  }, [trip?.tripData?.hotelOptions, hotelImages]);

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {trip?.tripData?.hotelOptions?.map((hotel) => (
          <Link 
            key={hotel?.hotelName} // Use hotelName as the key (or hotel.id if available)
            to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} 
            target='_blank'
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img 
                src={hotelImages[hotel?.hotelName] || "/images/default-image.jpg"} 
                className='w-full h-[200px] object-cover rounded-xl' // Fixed height and object-cover for maintaining aspect ratio
                alt="Hotel"
              />
              <div className='my-3'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                <h2 className='text-sm'>Pricing💰: {hotel?.price}</h2>
                <h2 className='text-sm'>{hotel?.rating}⭐</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
