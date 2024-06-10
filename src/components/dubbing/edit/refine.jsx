import React, { useRef, useState, useEffect } from 'react'
import { CiClock1, CiClock2 } from "react-icons/ci";
import { FiTrash2, FiPlus } from "react-icons/fi";
import moment from 'moment';
import TimelineComponent from '@/components/videoPlayer/timelineComponent';

const Refine = ({ items, items2 }) => {
  const playerPanel = useRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className='relative flex flex-col h-auto gap-4'>

      <div className='flex flex-col-reverse lg:flex-row justify-between gap-4'>
        <div className='bg-white w-full h-auto shadow-sm dark:bg-[#2B2C2B] rounded-sm'>

          <div className='max-h-[60vh] scrollbar-webkit overflow-y-auto'>
            {items2.map((item, index) => (
              <div key={index}
                className='py-2 mx-3 flex lg:items-center xl:items-center border-b-2 border-[#EEEEEE] dark:border-white '>


                <div className='flex w-auto px-3 justify-start align-top'>
                  <p>{item.id}</p>
                </div>

                <div className='flex w-full flex-col-reverse gap-3 lg:flex-row xl:flex-row lg:items-center xl:justify-center'>

                  <div className='flex flex-row w-full justify-between lg:flex-col xl:flex-co lg:w-1/4 xl:w-1/4 items-start '>
                    <div className='bg-[#EEEEEE] dark:bg-[#121212] rounded-md items-center my-1 justify-center flex w-auto px-2'>
                      <p className='text-[#2B2C2B] dark:text-white text-sm whitespace-nowrap font-semibold'>40 PCS</p>
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

                    <div className='flex flex-col w-full'>
                      <p className='text-[#2B2C2B] dark:text-white font-semibold'>{item.title}</p>
                      <p className='text-[#676D73] dark:text-white text-justify'>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=' bg-white w-full h-auto shadow-sm dark:bg-[#2B2C2B]'>
          <div className='max-h-[60vh] scrollbar-webkit overflow-y-auto'>

            {/* <video
              className="video-js"
              controls
              preload="auto"
              width="640"
              height="264"
              data-setup='{}'>
              <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
              <track kind="captions" src="//example.com/path/to/captions.vtt" srcLang="en" label="English" default />
            </video> */}

            {/* videonya disini */}
            <div className="player-panel" id="player-ground-1" ref={playerPanel}></div>

          </div>
          {/* <div>
          <button className='bg-[#2B2C2B] text-white py-2 px-4 rounded-lg flex items-center'>
            Export
          </button>
        </div> */}
        </div>
      </div>

      {/* timeline audio */}
      <div className='bg-white w-full h-auto shadow-sm dark:bg-[#2B2C2B] rounded-sm'>
        <div className='max-h-[40vh] w-full scrollbar-webkit overflow-x-auto overflow-y-auto'>
        </div>
        <TimelineComponent />
      </div>

    </div>
  )
}

export default Refine