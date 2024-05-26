import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';

const CarouselLogin2 = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col justify-center align-center h-screen relative aside-container-login2">
      <div className="z-10">
        <p className=" text-white text-center xl:text-3xl lg:text-1xl">
          Let AI make your videos sound  perfect by <br /> syncing voices automatically.
        </p>
      </div>
      <div className="flex flex-col items-center h-auto justify-center">
        <img
          alt=""
          src={`/assets/images/img-page2-login1-${theme === 'dark' ? 'dark' : 'light'}.png`}
          className="z-10 w-auto h-auto mt-2 object-contain shadow-2xl"
        />
        <div className="flex flex-col items-start h-auto justify-center xl:px-12 px-12 z-10">
          <p className=" text-white text-left">
            Through the power of advanced dubbing technology, our content speaks fluently in multiple languages, breaking down barriers and resonating with audiences across the globe.
          </p>
          <p className='text-sm text-white text-left mt-3'>-Azka Armony</p>
        </div>
      </div>

    </div>
  )
}

export default CarouselLogin2