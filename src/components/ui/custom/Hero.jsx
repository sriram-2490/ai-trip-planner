import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="text-[#8B4513]">Discover Your Next Adventure with AI:</span>
                <br />
                Personalized Itineraries at Your Fingertips
              </h1>
              <div className="w-20 h-2 bg-green-700 my-4"></div>
              <p className="text-xl mb-10">
                Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
              </p>
              <Link to={'/create-trip'}>
                <Button className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">
                  Get Started, It's Free
                </Button>
              </Link>
            </div>
          </header>
        </div>
      </div>
      <img
        src="https://w0.peakpx.com/wallpaper/869/542/HD-wallpaper-world-traver-sky-travel.jpg"
        alt="Leafs"
        className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
}

export default Hero;
