import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faReddit, faWhatsapp, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-gray-300 py-10 w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* About Us Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
          <p className="text-sm leading-relaxed">
            We are passionate about bringing creativity and innovation to your walls. Explore our range of unique posters and frames designed to make your spaces inspiring.
          </p>
        </div>


         {/* Privacy & Security Section */}
         <div>
         <h2 className="text-xl font-semibold text-white mb-4">Privacy & Security</h2>
         <p className="text-sm leading-relaxed">
           Your trust is important to us. Learn about how we protect your privacy and keep your information secure.
         </p>
         <a
           href="/privacy"
           className="mt-4 inline-block text-sm text-blue-500 hover:underline"
         >
           Learn More
         </a>
       </div>


        {/* Contact Us Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 px-2">Contact Us</h2>
          <ul className="space-y-2 px-8">
            <li>
              <FontAwesomeIcon icon={faInstagram} className="text-pink-500 hover:text-pink-700 transition" /><span> Instagram</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faReddit} className="text-orange-500 hover:text-orange-700 transition" /><span> Reddit</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 hover:text-green-700 transition" /><span> Whatsapp</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faTwitter} className="text-blue-400 hover:text-blue-600 transition" /><span> Twitter </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faLinkedin} className="text-blue-600 hover:text-blue-800 transition" /><span> Linkdein </span>
            </li>
          </ul>
        </div>

       
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-500">
          © 2024 PosterFrame Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
