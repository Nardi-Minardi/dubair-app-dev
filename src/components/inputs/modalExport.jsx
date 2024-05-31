import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
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
import { CiClock1, CiClock2 } from "react-icons/ci";
import GenerateThumbnail from './generateThumbnail';
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineTranslate } from "react-icons/hi";
import ButtonGradient from '../buttons/buttonGradient';
import { toast } from 'react-toastify';

const ModalExport = ({ isOpen, onOpenChange, scrollBehavior }) => {
  const [isProgress, setIsProgress] = useState(false);

  const audioFormats = [
    "MP3",
    "WAV",
    "FLAC",
    "AAC",
  ];

  const qualities = [
    {
      name: "64Kbps",
      value: "64kbps",
      premium: false
    },
    {
      name: "128Kbps",
      value: "128kbps",
      premium: false
    },
    {
      name: "160Kbps",
      value: "160kbps",
      premium: false
    },
    {
      name: "320Kbps",
      value: "320kbps",
      premium: true
    },
  ];

  const speeds = [
    "0.5x",
    "0.75x",
    "1x",
    "1.25x",
    "1.5x",
    "1.75x",
  ];

  // send files to the server // learn from my other video
  const handleUpload = ({ onClose }) => {
    if (projectName === '') {
      setErrors({ ...errors, projectName: 'Project Name is required' })
      return
    }

    if (files.length === 0) {
      toast.error('Please select a video file', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      onClose();
      return;
    }

    toast.success('Generate video success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  };

  return (
    <div className="flex flex-col gap-2">

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='md'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <span>Export Settings</span>
                <span className="text-sm text-gray-400 dark:text-white">
                  Customize and export your video output
                </span>
                <hr className="w-full mt-3 border-[#EEEEEE] dark:border-white" />
              </ModalHeader>
              <ModalBody>
                <label className="text-sm text-black dark:text-white">Audio Format</label>
                <div className='flex flex-row flex-wrap gap-2'>
                  {audioFormats.map((item, index) => (
                    <div key={index} >
                      <button className={`${index === 0 ? 'bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white'
                        : 'bg-white dark:bg-[#121212] text-[#2B2C2B] dark:text-white border-2 border-[#EEEEEE] dark:border-white'}
                           py-1 px-4 rounded-md flex items-center`}>
                        {item}
                      </button>
                    </div>
                  ))}
                </div>
                <hr className="w-full mt-3 border-[#EEEEEE] dark:border-white" />
                <label className="text-sm text-black dark:text-white">Quality</label>
                <div className='flex flex-row flex-wrap gap-2'>
                  {qualities.map((item, index) => (
                    <div key={index} >
                      <button className={`${index === 0 ? 'bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white'
                        : 'bg-white dark:bg-[#121212] text-[#2B2C2B] dark:text-white border-2 border-[#EEEEEE] dark:border-white'}
                           py-1 px-4 rounded-md flex items-center`}>
                        {item.name}
                      </button>
                    </div>
                  ))}
                </div>
                <hr className="w-full mt-3 border-[#EEEEEE] dark:border-white" />
                <label className="text-sm text-black dark:text-white">Speed</label>
                <div className='flex flex-row flex-wrap gap-2'>
                  {speeds.map((item, index) => (
                    <div key={index} >
                      <button className={`${index === 0 ? 'bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white'
                        : 'bg-white dark:bg-[#121212] text-[#2B2C2B] dark:text-white border-2 border-[#EEEEEE] dark:border-white'}
                           py-1 px-4 rounded-md flex items-center`}>
                        {item}
                      </button>
                    </div>
                  ))}
                </div>
                <hr className="w-full mt-3 border-[#EEEEEE] dark:border-white" />
              </ModalBody>
              <ModalFooter className="flex flex-row w-full gap-2 bg-transparent">
                <button
                  className="bg-[#18181B] w-full dark:bg-[#2B2C2B] text-white rounded-md items-center py-2 justify-center flex px-5"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Export
                </button>


              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ModalExport