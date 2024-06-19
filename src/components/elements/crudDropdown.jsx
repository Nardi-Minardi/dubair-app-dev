import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, Tooltip } from "@nextui-org/react";
import { FiEdit2, FiDownload, FiScissors, FiMoreVertical } from "react-icons/fi";
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import { deleteVideo } from '@/store/slices/videoSlice';
import {toast} from 'react-toastify'

const CrudDropdown = ({ video, videoRef }) => {
  console.log('video ref from dropdown', videoRef)
  const dispatch = useDispatch()
  const router = useRouter()
  const locale = router.locale
  const options = [
    { label: 'Edit', value: 'edit' },
    { label: 'Download', value: 'download' },
    { label: 'Cut', value: 'cut' },
  ]

  const handleDelete = () => {
    dispatch(deleteVideo(video.projectId)).then((response) => {
      // console.log('response delete from dropdown', response)
      const resp = response.payload
      if (resp.status === 200){
        toast.success('Video deleted successfully')
      } else {
        toast.error('something went wrong, error deleting video')
      }
    })
  }

  const handleDownload = () => {
    const elementVideo = document.getElementById(`video-${video.projectId}`);
    const url = elementVideo.src;
    //download
    window.open(url)
    // const a = document.createElement
    // ('a');
    // a.href
    // = url;
    // a.download
    // = 'video.mp4';
    // a.click();
    
  }

  const handleOption = (option) => {
    if (option === 'edit') {
      router.push(`/${locale}/dubbing/${option}/${video.projectId}`)
    } else if (option === 'download') {
      handleDownload()
    } else if (option === 'cut') {
      handleDelete()
    }
  }


  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size='sm'
          isIconOnly
          className="bg-transparent dark:text-white text-gray-800 hover:text-gray-800">
          <FiMoreVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="crud-dropdown">
        {options.map((option, index) => (
          <DropdownItem
            // href={`/${locale}/dubbing/${option.value}/${video.projectId}`}
            onAction={(key) => handleOption(option.value)}
            textValue={option.label}
            key={index}>
            <div className="flex flex-row gap-4 items-start">
              <div className="flex items-center justify-center">
                {option.value === 'edit' && <FiEdit2 />}
                {option.value === 'download' && <FiDownload />}
                {option.value === 'cut' && <FiScissors />}
              </div>
              <div>{option.label}</div>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CrudDropdown