import React from "react";
import Footer from "../components/comp/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">KArtz</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Discover a world of creativity with our unique posters and frames designed to elevate your space.
          </p>
          <a
            href="/shop"
            className="bg-yellow-500 text-white py-3 px-6 rounded-xl text-lg hover:bg-yellow-600 transition-all"
          >
            Shop Now
          </a>
        </div>
      </header>

      {/* About Us Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">About Us</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            At KArtz, we believe that art should be accessible to everyone. Our mission is to provide high-quality, unique
            posters that inspire creativity and elevate your space.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="bg-gray-200 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all">
              <img
                src="/path/to/photo1.jpg"
                alt="Alice Johnson"
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Alice Johnson</h3>
              <p className="text-lg text-gray-600">Founder & CEO</p>
              <p className="mt-2 text-gray-600">
                Alice is passionate about art and design, and she leads the team with a vision to make art accessible to everyone.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-gray-200 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all">
              <img
                src="/path/to/photo2.jpg"
                alt="Bob Smith"
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Bob Smith</h3>
              <p className="text-lg text-gray-600">Marketing Manager</p>
              <p className="mt-2 text-gray-600">
                Bob is responsible for spreading the word about KArtz and ensuring our customers have the best experience.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-gray-200 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all">
              <img
                src="/path/to/photo3.jpg"
                alt="Charlie Brown"
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Charlie Brown</h3>
              <p className="text-lg text-gray-600">Art Director</p>
              <p className="mt-2 text-gray-600">
                Charlie oversees the design and quality of our posters, ensuring that every piece is a work of art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-gray-800 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {/* FAQ 1 */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800">1. What types of posters do you sell?</h3>
              <p className="text-gray-600">
                We offer a variety of posters, including art prints, motivational quotes, and custom designs.
              </p>
            </div>
            {/* FAQ 2 */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800">2. How can I place an order?</h3>
              <p className="text-gray-600">
                You can place an order directly through our website by selecting your desired posters and checking out.
              </p>
            </div>
            {/* FAQ 3 */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800">3. Do you offer international shipping?</h3>
              <p className="text-gray-600">
                Yes, we ship worldwide! Shipping costs will be calculated at checkout based on your location.
              </p>
            </div>
            {/* FAQ 4 */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800">4. What is your return policy?</h3>
              <p className="text-gray-600">
                We accept returns within 30 days of purchase if the item is in its original condition. Please refer to our return policy for more details.
              </p>
            </div>
            {/* FAQ 5 */}
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-gray-800">5. Can I customize a poster?</h3>
              <p className="text-gray-600">
                Yes, we offer customization options for certain designs. Please contact our support team for more information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            Have questions or need assistance? Reach out to us and we’ll get back to you as soon as possible.
          </p>
          <form className="space-y-6 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="border p-4 w-full rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border p-4 w-full rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <textarea
              placeholder="Your Message"
              className="border p-4 w-full rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 transition"
              rows="6"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Login/Sign Up Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Login / Sign Up</h2>
        <p className="text-lg text-gray-700 mb-6">Join us to enjoy exclusive offers and updates!</p>
        <div className="flex justify-center space-x-6">
          <a
            href="/login"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all"
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
