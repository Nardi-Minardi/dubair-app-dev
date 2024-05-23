import React, {useEffect, useState} from 'react'
import { useTheme } from 'next-themes';

const CarouselLogin2 = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col justify-center align-center py-6 relative">
      <p className=" text-white text-center xl:text-2xl mb-4 lg:text-1xl m-0">
        AI takes care of dubbing details, <br /> so you can focus on <br />your entertainment
      </p>
      <div className="flex flex-col items-center h-auto justify-center mt-[70px]">
        <img
          alt=""
          src={`/assets/images/img-login2-${theme === 'dark' ? 'dark' : 'light'}.png`}
          className="absolute top-[120px] right-0 xl:w-auto h-auto object-contain lg:w-[400px]"

        />
        <img
          alt=""
          src={`/assets/images/img-login1-${theme === 'dark' ? 'dark' : 'light'}.png`}
          className="z-10 w-auto h-auto object-contain"
        />
        <div className="flex flex-col items-start h-auto justify-center xl:px-32 px-16 z-10">
          <p className=" text-white text-left">
            Dubbing or translating movies, series, dramas into various languages can help everyone enjoy such diverse works with the help of today's highly advanced technology.
          </p>
          <p className='text-sm text-white text-left mt-5'>-Elizabeth Melan</p>
        </div>
      </div>

    </div>
  )
}

export default CarouselLogin2