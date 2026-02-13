import React, {useEffect, useState} from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useCartContext} from "../context/CartContext.jsx";

const CartRow = ({id, quantity, setReCalculate}) => {

    const {deleteFromTheCart,increaseQuantity,decreaseQuantity} = useCartContext();

    const [product, setProduct] = useState();
    const [imageFile, setImageFile] = useState();
    const [isProductLoaded,setIsProductLoaded] = useState(false);
    const fetchProduct = async (id) => {
        const res = await axios.get(`http://localhost:8080/api/product/${id}`).then(res => res.data);
        const resImage = await axios.get(`http://localhost:8080/api/product/${id}/image`, {responseType: "blob"}).then(resImage => resImage.data);
        const file = await convertUrlToFile(resImage, res.imageName);
        setImageFile(file);
        setProduct(res);
        setIsProductLoaded(true);

    }
    const convertUrlToFile = async (blobData, fileName) => {
        const file = await new File([blobData], fileName, {type: blobData.type});
        return file;
    }
    useEffect(() => {
        try {
            fetchProduct(id);

        } catch (e) {
            console.log(e.message())
        }
    }, [id])





    return (
        <div className="w-full border-b border-gray-200 py-3 px-2 sm:px-4 hover:bg-blue-50 transition-colors">
            {product && (
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-4 border-b border-gray-50">
                    {/* Product & Unit Price */}
                    <div className="flex items-center gap-4 flex-1 w-full">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
                            <img src={imageFile ? URL.createObjectURL(imageFile) : ''}
                                 className="h-full w-full object-cover" alt={product.name}/>
                        </div>
                        <div className="flex flex-1 justify-between items-center">
                            <div>
                                <h4 className="text-base font-medium text-gray-900">{product.name}</h4>
                                <p className="text-sm text-gray-500">{product.brand}</p>
                            </div>
                            {/* Unit Price next to Product */}
                            <span className="w-24 text-gray-600 font-medium">${product.price.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Controls, Total Price & Remove */}
                    <div className="flex items-center justify-between sm:gap-8 lg:gap-12 w-full max-w-[400px]">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg h-10">
                            <button onClick={()=> {
                                decreaseQuantity(id, quantity);
                                setReCalculate(prev=>!prev);
                            }} className="px-3">−</button>
                            <span className="w-8 text-center">{quantity}</span>
                            <button onClick={()=> {
                                increaseQuantity(id);
                                setReCalculate(prev=>!prev)
                            }} className="px-3">+</button>
                        </div>

                        {/* Total Price (Price * Quantity) */}
                        <div className="w-[100px] text-right">
                            <strong className="text-gray-900">${(product.price * quantity).toFixed(2)}</strong>
                        </div>

                        {/* Delete Button */}
                        <button onClick={()=> {
                            deleteFromTheCart(id);
                            setReCalculate(prev=>!prev);
                        }} className="w-10 text-red-400 hover:text-red-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartRow
