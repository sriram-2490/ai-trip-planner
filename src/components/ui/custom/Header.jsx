import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Link, useNavigation } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"; 
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const users = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  
  useEffect(() => {
    console.log(users); // Log the correct 'users' variable
  }, [users]); // Add 'users' as a dependency in useEffect
  
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  
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
      window.location.reload();
    }).catch(error => {
      console.error('Error fetching user profile:', error);
    });
  };
  
  return (
    <div className='fixed top-0 left-0 right-0 z-50 p-2 shadow-sm flex justify-between items-center px-5 bg-white'>
      <a href='/'>
        <img src="/logo.svg" width={250} alt="Logo" />
      </a>
      <div>
        {users ? (
          <div className='flex items-center gap-5'>
            <a href='/create-trip'>
              <Button variant="outline" className='rounded-lg font-bold'>
                Create Trip
              </Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className='rounded-lg font-bold'>
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger className='bg-transparent border-none'>
                <img
                  src={users?.picture}
                  className="h-[40px] w-[40px] rounded-lg border-none shadow-none"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className='cursor-pointer'
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button> // Show 'Sign In' if no user data
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="mt-3" alt="Logo" />
              <h2 className="font-bold text-lg mt-3">Sign in with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5"
              >
                <FcGoogle /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
