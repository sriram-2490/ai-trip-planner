import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { BsSendFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState(''); // State for storing the image URL
  const [loading, setLoading] = useState(true); // Loading state to show loading message

  const PEXELS_API_KEY = '5jKOGLgqwUWrz6d4PPZnJnwS0D87oxlJEaKbsp0uSN5tTSfb71dnI07M'; // Replace with your Pexels API key

  // Function to fetch image based on location
  const fetchImage = async (location) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: PEXELS_API_KEY, // Use your Pexels API key
        },
        params: {
          query: location, // Use the location name to search for images
          per_page: 1, // Fetch only 1 image
        },
      });
      const imageUrl = response.data.photos[0]?.src?.medium; // Get the medium-sized image
      if (imageUrl) {
        setImageUrl(imageUrl); // Update state with fetched image URL
      } else {
        setImageUrl('/image.jpg'); // Fallback image
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageUrl('/image.jpg'); // Fallback image in case of error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Ensure useEffect is always called
  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      fetchImage(trip.userSelection.location.label); // Fetch image when location is available
    }
  }, [trip?.userSelection?.location?.label]); // Run effect when location changes

  // Check if trip and userSelection exist before rendering
  if (!trip || !trip.userSelection) {
    return <p>Loading trip details...</p>; // Display loading or error message if data is missing
  }

  return (
    <div>
      {/* Show loading text until image is fetched */}
      {loading ? (
        <p>Loading image...</p>
      ) : (
        <img src={imageUrl} className='h-[340px] w-full object-cover rounded-xl' alt="Trip Image" />
      )}
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>
            {trip.userSelection.location?.label}
            <div className='flex gap-5 mt-5'>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                {trip.userSelection.noofDays} Days
              </h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                {trip.userSelection.budget} Budget
              </h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                No of Travelers: {trip.userSelection.traveler}
              </h2>
            </div>
          </h2>
        </div>
        <Button><BsSendFill /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
