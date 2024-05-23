import React, { useState, useRef, useEffect } from 'react'
import AuthLayout from "@/layouts/AuthLayout";
import ButtonGradient from '@/components/buttons/buttonGradient';
import ButtonGoogle from '@/components/buttons/buttonGoogle';
import dynamic from 'next/dynamic'
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import ButtonDarkMode from '@/components/buttons/buttonDarkMode';

const CarouselLogin1 = dynamic(() => import('@/components/carousel/carouselLogin1'),
  { ssr: false }
)
const CarouselLogin2 = dynamic(() => import('@/components/carousel/carouselLogin2'),
  { ssr: false }
)

const dataCarouselLogin = [
  {
    id: 1,
    component: <CarouselLogin1 />,
  },
  {
    id: 2,
    component: <CarouselLogin2 />,
  },
];



const Login = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="bg-white dark:bg-zinc-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">

        <aside className={`
        ${selectedIndex === 0 && 'aside-login1'}
        ${selectedIndex === 1 && 'bg-gradient-to-r from-[#FFA689] to-[#FFCC7D]'}
        relative 
        hidden 
        lg:block 
        h-64 
        lg:order-last 
        lg:col-span-5 
        lg:h-full 
        xl:col-span-6`}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}

            autoplay={true}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
            // onSwiper={(swiper) => console.log(swiper)}

          >
            {dataCarouselLogin.map((item, index) => (
              <SwiperSlide key={index}>
                {item.component}
              </SwiperSlide>
            ))}
          </Swiper>
        </aside>

        <main className="lg:col-span-7 xl:col-span-6">
          {/* logo */}
          <div className="px-8 py-8 flex justify-between items-center">
            <a className="h-auto w-auto" href="#">
              <img src={'/assets/images/logo.png'} alt="logo"

              />
            </a>
            <ButtonDarkMode />
          </div>
          {/* end logo */}


          <div className="px-8 lg:px-32">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl md:text-4xl text-center dark:text-white">
              Welcome to Dub Air
            </h1>

            <p className="mt-4 text-2xl leading-relaxed text-gray-500 text-center">
              Create the ultimate dubbing experience
            </p>

            <form action="#" className="">
              <div className=' flex flex-col gap-4'>
                <ButtonGoogle
                  title="Login with Google"
                  width="w-full"
                  height="h-12"
                  radius="rounded-[12px]"
                  onClick={() => console.log("Button clicked")} />
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-full h-0.5 bg-gray-300"></div>
                  <p className="text-gray-500">OR</p>
                  <div className="w-full h-0.5 bg-gray-300"></div>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <label htmlFor="Email" className="block text-sm py-2 font-medium text-gray-700 dark:text-white"> Email</label> <span className="text-red-500 text-lg">*</span>
              </div>
              <input
                type="email"
                id="Email"
                name="email"
                className="my-input mb-5 h-[48px] w-full rounded-[12px] bg-white text-md text-gray-700 outline-none"
              />

              <div className='flex items-center gap-1'>
                <label htmlFor="Password" className="block text-sm py-2 font-medium text-gray-700 dark:text-white"> Password</label> <span className="text-red-500 text-lg">*</span>
              </div>

              <input
                type="password"
                id="Password"
                name="password"
                className="my-input mb-5 h-[48px] w-full rounded-[12px] bg-white text-md text-gray-700 outline-none"
              />

              <div className="flex items-center justify-between">
                <label htmlFor="rememberMe" className="flex gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700 dark:text-white">
                    Remember me
                  </span>
                </label>
                <a href="#" className="my-text text-sm underline">Forgot your password?</a>
              </div>

              <div className="fex flex-col mt-[50px]">

                <ButtonGradient
                  title="Login"
                  width="w-full"
                  height="h-12"
                  radius="rounded-[12px]"
                  onClick={() => console.log("Button clicked")} />

                <p className="mt-4 text-sm">
                  Don't have an account? <a href="#" className="text-zinc-700 font-bold underline dark:text-white">Sign Up Now</a>
                </p>
              </div>
            </form>
          </div>
        </main>


      </div>
    </section>

  )
}

Login.getLayout = function getLayout(page) {
  return <AuthLayout title={"Login"}>{page}</AuthLayout>;
}

export default Login;