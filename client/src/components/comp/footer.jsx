import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faReddit, faWhatsapp, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="relative bg-gray-800 text-gray-300 py-10 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 lg:px-8">
        {/* About Us Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">About KArtz</h2>
          <p className="text-sm leading-relaxed">
            At <span className="text-blue-400">KArtz</span>, we bring creativity and innovation to your walls. Explore our range of unique posters and frames designed to inspire your spaces.
          </p>
        </div>

        {/* Privacy & Security Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Privacy & Security</h2>
          <p className="text-sm leading-relaxed">
            Your trust is important to us. We are committed to protecting your privacy and ensuring your information is secure.
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <a href="/privacy" className="text-blue-400 hover:underline hover:text-blue-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-blue-400 hover:underline hover:text-blue-300">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/cookies" className="text-blue-400 hover:underline hover:text-blue-300">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Connect With Us</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faInstagram} className="text-pink-500 mr-3 text-xl" />
              <a href="https://instagram.com" className="hover:text-white transition">
                Instagram
              </a>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faReddit} className="text-orange-500 mr-3 text-xl" />
              <a href="https://reddit.com" className="hover:text-white transition">
                Reddit
              </a>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 mr-3 text-xl" />
              <a href="https://whatsapp.com" className="hover:text-white transition">
                WhatsApp
              </a>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faTwitter} className="text-blue-400 mr-3 text-xl" />
              <a href="https://twitter.com" className="hover:text-white transition">
                Twitter
              </a>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faLinkedin} className="text-blue-600 mr-3 text-xl" />
              <a href="https://linkedin.com" className="hover:text-white transition">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-sm text-gray-500">
          © 2024 <span className="text-blue-400">KArtz Inc.</span> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
