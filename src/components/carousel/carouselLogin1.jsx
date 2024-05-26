import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import styles from '../../styles/login.module.css'

const CarouselLogin1 = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`flex flex-col justify-center items-center h-screen relative ${styles.asideContainerLogin1}`}>
      <div className="z-10">
        <p className="text-white text-center xl:text-3xl lg:text-1xl">
          AI takes care of dubbing details,  so you can <br />focus on your entertainment
        </p>
      </div>
      <div className="relative flex flex-col items-end w-full h-3/5">
        <img src={`/assets/images/img-page1-login2-${theme === 'dark' ? 'dark' : 'light'}.png`} 
        className="w-auto lg:w-3/5 lg:mt-[-5px]" />
        <img src={`/assets/images/img-page1-login1-${theme === 'dark' ? 'dark' : 'light'}.png`} 
        className="w-auto lg:w-4/5 lg:mt-5 z-10 absolute top-24 lg:top-[60px] left-0 lg:left-16" />

      </div>

      {/* <div className="flex flex-col items-center relative justify-center h-full">
            <img
              alt=""
              src={`/assets/images/img-page1-login2-${theme === 'dark' ? 'dark' : 'light'}.png`}
              className="absolute top-[60px] right-0 lg:top-[-30px] xl:w-auto h-auto object-contain lg:w-[400px]"

            />
            <img
              alt=""
              src={`/assets/images/img-page1-login1-${theme === 'dark' ? 'dark' : 'light'}.png`}
              className="z-10 w-auto h-auto object-contain"
            />
          </div> */}
      <div className="flex flex-col items-start lg:mt-5 h-auto justify-center  xl:px-12 px-12 z-10">
        <p className=" text-white text-left">
          Dubbing or translating movies, series, dramas into various languages can help everyone enjoy such diverse works with the help of today's highly advanced technology.
        </p>
        <p className='text-sm text-white text-left mt-3'>-Elizabeth Melan</p>
      </div>

    </div>
  )
}

export default CarouselLogin1