import React from 'react'

const ButtonGradient = ({
  title,
  onClick,
  width,
  height,
  radius,
  type
}) => {
  return (
    <React.Fragment>
      <button
        type={type}
        onClick={onClick}
        className={`
        ${width} 
        ${height} 
        ${radius}
        bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]
        text-white 
        font-bold 
        py-2 
        px-4 
        focus:outline-none 
        focus:shadow-outline 
        hover:shadow-lg t
        ransition-shadow 
        duration-300 ease-in-out
        `}>
        {title}
      </button>
    </React.Fragment>
  )
}

export default ButtonGradient