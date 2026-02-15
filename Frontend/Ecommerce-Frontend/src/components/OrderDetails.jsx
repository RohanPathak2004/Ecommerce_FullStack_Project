import React, {useEffect, useState} from 'react'

const OrderDetails = ({item}) => {
   const [totalSumOfPrice,setTotalSumOfPrice] = useState(0);
   useEffect(()=>{
       let sum = item.reduce((acc,prod)=>acc+prod.totalPrice,0);
       setTotalSumOfPrice(sum);
   },[item])
    return (
        <div className='  overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm'>
            <table className='w-full text-left border-collapse'>
                <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                    <th className='px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500'>
                        Item
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500'>
                        Product Name
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500'>
                        Quantity
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500'>
                        Total
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {
                    item.map((product,idx)=>(
                        <tr key={idx}>
                           <td className="px-6 py-4 font-mono text-sm text-gray-600">
                               {idx+1}
                           </td>
                            <td className="px-6 py-4">
                                {product.productName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                {
                                    product.quantity
                                }
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 font-bold">
                                ${
                                    product.totalPrice
                                }
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </table>
            <div className='flex justify-end gap-2 px-4 py-2 text-xl font-medium border-t-1 w-full'>
                <h1>
                    Total:
                </h1>
                <h1>
                    ${totalSumOfPrice}
                </h1>
            </div>
        </div>
    )
}
export default OrderDetails
