import React, {useState} from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import OrderDetails from "../components/OrderDetails.jsx";
import CancelIcon from "../components/CancelIcon.jsx";

const Orders = () => {


    const [showDetails,setShowDetails] = useState(null);
    const [openModal,setOpenModal] = useState(false);

    const handleShowDetails = (id) =>{
        setOpenModal(true);
        const requestedOrder = orders.filter(order=>order.orderId===id);
        setShowDetails(requestedOrder);
    }

    const fetchOrders = async () => {
        const res = await axios.get('http://localhost:8080/api/orders').then(res => res.data);
        return res;
    }

    const {data: orders, isLoading, error, isError} = useQuery({
        queryFn: fetchOrders,
        queryKey: ["orders"]
    })


    if(isLoading) return (<div>
        loading..
    </div>)
    return (
        <div className=''>
            {
               openModal&&
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[95vh]">

                            {/* Header */}
                            <div
                                className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Order Details</h2>
                                <button
                                    onClick={() =>{
                                        setOpenModal(false);
                                        setShowDetails(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                >
                                    <CancelIcon/>
                                </button>
                            </div>
                            <OrderDetails item={showDetails?showDetails[0].item:null}/>
                        </div>
                    </div>

            }
            <div className="w-full max-w-6xl mx-auto p-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Orders</h1>
                    <span className="text-sm text-gray-500">{orders.length} Total Orders</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Items</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => {

                            return (
                            <tr key={order.orderId} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-gray-600">
                                    #{order.orderId.slice(-6)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{order.customerName}</div>
                                    <div className="text-xs text-gray-500">{order.email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                                    {order.item.length}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                                                      {order.status}
                                     </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={()=>handleShowDetails(order.orderId)}
                                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                        View Details
                                    </button>
                                </td>

                            </tr>

                        )})}


                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    )
}
export default Orders
