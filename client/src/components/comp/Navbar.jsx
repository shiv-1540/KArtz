import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import proflogo from '../../assets/imgs/me16.jpg'
import { useEffect } from 'react';

import cartlogo from '../../assets/imgs/1121.jpg'
import cartlogo2 from '../../assets/imgs/cartlogo.png'
import notifylogo from '../../assets/imgs/notifylogo.png';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { AuthContext } from "../../context/AuthContext";
import NotificationPopup from './NotificationPopup';

function Navbar() {
  const { username,profile } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { authData,logout } = useContext(AuthContext); // Accessing authData from context

  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const userId=authData.userId;
  console.log("Auth UserId from Navbar: ",authData.userId);
  console.log("Auth Username from Navbar: ",authData.username);
  //console.log("Auth profileImage from Navbar: ",authData.profileImage);
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
    toast.success("You are Logging out.!");
    logout();
    navigate('/login');
  }



        const fetchNotifications = async () => {
          try {
              const response = await fetch(`http://localhost:3000/userdash/notify/${username}`); 
              const data = await response.json();

              console.log("Notifications : ",data);
              setNotifications(data);
          } catch (error) {
              console.error('Error fetching notifications:', error);
              toast.error('Failed to load notifications.');
          }
      };

      useEffect(() => {
          fetchNotifications();
      }, []);

      const handleNotificationClick = () => {
          setShowPopup(!showPopup);
      };

      const handleClosePopup = () => {
          setShowPopup(false);
      };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 shadow-lg">
      <div className="flex justify-between items-center px-6 py-3">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col">
          <b className="text-gray-100 text-3xl  font-bold text-align-center "><img src={cartlogo} style={{width:"150px", height:"60px"}} className=''/> </b>
       {/*   <p className="text-gray-100 text-1xl font-bold">BRINGING WORDS TO LIFE</p>*/}
        </div>


        {/* Profile and Logout */}
        <div className="flex items-center space-x-4">
          <button 
              className="hover:bg-gray-900 text-black hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
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
                className="bg-green-500 hover:bg-green-900 text-white py-2 px-4 rounded transition duration-300"
              >
                Search
              </button>
           </form>

        
          <button 
            className="hover:bg-gray-900 text-black hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={() => navigate(`/contactus/${username}`)}>
            Contact Us
          </button>

          <button 
                className="flex items-center space-x-2"
                onClick={() => navigate(`/cart/${username}`)}>
                    <img
                      src={cartlogo2}
                      alt="Profile Picture"
                      className="w-8 h-8 rounded-full object-cover"
                      id="profimg"
                    />
          </button>
          
        { /* <button 
                className="flex items-center space-x-2"
                onClick={() => navigate(`/cart/${username}`)}>
                    <img
                      src={notifylogo}
                      alt="Notifications"
                      className="w-8 h-8 rounded-full object-cover"
                      id="profimg"
                    />
          </button>
        */}

          <div className="relative">
                <button 
                    className="flex items-center space-x-2"
                    onClick={handleNotificationClick} // Open the notification popup
                >
                    <img
                        src={notifylogo} // Ensure notifylogo is defined and imported
                        alt="Notifications"
                        className="w-8 h-8 rounded-full object-cover"
                        id="profimg"
                    />
                </button>
                {showPopup && (
                    <NotificationPopup notifications={notifications} onClose={handleClosePopup} />
                )}
            </div>
              {/* Profile Section */}
              <button 
                  className="flex items-center space-x-2"
                  onClick={toggleDropdown}>
                  <img
                    src={authData.profileImage||profile||proflogo}
                    alt="Profile Picture"
                    className="w-10 h-10 rounded-full object-cover"
                    id="profimg"
                  />
                  <p className="text-black font-bold ml-2">{username}</p>
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