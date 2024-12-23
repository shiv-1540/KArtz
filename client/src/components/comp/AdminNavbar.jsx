import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import proflogo from '../../assets/imgs/me16.jpg'
import cartlogo1 from '../../assets/imgs/cartlogo1.png'
import cartlogo from '../../assets/imgs/1121.jpg'

function AdminNavbar({ user, user_id, handleLogout, username }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlelogout1=()=>{
    localStorage.clear(token);
    navigate('/adminlogin');
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-800 shadow-lg">
      <div className="flex justify-between items-center px-6 py-1">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center">
          <b className="text-gray-100 text-3xl  font-bold text-align-center"><img src={cartlogo} style={{width:"150px", height:"55px"}}  className=''/>  </b>
          {/*<p className="text-gray-100 text-1xl font-bold">BRINGING WORDS TO LIFE</p>*/}
        </div>


        <button className='font-bold text-3xl mr-5'>
           AdminDashboard
        </button>
     

        {/* Profile and Logout */}
        <div className="flex items-center space-x-8">
             
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
                onClick={() => navigate(`/adminprofile`)}
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
                onClick={handleLogout}
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

export default AdminNavbar;