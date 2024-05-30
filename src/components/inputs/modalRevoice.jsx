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
import { FiMoreVertical, FiUpload } from "react-icons/fi";
import { HiOutlineTranslate } from "react-icons/hi";
import ButtonGradient from '../buttons/buttonGradient';
import { toast } from 'react-toastify';
import { MdOutlinePlayArrow, MdOutlineAdd } from "react-icons/md";

const ModalRevoice = ({ isOpen, onOpenChange, scrollBehavior, clearFiles, files, noFileSelected }) => {
  const [search, setSearch] = useState('')
  const [numberSpeaker, setNumberSpeaker] = useState('all')
  const [language, setLanguage] = useState('id')
  const [isSelected, setIsSelected] = useState(false)
  const [errors, setErrors] = useState({
    language: ''
  });

  const speakers = [
    { key: "all", label: "All" },
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "natural", label: "Natural" },
  ];

  const languages = [
    { key: "id", label: "Indonesia" },
    { key: "en", label: "English" },
  ];

  const voices = [
    {
      id: 1,
      name: "wati",
      premium: true,
      selected: true,
      language: "Indonesia",
      img: "/assets/images/wati.png",
    },
    {
      id: 2,
      name: "budi",
      premium: true,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/budi.png",
    },
    {
      id: 3,
      name: "ningsih",
      premium: true,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/ningsih.png",
    },
    {
      id: 4,
      name: "usman",
      premium: true,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/usman.png",
    },
    {
      id: 5,
      name: "kusmanto",
      premium: true,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/kusmanto.png",
    },
    {
      id: 6,
      name: "endah",
      premium: true,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/endah.png",
    },
    {
      id: 7,
      name: "abisar",
      premium: true,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/abisar.png",
    },
    {
      id: 8,
      name: "ayu",
      premium: false,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/ayu.png",
    },
    {
      id: 9,
      name: "asri",
      premium: false,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/asri.png",
    },
    {
      id: 10,
      name: "faisal",
      premium: true,
      selected: true,
      language: "Indonesia",
      img: "/assets/images/faisal.png",
    },
    {
      id: 11,
      name: "bulan",
      premium: false,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/bulan.png",
    },
    {
      id: 12,
      name: "mahendra",
      premium: false,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/mahendra.png",
    },
    {
      id: 13,
      name: "pradipta",
      premium: false,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/pradipta.png",
    },
    {
      id: 14,
      name: "cahyu",
      premium: false,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/cahyu.png",
    },
    {
      id: 15,
      name: "taufiq",
      premium: false,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/taufiq.png",
    },
    {
      id: 16,
      name: "intan",
      premium: false,
      selected: false,
      language: "Indonesia",
      img: "/assets/images/intan.png",
    },
  ]

  const handleSelectionChangeSpeaker = (e) => {
    setNumberSpeaker(e.target.value)
  };

  const handleSelectionChangeLanguage = (e) => {
    setLanguage(e.target.value)
  };

  // send files to the server // learn from my other video
  const handleUpload = () => {
    toast.success('Successfully change the voice artist', {
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
        size='4xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <span>Voice Artist</span>
                  <span className="text-sm text-gray-400 dark:text-white">
                    Choose your Voice Artist that you wish to work with on this project.
                  </span>

                </div>
              </ModalHeader>
              <hr className="dark:border-gray-600 border-gray-200 mx-5" />

              <ModalBody>
                <div className="justify-between items-center dark:bg-[#2B2C2B] bg-white py-5  h-auto flex flex-row w-full shadow-md rounded-[8px] ">

                  <div className='w-full ml-3'>
                    <input
                      type="text"
                      id="Search"
                      name="search"
                      placeholder='Advance Filters'
                      className="focus:outline-none dark:text-white dark:
                      pl-3 h-[40px] w-full rounded-[8px] text-md text-gray-700"
                      value={search}
                      onChange={(e) => {
                        setErrors({ ...errors, search: '' })
                        setSearch(e.target.value)
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-row gap-2 px-5">
                    <div className="flex w-full flex-col  ">
                      <Select
                        label=""
                        variant='bordered'
                        labelPlacement="outside"
                        style={{
                          border: '1px solid #E5E7EB',
                          borderRadius: '6px'
                        }}
                        selectedKeys={[numberSpeaker]}
                        onChange={handleSelectionChangeSpeaker}
                        size="md"
                      >
                        {speakers.map((speaker) => (
                          <SelectItem key={speaker.key}>
                            {speaker.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex w-full flex-col ">
                      <Select
                        label=""
                        variant='bordered'
                        labelPlacement="outside"
                        style={{
                          border: '1px solid #E5E7EB',
                          borderRadius: '6px'
                        }}
                        selectedKeys={[language]}
                        onChange={handleSelectionChangeLanguage}
                        size="md"
                      >
                        {languages.map((lang) => (
                          <SelectItem key={lang.key}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 px-2 lg:grid-cols-4 gap-5 mt-5 dark:bg-[#2B2C2B] bg-white shadow-md rounded-[8px]">
                  {voices.map((voice) => (
                    <div key={voice.id} className="flex justify-between w-full flex-row items-center gap-2 py-2 px-2">
                      <div className="flex flex-row  items-center gap-2">
                        <div className={`bg-[#EEEEEE] ${voice.selected ? '  bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]' : 'bg-[#EEEEEE]'}
                         p-2 rounded-md`}>
                          <img src={voice.img} className="w-8 h-8 rounded-sm" />
                        </div>
                        <div className="flex flex-col max-w-12">
                          <div className="flex flex-row items-center gap-1">
                            <span className="text-sm font-bold dark:text-white">{voice.name}</span>
                            {voice.premium && (
                              <img src="/assets/icons/crown.svg" className="w-4 h-4" />
                            )}
                          </div>
                          <span className="text-sm text-gray-400 dark:text-white">{voice.language}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-[#EEEEEE] p-1 rounded-md cursor-pointer">
                          <MdOutlinePlayArrow className="text-black text-sm" />
                        </div>
                        <div className="bg-[#EEEEEE] p-1 rounded-md cursor-pointer">
                          <MdOutlineAdd className="text-black text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-row items-end justify-end gap-2 ">
                  <button
                    onClick={handleUpload}
                    className="bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white
                    text-xs py-2 px-4 rounded-lg flex gap-3 items-center">
                    Clone & Dub Your Voice
                    <FiUpload className="w-4 h-4" />
                  </button>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-row 
              items-start justify-start bg-white dark:bg-[#18181B]  rounded-[8px]">
                <div className='flex flex-col gap-2'>
                  <span className="text-sm dark:text-white">Voice artist in this Project</span>
                  <div className='flex flex-row items-center gap-5'>
                    {voices.filter((voice) => voice.selected).map((voice) => (

                      <div key={voice.id} className="flex  flex-row items-center px-2 gap-5 py-2 bg-white dark:bg-[#2B2C2B] rounded-[8px]">
                        <div className="flex flex-row  items-center gap-2">
                          <div className={`bg-[#EEEEEE]  bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]' : 'bg-[#EEEEEE]'}
                          p-2 rounded-md`}>
                            <img src={voice.img} className="w-8 h-8 rounded-sm" />
                          </div>
                          <div className="flex flex-col max-w-12">
                            <div className="flex flex-row items-center gap-1">
                              <span className="text-sm font-bold dark:text-white">{voice.name}</span>
                              {voice.premium && (
                                <img src="/assets/icons/crown.svg" className="w-4 h-4" />
                              )}
                            </div>
                            <span className="text-sm text-gray-400 dark:text-white">{voice.language}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="bg-[#EEEEEE] p-1 rounded-md cursor-pointer">
                            <MdOutlinePlayArrow className="text-black text-sm" />
                          </div>
                          <div className="bg-[#EEEEEE] p-1 rounded-md cursor-pointer">
                            <MdOutlineAdd className="text-black text-sm" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ModalRevoice