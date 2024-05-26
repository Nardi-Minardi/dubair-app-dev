import React from 'react'
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/20/solid'
import ButtonDarkMode from '@/components/buttons/buttonDarkMode'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import LanguageSelector from '@/components/elements/languageSelector'

const Navbar = ({ show, setter }) => {
  const router = useRouter()

  const handleLogout = (e) => {
    e.preventDefault()
    router.push('/login')
  }

  return (
    <div className="dark:bg-[#2B2C2B] bg-white text-black dark:text-white flex flex-col-reverse lg:flex-row justify-between p-5 rounded-sm">
      <div className="flex flex-grow items-center py-2">
        <div className="flex flex-row w-full gap-5 items-center justify-between">
          <div className="flex flex-col w-1/2">
            <span className="text-2xl font-bold">Hi, Welcome Back</span><span className="font-extralight">Friday, May 24th 2024</span>
          </div>
          {/* bars icons */}
          <div className='flex flex-col items-end justify-end gap-3'>
            <div
              onClick={() => {
                setter(oldVal => !oldVal);
              }}
              className="xl:hidden md:hidden lg:hidden cursor-pointer">
              {!show && <Bars3Icon className="h-6 w-6 stroke-2" />}
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

          <div className="flex flex-row items-center">
            <img src="https://lh3.googleusercontent.com/a/ACg8ocKuVBMfQLAWzMALmkf5BvG6ZK8_gXW1qdlbLSs8_XSD-FD4G8rO=s96-c" className="w-12 mr-1 aspect-square rounded-full" />
            <div className="flex flex-col">
              <span className="text-lg md-max:w-20 w-32 truncate mt-1">Minardi</span>
              <span className="font-extralight lg-max:text-sm md-max:w-20 w-40 truncate">nardiminardi20@gmail.com</span>
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