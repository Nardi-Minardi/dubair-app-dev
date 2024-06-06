import React, { useState, useEffect } from 'react'
import ExportLayout from "@/layouts/exportLayout";
import { MdContentCopy } from "react-icons/md"; import ModalExport from '@/components/inputs/modalExport';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";

const Export = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");

  return (
    <>
      <div className="mt-6 py-2 h-full w-full">

        <div className="flex px-5 flex-col w-full  justify-center items-center">
          <h5 className="text-4xl font-bold">Exporting Your Video</h5>
          <p className="text-sm text-gray-400">Wait a moment, we a re compilig your video</p>
        </div>

        <div className="flex flex-col lg:flex-row xl:flex-row w-full  justify-between mt-10">
          <div className='w-full h-full max-h-1/2 flex items-center justify-center '>
            <img
              className="h-auto w-[500px] object-cover aspect-w-16 aspect-h-9 transition-all duration-300"
              src="/assets/images/dummy-img-video.jpg" alt="video" />
          </div>
          <div className='w-full h-auto max-h-1/2 flex flex-col justify-center items-center'>
            <div className="flex flex-col max-w-[500px] gap-2 items-center justify-center">
              <h5 className="text-3xl font-bold">Share with Friends</h5>
              <p className="text-sm text-gray-400">
                Share your video to all social media
              </p>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap flex-row max-w-[500px] items-center justify-center gap-16 mt-12 w-full">
              <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                <img src="/assets/images/tiktok.png" className="w-12" />
                <span className="text-xs text-gray-400">Tiktok</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                <img src="/assets/images/instagram.png" className="w-12" />
                <span className="text-xs text-gray-400">Instagram</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                <img src="/assets/images/facebook.png" className="w-12" />
                <span className="text-xs text-gray-400">Facebook</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                <img src="/assets/images/youtube.png" className="w-12" />
                <span className="text-xs text-gray-400">Youtube</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                <img src="/assets/images/whatsapp.png" className="w-12" />
                <span className="text-xs text-gray-400">Whatsapp</span>
              </div>
            </div>
            <div className="flex flex-row max-w-[500px] mt-5 h-10 justify-between items-center rounded-lg w-full py-2 px-4 border border-gray-300 ">
              <input
                type="text"
                className="w-full outline-none"
                placeholder="https://your-video.com" />
              <MdContentCopy className="w-6 h-6 mr-2 cursor-pointer text-gray-400" />
            </div>
            <div className="flex w-full max-w-[500px] items-center justify-center gap-2 mt-4">
              <div className="w-full h-0.5 bg-gray-300"></div>
              <p className="text-gray-500">OR</p>
              <div className="w-full h-0.5 bg-gray-300"></div>
            </div>
            <div className="flex w-full max-w-[500px] items-center justify-center gap-2 mt-4">
              <button
                onClick={onOpen}
                className="bg-[#18181B] w-full justify-center cursor-pointer text-white text-sm py-2 px-4 rounded-lg flex items-center">
                <span className="text-md">Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalExport
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
      />
    </>
  )
}

Export.getLayout = function getLayout(page) {
  return <ExportLayout title={"Export"}>{page}</ExportLayout>;
}

export default Export;