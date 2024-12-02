import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"; // Toast for notifications


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admindash/users');
            setUsers(response.data);
            console.log("Users data: ",response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const handleDelete = async (id) => {
        console.log("Delete User id: ",id);
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const res=await axios.delete(`http://localhost:3000/admindash/deleteuser/${id}`);
                fetchUsers(); // Refresh user list
                if (res.status === 200) {
                    toast.success("User deleted Sucessfully..!"); 
                  }
            } catch (err) {
                console.error('Error deleting user:', err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">
                Manage Users
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Profile</th>
                            <th className="py-3 px-6 text-left">Username</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Orders</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                } hover:bg-gray-200 transition-colors`}
                            >
                                <td className="py-3 px-6">
                                    <img
                                        src={user?.profilePicture?.url || '/default-profile.png'}
                                        alt={user.username}
                                        className="w-12 h-12 object-cover rounded-full shadow-md"
                                    />
                                </td>
                                <td className="py-3 px-6 text-gray-700">{user.username}</td>
                                <td className="py-3 px-6 text-gray-700">{user.email}</td>
                                <td className="py-3 px-6 text-gray-700">
                                    {user.orders.map((order, i) => (
                                        <p key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md inline-block mr-2">
                                            {order.paymentStatus}
                                        </p>
                                    ))}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
