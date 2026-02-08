import React, {useState} from 'react'

const Search = () => {
    const[input,setInput] = useState("");
    return (
        <div className="min-w-full flex justify-between gap-2 items-center">
            <input
                className='outline-gray-300 px-2 py-1 focus:outline-gray-400 border border-gray-700 rounded-[10px] text-[1rem]'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button className=' text-green-700 px-3 py-1 cursor-pointer border border-green-400 rounded-[10px] text-center' >
                Search
            </button>
        </div>
    )
}
export default Search
