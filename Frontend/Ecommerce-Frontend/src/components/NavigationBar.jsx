import React, {useState} from 'react'
import Search from "./Search.jsx";
import {Link} from "react-router";

const NavigationBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="  w-full bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold tracking-tight text-gray-800">
                            E<span className="text-blue-600">commerce</span>
                        </Link>
                    </div>

                    {/* Desktop Menu - Hidden on Mobile */}
                    <div className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-6 text-gray-600 font-medium">
                            <li className="hover:text-blue-600 transition-colors">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="hover:text-blue-600 transition-colors">
                                <Link to="/add">Add Product</Link>
                            </li>
                            <li className="hover:text-blue-600 transition-colors">
                                <Link to="/orders">Orders</Link>
                            </li>
                        </ul>

                        <div className="flex items-center space-x-1.5 border-l pl-5 border-gray-200">
                            <Link to="/cart" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                                <span className="text-xl">🛒</span>
                                <span className="font-medium">Cart</span>
                            </Link>
                            <div>
                            <Search />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Button - Visible on Mobile Only */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-gray-50 border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                        <Link to="/" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Home</Link>
                        <Link to="/add" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Add Product</Link>
                        <Link to="/orders" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">Orders</Link>
                        <Link to="/cart" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-bold text-blue-600">Cart 🛒</Link>
                        <div className="py-2 px-3">
                            <Search />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
export default NavigationBar
