import React, { useState, useRef, useEffect, useContext } from 'react'
import AuthLayout from "@/layouts/authLayout";
import ButtonGradient from '@/components/buttons/buttonGradient';
import ButtonGoogle from '@/components/buttons/buttonGoogle';
import dynamic from 'next/dynamic'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import ButtonDarkMode from '@/components/buttons/buttonDarkMode';
import Logo from '@/components/elements/logo';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/slices/authSlice';
import { LoadingContext } from '@/context/loadingContext';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { getData, storeData } from '@/utils/LocalStorage';

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

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const { showLoader, hideLoader } = useContext(LoadingContext);

  useEffect(() => {
    getData('rememberMe').then((data) => {
      setRememberMe(data.rememberMe);
      setEmail(data.email);
      setPassword(data.password);
    });
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }

    if (!password) {
      setErrors({ ...errors, password: 'Password is required' });
      return;
    }

    showLoader && showLoader();
    dispatch(loginUser({ username: email, password }))
      .then((response) => {
        const resp = response.payload;
        const data = resp.data;
        console.log('response', resp)
        if (resp.status === 200) {

          // toast.success('successfully logged in', {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: false,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          // });
          router.push('/dubbing');
        } else {
          const errors = data.errors;
          console.log(errors.username);
          if (errors) {
            // errors.map((error) => {
            if (errors.username) {
              setErrors({ ...errors, email: errors.username });
            }
            if (errors.password) {
              setErrors({ ...errors, password: errors.password });
            }
            // })
          }
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hideLoader && hideLoader();
        // toast.error('🦄 Wow so easy!', {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
      });
  }

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    // flow: 'auth-code',
    // prompt: 'consent',
    // responseType: 'code',
    // accessType: 'offline',
    // scope: 'email profile openid',
    onFailure: error => console.error(error),

  });

  const handleRememberMe = (e) => {
    if (e.target.checked) {
      storeData('rememberMe', {
        rememberMe: e.target.checked,
        email: email,
        password: password
      });
    } else {
      storeData('rememberMe', {
        rememberMe: e.target.checked,
        email: '',
        password: ''
      });
    }
  }

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


          <div className="px-12 lg:px-[100px] xl:px-[170px]">
            <h1 className="font-bold text-gray-900 text-4xl text-center dark:text-white">
              Welcome to Dub Air
            </h1>

            <p className="mt-4 mb-4 text-lg leading-relaxed text-gray-500 text-center">
              Create the ultimate dubbing experience
            </p>

            <form action="#" className="mx-auto">
              <div className='flex flex-col gap-4'>
                <ButtonGoogle
                  title="Login with Google"
                  width="w-full"
                  height="h-12"
                  radius="rounded-[12px]"
                  onClick={handleLoginGoogle}
                />
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-full h-0.5 bg-gray-300"></div>
                  <p className="text-gray-500">OR</p>
                  <div className="w-full h-0.5 bg-gray-300"></div>
                </div>
              </div>

              <div className='flex items-center gap-1'>
                <label htmlFor="Email" className="block text-sm py-2 font-medium text-gray-700 dark:text-white"> Email</label> <span className="text-red-500 text-lg">*</span>
              </div>
              <div className=' mb-5'>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="my-input pl-3 h-[48px] w-full rounded-[12px] bg-white text-md text-gray-700 outline-none"
                  value={email}
                  onChange={(e) => {
                    setErrors({ ...errors, email: '' });
                    setEmail(e.target.value)
                  }}
                />
                {errors && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div className='flex items-center gap-1'>
                <label htmlFor="Password" className="block text-sm py-2 font-medium text-gray-700 dark:text-white"> Password</label> <span className="text-red-500 text-lg">*</span>
              </div>

              <div className='mb-5'>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="my-input pl-3 h-[48px] w-full rounded-[12px] bg-white text-md text-gray-700 outline-none"
                  value={password}
                  onChange={(e) => {
                    setErrors({ ...errors, password: '' });
                    setPassword(e.target.value)
                  }}
                />
                {errors && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="rememberMe" className="flex gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    onChange={handleRememberMe}
                  />

                  <span className="text-sm text-gray-700 dark:text-white">
                    Remember me
                  </span>
                </label>
                <a href="/forgot-password/step-one" className="my-text text-sm underline">Forgot your password?</a>
              </div>

              <div className="fex flex-col mt-[50px]">

                <ButtonGradient
                  title="Login"
                  width="w-full"
                  height="h-12"
                  type="button"
                  radius="rounded-[12px]"
                  onClick={handleLogin}
                />

                <p className="mt-4 mb-4 text-sm">
                  Don't have an account? <a href="/register" className="text-zinc-700 font-bold underline dark:text-white">Sign Up Now</a>
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

Login.getLayout = function getLayout(page) {
  return <AuthLayout title={"Login"}>{page}</AuthLayout>;
}

export default Login;