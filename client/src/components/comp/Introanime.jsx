import React from "react";
import Navbar from "../../components/comp/Navbar";
import poster1 from "../../assets/posters/poster1.png";
import poster2 from "../../assets/posters/poster2.png";
import poster3 from "../../assets/posters/poster3.png";
import poster4 from "../../assets/posters/poster4.png";
import poster5 from "../../assets/posters/poster5.png";
import './introanime.css'

const IntroAnimation = () => {
  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 bg-white shadow-md z-50 py-3">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-16 bg-gray-100 mt-4 py-5">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Discover the Art of Inspiration
          </h1>
          <p className="text-gray-600 mt-4">
            Explore our unique collection of posters and frames. Share your stories on Instagram and tag us to feature your space!
          </p>
        </div>

        {/* Scrolling Posters Section */}
        <div className="overflow-hidden relative">
          <div className="flex w-[200%] animate-scroll gap-4">
            {[poster1, poster2, poster3, poster4, poster5].map((poster, index) => (
              <img
                key={index}
                src={poster}
                alt={`Poster ${index + 1}`}
                className="w-48 h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-150"
              />
            ))}
            {[poster1, poster2, poster3, poster4, poster5].map((poster, index) => (
              <img
                key={`dup-${index}`}
                src={poster}
                alt={`Poster ${index + 6}`}
                className="w-48 h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-150"
              />
            ))}
            {[poster1, poster2, poster3, poster4, poster5].map((poster, index) => (
                <img
                  key={`dup-${index}`}
                  src={poster}
                  alt={`Poster ${index + 6}`}
                  className="w-48 h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-150"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroAnimation;
