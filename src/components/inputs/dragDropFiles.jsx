import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import { CiClock1, CiClock2 } from "react-icons/ci";
import ModalGenerate from './modalGenerate';
import { toast } from 'react-toastify';

const DragDropFiles = ({ title, desc, user, fileFromLink, setFileFromLink, setTypeFromLink, typeFromLink, handleUploadFromGoogleDrive }) => {
  const inputRef = useRef(null)
  const { theme, setTheme } = useTheme()
  const [dragActive, setDragActive] = useState(false);
  const [mounted, setMounted] = useState(false)
  const [files, setFiles] = useState([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [noFileSelected, setNoFileSelected] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (fileFromLink) {
      setNoFileSelected(false)
      handleOpenModal()
    }
    // console.log('files', files)
  }, [files, fileFromLink, typeFromLink])

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      //validate is a format video
      const formatAllowed = ["video/mp4", "video/m4v", "video/mov", "video/webm"];

      const file = e.dataTransfer.files[0];
      const maxSizeFree = 5;
      const size = (file.size / 1024 / 1024 / 1024).toFixed(2);

      if (!formatAllowed.includes(file.type)) {
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
        setFiles([]);
        return;
      }

      if (size > maxSizeFree) {
        toast.error('Please select a video file less than 5GB', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setFiles([]);
        return;
      }

      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
      setNoFileSelected(false)
      handleOpenModal()
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const removeFile = (fileName, idx) => {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  const openFileExplorer = (e) => {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  const onChangeFile = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      //validate is a format video
      const formatAllowed = ["video/mp4", "video/m4v", "video/mov", "video/webm"];

      const file = e.target.files[0];
      //max 5GB
      const maxSizeFree = 5;
      const size = (file.size / 1024 / 1024 / 1024).toFixed(2);

      if (!formatAllowed.includes(file.type)) {
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
        setFiles([]);
        return;
      }

      if (size > maxSizeFree) {
        toast.error('Please select a video file less than 5GB', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setFiles([]);
        return;
      }
      
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.target.files[i]]);
      }
      setNoFileSelected(false)
      handleOpenModal()
    }
  }

  const clearFiles = () => {
    //clear the input type file
    inputRef.current.value = "";
    setFiles([]);
    setFileFromLink('')
    setTypeFromLink('')
    setNoFileSelected(true)
  }

  const handleOpenModal = () => {
    if(user?.minutesAvailable <= 0) {
      toast.error('You have no minutes available, please upgrade your plan', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return
    }
    onOpen();
  }

  return (
    <>
      <div className="relative h-auto flex flex-col py-12 w-full border-2 border-dashed border-[#4A5FEF] rounded-md justify-center items-center text-center">
        <div className="flex flex-col">
          <div
            className={`${dragActive ? "bg-blue-100 border-blue-300" :
              "bg-[#F9FAFB] dark:bg-[#1F2937] dark:border-[#4A5FEF] border-1"
              }  h-32 p-16 flex flex-col  justify-center items-center cursor-pointer shadow-sm`}
            onDragEnter={handleDragEnter}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onClick={() => inputRef.current.click()}
          >
            <img src={`/assets/icons/upload-icon-${theme === 'dark' ? 'dark' : 'light'}.svg`}
              alt="upload" className="w-10 h-10 m-auto" />
            <label className="text-lg">{title}</label>
          </div>

          <input
            type="file"
            id="file"
            hidden
            accept="video/*"
            ref={inputRef}
            onChange={onChangeFile}
          />

          <div className='flex flex-col mb-8'>
            <div className='flex cursor-pointer flex-row items-center justify-center gap-8 lg:gap-20 xl:gap-20 mt-5'>
              <span onClick={() => inputRef.current.click()}>
                <img src={`/assets/icons/upload-folder-${theme === 'dark' ? 'dark' : 'light'}.svg`}
                  alt="upload" className="w-6 h-6 " />
              </span>
              <span onClick={() => {
                toast.info('this feature is under development')
                // handleUploadFromGoogleDrive()
                }}>
                <img src={`/assets/icons/upload-drive.svg`} alt="upload" className="w-6 h-6 " />
              </span>
              <span onClick={() => toast.info('this feature is under development')}>
                <img src={`/assets/icons/upload-box.svg`} alt="upload" className="w-6 h-6 " />
              </span>
              {/* <a href="#">
                <img src={`/assets/icons/upload-link-${theme === 'dark' ? 'dark' : 'light'}.svg`}
                  alt="upload" className="w-6 h-6 " />
              </a> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm text-gray-400">{desc}</label>
        </div>
      </div>
      <ModalGenerate
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        clearFiles={clearFiles}
        files={files}
        fileFromLink={fileFromLink}
        noFileSelected={noFileSelected}
        typeFromLink={typeFromLink}
      />
    </>
  )
}

export default DragDropFiles