import React from 'react';
import image from "../../assets/image.jpg";
import { ArrowLeft } from "lucide-react";
import {useNavigate} from "react-router-dom"

function Nav() {
    const navigate=useNavigate();
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-900 to-amber-700 text-white shadow-lg lg:px-10">
    
      {/* Left: Profile */}
      <div className="flex items-center gap-4">
        <button onClick={()=>navigate("/")}><ArrowLeft/></button>
        <img
          className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-md"
          src={image}
          alt="profile"
        />
        <div className="font-semibold text-sm md:text-lg">Hitesh Choudhary</div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-200 shadow-sm text-sm md:text-lg">
          AI Assistant
        </button>
       
      </div>

    </div>
  );
}

export default Nav;
