import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, Tooltip} from "@nextui-org/react";
import { FiEdit2, FiDownload, FiScissors, FiMoreVertical  } from "react-icons/fi";


const CrudDropdown = () => {
  const options = [
    { label: 'Edit', value: 'edit' },
    { label: 'Download', value: 'download' },
    { label: 'Cut', value: 'cut' },
  ]


  return (
    <div className="">
      <Dropdown>
        <DropdownTrigger>
          <Button 
          className="bg-transparent text-gray-500 hover:text-gray-700"
          auto>
            <FiMoreVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem key={option.value}>
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
    </div>
  )
}

export default CrudDropdown