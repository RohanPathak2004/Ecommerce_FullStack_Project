import {createContext, useContext, useEffect, useMemo, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import {toast} from "react-toastify";

const CartContext = createContext();

export  const cartProvider = ({children}) =>{
    const [cart,setCart] = useLocalStorage("cart",[]);



    const decreaseQuantity = (id,quantity)=>{
        if(quantity===1) {
            deleteFromTheCart(id);
            return;
        }
        const localCart = cart.map((item)=>{
            if(item.productId===id){
                return {
                    ...item,
                    quantity:item.quantity-1
                }
            }else return item;
        });

        setCart(localCart);

    }


    const deleteFromTheCart = (id)=>{

        let localCart=cart.filter(item=>item.productId !== id);
        setCart(localCart)
    }

    const increaseQuantity = (id) =>{
        const localCart = cart.map((item)=>{
            if(item.productId===id){
                let product = {
                    ...item,
                    quantity:item.quantity+1
                }
                return product;
            }
            else return item;

        });
        setCart(localCart);
    }


    const addProductToCart = ({productId,name,brand,imageFile,quantity,productPrice})=>{
        let flag = false;
        let localCart = [...cart];
        for(let i = 0; i<cart.length ; i++){
            if(localCart[i].productId===productId){
                return toast.success("Already added To the Cart")

            }
        }
        if(!flag){
            localCart.push({
                productId:productId,
                name:name,
                brand:brand,
                quantity:quantity,
                productPrice:productPrice
            })
        }
        setCart(localCart);
        return toast.success("Product Added To the Cart");
    }

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart));
    },[cart])



    const contextValues = {
        cart,
        addProductToCart,
        deleteFromTheCart,
        increaseQuantity,
        decreaseQuantity,
        setCart
    }


    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    )

}

export const useCartContext = ()=>{
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useProductContext must be used within a ProductProvider")
    }
    return context;
}