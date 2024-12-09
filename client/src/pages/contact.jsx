import React, { useState } from "react";
import Navbar from "../components/comp/Navbar";
import Footer from "../components/comp/Footer";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Contact Us Section */}
      <main className="flex-grow py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-10">
          <h1 className="text-3xl font-extrabold font-mono text-gray-800 text-center mb-8">
            Contact Us
          </h1>

          <p className="text-lg text-gray-600 text-center font-mono mb-10">
            Have any questions or need assistance? We'd love to hear from you!
          </p>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div className="text-center bg-gray-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Email Us
              </h2>
              <a
                href="mailto:support@postershop.com"
                className="text-blue-500 text-lg font-medium hover:underline"
              >
                support@postershop.com
              </a>
              <p className="text-gray-600 mt-2">Response time: 24-48 hours</p>
            </div>

            <div className="text-center bg-gray-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Follow Us
              </h2>
              <div className="flex justify-center space-x-8">
                <a
                  href="https://www.instagram.com/postershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 transition duration-200"
                >
                  <i className="fab fa-instagram text-3xl"></i>
                </a>
                <a
                  href="https://www.facebook.com/postershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition duration-200"
                >
                  <i className="fab fa-facebook text-3xl"></i>
                </a>
                <a
                  href="https://www.twitter.com/postershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition duration-200"
                >
                  <i className="fab fa-twitter text-3xl"></i>
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 transition duration-200"
                >
                  <i className="fab fa-whatsapp text-3xl"></i>
                </a>
              </div>
              <p className="text-gray-600 mt-4">
                Stay connected for updates and offers!
              </p>
            </ div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Get in Touch
            </h2>
            {successMessage && (
              <p className="text-green-500 text-sm text-center mb-3">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center mb-3">{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-gray-600 text-sm mb-1"
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
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 text-sm mb-1"
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
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 text-sm mb-1"
                  htmlFor="message"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;