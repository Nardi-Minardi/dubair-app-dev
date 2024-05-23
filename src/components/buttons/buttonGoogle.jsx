import React from 'react'

const ButtonGoogle = ({
  title,
  onClick,
  width,
  height,
  radius
}) => {
  return (
    <React.Fragment>
      <button
        onClick={onClick}
        className={`
        ${width} 
        ${height} 
        ${radius}
        button-google
        flex 
        gap-1
        items-center 
        justify-center
        text-zinc-900
        dark:text-white
        font-bold 
        py-2 
        px-4 
        `}>
        <img src={'/assets/icons/google.png'} alt="google" 
        style={{width: 'auto', height: '24px'}}
        />
        {title}
      </button>
    </React.Fragment>
  )
}

export default ButtonGoogle