import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar bg-gray-800 text-white h-screen w-64 fixed">
            <div className="sidebar-header px-4 py-6 text-lg font-bold">
                Admin Dashboard
            </div>
            <nav className="sidebar-menu">
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="upload-poster"
                            className={({ isActive }) =>
                                isActive ? 'bg-gray-700 px-4 py-2 block' : 'hover:bg-gray-700 px-4 py-2 block'
                            }
                        >
                            Upload Poster
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="manage-users"
                            className={({ isActive }) =>
                                isActive ? 'bg-gray-700 px-4 py-2 block' : 'hover:bg-gray-700 px-4 py-2 block'
                            }
                        >
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="monitor-orders"
                            className={({ isActive }) =>
                                isActive ? 'bg-gray-700 px-4 py-2 block' : 'hover:bg-gray-700 px-4 py-2 block'
                            }
                        >
                            Monitor Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="manage-posters"
                            className={({ isActive }) =>
                                isActive ? 'bg-gray-700 px-4 py-2 block' : 'hover:bg-gray-700 px-4 py-2 block'
                            }
                        >
                            Manage Posters
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
