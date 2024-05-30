import React, { useRef, useState } from 'react'
import { CiClock1, CiClock2 } from "react-icons/ci";
import { FiTrash2, FiPlus } from "react-icons/fi";
import moment from 'moment';
import { Avatar } from '@nextui-org/react';
import PlayerComponent from '@/components/videoPlayer/playerComponent';
import TimelineComponent from '@/components/videoPlayer/timelineComponent';
import ItemMusicRemix from './itemMusicRemix';
import ItemStyleRemix from './itemStyleRemix';

const Remix = ({ items, items2 }) => {
  const playerPanel = useRef();
  const [tabActive, setTabActive] = useState('styles');

  const categoryMusics = [
    {
      id: 1,
      title: 'Happy',
    },
    {
      id: 2,
      title: 'Epic',
    },
    {
      id: 3,
      title: 'Euphoric',
    },
    {
      id: 4,
      title: 'Dreamy',
    },
    {
      id: 5,
      title: 'Quirky',
    },
    {
      id: 6,
      title: 'Mysterious',
    },
  ]

  const dataMusics = [
    {
      id: 1,
      title: 'Khandy - Ooy',
      duration: '00:00:30',
    },
    {
      id: 2,
      title: 'Deviation Twelwe',
      duration: '00:00:30',
    },
    {
      id: 3,
      title: 'Free Your Mind (Instrumental Version) - Vicki Vox',
      duration: '00:00:30',
    },
    {
      id: 4,
      title: 'Like You Hurt Me - Swif7',
      duration: '00:00:30',
    },
    {
      id: 5,
      title: 'Like You Hurt Me - Swif7',
      duration: '00:00:30',
    },
    {
      id: 6,
      title: 'Like You Hurt Me - Swif7',
      duration: '00:00:30',
    },
  ]

  const categoryStyles = [
    {
      id: 1,
      title: 'The quick brown fox',
    },
    {
      id: 2,
      title: 'The quick brown fox',
    },
    {
      id: 3,
      title: 'The quick brown fox',
    },
    {
      id: 4,
      title: 'The quick brown fox',
    },
    {
      id: 5,
      title: 'The quick brown fox',
    },
    {
      id: 6,
      title: 'The quick brown fox',
    },
    {
      id: 7,
      title: 'The quick brown fox',
    },
    {
      id: 8,
      title: 'The quick brown fox',
    },
  ]

  return (
    <div className='relative flex flex-col h-auto gap-4'>

      <div className='flex flex-col-reverse lg:flex-row gap-4 justify-between'>
        <div className='bg-white w-full h-auto shadow-sm  dark:bg-[#2B2C2B] rounded-sm'>
          {/* tabs */}
          <div className='pb-2 flex items-center border-b-2 mx-3  border-[#EEEEEE] dark:border-white
            font-semibold justify-center rounded-t-lg'>
            <div className='flex items-center w-full gap-4 lg:w-auto justify-center  rounded-lg'>
              <button
                onClick={() => {
                  setTabActive('musics')
                }}
                className={` text-black dark:text-white py-2 px-6  rounded-lg 
                ${tabActive === 'musics' ? ' shadow-lg dark:bg-[#18181B]' : ''}
                `}>
                Music
              </button>
              <button
                onClick={() => {
                  setTabActive('styles')
                }}
                className={` text-black dark:text-white py-2 px-6   rounded-lg 
                ${tabActive === 'styles' ? ' shadow-lg dark:bg-[#18181B]' : ''}
                `}>
                styles
              </button>
            </div>
          </div>

          <div className='max-h-[50vh] w-fullrelative scrollbar-webkit overflow-y-auto'>
            {tabActive === 'musics' && <ItemMusicRemix dataMusics={dataMusics} categoryMusics={categoryMusics} />}
            {tabActive === 'styles' && <ItemStyleRemix dataMusics={dataMusics} categoryStyles={categoryStyles} />}
          </div>


        </div>

        <div className=' bg-white w-full h-auto shadow-sm dark:bg-[#2B2C2B]'>
          <div className='max-h-[60vh] scrollbar-webkit overflow-y-auto'>
            {/* videonya disini */}
            <div className="player-panel" id="player-ground-1" ref={playerPanel}></div>
            {/* <PlayerComponent /> */}
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
        <div className='max-h-[50vh] w-full scrollbar-webkit overflow-x-auto overflow-y-auto'>
        </div>
        <TimelineComponent />
      </div>

    </div>
  )
}

export default Remix