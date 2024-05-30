import React, { useState, useEffect } from 'react'
import { HiOutlineMusicNote } from "react-icons/hi";
import { MdOutlinePlayCircleOutline, MdOutlineTitle, MdLockOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { Timeline } from '@xzdarcy/react-timeline-editor';
import TimelineEditor from './timelineEditor/timelineEditor';

const TimelineAudioComponent = () => {
  const [timelineData, setTimelineData] = useState([]);

  const handleTimelineChange = (data) => {
    setTimelineData(data);
  };

  return (
    <div className='flex flex-col lg:flex-row xl:flex-row h-auto w-full'>

      <div className='flex overflow-y-auto h-full bg-white dark:bg-[#2B2C2B] flex-col items-start justify-start w-full lg:w-auto xl:w-auto 
      border-r-2 border-[#EEEEEE] dark:border-white px-5'>
        <ul className='flex flex-col gap-3 cursor-pointer w-full'>
          <li className='flex flex-row justify-center gap-5 py-2 border-b-2 border-[#EEEEEE] dark:border-white'>
            <div className='flex items-center justify-center h-6 w-6 rounded-full'>
              <MdOutlineTitle className='text-[#2B2C2B] dark:text-white' />
            </div>
            <div className='flex items-center justify-center h-6 w-6 bg-[#F5F5F5] dark:bg-[#121212] rounded-full'>
              <MdLockOutline className='text-[#2B2C2B] dark:text-white' />
            </div>
            <div className='flex items-center justify-center h-6 w-6 bg-[#F5F5F5] dark:bg-[#121212] rounded-full'>
              <MdOutlineRemoveRedEye className='text-[#2B2C2B] dark:text-white' />
            </div>
          </li>
          <li className='flex flex-row justify-center gap-5 py-2 border-b-2 border-[#EEEEEE] dark:border-white'>
            <div className='flex items-center justify-center h-6 w-6 rounded-full'>
              <MdOutlinePlayCircleOutline className='text-[#2B2C2B] dark:text-white' />
            </div>
            <div className='flex items-center justify-center h-6 w-6 bg-[#F5F5F5] dark:bg-[#121212] rounded-full'>
              <MdLockOutline className='text-[#2B2C2B] dark:text-white' />
            </div>
            <div className='flex items-center justify-center h-6 w-6 bg-[#F5F5F5] dark:bg-[#121212] rounded-full'>
              <MdOutlineRemoveRedEye className='text-[#2B2C2B] dark:text-white' />
            </div>
          </li>
          <li className='flex flex-row justify-center gap-5 py-2 border-b-2 border-[#EEEEEE] dark:border-white'>
            <div className='flex items-center justify-center h-6 w-6 rounded-full'>
              <HiOutlineMusicNote className='text-[#2B2C2B] dark:text-white' />
            </div>
            <div className='flex items-center justify-center h-6 w-6 bg-[#F5F5F5] dark:bg-[#121212] rounded-full'>
              <MdLockOutline className='text-[#2B2C2B] dark:text-white' />
            </div>
            <div className='flex items-center justify-center h-6 w-6 bg-[#F5F5F5] dark:bg-[#121212] rounded-full'>
              <MdOutlineRemoveRedEye className='text-[#2B2C2B] dark:text-white' />
            </div>
          </li>
        </ul>
      </div>

      {/* timeline audio */}
        <TimelineEditor />
      {/* <div className='bg-[#EEEEEE] dark:bg-[#2B2C2B] h-32 w-full scrollbar-webkit overflow-y-auto overflow-x-auto'>
      </div> */}

    </div>
  )
}

export default TimelineAudioComponent