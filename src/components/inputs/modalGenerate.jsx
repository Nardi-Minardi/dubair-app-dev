import React, { useState, useEffect, useRef, useContext, createRef } from 'react'
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
  SelectItem,
} from "@nextui-org/react";
import { CiClock1, CiClock2 } from "react-icons/ci";
import GenerateThumbnail from './generateThumbnail';
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineTranslate } from "react-icons/hi";
import ButtonGradient from '../buttons/buttonGradient';
import { toast } from 'react-toastify';
import { createVideo } from '@/store/slices/videoSlice';
import { useDispatch } from 'react-redux';
import { LoadingContext } from '@/context/loadingContext';
import { translateLanguages, languages } from '@/libs/data';
import AutoCompleteSelect from '../elements/autoCompleteSelect';

const ModalGenerate = ({ isOpen, onOpenChange, scrollBehavior, clearFiles, files, noFileSelected, fileFromLink, typeFromLink }) => {
  const dispatch = useDispatch()
  const [projectName, setProjectName] = useState('')
  const [numberSpeaker, setNumberSpeaker] = useState('auto')
  const [speakerValue, setSpeakerValue] = useState(0)
  const [language, setLanguage] = useState('auto')
  const [translateTo, setTranslateTo] = useState('')
  const [openInputSpeaker, setOpenInputSpeaker] = useState(false)
  const [autoDetectSpeaker, setAutoDetectSpeaker] = useState(true)
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true)
  const [errors, setErrors] = useState({
    projectName: '',
    numberSpeaker: '',
    translateTo: ''
  });
  const modalRef = useRef(null)
  
  const { showLoader, hideLoader } = useContext(LoadingContext);

  const speakers = [
    { key: "auto", label: "Autodetect" },
    { key: "manual", label: "Manual" },
  ];


  const handleSelectionChangeSpeaker = (e) => {
    if (e.target.value !== 'auto') {
      setOpenInputSpeaker(true)
      setAutoDetectSpeaker(false)
      setSpeakerValue(0)
    } else {
      setAutoDetectSpeaker(true)
      setOpenInputSpeaker(false)
    }
    setNumberSpeaker(e.target.value)
  };

  const handleSelectionChangeLanguage = (e) => {
    if (e.target.value !== 'auto') {
      setAutoDetectLanguage(false)
    } else {
      setAutoDetectLanguage(true)
    }
    setLanguage(e.target.value)
  };

  const clearErrors = () => {
    setErrors({
      projectName: '',
      numberSpeaker: '',
      translateTo: ''
    })
  }

  const handleUpload = ({ onClose }) => {
    if (projectName === '') {
      setErrors({ ...errors, projectName: 'Project Name is required' })
      return
    }

    if (numberSpeaker === 'manual' && speakerValue === 0) {
      setErrors({ ...errors, numberSpeaker: 'Number of speakers is required' })
      return
    }

    if (!translateTo) {
      setErrors({ ...errors, translateTo: 'Translate to is required' })
      return
    }


    if (noFileSelected) {
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

    const formData = new FormData();
    formData.append('name', projectName);
    if (fileFromLink) {
      formData.append('videoUrl', fileFromLink);
    }
    files.forEach((file) => {
      formData.append('file', file);
    });
    formData.append('numberOfSpeaker', speakerValue);
    formData.append('originalLanguage', language);
    formData.append('translatedTo', translateTo);

    showLoader && showLoader();

    dispatch(createVideo(formData)).then((res) => {
      console.log('res', res)
      const response = res.payload;
      const data = response.data;

      if (response.status == 200) {
        toast.success('Successfully created video', {
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
        clearFiles();
        clearErrors();
      } else {
        console.log('error', response)
        toast.error('something went wrong, please try again', {
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
        clearFiles();
        clearErrors();
      }
      hideLoader && hideLoader();
    });
  };

  return (
    <div className="flex flex-col gap-2">

      <Modal
        ref={modalRef}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='4xl'
        onClose={() => clearFiles()}
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
                  {"The trial video must have a duration of 20 minutes or less. We'll edit your video to craft a 5-minute test clip"}.
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="px-8 h-auto flex flex-col py-12 w-full border-2 border-dashed border-[#4A5FEF] rounded-md ">

                  {noFileSelected ? (

                    <p className="text-sm text-gray-400 dark:text-white tex-center">No file selected</p>
                  ) : (
                    !fileFromLink ? (
                      files?.length > 0 &&
                      files?.map((file, index) => (
                        <React.Fragment key={index}>
                          <GenerateThumbnail
                            setSpeakerValue={setSpeakerValue}
                            setLanguage={setLanguage}
                            autoDetectSpeaker={autoDetectSpeaker}
                            autoDetectLanguage={autoDetectLanguage}
                            clearFiles={clearFiles}
                            onClose={onClose}
                            file={file}
                            noFileSelected={noFileSelected}
                            fileFromLink={fileFromLink}
                          />

                        </React.Fragment>
                      ))
                    ) : (
                      <React.Fragment >
                        <GenerateThumbnail
                          setSpeakerValue={setSpeakerValue}
                          setLanguage={setLanguage}
                          autoDetectSpeaker={autoDetectSpeaker}
                          autoDetectLanguage={autoDetectLanguage}
                          clearFiles={clearFiles}
                          onClose={onClose}
                          file={file}
                          noFileSelected={noFileSelected}
                          fileFromLink={fileFromLink}
                          typeFromLink={typeFromLink}
                        />

                      </React.Fragment>
                    )
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

                  {openInputSpeaker && (
                    <div className=' mb-5'>
                      <input
                        type="number"
                        id="NumberSpeaker"
                        name="numberSpeaker"
                        className="my-input pl-3 h-[48px] w-full rounded-[12px] dark:bg[#18181B] text-md text-gray-700"
                        // value={speakerValue}
                        defaultValue={speakerValue}
                        onChange={(e) => {
                          setErrors({ ...errors, numberSpeaker: '' })
                          setSpeakerValue(e.target.value)
                        }}
                      />
                      {errors && errors.numberSpeaker && <span className="text-red-500 text-sm">{errors.numberSpeaker}</span>}
                    </div>
                  )}

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
                    <AutoCompleteSelect
                      data={translateLanguages.sort((a, b) => a.label.localeCompare(b.label))}
                      selectedKey={translateTo}
                      setSelectedKey={setTranslateTo}
                      label="Translate to"
                      setErrors={setErrors}
                      errors={errors}
                    />
                    {errors && errors.translateTo && <span className="text-red-500 text-sm">{errors.translateTo}</span>}
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