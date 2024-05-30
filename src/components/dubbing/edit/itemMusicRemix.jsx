import React, { useRef, useState } from 'react'
import { CiClock1, CiClock2 } from "react-icons/ci";
import { FiTrash2, FiPlus } from "react-icons/fi";
import moment from 'moment';
import { Avatar } from '@nextui-org/react';
import PlayerComponent from '@/components/videoPlayer/playerComponent';
import TimelineComponent from '@/components/videoPlayer/timelineComponent';

const ItemMusicRemix = ({ categoryMusics, dataMusics }) => {
  return (
    <>
      <div className='flex flex-col px-5 h-auto w-full gap-2'>
        <span>Featured Moods</span>
        <div className='flex flex-row flex-wrap gap-2'>
          {categoryMusics.map((item, index) => (
            <div key={index} >
              <button className={`${index === 0 ? 'bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white'
                : 'bg-white dark:bg-[#121212] text-[#2B2C2B] dark:text-white border-2 border-[#EEEEEE] dark:border-white'}
            py-1 px-4 rounded-2xl flex items-center`}>
                {item.title}
              </button>
            </div>
          ))}
        </div>

      </div>

      {
        dataMusics.map((item, index) => (
          <div key={index}
            className='py-2 mx-3 flex lg:items-center xl:items-center rounded-lg my-2 border-2 border-[#EEEEEE] dark:border-white '>


            <div className='flex w-auto px-3 justify-start align-top'>
              <p>{item.id}</p>
            </div>

            <div className='flex w-full gap-4 flex-row items-center'>

              <div className='items-center '>
                <Avatar
                  src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153518-LEK6pAXtI03D.jpg"
                  alt="Avatar"
                  size="md"
                />

              </div>

              <div className='flex flex-col lg:flex-row xl:flex-row w-full gap-4 lg:items-center'>

                <div className='flex flex-col w-full'>
                  <p className='text-[#2B2C2B] dark:text-white font-semibold'>{item.title}</p>
                  <p className='text-[#676D73] dark:text-white text-justify'>{item.duration}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default ItemMusicRemix