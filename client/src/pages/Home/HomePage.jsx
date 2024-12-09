// src/pages/Homepage.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/comp/Navbar";
import Card from "../../components/comp/Card";
import Footer from "../../components/comp/Footer";
import IntroAnimation from "../../components/comp/Introanime";
import CategoryFilter from "../../components/comp/CategoryFilter";
import axios from 'axios';

import { useParams } from 'react-router-dom';


const Homepage = () => {

  const { username } = useParams(); // Use useParams to get the username from the URL
 // console.log("From homepage: ", username);


  const { authData } = useContext(AuthContext); // Accessing authData from context
  const [posters, setPosters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

   console.log("From home page auth IMG: ",authData);
   
  const fetchPosters = async (category) => {
    try {
        const response = await axios.get(`http://localhost:3000/userdash/posters`, {
            params: { category: category === 'All' ? undefined : category } // Send undefined if "All" is selected
        });
        setPosters(response.data);
        console.log("From home poster data :",response.data);
    } catch (error) {
        console.error('Error fetching posters:', error);
    }
};

  useEffect(() => {
    fetchPosters(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div>
            {username ? (
                <Navbar username={username} profile={authData.profileImage}/>
            ) : (
                <p>Loading...</p> // Or some other loading state
            )}
            {/* Other components */}
      </div>

      {/* Intro Animation */}
      <IntroAnimation />

      {/* Category Filter */}
      <CategoryFilter onSelectCategory={setSelectedCategory} />

      {/* Main Content */}
      <main className="flex-grow mt-16 px-4">
        <h2 className="text-lg text-gray-900 font-bold mb-4">BEST SELLINGS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-900">
          {posters.map((poster) => (
            <Card key={poster._id} poster={poster} username={username}/>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;