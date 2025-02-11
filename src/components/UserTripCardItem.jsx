import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch image from Pexels API
    const fetchImage = async () => {
      const query = trip?.userSelection?.location?.label || 'nature'; // Default to 'nature' if no location label
      const apiKey = '5jKOGLgqwUWrz6d4PPZnJnwS0D87oxlJEaKbsp0uSN5tTSfb71dnI07M';
      
      try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
          headers: {
            Authorization: apiKey,
          },
        });

        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setImageUrl(data.photos[0].src.medium); // Use 'medium' size image
        }
      } catch (error) {
        console.error("Error fetching image from Pexels:", error);
      }
    };

    fetchImage();
  }, [trip]);

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all '>
      {imageUrl ? (
        <img 
          className="object-cover rounded-xl w-[300px] h-[200px]"  // Fixed width and height
          src={imageUrl} 
          alt="Trip Location" 
        />
      ) : (
        <div>Loading image...</div> // Loading state while fetching image
      )}
      <div>
        <h2 className="text-lg font-bold mt-5">
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noofDays} Days Trip with {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;
