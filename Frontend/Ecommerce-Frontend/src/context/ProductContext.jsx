import {createContext, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";


const ProductContext = createContext();

export  const ProductProvider = ({children}) =>{

    const {data: products, isLoading, isError, error} = useQuery({
        queryFn: () => axios.get('http://localhost:8080/api/products').then(res => res.data),
        queryKey: ["products"]
    });

    const productContextValue = {
        products,
        isLoading,
        isError,
        error
    }

    return(
        <ProductContext.Provider value={productContextValue}>
            {children}
        </ProductContext.Provider>
    )


}

//custom hook for context
export const useProductContext = () =>{
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
}