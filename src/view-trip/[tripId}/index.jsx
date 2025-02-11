import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Places from '../components/Places';
import Bottom from '../components/Bottom';


function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);  // State initialized as null
    const [loading, setLoading] = useState(true);  // Track loading state

    useEffect(() => {
        if (tripId) {
            GettripData();
        }
    }, [tripId]);

    const GettripData = async () => {
        setLoading(true);  // Set loading to true when fetching starts
        try {
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setTrip(docSnap.data());  // Set trip data if exists
            } else {
                console.log("No such document!");
                toast('No trip found!');
            }
        } catch (error) {
            console.error("Error getting document:", error);
            toast('Error loading trip data!');
        } finally {
            setLoading(false);  // Set loading to false once the fetch is complete
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
           
                <InfoSection trip={trip} />
                <Hotels trip={trip}/>
                <Places trip={trip}/>
                <Bottom trip={trip}/>
           
        </div>
    );
}

export default Viewtrip;
