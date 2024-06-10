import React, {useState, useEffect} from 'react'
import { CiClock1, CiClock2 } from "react-icons/ci";
import { FiTrash2, FiPlus } from "react-icons/fi";
import moment from 'moment';
import ModalRevoice from '@/components/inputs/modalRevoice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";

const Revoice = ({ items, items2 }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className=' bg-white w-full h-auto shadow-sm dark:bg-[#2B2C2B] rounded-sm'>
        <div className='py-2 flex items-center border-b-2 mx-3 border-[#EEEEEE] dark:border-white
          font-semibold justify-center rounded-t-lg'>
          Bahasa Indonesia
        </div>
        <div className='max-h-[100vh] pb-12 lg:pb-48 xl:pb-48 scrollbar-webkit overflow-y-auto'>
          {items2.map((item, index) => (
            <div key={index}
              className='py-2 mx-3 flex lg:items-center xl:items-center border-b-2 border-[#EEEEEE] dark:border-white gap-4'>


              <div className='flex max-w-8 px-3 justify-start align-top'>
                <p>{item.id}</p>
              </div>

              <div className='flex w-full flex-col gap-3 lg:flex-row xl:flex-row px-3 lg:items-center xl:justify-center'>

                <div className='flex flex-row w-full justify-between lg:flex-col xl:flex-col lg:w-auto xl:w-auto items-start pr-3'>
                  <div className='bg-[#EEEEEE] dark:bg-[#121212] rounded-md items-center my-1 justify-center flex w-auto px-2'>
                    <p className='text-[#2B2C2B] dark:text-white whitespace-nowrap text-sm font-semibold'>40 PCS</p>
                  </div>
                  <div className='flex w-full justify-end lg:justify-start gap-3 items-center'>
                    <div className='flex flex-col gap-2'>
                      <span className='text-xs gap-1 flex flex-row items-center'>
                        <CiClock1 className='' />
                        In
                      </span>
                      <span className='text-xs gap-1 flex flex-row items-center'>
                        <CiClock2 className='' />
                        Out</span>
                    </div>
                    <div className='text-xs gap-1 flex flex-col items-center'>
                       <span>{moment(new Date()).format('HH:mm:ss')}</span>
                      <span>{moment(new Date()).format('HH:mm:ss')}</span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col lg:flex-row xl:flex-row w-full gap-4 lg:items-center'>
                  <div className='rounded-lg relative group'>
                    <div className='w-full lg:max-w-[60px] xl:max-w-[60px] h-full lg:h-[60px] xl:h-[60px]
                        rounded-lg overflow-hidden bg-[#18181b] aspect-video'>
                      <img src={item.img} className='bg-[#18181b] h-full w-full object-cover aspect-w-16 aspect-h-9 rounded-lg transition-all duration-300 transform group-hover:scale-105 group-hover:opacity-60' />
                      {/* play icons */}
                      <div className="hidden cursor-pointer lg:flex items-center justify-center">
                        <div className="absolute z-40 top-[-10px] right-[-10px] flex items-center justify-center
                            bg-[#2B2C2B] dark:bg-[#121212]
                            rounded-full shadow group-hover:opacity-90 w-6 h-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className='play-buttonicon w-3 h-3 text-white' viewBox="0 0 24 24"><path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" /></svg>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className='flex flex-col w-full'>
                    <p className='text-[#2B2C2B] dark:text-white font-semibold'>{item.title}</p>
                    <p className='text-[#676D73] dark:text-white text-justify'>{item.description}</p>
                  </div>
                  <button
                    onClick={onOpen}
                    className='text-black dark:text-white border-2 h-8 border-[#EEEEEE] text-sm whitespace-nowrap rounded-lg px-2'>
                    Add or Change
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalRevoice
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
      />
    </>
  )
}

export default Revoice