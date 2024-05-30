import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, Tooltip } from "@nextui-org/react";
import { FiEdit2, FiDownload, FiScissors, FiMoreVertical } from "react-icons/fi";
import {useRouter} from 'next/router'

const CrudDropdown = ({ episode }) => {
  const router = useRouter()
  const locale = router.locale
  const options = [
    { label: 'Edit', value: 'edit' },
    { label: 'Download', value: 'download' },
    { label: 'Cut', value: 'cut' },
  ]

  const handleOption = (option) => {
    console.log(option)
  }


  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size='sm'
          isIconOnly
          className="bg-transparent text-gray-800 hover:text-gray-800">
          <FiMoreVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="crud-dropdown">
        {options.map((option, index) => (
          <DropdownItem
            href={`/${locale}/dubbing/${option.value}/${episode.id}`}
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