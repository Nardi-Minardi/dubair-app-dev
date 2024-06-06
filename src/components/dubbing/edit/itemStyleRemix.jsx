import React, { useRef, useState, useEffect } from 'react'
import { CiClock1, CiClock2 } from "react-icons/ci";
import { FiTrash2, FiPlus } from "react-icons/fi";
import moment from 'moment';
import { useTheme } from 'next-themes';
import { Avatar } from '@nextui-org/react';
import PlayerComponent from '@/components/videoPlayer/playerComponent';
import TimelineComponent from '@/components/videoPlayer/timelineComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination, Scrollbar, Navigation } from 'swiper/modules';
import StickyBox from 'react-sticky-box';
import { MdFormatColorFill, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight, MdFormatUnderlined, MdFormatItalic, MdSunny, MdFormatBold } from "react-icons/md";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  RadioGroup,
  Radio,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
  Tooltip,
  Select,
  SelectSection,
  SelectItem
} from "@nextui-org/react";

const ItemStyleRemix = ({ categoryStyles, dataMusics }) => {
  const [selectedFont, setSelectedFont] = useState('1');
  const [selectedFontSize, setSelectedFontSize] = useState('1');
  const [selectedAnimation, setSelectedAnimation] = useState('1');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const fonts = [
    { key: "1", label: "Plus Jakarta Sans" },
    { key: "2", label: "Roboto" },
    { key: "3", label: "Nunito" },
    { key: "4", label: "Poppins" },
  ];

  const fontSizes = [
    { key: "1", label: "12px" },
    { key: "2", label: "14px" },
    { key: "3", label: "16px" },
    { key: "4", label: "18px" },
  ];

  const animations = [
    { key: "1", label: "Fade" },
    { key: "2", label: "Slide" },
    { key: "3", label: "Zoom" },
    { key: "4", label: "Flip" },
  ];

  const bgColorAllowed = [
    "bg-[#727372]",
    "bg-[#2B2C2B]",
  ];

  const textColorAllowed = [
    "text-white",
    "text-yellow-500",
  ];

  const handleSelectionChangeFont = (e) => {
    setSelectedFont(e.target.value);
  };

  const handleSelectionChangeFontSize = (e) => {
    setSelectedFontSize(e.target.value);
  };

  const handleSelectionChangeAnimation = (e) => {
    setSelectedAnimation(e.target.value);
  };

  const generateBgColor = () => {
    return bgColorAllowed[Math.floor(Math.random() * bgColorAllowed.length)];
  }

  const generateTextColor = () => {
    return textColorAllowed[Math.floor(Math.random() * textColorAllowed.length)];
  }

  return (
    <>
      <div className='flex relative items-center justify-between'>
        <span className='pl-5  font-bold'>Preset Styles</span>
        {/* create swiper horizontal here */}
        <div style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: '4px',
          position: 'absolute',
          top: '20px',
          right: '0',
          zIndex: '9999',
          paddingRight: '1rem',
          paddingTop: '0.3rem',
        }}>
          <button className='rounded-md bg-white dark:bg-[#121212] text-[#2B2C2B] dark:text-white border-2 border-[#EEEEEE] dark:border-white custom_prev'>
            <ArrowLeftIcon className='w-5 h-5' />
          </button>
          <button
            className='rounded-md bg-white dark:bg-[#121212] text-[#2B2C2B] dark:text-white border-2 border-[#EEEEEE] dark:border-white custom_next'
          >
            <ArrowRightIcon className='w-5 h-5' />
          </button>
        </div>
      </div>
      <Swiper
        loop={false}
        showsPagination={false}
        style={{
          height: '270px',
          overflow: 'hidden',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '100%',
          padding: '1.8rem 0.2rem',
        }}
        slidesPerView={3}
        grid={{
          rows: 2,
          fill: "row",
        }}
        autoHeight={false}
        spaceBetween={30}
        navigation={{
          nextEl: ".custom_next",
          prevEl: ".custom_prev"
        }}

        modules={[Grid, Pagination, Navigation]}
        className="swiper-remix w-full lg:w-[45vw] xl:w-[45vw] h-auto relative"
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {categoryStyles.map((item, index) => (
          <>
            <SwiperSlide
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '1rem',
                backgroundColor: '#888988',
              }}
              key={index}>
              <span className={`${generateBgColor()} ${generateTextColor()} py-1 px-4  flex items-center`}>
                {item.title}
              </span>
            </SwiperSlide>

          </>
        ))}
      </Swiper>

      <div className=''>
        <span className='pl-5 font-bold'>Customization</span>

        <div className='flex flex-col lg:flex-row gap-2 justify-between px-5 mt-2'>
          <div className="flex w-full flex-col  ">
            <Select
              label="Font"
              variant='bordered'
              labelPlacement="outside"
              style={{
                border: '1px solid #E5E7EB',
                borderRadius: '6px'
              }}
              selectedKeys={[selectedFont]}
              onChange={handleSelectionChangeFont}
              size="md"
            >
              {fonts.map((font) => (
                <SelectItem key={font.key}>
                  {font.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-row w-full items-center lg:w-1/2 xl:w-1/2 justify-between lg:flex-row gap-1 '>
            <div className="flex w-full flex-col">
              <Select
                label="Font Size"
                variant='bordered'
                labelPlacement="outside"
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  width: '100%'
                }}
                selectedKeys={[selectedFontSize]}
                onChange={handleSelectionChangeFontSize}
                size="md"
              >
                {fontSizes.map((fntS) => (
                  <SelectItem key={fntS.key}>
                    {fntS.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className='flex flex-col justify-center relative '>
              <label className='text-black dark:text-white mt-[-6px]'>
                Color
              </label>
              <button className='bg-white mt-2 dark:bg-[#2B2C2B] text-white dark:text-white px-4 py-2 rounded-md border-2 border-[#EEEEEE] dark:border-white'>
                <MdFormatColorFill className='w-5 h-5 text-gray-400 dark:text-white' />
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-4 justify-between px-5 mt-2'>
          <div className='flex flex-row bg-[#EEEEEE] dark:bg-[#18181B] rounded-md w-full justify-between items-center py-2 px-5'>
            <MdFormatAlignLeft className='cursor-pointer w-6 h-6 text-zinc-600 dark:text-white' />
            <MdFormatAlignCenter className='cursor-pointer w-6 h-6 text-zinc-600 dark:text-white' />
            <MdFormatAlignRight className='cursor-pointer w-6 h-6 text-zinc-600 dark:text-white' />
          </div>
          <div className='flex flex-row bg-[#EEEEEE] dark:bg-[#18181B] rounded-md w-full justify-between items-center py-2 px-5'>
            <MdFormatBold className='cursor-pointer w-6 h-6 text-zinc-600 dark:text-white' />
            <MdFormatItalic className='cursor-pointer w-6 h-6 text-zinc-600 dark:text-white' />
            <MdFormatUnderlined className='w-6 h-6 text-zinc-600 dark:text-white' />
          </div>
          <div className='flex flex-row bg-[#EEEEEE] dark:bg-[#18181B] rounded-md w-full justify-between items-center py-2 px-5'>
            <img src={`/assets/icons/text1-${theme === 'dark' ? 'dark' : 'light'}.svg`}
              alt='text1' className='cursor-pointer w-8 h-8' />
            <img src={`/assets/icons/text2-${theme === 'dark' ? 'dark' : 'light'}.svg`}
              alt='text1' className='cursor-pointer w-8 h-8' />
            <img src={`/assets/icons/text3-${theme === 'dark' ? 'dark' : 'light'}.svg`}
              alt='text1' className='cursor-pointer w-8 h-8' />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 mb-5 px-5 py-5">
        <Select
          label="Animation"
          variant="bordered"
          labelPlacement="outside"
          className="w-full"
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            width: '100%'
          }}
          selectedKeys={[selectedAnimation]}
          onChange={handleSelectionChangeAnimation}
          size="md"
          startContent={<MdSunny className='text-zinc-400  dark:text-white h-6 w-6 mr-2'
          />}
        >
          {animations.map((anm) => (
            <SelectItem key={anm.key}>
              {anm.label}
            </SelectItem>
          ))}
        </Select>
        {/* <p className="text-small text-default-500">Selected: {language}</p> */}
      </div>
    </>
  )
}

export default ItemStyleRemix