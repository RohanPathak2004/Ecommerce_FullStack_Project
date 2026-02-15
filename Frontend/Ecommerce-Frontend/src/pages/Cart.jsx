import React, {useEffect, useState} from 'react'
import {useCartContext} from "../context/CartContext.jsx";
import CartRow from "../components/CartRow.jsx";
import CancelIcon from "../components/CancelIcon.jsx";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";

const Cart = () => {

    const {cart, setCart} = useCartContext();
    const [customerDetails, setCustomerDetails] = useState({
        customerName: "",
        email: ""
    })
    const navigate = useNavigate();
    // console.log(cart);
    const [totalPrice, setTotalPrice] = useState(0);
    const [reCalculate, setReCalculate] = useState(true);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const handleCheckout = async () => {
        setIsCheckingOut(true);
    }
    //for recalculating the totalPrice
    useEffect(() => {
        if (cart.length !== 0) {
            setTotalPrice(0);
            for (let i = 0; i < cart.length; i++) {

                console.log(cart[i].productPrice * cart[i].quantity);
                setTotalPrice(prevState => prevState + (cart[i].productPrice * cart[i].quantity));
            }
        } else {
            console.log("called here");
            setReCalculate(0);
        }
    }, [reCalculate]);


    //customer details
    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setCustomerDetails({
            ...customerDetails,
            [name]: value
        })
    }

    const [isLoading, setIsLoading] = useState(false);

    const handleOrderPlace = async () => {

        if (!customerDetails.customerName || !customerDetails.email) {
            toast.error("Please fill in your details");
            return;
        }

        setIsLoading(true);


        const orderRequest = {
            customerName: customerDetails.customerName,
            email: customerDetails.email,
            items: cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };



        const res = await axios.post('http://localhost:8080/api/orders/place', orderRequest)
            .then(res => {

                    toast.success("Order Placed")
                setCart([]);
                setTimeout(()=>navigate('/'),1000);
                }
            ).catch(res => {
                let errorMessage = (res.response.data).message;
                toast.error(errorMessage);

            });
    }



    return (
        <div className='w-full flex justify-center items-center mx-auto p-3'>
            <ToastContainer/>
            {isCheckingOut && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[95vh]">

                        {/* Header */}
                        <div
                            className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Checkout</h2>
                            <button
                                onClick={() => setIsCheckingOut(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                            >
                                <CancelIcon/>
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-grow p-6 space-y-8">
                            {/* Customer Form Section */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-500">Contact
                                    Details</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full
                                            Name</label>
                                        <input
                                            required
                                            name={'customerName'}
                                            value={customerDetails.customerName}
                                            onChange={(e) => onChangeHandler(e)}
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email
                                            Address</label>
                                        <input
                                            required

                                            name={'email'}
                                            value={customerDetails.email}
                                            onChange={(e) => onChangeHandler(e)}
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Order Summary Section */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-500">Order
                                    Summary</h3>
                                <div className="space-y-3">
                                    {cart.map((item, idx) => (
                                        <div key={idx}
                                             className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <div className="flex flex-col">
                                                <span
                                                    className="font-semibold text-gray-900 leading-tight">{item.name}</span>
                                                <span
                                                    className="text-xs text-gray-500 font-medium mt-1 bg-white px-2 py-0.5 rounded-full border w-fit">Qty: {item.quantity}</span>
                                            </div>
                                            <div className="text-right">
                                                <span
                                                    className="font-bold text-gray-800">${(item.productPrice * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Footer / Total Section */}
                        <div className="p-6 bg-gray-50 border-t border-gray-200 sticky bottom-0">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm font-medium uppercase tracking-tighter">Total to pay</span>
                                    <span
                                        className="text-3xl font-black text-gray-900 tracking-tight">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsCheckingOut(false)}
                                    className="flex-1 py-4 px-4 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={handleOrderPlace}
                                    className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-4 rounded-xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-[0.97]">
                                    Place Order
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            <div
                className='md:shadow-2xl md:mt-5 w-full max-w-5xl mb-20 rounded-lg overflow-hidden border border-gray-100'>

                {/* Header Title */}
                <div className='w-full py-6 border-b border-gray-200 bg-white'>
                    <h1 className='font-bold text-3xl text-center text-gray-800'>Shopping Cart</h1>
                </div>

                <div className="w-full flex flex-col items-center bg-white p-4 sm:p-8">

                    {/* Table Header - Visible only on Desktop */}
                    <div
                        className="hidden sm:flex w-[95%] border-b-2 border-gray-100 pb-4 mb-4 px-4 text-gray-400 font-bold uppercase tracking-wider text-xs">
                        {/* Left Side: Product Details & Unit Price */}
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-20 hidden md:block"></div>
                            {/* Image Spacer */}
                            <span className="ml-0 md:ml-4 flex-1">Product</span>
                            <span className="w-24 text-left">Price</span> {/* Moved Price here */}
                        </div>

                        {/* Right Side: Quantity, Total, and Remove */}
                        <div className="flex items-center justify-between sm:gap-8 lg:gap-12 w-full max-w-[400px]">
                            <span className="w-[120px] text-center">Quantity</span>
                            <span className="w-[100px] text-right text-gray-900">Total Price</span> {/* New Column */}
                            <span className="w-10 text-center">Remove</span>
                        </div>
                    </div>

                    {cart.length !== 0 ? <div className='w-full'>
                            {/* Cart Items */}
                            <div className="w-full space-y-1">
                                {cart.map((item, idx) => (
                                    <div key={item.productId || idx} className="w-full">
                                        <CartRow id={item.productId} quantity={item.quantity}
                                                 setReCalculate={setReCalculate}/>
                                    </div>
                                ))}
                            </div>

                            {/* Total Row */}
                            <div className="w-full mt-8 pt-6 border-t-2 border-gray-100 flex flex-col items-end px-4">
                                <div className="flex justify-between w-full sm:w-[300px] items-center">
                                    <span className="text-gray-500 font-medium text-lg">Subtotal</span>
                                    <span className="text-2xl font-bold text-gray-900">
                        ${totalPrice.toFixed(2)}
                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">Shipping and taxes calculated at checkout.</p>

                                <button
                                    disabled={isLoading}
                                    onClick={handleCheckout}
                                    className="mt-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition-colors shadow-lg">
                                    Checkout
                                </button>
                            </div>
                        </div> :
                        <stong className='text-gray-900'>Cart is Empty</stong>}
                </div>

            </div>
        </div>
    )
}
export default Cart
