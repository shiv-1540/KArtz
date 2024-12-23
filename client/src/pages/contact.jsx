import React, { useState } from "react";
import Navbar from "../components/comp/Navbar";
import Footer from "../components/comp/Footer";
import contactlogo from "../assets/imgs/contactlogo.png"
import contactbanner from '../assets/imgs/contactbanner.png'
import navcontact from '../assets/imgs/navcontact.png'
import shiv from "../assets/profile/shiv.jpg";
import atish from "../assets/profile/atish.jpg";
import manavi from "../assets/profile/manavi.jpg";

import insta from '../assets/social/insta.png'
import whatsapp from '../assets/social/whatsapp.png'
import linkdein from '../assets/social/linkdein.png'
import twitter from '../assets/social/twitter.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faReddit, faWhatsapp, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/userdash/queries", { // Updated endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setErrorMessage("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-500">
        {/* Navbar */}
        <Navbar />
          

        <section  className="py-8 bg-gray-600 text-white flex">
            <div className="max-w-7xl mx-auto  shadow-lg rounded-lg p-10 mt-5">
              
            {/* Header */}
            <h1 className="text-4xl font-bold font-mono text-white-800 text-center mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-white-600 text-center mb-10">
              Have any questions or need assistance? We're here to help!
            </p>
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Email Us */}
              <div className="bg-gray-500 p-8 rounded-lg shadow flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Us</h2>
                <a
                  href="mailto:shivghyar538@gmail.com"
                  className="text-blue-500 text-lg font-medium hover:underline"
                >
                  kartzsupport03@gmail.com
                </a>
                <p className="text-white-600 mt-2"><span className="font-bold"> Response time:</span>  24-48 hours</p>
              </div>

              {/* Follow Us */}
              <div className="bg-gray-500 p-8 rounded-lg shadow flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h2>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://www.instagram.com/postershop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-600 transition duration-200"
                  >
                    <img src={linkdein} alt="linkdein" className="h-10 w-10"/>
                  </a>
                  <a
                    href="https://www.facebook.com/postershop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition duration-200"
                  >
                    <img src={insta} alt="insta" className="h-10 w-10"/>
                  </a>
                  <a
                    href="https://www.twitter.com/postershop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500 transition duration-200"
                  >
                  <img src={twitter} alt="Twitter" className="h-12 w-13"/>
                  </a>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    
                    className="text-green-500 hover:text-green-600 transition duration-200"
                  >
                    <img src={whatsapp} alt="Whatsapp" className="h-12 w-12"/>
                  </a>
                </div>
                <p className="text-white-600 mt-4 text-center">
                  Stay connected for updates and offers!
                </p>
              </div>
            </div>

          
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


        <section>
               {/* Contact Form Section */}
               <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                
               {/* Contact Image */}
               <div className="flex justify-center">
                 <img
                   src={contactlogo}
                   alt="Contact"
                   className="w-80 h-auto rounded-lg shadow-lg"
                 />
               </div>
             
               {/* Contact Form */}
               <div className="p-4 m-4">
                 {successMessage && (
                   <p className="text-green-500 text-sm text-center mb-4">
                     {successMessage}
                   </p>
                 )}
                 {errorMessage && (
                   <p className="text-red-500 text-sm text-center mb-4">
                     {errorMessage}
                   </p>
                 )}
                 <form onSubmit={handleSubmit} className="space-y-6">
                   <div>
                     <label
                       className="block text-white-600 text-md mb-1"
                       htmlFor="name"
                     >
                       Your Name
                     </label>
                     <input
                       type="text"
                       id="name"
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       required
                       className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                     />
                   </div>
                   <div>
                     <label
                       className="block text-white-600 text-md mb-1"
                       htmlFor="email"
                     >
                       Your Email
                     </label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       className="border p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 text-gray-800"
                       required
                     />
                   </div>
                   <div>
                     <label
                       className="block text-white-600 text-md mb-1"
                       htmlFor="message"
                     >
                       Your Message
                     </label>
                     <textarea
                       id="message"
                       name="message"
                       value={formData.message}
                       onChange={handleChange}
                      
                       className="border p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 text-gray-800"
                       rows="6"
                       required
                     />
                   </div>
                   <button
                     type="submit"
                     className="bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-yellow-500 transition duration-300"
                   >
                     Submit
                   </button>
                 </form>
               </div>

             </div>
        
        </section>

        
          {/* Contact Us Section */}
          <main className="flex-grow py-12 px-6 bg-gray-800">
          
           
          </main>

       {/* Footer */}
       <Footer />
    </div>
  );
};

export default Contact;