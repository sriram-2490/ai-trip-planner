import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Link, useNavigation } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    console.log(users);
  }, [users]);

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
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    }).catch(error => {
      console.error('Error fetching user profile:', error);
    });
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-50 p-2 shadow-sm flex justify-between items-center px-5 bg-white'>
      <a href='/' className="flex items-center">
        <img src="/logo.svg" className="h-8 sm:h-10" alt="Logo" />
      </a>
      <div className="flex items-center">
        {users ? (
          <div className='flex items-center gap-2 sm:gap-5'>
            <a href='/create-trip'>
              <Button variant="outline" className='rounded-lg font-bold text-xs sm:text-sm'>
                Create Trip
              </Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className='rounded-lg font-bold text-xs sm:text-sm'>
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger className='bg-transparent border-none'>
                <img
                  src={users?.picture}
                  className="h-8 w-8 rounded-lg border-none shadow-none"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className='cursor-pointer text-sm'
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
          <Button onClick={() => setOpenDialog(true)} className="text-sm">Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm w-full">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="mt-3 h-8 mx-auto" alt="Logo" />
              <h2 className="font-bold text-lg mt-3 text-center">Sign in with Google</h2>
              <p className="text-center text-sm">Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 text-sm"
              >
                <FcGoogle className="inline-block mr-2" /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
