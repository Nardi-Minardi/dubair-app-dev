import React, { useState, useEffect } from 'react'
import {
  Bars3Icon,
} from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '@/store/slices/authSlice'
import { FiPlus, FiUpload } from "react-icons/fi";
import { useGlobalSidebarContext } from '@/context/sidebarContext'
import { FiChevronsLeft } from "react-icons/fi";
import Logo from '@/components/elements/logo'
import UserDropdown from './userDropdown'

const Navbar3 = ({ firstOpen, setFirstOpen, setTitle, title }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const locale = router.locale
  const { user, token } = useSelector((state) => state.rootSlice?.auth);
  const { closeSidebar, isSidebarOpen, showSidebar, tabActive, setTabActive } = useGlobalSidebarContext();

  const handleLogout = (e) => {
    e.preventDefault()
    try {
      dispatch(logoutUser(token))
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleExport = (e) => {
    //go to export page
    e.preventDefault()
    router.push(`/${locale}/export`)
  }

  return (
    <div>
      <div className="flex px-5  gap-5 w-full flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center w-full gap-3 max-w-1/2">
          <Logo />
        </div>
        <div className='flex flex-row w-full items-center  justify-end gap-4'>
          <button
            onClick={handleLogout}
            className=" bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white 
            text-xs py-2 px-4 rounded-lg flex items-center">
            VIP
            <img src="/assets/icons/diamond-white.svg" className="w-4 ml-1" />
          </button>
          <UserDropdown user={user} handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  )
}

export default Navbar3