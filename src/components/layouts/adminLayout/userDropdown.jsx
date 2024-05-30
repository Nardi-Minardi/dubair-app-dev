import React, {useContext} from 'react'
import {
  Bars3Icon,
} from '@heroicons/react/20/solid'
import ButtonDarkMode from '@/components/buttons/buttonDarkMode'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import LanguageSelector from '@/components/elements/languageSelector'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { logoutUser } from '@/store/slices/authSlice'
import { useGlobalSidebarContext } from '@/context/sidebarContext'

const UserDropdown = ({user, handleLogout}) => {
  return (
    <div className="flex flex-row items-center">
      <img src={user?.image ? user.image : '/assets/images/avatar.png'}
        alt="avatar"
        className="w-12 mr-1 aspect-square rounded-full" />
      <div className="flex flex-col">
        <span className="text-lg md-max:w-20 w-32 truncate mt-1">{user?.name}</span>
        <span className="font-extralight lg-max:text-sm md-max:w-20 w-40 truncate">
          {user?.email ? user.email.substring(0, 15) + '...' : ''}
        </span>
      </div>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="bg-white dark:bg-[#2B2C2B] rounded-full flex items-center text-sm font-medium">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-4 w-4 transform transition-transform duration-200 ease-in-out`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </MenuButton>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-56
                origin-top-right rounded-md bg-white dark:bg-[#2B2C2B] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                {({ focus }) => (
                  <div className={`
                          ${focus ? 'bg-gray-100 dark:bg-[#2B2C2B] text-gray-900' : 'text-gray-700 dark:text-white'}
                          flex items-center w-full px-4 py-2 text-left text-sm
                          dark:hover:bg-[#2B2C2B] dark:hover:text-white hover:bg-gray-100 hover:text-gray-900`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path>
                        <path d="M9 12h12l-3-3m0 6l3-3"></path>
                      </g>
                    </svg>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`
                              ${focus ? 'bg-gray-100 dark:bg-[#2B2C2B] text-gray-900' : 'text-gray-700 dark:text-white'}
                              dark:hover:bg-[#2B2C2B] dark:hover:text-white 
                              flex items-center w-full px-4 py-2 text-left text-sm`}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default UserDropdown