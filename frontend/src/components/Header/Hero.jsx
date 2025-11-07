import React, { useEffect, useState } from 'react'
import { carouselImages } from '../Data'


const Hero = () => {
  const [currentPic , setCurrentPic] = useState(0)
  useEffect(()=> {
    const interval = setTimeout(()=>{
      setCurrentPic((prev) => (prev + 1) % carouselImages.length)
    } , 4000)
    return () => clearInterval(interval)
  } , [currentPic])
  return (
       <div id='hero' className="overflow-hidden lg:pt-8 pt-16 w-full ">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentPic * 100}%)` }}
      >
        {carouselImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  )
}

export default Hero