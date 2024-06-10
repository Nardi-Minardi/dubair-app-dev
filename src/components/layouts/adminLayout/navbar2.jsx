import React, { useState, useEffect } from 'react'
import {
  Bars3Icon,
} from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FiPlus, FiUpload } from "react-icons/fi";
import { useGlobalSidebarContext } from '@/context/sidebarContext'
import { FiChevronsLeft } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux'
import { tokenAuth } from '@/utils/LocalStorage'
import { fetchUser, logoutUser } from '@/store/slices/authSlice'

const Navbar2 = ({ firstOpen, setFirstOpen, setTitle, title }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector((state) => state.auth)
  const locale = router.locale
  const { closeSidebar, isSidebarOpen, showSidebar, tabActive, setTabActive } = useGlobalSidebarContext();

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

  const handleExport = (e) => {
    //go to export page
    e.preventDefault()
    router.push(`/${locale}/export`)
  }

  return (
    <div>
      <div className="flex px-5 lg:px-0 gap-5 w-full flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="flex items-center w-full gap-3 max-w-1/2">
          {!firstOpen && !isSidebarOpen ? (
            <div className="cursor-pointer"
              onClick={() => {
                setFirstOpen(true)
                showSidebar()
              }}>
              <Bars3Icon className="h-6 w-6 stroke-2" />
            </div>
          ) : (
            <div className="cursor-pointer"
              onClick={() => {
                closeSidebar()
                setFirstOpen(false)
              }}>
              <FiChevronsLeft className="h-6 w-6 stroke-2" />
            </div>
          )}
          <p className="text-md font-semibold">{title.substring(0, 40) + '...'}</p>
        </div>

        <div className='flex items-center w-full lg:w-auto justify-center shadow-sm'>
          <button
            onClick={() => {
              setTitle('Rewrite Project Translating To Bahasa Indonesia')
              setTabActive('rewrite')
            }}
            className={` text-black dark:text-white py-2 px-6 rounded-l-lg
            ${tabActive === 'rewrite' ? 'bg-[#2B2C2B] text-white' : ''}
            `}>
            Rewrite
          </button>
          <button
            onClick={() => {
              setTitle('Revoice Project Translating To Bahasa Indonesia')
              setTabActive('revoice')
            }}
            className={` text-black dark:text-white py-2 px-6
            ${tabActive === 'revoice' ? 'bg-[#2B2C2B] text-white' : ''}
            `}>
            Revoice
          </button>
          <button
            onClick={() => {
              setTitle('Refine Project Translating To Bahasa Indonesia')
              setTabActive('refine')
            }}
            className={` text-black dark:text-white py-2 px-6
          ${tabActive === 'refine' ? 'bg-[#2B2C2B] text-white' : ''}
          `}>
            Refine
          </button>
          <button
            onClick={() => {
              setTitle('Remix Project Translating To Bahasa Indonesia')
              setTabActive('remix')
            }}
            className={` text-black dark:text-white py-2 px-6 rounded-r-lg
            ${tabActive === 'remix' ? 'bg-[#2B2C2B] text-white' : ''}
            `}>
            Remix
          </button>
        </div>
        <div className='flex flex-row w-full items-end  justify-end gap-4'>
          <button
            onClick={handleLogout}
            className=" bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white 
            text-xs py-2 px-4 rounded-lg flex items-center">
            VIP
            <img src="/assets/icons/diamond-white.svg" className="w-4 ml-1" />
          </button>
          <button className='bg-[#2B2C2B] text-white  text-xs py-2 px-4 rounded-lg flex items-center '>
            <FiPlus className='' />
            <p className=''>Add New Sub</p>
          </button>
          <button
            onClick={handleExport}
            className="bg-[#2B2C2B] text-white  text-xs py-2 px-4 rounded-lg flex items-center">
            Export
            <FiUpload className="w-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar2