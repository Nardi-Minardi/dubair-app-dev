import React, {useEffect, useState} from 'react'
import { useTheme } from 'next-themes';

const CarouselRegister3 = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col justify-center align-center py-12 relative">
      <div className='ellipse-page3-register'></div>
      <p className=" text-white text-center xl:text-2xl mb-4 lg:text-1xl m-0">
      Transform language effortlessly <br/> in your videos with AI-driven <br/> dubbing technology.
      </p>
      <div className="flex flex-col items-center h-auto justify-center">
        <img
          alt=""
          src={`/assets/images/img-page3-login1-${theme === 'dark' ? 'dark' : 'light'}.png`}
          className="z-10 w-auto h-auto object-contain shadow-2xl"
        />
        <div className="flex flex-col items-start h-auto justify-center lg:mb-5 xl:px-32 py-8 px-16 z-10">
          <p className=" text-white text-left">
          Dubbing technology allows us to see family-friendly content in various languages, bringing smiles to homes across the world.
          </p>
          <p className='text-sm text-white text-left mt-5'>-Basenas Family</p>
        </div>
      </div>

    </div>
  )
}

export default CarouselRegister3