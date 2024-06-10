import React, { useContext, useEffect } from 'react'
import {
  Bars3Icon,
} from '@heroicons/react/20/solid'
import ButtonDarkMode from '@/components/buttons/buttonDarkMode'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import LanguageSelector from '@/components/elements/languageSelector'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { fetchUser, logoutUser } from '@/store/slices/authSlice'
import { useGlobalSidebarContext } from '@/context/sidebarContext'
import UserDropdown from './userDropdown'
import { tokenAuth } from '@/utils/LocalStorage'

const Navbar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector((state) => state.auth)
  const { showSidebar, isSidebarOpen } = useGlobalSidebarContext();

  useEffect(() => {
    dispatch(fetchUser(tokenAuth()))
  }
    , []);

  const handleLogout = (e) => {
    e.preventDefault()
    try {
      dispatch(logoutUser(tokenAuth()))
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="dark:bg-[#2B2C2B] bg-white text-black dark:text-white flex flex-col-reverse lg:flex-row justify-between p-5 rounded-sm">
      <div className="flex flex-grow items-center py-2">
        <div className="flex flex-row w-full gap-5 items-center justify-between">
          <div className="flex flex-col w-1/2">
            <span className="text-2xl font-bold">Hi, Welcome Back</span><span className="font-extralight">
              {moment().format('dddd, MMMM Do YYYY')}
            </span>
          </div>
          {/* bars icons */}
          <div className='flex flex-col items-end justify-end gap-3'>
            <div
              onClick={showSidebar}
              className="xl:hidden md:hidden lg:hidden cursor-pointer">
              {!isSidebarOpen && <Bars3Icon className="h-6 w-6 stroke-2" />}
            </div>
            <div className="flex xl:hidden md:hidden lg:hidden">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-5">
        <div className="xl:flex md:flex lg:flex items-center justify-center xl:py-0 xl:justify-end lg:justify-end md:justify-start">

          <div className="hidden xl:flex md:flex lg:flex">
            <LanguageSelector />
          </div>

          <UserDropdown user={user} handleLogout={handleLogout} />

        </div>
        <ButtonDarkMode />
        {/* <div className="flex xl:hidden md:hidden lg:hidden">
            <LanguageSelector />
          </div> */}
      </div>
    </div>
  )
}

export default Navbar