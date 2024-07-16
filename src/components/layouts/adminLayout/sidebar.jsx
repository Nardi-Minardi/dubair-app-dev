import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import UpgradePro from '@/components/elements/upgradePro'
import { useGlobalSidebarContext } from '@/context/sidebarContext'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const menus = [
  {
    title: 'Dubbing',
    icon: '/assets/icons/dubbing.svg',
    iconWhite: '/assets/icons/dubbing-white.svg',
    link: '/dubbing'
  },
  {
    title: 'Archive',
    icon: '/assets/icons/archive.svg',
    iconWhite: '/assets/icons/archive-white.svg',
    link: '/archive'
  },
  {
    title: 'Minutes Available',
    icon: '/assets/icons/diamond.svg',
    iconWhite: '/assets/icons/diamond-white.svg',
    link: '/minutes-available'
  },
]

const otherMenus = [
  // {
  //   title: 'Settings',
  //   icon: '/assets/icons/settings.svg',
  //   iconWhite: '/assets/icons/settings-white.svg',
  //   link: '/settings'
  // },
  {
    title: 'Account',
    icon: '/assets/icons/account.svg',
    iconWhite: '/assets/icons/account-white.svg',
    link: '/account'
  },
]

const Logo = dynamic(() => import('@/components/elements/logo'), { ssr: false })

const Sidebar = ({ firstOpen, setFirstOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isSidebarOpen, closeSidebar } = useGlobalSidebarContext();
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const ModalOverlay = ({ onClick }) => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={onClick}
    />
  )

  const handleRoute = (path) => {
    router.push(path)
  }

  return (
    <>
      <div className={`
        ${isSidebarOpen ? "fixed ml-0" : " ml-[-20rem] md:ml-0  "}
        ${firstOpen ? "" : "md:ml-[-20rem]"}
        bg-white 
        dark:bg-[#121212] 
        text-[#8c8c8c] 
        xl:w-[22rem] 
        lg:w-[20rem] 
        w-[20rem]
        min-h-full 
        pb-10 
        shadow-lg 
        shadow-white/5 t
        transition-[margin-left] 
        ease-in-out 
        duration-500 
        md:static 
        top-0 
        bottom-0 
        left-0 
        z-40
        overflow-y-auto
        scrollbar-webkit
      `}>

        <div className="flex flex-col">
          <div className="mx-auto pt-8 px-5">
            <Logo link="/dubbing" />
          </div>
          <div className=" ml-8 mt-12 text-md text-color-gray">MENU
          </div>

          {mounted && (
            <ul className="mb-auto mx-[10%] mt-4">
              {menus.length > 0 && menus.map((menu, index) => (
                <div key={index} onClick={() => {
                  handleRoute(menu.link)
                  closeSidebar()
                }
                }>
                  <div
                    className={`relative 
                ${currentPath === menu.link || currentPath.includes(menu.link)
                        ? 'bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]' : ''}
                ${currentPath === menu.link || currentPath.includes(menu.link) ? 'text-white' : ''}
                rounded-lg
                my-3
                py-2
                flex 
                hover:cursor-pointer 
                font-medium 
                text-color-gray
                `}>
                    <li className="my-[3px] flex cursor-pointer items-center px-5">
                      <span>
                        <img src={theme === 'dark' || currentPath === menu.link || currentPath.includes(menu.link) ? menu.iconWhite : menu.icon
                        } className="w-6" />
                      </span>
                      <p className="ml-2 flex text-md">{menu.title}</p>
                    </li>
                  </div>
                </div>
              ))}
            </ul>
          )}

          <div className="ml-8 mt-12 text-md text-color-gray">OTHER
          </div>

          {mounted && (
            <ul className="mb-auto mx-[10%] mt-4">
              {otherMenus.length > 0 && otherMenus.map((menu, index) => (
                <div key={index} onClick={() => {
                  handleRoute(menu.link)
                  closeSidebar()
                }
                }>
                  <div
                    className={`relative 
                ${currentPath === menu.link || currentPath.includes(menu.link) ? 'bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]' : ''}
                ${currentPath === menu.link || currentPath.includes(menu.link) ? 'text-white' : ''}
                rounded-lg
                my-3

                py-2
                flex 
                hover:cursor-pointer 
                font-medium 
                text-color-gray
                `}>
                    <li className="my-[3px] flex cursor-pointer items-center px-5">
                      <span>
                        <img src={theme === 'dark' || currentPath === menu.link && currentPath.includes(menu.link) ? menu.iconWhite : menu.icon
                        } className="w-6" />
                      </span>
                      <p className="ml-2 flex text-md">{menu.title}</p>
                    </li>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>

        <UpgradePro />

      </div>
      {isSidebarOpen ? <ModalOverlay onClick={() => {
        closeSidebar()
        if (firstOpen) {
          setFirstOpen(false)
        }
      }

      } /> : <></>}
    </>
  )
}

export default Sidebar