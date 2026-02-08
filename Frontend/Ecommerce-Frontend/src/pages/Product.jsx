import React from 'react'
import {Link, useLocation} from "react-router";
import noimage from "../assets/noimage.png";
import { ToastContainer, toast } from 'react-toastify';
const Product = () => {
    const location = useLocation();
    const product = location.state
    const notify = () => toast("Product Added To Cart!!");
    const notifyForSmallDevice = () => toast("Product Added To Cart!!");
    console.log(product.productAvailable);



    return (
        <div className="  min-w-full ">
            <div
                className="hidden md:block min-h-1/2 flex  mx-auto justify-center items-center  px-3 py-2 rounded-2xl text-gray-600 mt-10 ">
                <div className="flex h-1/2">
                    <div
                        className= "w-[40vw] h-1/3  aspect-square overflow-hidden rounded-xl bg-gray-50 flex justify-center items-start shadow">
                        <img className='w-fit h-1/2' src={`data:${product.imageType};base64,${product.imageData}`}
                             alt={'image not found'} onError={(e) => {
                            e.target.src = noimage
                        }}/>
                    </div>
                    <div className="w-[60vw] flex flex-col items-baseline text-[1.2rem] px-6 py-2.5 gap-4">
                        <div>
                            <h1 className="font-bold text-2xl">{product.name}</h1>
                        </div>
                        <div className="flex flex-wrap gap-1 ">
                            <span className="font-bold">Description: </span>
                            <span className="inline-flex"> {product.description}</span>
                        </div>
                        <div>
                            <span className="font-bold">Brand: </span>
                            <span
                                className={`${product.brand === null ? 'text-red-500' : null}`}>{(product.brand ? product.brand : 'Not Found').toWellFormed()}</span>
                        </div>
                        <div className="">
                            <span className="font-bold">Category: </span>
                            <span
                                className=" px-2 py-1 bg-gray-400 text-white rounded-md text-[0.9rem] justify-center inline-flex"><span>{product.category}</span></span>
                        </div>
                        <div>
                            <span className="font-bold">Release Date: </span>
                            <span>{product.releaseDate}</span>
                        </div>
                        <div>
                        <span
                            className={` text-white px-2 py-1 rounded-md  ${(product.productAvailable) ? "bg-green-400" : "bg-red-500"}`}>{product.productAvailable ? "Available" : "Currently not Available"}</span>
                        </div>

                        <span className="font-bold text-2xl text-black">${product.price}</span>
                        <div className="w-full">
                         <button
                                onClick={notify}
                                className="text-[1.2rem] w-[60%]  px-6 py-1 bg-blue-500 text-center items-center text-white rounded-md cursor-pointer">Add
                                to Cart
                            </button>
                        <ToastContainer className='Toastify__bounce-enter--bottom-right'/>
                        </div>
                        <div className="w-full flex justify-start space-x-1.5">
                            <button

                                className="text-[1.2rem] px-6 py-1 bg-red-500 text-center items-center text-white rounded-2xl">Delete
                            </button>
                            <button
                                className="text-[1.2rem] px-6 py-1 bg-orange-400 text-center items-center text-white rounded-2xl">
                                <Link to={`/product/update/${product.id}`} state={product.id}>
                                Update
                                </Link>
                            </button>
                            <ToastContainer/>
                        </div>

                    </div>

                </div>

            </div>
            {/*mobile view for product*/}
            <div className=" sm:visible md:hidden px-2 flex flex-col gap-2">
                <div>
                    <span className="text-[1.2rem] font-bold">{product.name}</span>
                </div>
                <div className="flex justify-center items-center py-1 ">
                    <div
                        className="relative w-[90vw]  h-[30vh] aspect-square  overflow-hidden rounded-xl bg-gray-50 flex justify-center items-center shadow">
                        <img className='w-fit h-[90%]' src={`data:${product.imageType};base64,${product.imageData}`}
                             alt={'image not found'} onError={(e) => {
                            e.target.src = noimage
                        }}/>
                    </div>
                </div>
                <div className="flex flex-col items-baseline px-2 text-[1.2rem] text-gray-700 flex flex-col gap-2">
                    <div className="w-full flex justify-between items-center">
                         <span
                             className={` text-white px-2 py-1 rounded-md  ${(product.productAvailable) ? "bg-green-400" : "bg-red-500"}`}>{product.productAvailable ? "Available" : "Currently not Available"}</span>
                        <div className="">
                            <span className="font-bold">Category: </span>
                            <span
                                className=" px-2 py-1 bg-gray-400 text-white rounded-md text-[0.9rem] justify-center inline-flex"><span>{product.category}</span></span>
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center'>
                        <div>
                            <span className="font-medium">Price: </span>
                            <span className="font-bold text-[] text-black">${product.price}</span>
                        </div>
                        <div>
                            <span className="font-medium">Brand: </span>
                            <span
                                className={`${product.brand === null ? 'text-red-500' : null}`}>{(product.brand ? product.brand : 'Not Found').toWellFormed()}</span>

                        </div>
                    </div>


                    <div className="w-full">
                        <span className=" font-medium">Description: </span>
                        <span className=" text-[1rem]">{product.description}</span>
                    </div>
                </div>
                <div className='w-full flex flex-col py-2.5 gap-2'>
                    <div className="w-full">
                    <button

                        className="text-[1.2rem] px-6 py-1 bg-blue-500 text-center items-center text-white rounded-2xl">Add
                        to Cart
                    </button>

                    </div>
                    <div className="w-full flex justify-evenly items-center">
                        <button
                            className="text-[1.2rem] px-6 py-1 bg-red-500 text-center items-center text-white rounded-2xl">Delete
                        </button>
                        <button
                            className="text-[1.2rem] px-6 py-1 bg-orange-400 text-center items-center text-white rounded-2xl">
                            <Link to={`/product/update/${product.id}`} state={product}>
                                Update
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Product
