import React, {useEffect, useState} from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router';

const ForgotPasswordLine = (props) => {
  const router = useRouter();

  const currentPage = router.pathname;

  console.log('currentPage', currentPage);


  return (
    <div className='mt-12'>
      {/* create bullet timeline here */}
      <div className="flex items-center justify-center gap-5">
        <div
          onClick={props.onClick}
          className="w-4 h-4 bg-green-300 dark:bg-red-700 rounded-full cursor-pointer">
          {currentPage === '/forgot-password/step-one' || currentPage === '/forgot-password/step-two' || currentPage === '/forgot-password/step-three' &&
           <CheckIcon className="text-white w-4 h-4" />}
        </div>
        <div className="w-4 h-4 bg-green-300 dark:bg-red-700 rounded-full cursor-pointer">
          {currentPage === '/forgot-password/step-one' || currentPage === '/forgot-password/step-three' &&
          <CheckIcon className="text-white w-4 h-4" />}
        </div>
        <div className="w-4 h-4 bg-green-300 dark:bg-red-700 rounded-full cursor-pointer">
          {currentPage === '/forgot-password/step-one' || currentPage === '/forgot-password/step-two' || currentPage === '/forgot-password/step-three' &&
          <CheckIcon className="text-white w-4 h-4" />}
        </div>
        <div className="w-4 h-4 bg-green-300 dark:bg-red-700 rounded-full cursor-pointer">
          {currentPage === '/forgot-password/step-four' && <CheckIcon className="text-white w-4 h-4" />}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordLine