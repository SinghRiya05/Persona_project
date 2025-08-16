import React from 'react'
import image from "../../assets/image.jpg"
import { useNavigate } from 'react-router-dom'

function Card() {
    const navigate=useNavigate();
  return (
    <div className="shadow-xl hover:scale-105 duration-300 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full my-4 mx-auto rounded-lg overflow-hidden bg-amber-50">
      {/* Image */}
      <div>
        <img 
          className="object-cover w-full h-48 sm:h-56 md:h-64" 
          src={image} 
          alt="hitesh" 
        />
      </div>

      {/* Content */}
      <div className="p-5 bg-amber-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Hitesh Choudhary
        </h2>
        <p className="mt-2 text-gray-700 text-sm sm:text-base leading-relaxed">
          Tech educator, YouTuber, and entrepreneur with 15+ years of experience. 
          Passionate about JavaScript, React, and Next.js — helping 1.6M+ learners 
          through hands-on coding lessons.
        </p>
        <button onClick={()=>navigate("/chat")} className="px-4 py-2 border border-amber-900 w-full hover:bg-amber-700 hover:border-amber-700 duration-200 rounded-lg bg-amber-800 text-white mt-5">
          Chat
        </button>
      </div>
    </div>
  )
}

export default Card
