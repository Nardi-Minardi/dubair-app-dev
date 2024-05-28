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
  Select, SelectSection, SelectItem
} from "@nextui-org/react";
import { CiClock1, CiClock2 } from "react-icons/ci";
import GenerateThumbnail from './generateThumbnail';
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineTranslate } from "react-icons/hi";
import ButtonGradient from '../buttons/buttonGradient';
import { toast } from 'react-toastify';

const ModalGenerate = ({ isOpen, onOpenChange, scrollBehavior, clearFiles, files, noFileSelected }) => {
  console.log('noFileSelected', noFileSelected)
  const [projectName, setProjectName] = useState('')
  const [numberSpeaker, setNumberSpeaker] = useState('auto')
  const [language, setLanguage] = useState('auto')
  const [translateTo, setTranslateTo] = useState('id')
  const [errors, setErrors] = useState({
    projectName: '',
    numberSpeaker: '',
    language: ''
  });

  const speakers = [
    { key: "auto", label: "Autodetect" },
    { key: "manual", label: "Manual" },
  ];

  const languages = [
    { key: "auto", label: "Autodetect" },
    { key: "en", label: "English" },
    { key: "id", label: "Indonesia" },
  ];

  const translateLanguages = [
    { key: "id", label: "Indonesia", icon: "/assets/icons/id-icon.png" },
    { key: "en", label: "English", icon: "/assets/icons/en-icon.png" },
  ];

  const handleSelectionChangeSpeaker = (e) => {
    setNumberSpeaker(e.target.value)
  };

  const handleSelectionChangeLanguage = (e) => {
    setLanguage(e.target.value)
  };

  const handleSelectionChangeTranslateTo = (e) => {
    setTranslateTo(e.target.value)
  };

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
        size='4xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <div className="flex flex-row gap-3">
                  <span>Project Detail</span>
                  <div className='bg-[#EEEEEE] dark:bg-[#2B2C2B] rounded-md items-center my-1 justify-center flex w-auto px-2'>
                    <CiClock2 className='text-[#2B2C2B] dark:text-white h-3 w-3 mr-2' />
                    <p className='text-[#2B2C2B] dark:text-white text-sm whitespace-nowrap font-semibold'>20 minutes</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400 dark:text-white">
                  The trial video must have a duration of 20 minutes or less. We'll edit your video to craft a 5-minute test clip.
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="px-8 h-auto flex flex-col py-12 w-full border-2 border-dashed border-[#4A5FEF] rounded-md ">

                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <React.Fragment key={index}>
                        <GenerateThumbnail
                          clearFiles={clearFiles}
                          onClose={onClose}
                          file={file}
                          noFileSelected={noFileSelected}
                        />
                        {/* <VideoThumbnail
                        videoUrl={URL.createObjectURL(file)}
                        snapshotAtTime={2}
                        width={120}
                        height={80}
                      /> */}

                      </React.Fragment>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 dark:text-white tex-center">No file selected</p>
                  )}


                </div>
                <form>

                  <div className='flex items-center gap-1'>
                    <label htmlFor="ProjectName" className="block text-md py-2 font-medium dark:text-white"> Project Name</label>
                  </div>
                  <div className=' mb-5'>
                    <input
                      type="text"
                      id="ProjectName"
                      name="projectName"
                      className="my-input pl-3 h-[48px] w-full rounded-[12px] dark:bg[#18181B] text-md text-gray-700"
                      value={projectName}
                      onChange={(e) => {
                        setErrors({ ...errors, projectName: '' })
                        setProjectName(e.target.value)
                      }}
                    />
                    {errors && errors.projectName && <span className="text-red-500 text-sm">{errors.projectName}</span>}
                  </div>

                  <div className="flex w-full flex-col gap-2 mb-5">
                    <Select
                      label="Number Of Speakers in Video"
                      variant="bordered"
                      labelPlacement="outside"
                      className="w-full"
                      selectedKeys={[numberSpeaker]}
                      onChange={handleSelectionChangeSpeaker}
                      size="lg"
                    >
                      {speakers.map((speaker) => (
                        <SelectItem key={speaker.key}>
                          {speaker.label}
                        </SelectItem>
                      ))}
                    </Select>
                    {/* <p className="text-small text-default-500">Selected: {numberSpeaker}</p> */}
                  </div>

                  <div className="flex w-full flex-col gap-2 mb-5">
                    <Select
                      label="Original Language"
                      variant="bordered"
                      labelPlacement="outside"
                      className="w-full"
                      selectedKeys={[language]}
                      onChange={handleSelectionChangeLanguage}
                      size="lg"
                      startContent={<HiOutlineTranslate className='text-[#A1A1A7]  dark:text-white h-6 w-6 mr-2'
                      />}
                    >
                      {languages.map((lang) => (
                        <SelectItem key={lang.key}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </Select>
                    {/* <p className="text-small text-default-500">Selected: {language}</p> */}
                  </div>

                  <div className="flex w-full flex-col gap-2 mb-5">
                    <Select
                      items={translateLanguages}
                      label="Translate to"
                      variant="bordered"
                      labelPlacement="outside"
                      selectedKeys={[translateTo]}
                      onChange={handleSelectionChangeTranslateTo}
                      classNames={{
                        base: "w-full bg-white dark:bg-[#18181B] rounded-md",
                        trigger: "h-12",
                      }}
                      
                      renderValue={(items) => {
                        return items.map((item) => (
                          <div key={item.data.key} className="flex items-center gap-2">
                            <img src={item.data.icon} alt={item.data.label} className="w-6 h-6" />
                            <span>{item.data.label}</span>
                          </div>
                        ));
                      }}
                    >
                      {(item) => (
                        <SelectItem key={item.key}>
                          <div className="flex items-center gap-2">
                            <img src={item.icon} alt={item.label} className="w-6 h-6" />
                            <span>{item.label}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    {/* <p className="text-small text-default-500">Selected: {translateTo}</p> */}
                  </div>

                </form>
              </ModalBody>
              <ModalFooter className="flex flex-row w-full gap-2 bg-transparent">
                <button
                  className="bg-[#EEEEEE] w-full dark:bg-[#2B2C2B] rounded-md items-center py-2 justify-center flex px-5"
                  onClick={() => {
                    clearFiles();
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <ButtonGradient
                  title="Generate"
                  radius="rounded-md"
                  type="button"
                  width="w-full"
                  whiteSpace="whitespace-nowrap"
                  onClick={() => handleUpload({ onClose })}
                />

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ModalGenerate