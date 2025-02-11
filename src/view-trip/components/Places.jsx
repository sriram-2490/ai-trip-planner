import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function Places({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  return (
    <div>
      <h2 className='font-bold text-lg mt-5'>Places to Visit</h2>
      {itinerary && Object.keys(itinerary)
        .sort((a, b) => parseInt(a.replace('day', '')) - parseInt(b.replace('day', '')))
        .map((day, index) => (
          <div key={index} className='mt-5'>
            <h2 className='font-medium text-lg'>{day}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
            {itinerary[day]?.activities?.map((place, placeIndex) => (
              <div key={placeIndex}>
                <PlaceCardItem place={place}/>
              </div>
            ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Places;
