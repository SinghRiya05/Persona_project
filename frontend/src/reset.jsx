import React from 'react'
import axios from 'axios'

export default function reset() {
const API_URL = "https://persona-project-wg2r.onrender.com";
    const handleReset=async()=>{
   try {
     const res=await axios.post(`${API_URL}/reset-chat`)
     console.log(res);
     
   } catch (error) {
    console.log(error);
    
   }
    }
  return (
    <div>
      <button onClick={()=>handleReset} className='bg-amber-800 text-white text-center'>Reset</button>
    </div>
  )
}
