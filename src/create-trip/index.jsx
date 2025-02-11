import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import { doc, setDoc } from 'firebase/firestore';

import { MdTravelExplore } from "react-icons/md";
import { chatSession } from '@/service/AIModal';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const Navigate=useNavigate();

  const handleInputChange = (name, value) => {
    if (name === 'noofDays' && value > 5) {
      toast.warning('Please enter trip days less than or equal to 5');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log('Updated formData:', formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    console.log('User:', user); // Debugging to ensure it's checking user correctly
    if (!user) {
      setOpenDialog(true); // Open the dialog if user is not logged in
      return;
    }

    if (!formData?.location || !formData?.noofDays || !formData?.budget || !formData?.traveler) {
      toast.error('Please fill in all details before generating the trip');
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label || '')
      .replace('{totalDays}', formData?.noofDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log('AI Response:', result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Failed to generate trip, please try again.');
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      setLoading(false);
      Navigate('/view-trip/'+docId)
    } catch (error) {
      console.error('Error saving trip data:', error);
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json',
        },
      }
    ).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data)); // Store user data in local storage
      setOpenDialog(false); // Close dialog after login
      onGenerateTrip();
    }).catch(error => {
      console.error('Error fetching user profile:', error);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 mx-40">
      <h2 className="font-bold text-[#8B4513] text-3xl">
        Tell Us Your Travel Preference
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
            }}
          />
        </div>

        {/* Number of Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium mt-10">
            How many days are you planning for your trip?
          </h2>
          <Input
            placeholder="Ex: 3"
            type="number"
            min="1"
            max="5"
            onChange={(e) => handleInputChange('noofDays', Number(e.target.value))}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium mt-10">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title ? 'shadow-lg border-black' : ''
                  }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traveler Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium mt-10">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-4 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler === item.people ? 'shadow-lg border-black' : ''
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="my-10 flex items-center justify-center">
          <Button
            disabled={loading}
            onClick={onGenerateTrip}>
            {loading ? (
              <MdTravelExplore className='h-10 w-10 animate' />
            ) : 'Generate Trip'}
          </Button>
        </div>

        {/* Sign In Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" className="mt-3" alt="Logo" />
                <h2 className="font-bold text-lg mt-3">Sign in with Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button
                  onClick={login} className="w-full mt-5">
                  <FcGoogle /> Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
