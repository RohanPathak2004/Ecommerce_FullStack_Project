import React from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard.jsx";
import {Link} from "react-router";
import {useProductContext} from "../context/ProductContext.jsx";

const Home = () => {


     const {products,isLoading,isError,error} = useProductContext();

    // console.log(products)
    if (isLoading) return (<div className='w-full text-2xl text-center h-full' >Loading products</div>)
    if (isError) return (<h1>Something went wrong..</h1>)
    return (
        <div className="w-full">
            <div className="grid lg:max-w-[85vw] mx-auto md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 px-10 mt-10">
                {products&&products.map((product, _) => (
                    <div className=" " key={product.id}>
                        <Link to={`/product/${product.id}`} state={product}>
                            <ProductCard product={product}/>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home
