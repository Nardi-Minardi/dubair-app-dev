import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';

const CarouselRegister3 = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col justify-center align-center h-screen relative aside-container-login3">
      <div className="z-10">
        <p className=" text-white text-center xl:text-3xl lg:text-1xl m-0">
          Transform language effortlessly in your videos <br /> with AI-driven dubbing technology.
        </p>
      </div>
      <div className="flex flex-col items-center h-auto justify-center">
        <img
          alt=""
          src={`/assets/images/img-page3-login1-${theme === 'dark' ? 'dark' : 'light'}.png`}
          className="z-10 w-auto h-auto object-contain shadow-2xl"
        />
        <div className="flex flex-col items-start h-auto justify-center xl:px-12 px-12 z-10">
          <p className=" text-white text-left">
            Dubbing technology allows us to see family-friendly content in various languages, bringing smiles to homes across the world.
          </p>
          <p className='text-sm text-white text-left mt-3'>-Basenas Family</p>
        </div>
      </div>

      <div className='ellipse-page3-register'></div>
    </div>
  )
}

export default CarouselRegister3