import React from 'react'

const ProfileInput = ({ label, type, placeholder }) => {
  return (
    <div className="w-full">
      <label className="text-gray-500 dark:text-gray-300">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border-none w-full bg-gray-100 dark:bg-[#121212]
         outline-none cursor-pointer p-2 rounded-md"
      />


    </div>
  )
}

export default ProfileInput