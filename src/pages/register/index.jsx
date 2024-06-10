import React, { useState, useRef, useEffect, useContext } from 'react'
import AuthLayout from '@/layouts/authLayout';
import ButtonGradient from '@/components/buttons/buttonGradient';
import ButtonGoogle from '@/components/buttons/buttonGoogle';
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import ButtonDarkMode from '@/components/buttons/buttonDarkMode';
import Logo from '@/components/elements/logo';
import Link from 'next/link';
import { googleProvider } from '../api/firebase';
import { getAuth, signInWithPopup } from "firebase/auth";
import { LoadingContext } from '@/context/loadingContext';
import { loginByGoogle, registerUser } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { APP_NAME } from '@/config';

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

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const { showLoader, hideLoader } = useContext(LoadingContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name) {
      setErrors({ ...errors, name: 'Name is required' });
      return;
    }

    if (!email) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }

    const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!validEmail.test(email)) {
      setErrors({ ...errors, email: 'Email is invalid' });
      return;
    }

    if (!password) {
      setErrors({ ...errors, password: 'Password is required' });
      return;
    }

    if (password.length < 6) {
      setErrors({ ...errors, password: 'Password must be at least 6 characters' });
      return;
    }

    if (!agree) {
      toast.error('Please agree to the terms of service and privacy policy', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    showLoader && showLoader();
    dispatch(registerUser({ name: name, email: email, password: password }))
      .then((response) => {
        const resp = response.payload;
        const data = resp.data;
        console.log('response', resp)
        if (data.error) {
          toast.error(data.error?.description, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success('successfully registered, you will be redirected to the login page', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
        hideLoader && hideLoader();
      })
      .catch((err) => {
        toast.error('an error occurred', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        hideLoader && hideLoader();
      })
      .finally(() => {
        hideLoader && hideLoader();
      });
  }

  const handleLoginGoogle = async (provider) => {
    showLoader && showLoader();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const accessToken = result.user.accessToken;
        dispatch(loginByGoogle({ token: accessToken })).then((response) => {
          const resp = response.payload;
          const data = resp?.data;
          if (resp?.status === 200) {
            const cookiesName = APP_NAME + '-token';
            Cookies.set(cookiesName, data?.token,
              {
                expires: 7,
                secure: true,
              });
            router.push('/dubbing');
          } else {
            toast.error('an error occurred', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
      })
      .catch((error) => {
        console.log(error);
        hideLoader && hideLoader();
      })
      .finally(() => {
        hideLoader && hideLoader();
      });
  };

  return (
    <section className="bg-white dark:bg-[#121212]">
      <div className="flex flex-col lg:flex-row">

        <main className="h-full w-full lg:w-1/2 min-h-screen">
          {/* logo */}
          <div className="px-12 py-8 flex justify-between items-center">
            <Logo />
            {/* <ButtonDarkMode /> */}
          </div>
          {/* end logo */}


          <div className="px-12 lg:px-[170px]">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl md:text-4xl text-center dark:text-white">
              Create Your Account
            </h1>

            <p className="mt-4 mb-4 text-2xl leading-relaxed text-gray-500 text-center">
              {" Let's get started with your free 5 minutes trial"}
            </p>

            <form action="#" className="mx-auto">
              <div className=' flex flex-col gap-4'>
                <ButtonGoogle
                  title="Login with Google"
                  width="w-full"
                  height="h-12"
                  radius="rounded-[12px]"
                  onClick={() => handleLoginGoogle(googleProvider)} />
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-full h-0.5 bg-gray-300"></div>
                  <p className="text-gray-500">OR</p>
                  <div className="w-full h-0.5 bg-gray-300"></div>
                </div>
              </div>

              <div className='flex items-center gap-1'>
                <label htmlFor="FullName" className="block text-sm py-2 font-medium text-gray-700 dark:text-white"> Full Name</label> <span className="text-red-500 text-lg">*</span>
              </div>
              <div className=' mb-5'>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="test"
                  id="FullName"
                  name="fullname"
                  className="my-input pl-3 h-[48px] w-full rounded-[12px] bg-white text-md text-gray-700 outline-none"
                />
                {errors && errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>

              <div className='flex items-center gap-1'>
                <label htmlFor="Email" className="block text-sm py-2 font-medium text-gray-700 dark:text-white"> Email</label> <span className="text-red-500 text-lg">*</span>
              </div>
              <div className=' mb-5'>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="Email"
                  name="email"
                  className="my-input pl-3 h-[48px] w-full rounded-[12px] bg-white text-md text-gray-700 outline-none"
                />
                {errors && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div className='flex items-center gap-1'>
                <label htmlFor="Password" className="block text-sm py-2 font-medium text-gray-700 dark:text-white"> Password</label> <span className="text-red-500 text-lg">*</span>
              </div>

              <div className=' mb-5'>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="Password"
                  name="password"
                  className="my-input pl-3 h-[48px] w-full rounded-[12px] bg-white text-md text-gray-700 outline-none"
                />
                {errors && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="rememberMe" className="flex gap-2">
                  <input
                    onChange={(e) => setAgree(e.target.checked)}
                    type="checkbox"
                    id="rememberMe"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700 dark:text-white">
                    I agree to all <Link href="/terms-of-services" className="text-dark-500 font-bold underline">Terms of Service</Link>&nbsp;
                    and <Link href="/privacy-policy" className="text-dark-500 font-bold underline">Privacy Policy</Link>
                  </span>
                </label>
                {/* <a href="#" className="my-text text-sm underline">Forgot your password?</a> */}
              </div>

              <div className="fex flex-col mt-[50px]">

                <ButtonGradient
                  title="Sign Up"
                  width="w-full"
                  height="h-12"
                  radius="rounded-[12px]"
                  type="button"
                  onClick={(e) => handleRegister(e)} // handleRegister
                />

                <p className="mt-4 mb-4 text-sm">
                  Already have account? <Link href="/login" className="text-zinc-700 font-bold underline dark:text-white">Login</Link>
                </p>
              </div>
            </form>
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

Register.getLayout = function getLayout(page) {
  return <AuthLayout title={"Register"}>{page}</AuthLayout>;
}

export default Register;