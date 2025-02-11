import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaMapMarked } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlaceCardItem({ place }) {
  const [imageUrl, setImageUrl] = useState(''); // State to store the fetched image URL
  const PEXELS_API_KEY = '5jKOGLgqwUWrz6d4PPZnJnwS0D87oxlJEaKbsp0uSN5tTSfb71dnI07M'; // Replace with your Pexels API key

  // Fetch image based on the place name
  const fetchImage = async (placeName) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: PEXELS_API_KEY, // Your Pexels API key
        },
        params: {
          query: placeName, // Search for the place name
          per_page: 1, // Fetch 1 image
        },
      });
      const imageUrl = response.data.photos[0]?.src?.medium; // Extract the image URL
      if (imageUrl) {
        setImageUrl(imageUrl); // Set the fetched image URL
      } else {
        setImageUrl('/images/default-image.jpg'); // Fallback to a default image if no result
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageUrl('/images/default-image.jpg'); // Fallback image in case of an error
    }
  };

  // Call the image fetching function when the component mounts or when place.placeName changes
  useEffect(() => {
    if (place?.placeName) {
      fetchImage(place.placeName);
    }
  }, [place?.placeName]); // Dependency array makes sure the effect runs when place.placeName changes

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target="_blank">
      <div className='border border-brown-500 rounded-xl p-4 mt-4 flex gap-6 hover:scale-105 transition-all hover:shadow-lg cursor-pointer bg-brown-50'>
        {/* Use the fetched image URL */}
        <img src={imageUrl || '/images/default-image.jpg'} className='w-[130px] h-[130px] rounded-xl' alt={place.placeName} />
        <div className='flex flex-col justify-between'>
          <h2 className='text-xl font-bold text-brown-700'>
            <span className='text-brown-800'>Place Name:</span> {place.placeName}
          </h2>

          <p className='text-sm text-gray-600'>
            <span className='font-bold text-brown-700'>Details:</span> {place.placeDetails}
          </p>

          <h3 className='font-medium text-sm text-orange-600'>
            <span className='font-bold'>Best Time: </span> {place.bestTimeToVisit}
          </h3>

          <h4 className='mt-2 text-sm text-brown-500'>
            <span className='font-bold'>🕒: </span>{place.timeToTravel}
          </h4>

          {/* Uncomment if you want to add a button for map */}
          {/* <Button size="sm" className='mt-2 bg-brown-600 text-white hover:bg-brown-700'>
            <FaMapMarked />
          </Button> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
