import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = ({ username }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/userdash/order-history/${username}`);
                setOrders(response.data);
            } catch (err) {
                setError('Error fetching order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [username]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        
        {orders.length === 0 ? (
            <p className="text-gray-500 text-lg">No orders found.</p>
        ) : (
            <div className="bg-blue-300 space-y-4">
                {orders.map(order => (
                    <div
                        key={order._id}
                        className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-lg"
                    >
                        <p className="text-md font-semibold text-gray-700">Order ID: {order._id}</p>
                        
                        <h3 className="text-gray-700 mt-4 font-bold">Items:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            {order.items.map(item => (
                                <li key={item.posterId} className="text-gray-600">
                                    {item.size} - Quantity: {item.quantity} - Price: ${item.price}
                                </li>
                            ))}
                        </ul>

                        <p className="text-gray-600">
                            <span className="font-bold">Total Amount:</span> ${order.totalAmount}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">Payment Status:</span> {order.paymentStatus}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">Order Status:</span> {order.orderStatus}
                        </p>
                    </div>
                ))}
            </div>
        )}
    </div>
    
    );
};

export default OrderHistory;