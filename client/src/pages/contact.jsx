import React from "react";
import Navbar from "../components/comp/Navbar";
import Footer from "../components/comp/footer";


const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Contact Us Section */}
      <main className="flex-grow bg-gray-100 py-8 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h1>

          <p className="text-gray-600 text-center mb-8">
            We’d love to hear from you! Feel free to reach out through any of
            the platforms below or send us a direct email.
          </p>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Section */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Email Us
              </h2>
              <a
                href="mailto:support@postershop.com"
                className="text-blue-500 hover:underline"
              >
                support@postershop.com
              </a>
              <p className="text-gray-600 mt-2">Response time: 24-48 hours</p>
            </div>

            {/* Social Media Section */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Follow Us
              </h2>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.instagram.com/postershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600"
                >
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a
                  href="https://www.facebook.com/postershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
                <a
                  href="https://www.twitter.com/postershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                </a>
              </div>
              <p className="text-gray-600 mt-4">
                Connect with us for updates and offers!
              </p>
            </div>
          </div>

          {/* Address Section */}
          <div className="mt-12 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Visit Us
            </h2>
            <p className="text-gray-600">
              PosterFrame Inc.<br />
              123 Art Street, Creativity City,<br />
              Posterland 56789
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
