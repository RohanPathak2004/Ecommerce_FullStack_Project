import React from 'react'
import noimage from '../assets/noimage.png'
const ProductCard = ({product}) => {
    return (
        <div className=" max-h-90 flex flex-col px-3 py-2 border border-gray-500 rounded-2xl text-gray-600 gap-2">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50 flex justify-center items-center">
                <img className='w-fit' src={`data:${product.imageType};base64,${product.imageData}`} alt={'image not found'} onError={(e)=>{e.target.src=noimage}} />
            </div>
            <div>
                <h1 className="font-bold">{product.name}</h1>
            </div>
            <div className=''>
                <span>Brand: {(product.brand?product.brand:'not found').toWellFormed()}</span>
            </div>
            <div className="w-[90%] border border-gray-500 mx-auto"></div>
            <div className="flex flex-col gap-1  ">
                <span>${product.price}</span>
                <button disabled={product.stockQuantity===0} className="px-4 py-2 bg-blue-500 text-white w-[50%] mx-auto rounded-2xl">
                    {product.stockQuantity===0?'Stock out of Quantity':'Add to Cart'}
                </button>
            </div>
        </div>
    )
}
export default ProductCard
