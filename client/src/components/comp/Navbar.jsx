import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import proflogo from '../../assets/imgs/me16.jpg'
import cartlogo1 from '../../assets/imgs/cartlogo1.png'
import cartlogo from '../../assets/imgs/112.png'
import { useParams } from 'react-router-dom';

function Navbar() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  console.log("Username from Navbar: ",username);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to a search results page with the query or handle search logic here
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
    }
  };
 
  const handlelogout1=()=>{

    navigate('/');
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-black shadow-lg">
      <div className="flex justify-between items-center px-6 py-3">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col">
          <b className="text-gray-100 text-3xl  font-bold text-align-center "><img src={cartlogo} className='w-20 h-10'/> </b>
          <p className="text-gray-100 text-1xl font-bold">BRINGING WORDS TO LIFE</p>
        </div>

     

        {/* Profile and Logout */}
        <div className="flex items-center space-x-4">
          <button 
              className="hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={() => navigate(`/home/${ username }`)}>
              Home
          </button>

           {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
              >
                Search
              </button>
           </form>

        
          <button 
            className=" hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={() => navigate(`/contactus`)}>
            Contact Us
          </button>

          <button 
                className="flex items-center space-x-2"
                onClick={() => navigate(`/cart/${username}`)}>
                    <img
                      src={cartlogo1}
                      alt="Profile Picture"
                      className="w-10 h-10 rounded-full object-cover"
                      id="profimg"
                    />
          </button>
              {/* Profile Section */}
              <button 
                  className="flex items-center space-x-2"
                  onClick={toggleDropdown}>
                  <img
                    src={proflogo}
                    alt="Profile Picture"
                    className="w-10 h-10 rounded-full object-cover"
                    id="profimg"
                  />
                  <p className="text-black ml-2">{username}</p>
              </button>


                {/* Dropdown Menu */}
           {isDropdownOpen && (
             <div className="absolute right-0 top-12 mt-2 w-48 bg-black border rounded  text-gray-200 shadow-lg">
               <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-900"
                onClick={() => navigate(`/profile/${username}`)}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-900"
                onClick={() => navigate('/settings')}
              >
                Settings
              </button>
                {/* Logout Button */}
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                onClick={handlelogout1}
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;