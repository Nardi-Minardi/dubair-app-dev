import React from 'react'
import { Progress } from "@nextui-org/react";

const LoaderProgres = ({ progres }) => {
  return (
    <div className="loader h-full min-h-screen w-full"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        position: 'fixed',
        zIndex: 99999,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: '0.8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100% !important',
        padding: '0 30rem',
      }}
    >
      <Progress
        aria-label="Upload progress..."
        size="md"
        value={progres}
        color="primary"
        showValueLabel={true}
        className="max-w-md"
      />
      {/* <span className="progres"
        style={{
          width: `${progres}%`, // `progres` is a number from 0 to 100
          height: '16.8px',
          borderRadius: '16.8px',
          background: `${progres < 100 ? '#000' : '#4A5FEF'}`,
          transition: 'width 0.5s',
        }}
      >

      </span> */}
      <span className="text-center text-white">
        {progres} %<br />
        {"Don't refresh the page, we are working on it"}
      </span>
    </div>
  )
}

export default LoaderProgres