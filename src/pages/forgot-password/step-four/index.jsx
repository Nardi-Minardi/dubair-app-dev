import React, { useState, useRef, useEffect } from 'react'
import AuthLayout from "@/layouts/authLayout";
import ButtonGradient from '@/components/buttons/buttonGradient';
import ButtonGoogle from '@/components/buttons/buttonGoogle';
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import ButtonDarkMode from '@/components/buttons/buttonDarkMode';
import ForgotPasswordLine from '@/components/lines/forgotPasswordLine';
import { useRouter } from 'next/router';
import { CheckIcon } from '@heroicons/react/20/solid';
import Logo from '@/components/elements/logo';

const CarouselLogin1 = dynamic(() => import('@/components/carousel/carouselLogin1'),
  { ssr: false }
)
const CarouselLogin2 = dynamic(() => import('@/components/carousel/carouselLogin2'),
  { ssr: false }
)
const CarouselRegister3 = dynamic(() => import('@/components/carousel/carouselRegister3'),
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
  {
    id: 3,
    component: <CarouselRegister3 />,
  }
];



const ForgotStepFour = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPath, setSelectedPath] = useState("");

  const query = router.query;
  const currentPath = router.pathname;

  useEffect(() => {
    if (currentPath === "/forgot-password/step-three") {
      setSelectedPath("/forgot-password/step-four")
    }
  }, [currentPath])

  const handleNextPath = (e) => {
    e.preventDefault();
    //send params
    router.push({
      query: { lastStep: true }
    })
  }

  return (
    <section className="bg-white dark:bg-[#121212]">
      <div className="flex flex-col lg:flex-row">

        <main className="h-full w-full lg:w-1/2 min-h-screen">
          {/* logo */}
          <div className="px-8 py-8 flex justify-between items-center">
            <Logo />
            {/* <ButtonDarkMode /> */}
          </div>
          {/* end logo */}


          <div className="px-12 lg:px-[170px] py-5">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center dark:text-white">
              Everything Complete
            </h1>

            <p className="mt-4 mb-4 text-1xl leading-relaxed text-gray-500 text-center">
              Your password has been successfully reset. You can login now.
            </p>

            <form action="#" className="mx-auto">

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
                {/* <a href="/forgot-password/step-one" className="my-text text-sm underline">Forgot your password?</a> */}
              </div>

              <div className="fex flex-col mt-[50px]">

                <ButtonGradient
                  title="Login"
                  width="w-full"
                  height="h-12"
                  type="button"
                  radius="rounded-[12px]"
                  onClick={handleNextPath}
                />

                {/* <p className="mt-4 text-sm">
                  Don't have an account? <a href="/register" className="text-zinc-700 font-bold underline dark:text-white">Sign Up Now</a>
                </p> */}
              </div>
            </form>

            <div className="flex items-center justify-center gap-2 mt-4">
              <div className='mt-12'>
                {/* create bullet timeline here */}
                <div className="flex items-center justify-center">
                  <div
                    className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
                    {query.lastStep &&
                      <CheckIcon className="text-white w-4 h-4" />}
                  </div>
                  <span className="w-4 h-0.5 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]"></span>
                  <div className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
                    {query.lastStep &&
                      <CheckIcon className="text-white w-4 h-4" />}
                  </div>
                  <span className="w-4 h-0.5 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]"></span>
                  <div className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
                    {query.lastStep &&
                      <CheckIcon className="text-white w-4 h-4" />}
                  </div>
                  <span className="w-4 h-0.5 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]"></span>
                  <div className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
                    {query.lastStep &&
                      <CheckIcon className="text-white w-4 h-4" />}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        <aside className={`
        w-auto
        lg:w-1/2
        min-h-screen
        `}>
          <Swiper
            style={{ position: 'sticky', top: 0, height: '100vh' }}
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

      </div>
    </section>

  )
}

ForgotStepFour.getLayout = function getLayout(page) {
  return <AuthLayout title={"Forgot Password"}>{page}</AuthLayout>;
}

export default ForgotStepFour;