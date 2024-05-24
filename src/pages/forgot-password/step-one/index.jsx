import React, { useState, useRef, useEffect } from 'react'
import AuthLayout from "@/layouts/AuthLayout";
import ButtonGradient from '@/components/buttons/buttonGradient';
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import ButtonDarkMode from '@/components/buttons/buttonDarkMode';
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid';
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
const CarouselLogin3 = dynamic(() => import('@/components/carousel/carouselLogin3'),
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
    component: <CarouselLogin3 />,
  }
];

const ForgotStepOne = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPath, setSelectedPath] = useState("");
  const [lastStep, setLastStep] = useState(true);

  const currentPath = router.pathname;
  useEffect(() => {
    if (currentPath === "/forgot-password/step-one") {
      setSelectedPath("/forgot-password/step-two")
    }
  }, [currentPath])

  const handleNextPath = (e) => {
    e.preventDefault();
    //if go to next path set lastStep to true
    setLastStep(true);
    //send params
    router.push({
      pathname: selectedPath,
      query: { lastStep: lastStep }
    })
  }

  return (
    <section className="bg-white dark:bg-zinc-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">

        <aside className={`
        ${selectedIndex === 0 && 'aside-container-login1'}
        ${selectedIndex === 1 && 'aside-container-login2'}
        ${selectedIndex === 2 && 'aside-container-login3'}
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
            autoplay={false}
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
            <Logo />
            <ButtonDarkMode />
          </div>
          {/* end logo */}


          <div className="px-8 lg:px-32 py-20">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl md:text-4xl text-center dark:text-white">
              Forgot Password ?
            </h1>

            <p className="mt-4 mb-4 text-1xl leading-relaxed text-gray-500 text-center">
              No need to wory, we'll email you reset instructions
            </p>

            <form action="#" className="">

              <div className='flex items-center gap-1'>
                <label htmlFor="Email" className="block text-sm py-2 font-medium text-gray-700 dark:text-white"> Email</label> <span className="text-red-500 text-lg">*</span>
              </div>
              <input
                type="email"
                id="Email"
                name="email"
                className="my-input mb-5 h-[48px] w-full rounded-[12px] bg-white text-md text-gray-700 outline-none"
              />

              <div className="fex flex-col mt-[50px]">

                <ButtonGradient
                  title="Reset Password"
                  width="w-full"
                  height="h-12"
                  type="button"
                  radius="rounded-[12px]"
                  onClick={handleNextPath}
                />

                <p className="mt-4 text-sm text-center">
                  <ArrowLongLeftIcon className="h-5 w-5 inline-block text-gray-500 dark:text-white mr-1" />
                  <a href="/" className="text-zinc-700 font-bold dark:text-white">Back to Login</a>
                </p>
              </div>
            </form>

            <div className="flex items-center justify-center gap-2 mt-4">
              <div className='mt-12'>
                {/* create bullet timeline here */}
                <div className="flex items-center justify-center">
                  <div
                    className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
                    {lastStep &&
                      <CheckIcon className="text-white w-4 h-4" />}
                  </div>
                  <span className="w-4 h-0.5 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]"></span>
                  <div className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
                  </div>
                  <span className="w-4 h-0.5 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]"></span>
                  <div className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
                  </div>
                  <span className="w-4 h-0.5 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]"></span>
                  <div className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>


      </div>
    </section>

  )
}

ForgotStepOne.getLayout = function getLayout(page) {
  return <AuthLayout title={"Forgot Password"}>{page}</AuthLayout>;
}

export default ForgotStepOne;