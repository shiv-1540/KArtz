import React from "react";
import Footer from "../components/comp/Footer";
import landnav from "../assets/imgs/KArtz.png";
import shiv from "../assets/profile/shiv.jpg";
import atish from "../assets/profile/atish.jpg";
import manavi from "../assets/profile/manavi.jpg";
import FAQSection from "../components/comp/FAQSection";
import navcontact from "../assets/imgs/contactlogo.png"
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate=useNavigate();

  const handleShopNow=()=>{
    toast(
      "You need to Login First!",
      {
        icon: "⚠️", // Use an appropriate icon for a warning
        style: {
          background: "#fbbf24", // Tailwind warning yellow color
          color: "#1a202c", // Dark text for contrast
        },
      }
    );
    navigate('/login');
  }
  const handleSendMessage=()=>{
    toast(
      "You need to login first then go to contact section.!",
      {
        icon: "⚠️", // Use an appropriate icon for a warning
        style: {
          background: "#fbbf24", // Tailwind warning yellow color
          color: "#1a202c", // Dark text for contrast
        },
      }
    );
    navigate('/login');
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
        <div className=" bg-opacity-50">
          <img
            src={landnav}
            alt="Landing nav"
            className="w-full h-full object-cover"
          />
      </div>

      {/* Hero Section */}
      <header className="relative bg-gray-900 text-white py-20">
       
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Welcome to <span className="text-yellow-400">KArtz</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Discover a world of creativity with our unique posters and frames
            designed to elevate your space.
          </p>
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-yellow-600 transition duration-300" onClick={handleShopNow}>
              Shop Now
          </button>
          
        </div>
      </header>

      {/* About Us Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At KArtz, we believe that art should be accessible to everyone. Our
            mission is to provide high-quality, unique posters that inspire
            creativity and elevate your space.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member */}
            {[shiv, atish, manavi].map((member, index) => {
              const names = ["Shivshankar Ghyar", "Atish Shinde", "Manavi Pawar"];
              const roles = [
                "Founder & CEO",
                "Marketing Manager",
                "Art Director",
              ];
              const bios = [
                "Shivshankar is passionate about art and design, leading the team with a vision to make art accessible to everyone.",
                "Atish is responsible for spreading the word about KArtz and ensuring our customers have the best experience.",
                "Manavi oversees the design and quality of our posters, ensuring that every piece is a work of art.",
              ];
              return (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg shadow-md p-6 text-center"
                >
                  <img
                    src={member}
                    alt={names[index]}
                    className="w-52  mx-auto mb-4 border-4 border-gray-600"
                  />
                  <h3 className="text-xl font-bold">{names[index]}</h3>
                  <p className="text-yellow-400 font-medium">{roles[index]}</p>
                  <p className="text-gray-300 mt-3">{bios[index]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
        <FAQSection/>

      {/* Contact Us Section */}
      <section className="py-16 bg-gray-800 text-white flex">
        <div className="max-w-2xl mb-2">
             <img src={navcontact} alt="Nav Contact" className="p-5"/>
        </div>
        <div className="max-w-22xl mx-auto text-center mt-5">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-6">
            Have questions or need assistance? <br/>Reach out to us and we’ll get
            back to you as soon as possible.
          </p>
          <form className="space-y-6 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="border p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 text-gray-800"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 text-gray-800"
              required
            />
            <textarea
              placeholder="Your Message"
              className="border p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 text-gray-800"
              rows="6"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-yellow-500 transition duration-300" onClick={handleSendMessage}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Login/Sign Up Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Login / Sign Up</h2>
        <p className="text-lg text-gray-600 mb-6">
          Join us to enjoy exclusive offers and updates!
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="/login"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </a>
          <a
            href="/registration"
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
