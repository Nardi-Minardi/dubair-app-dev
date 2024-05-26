import React, { useState, useRef, useEffect } from 'react'
import AuthLayout from "@/layouts/authLayout";
import ButtonGradient from '@/components/buttons/buttonGradient';
import ButtonGoogle from '@/components/buttons/buttonGoogle';
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

const ForgotStepTwo = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPath, setSelectedPath] = useState("");
  const [segments, setSegments] = React.useState(["", "", "", ""])

  const query = router.query;
  const currentPath = router.pathname;

  const onPaste = (event) => {
    const pasted = event.clipboardData.getData("text/plain")
    setSegments(pasted.split("").slice(0, segments.length))
  }

  useEffect(() => {
    if (currentPath === "/forgot-password/step-two") {
      setSelectedPath("/forgot-password/step-three")
    }
  }, [currentPath])

  const handleNextPath = (e) => {
    e.preventDefault();
    //send params
    router.push({
      pathname: selectedPath,
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
              Password Reset
            </h1>

            <p className="mt-4 mb-4 text-1xl leading-relaxed text-gray-500 text-center">
              We send code to email_user@gmail.com
            </p>

            <form action="#" className="mx-auto">

              {/* Box code OTP 4 digits */}
              {/* <div className="flex justify-center items-center mt-8 gap-5">
                <input type="number" maxLength="1" min="0" max="9"
                  className="w-12 h-12 font-bold text-center border pl-4 border-gray-300 dark:border-gray-700 rounded-[8px] dark:bg-gray-800 dark:text-white" />
                <input type="number" maxLength="1" min="0" max="9"
                  className="w-12 h-12 font-bold text-center border pl-4 border-gray-300 dark:border-gray-700 rounded-[8px] dark:bg-gray-800 dark:text-white" />
                <input type="number" maxLength="1" min="0" max="9"
                  className="w-12 h-12 font-bold text-center border pl-4 border-gray-300 dark:border-gray-700 rounded-[8px] dark:bg-gray-800 dark:text-white" />
                <input type="number" maxLength="1" min="0" max="9"
                  className="w-12 h-12 font-bold text-center border pl-4 border-gray-300 dark:border-gray-700 rounded-[8px] dark:bg-gray-800 dark:text-white" />
              </div> */}

              <div className="flex justify-center items-center mt-8 gap-5">
                {segments.map((s, key) =>
                  <input key={key} value={s} onPaste={onPaste}
                    onChange={(e) => {
                      const value = e.target.value
                      //min 0 max 9
                      if (value >= 0 && value <= 9) {
                        const newSegments = [...segments]
                        newSegments[key] = value
                        setSegments(newSegments)
                      }

                    }}
                    type="number" maxLength="1" min="0" max="9"
                    className='w-12 h-12 font-bold text-center border pl-4 border-gray-300 dark:border-gray-700 rounded-[8px] dark:bg-gray-800 dark:text-white'
                  />
                )}
              </div>


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
                  Didn't receive the code?
                  <span className="text-zinc-700 font-bold underline dark:text-white"> Resend</span>
                </p>
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
                  </div>
                  <span className="w-4 h-0.5 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]"></span>
                  <div className="w-4 h-4 bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-full cursor-pointer">
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

ForgotStepTwo.getLayout = function getLayout(page) {
  return <AuthLayout title={"Forgot Password"}>{page}</AuthLayout>;
}

export default ForgotStepTwo;