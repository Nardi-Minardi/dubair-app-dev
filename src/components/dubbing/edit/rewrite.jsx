import React, {useState, useEffect} from 'react'
import { CiClock1, CiClock2 } from "react-icons/ci";
import { FiTrash2, FiPlus } from "react-icons/fi";
import moment from 'moment';

const Rewrite = ({ items, items2 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  return (
    <div className='flex flex-col lg:flex-row justify-between gap-4'>

      {/* english comp */}
      <div className=' bg-white w-full h-auto shadow-sm dark:bg-[#2B2C2B] rounded-sm'>
        <div className='py-2 flex items-center border-b-2 mx-3 border-[#EEEEEE] dark:border-white
          font-semibold justify-center rounded-t-lg'>
          English
        </div>
        <div className='relative max-h-[100vh] pb-12 lg:pb-48 xl:pb-48 scrollbar-webkit overflow-y-auto'>
          {items.map((item, index) => (
            <div key={index}
              className='py-2 mx-3 flex lg:items-center xl:items-center border-b-2 border-[#EEEEEE] dark:border-white'>

              <div className='flex w-1/12 justify-start'>
                <p>{item.id}</p>
              </div>
              <div className='flex lg:flex-row xl:flex-row flex-col w-full'>
                <div className='flex flex-col w-full'>
                  <p className='text-[#2B2C2B] dark:text-white font-semibold'>{item.title}</p>
                  <p className='text-[#2B2C2B] dark:text-white text-justify'>{item.description}</p>
                </div>

                <div className='flex justify-end ml-5'>
                  <div className='flex items-center justify-between gap-5'>

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
                    <div className='items-center cursor-pointer text-[#676D73]'>
                      <FiTrash2 className='' />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}


        </div>
        {/* <button className='flex items-center px-5 py-5 gap-2 absolute bottom-0 left-10 z-20 bg-white dark:bg-[#2B2C2B] rounded-md shadow-sm dark:shadow-none'>
            <FiPlus className='' />
            <p className=''>Add New Subtitles Line</p>
          </button> */}

      </div>

      {/* indonesia comp */}
      <div className=' bg-white w-full h-auto shadow-sm dark:bg-[#2B2C2B] rounded-sm'>
        <div className='py-2 flex items-center border-b-2 mx-3 border-[#EEEEEE] dark:border-white
          font-semibold justify-center rounded-t-lg'>
          Bahasa indonesia
        </div>
        <div className='max-h-[100vh] pb-12 lg:pb-48 xl:pb-48 scrollbar-webkit overflow-y-auto'>
          {items2.map((item, index) => (
            <div key={index}
              className='py-2 mx-3 flex lg:items-center xl:items-center border-b-2 border-[#EEEEEE] dark:border-white'>

              <div className='flex w-1/12 justify-start'>
                <p>{item.id}</p>
              </div>

              <div className='flex lg:flex-row xl:flex-row flex-col w-full'>
                <div className='flex flex-col w-full'>
                  <p className='text-[#2B2C2B] dark:text-white font-semibold'>{item.title}</p>
                  <p className='text-[#676D73] dark:text-white text-justify'>{item.description}</p>
                </div>

                <div className='flex justify-end ml-5'>
                  <div className='flex items-center justify-between gap-5'>
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
                      <span>{moment().format('HH:mm:ss')}</span>
                      <span>{moment().format('HH:mm:ss')}</span>
                    </div>
                    <div className='items-center cursor-pointer text-[#676D73]'>
                      <FiTrash2 />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div>
          <button className='bg-[#2B2C2B] text-white py-2 px-4 rounded-lg flex items-center'>
            Export
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default Rewrite