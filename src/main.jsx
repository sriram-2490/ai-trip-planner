import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip';
import Header from './components/ui/custom/Header';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId}';
import Mytrips from './my-trips';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/view-trip/:tripId',
    element :<Viewtrip/>
  },
  {
    path: '/my-trips',
    element :<Mytrips/>
  }
]);

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <StrictMode>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </StrictMode>
  </GoogleOAuthProvider>
);
