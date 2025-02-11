import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from '@/components/UserTripCardItem';

function Mytrips() {
  const navigate = useNavigate(); // useNavigate is the correct hook for navigation, not useNavigation.
    const[userTrips,setUserTrips]=useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'AITrips'), // Ensure you have access to the Firestore 'AITrips' collection
      where('userEmail', '==', user?.email)
    );
    setUserTrips([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()])
    });
  };

  return <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
    <h2 className='font-bold text-3xl'>
        My Trips
    </h2>
    <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  mt-5 gap-5'>
        {userTrips.map((trip,index)=>(
            <UserTripCardItem trip={trip}/>
        ))}
    </div>
  </div>;
}

export default Mytrips;
