import React from 'react'
import Card from './Card'
import { Coffee, Laptop, BookOpen, Users } from 'lucide-react'

function Hero() {
  return (
    <section className='bg-gradient-to-r from-amber-200 to-gray-600'>
      <div className="flex flex-col items-center justify-center text-center max-w-5xl px-5 md:mx-10 lg:mx-auto py-5 space-y-6">

        
        
        {/* Heading */}
        <div className='flex justify-center items-center gap-3'>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-sm">
            Hey, I am Hitesh Choudhary
          </h1>
          <button ><Coffee className='h-8 w-8 text-amber-700 drop-shadow-md' /></button>
        </div>

        {/* Subheading with icons */}
        <div className="flex flex-wrap justify-center gap-5 text-gray-900 font-medium">
          <div className="flex items-center gap-2">
            <Laptop className="h-5 w-5 text-teal-700" />
            <span>Web Development</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-rose-700" />
            <span>Educator</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-700" />
            <span>1.6M+ Learners</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-100 leading-relaxed px-5 md:px-20 bg-black/20 rounded-xl p-3">
          Indian tech educator with 15+ years of experience, passionate about JavaScript, React, and Next.js.
          Creator of LearnCodeOnline and Chaicode, teaching millions with practical, hands-on lessons in Hindi and English.
        </p>

        {/* Persona Card */}
        <Card />
        
      </div>
    </section>
  )
}

export default Hero
