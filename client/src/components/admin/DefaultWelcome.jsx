import React from 'react';
import { useParams } from 'react-router-dom';

const DefaultWelcome = () => {
  const { username } = useParams(); // Destructure username from useParams

  return (
    <div className="flex flex-col items-center justify-center h-70vh bg-gradient-to-br from-green-600 to-yellow-500 text-white px-4">
      <div className="bg-gradient-to-r from-black/10 to-white/20 backdrop-blur-xl rounded-lg shadow-xl p-6 max-w-2xl text-center">
        <h1 className="text-2xl font-extrabold tracking-tight mb-6">
          Welcome to <span className="text-yellow-300">KArtz</span>, {username}!
        </h1>
        <p className="text-lg text-gray-200 leading-relaxed mb-8">
          You’re the driving force behind our vision. Get ready to revolutionize 
          the marketplace and empower businesses!
        </p>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-yellow-200 mb-4">Your Role as an Admin:</h3>
          <ul className="text-left space-y-3 text-gray-100">
            <li className="flex items-center gap-2">
              <span className="inline-block bg-yellow-300 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold">
                1
              </span>
              Oversee user accounts & permissions.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block bg-yellow-300 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold">
                2
              </span>
              Manage product listings & inventory.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block bg-yellow-300 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold">
                3
              </span>
              Analyze performance metrics & sales.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block bg-yellow-300 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold">
                4
              </span>
              Promote campaigns & scale our success!
            </li>
          </ul>
        </div>
        <blockquote className="bg-green-700/60 text-white italic text-lg px-6 py-4 rounded-lg border-l-4 border-yellow-300 mb-6">
          “Greatness is not what you have. It's what you give. Let's make a difference, {username}.” 
          <br />
          <span className="font-bold block text-right mt-2">— Team KArtz</span>
        </blockquote>
        <button className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105">
          Start Your Journey 🚀
        </button>
      </div>
    </div>
  );
};

export default DefaultWelcome;
