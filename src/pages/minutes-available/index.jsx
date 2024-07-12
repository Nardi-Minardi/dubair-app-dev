import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from '@nextui-org/react';
import AdminLayout from '@/layouts/adminLayout';
import { fetchUser } from '@/store/slices/authSlice';
import { tokenAuth } from '@/utils/LocalStorage';
import { acumulatedDuration } from '@/utils/videoHook';

const MinutesAvailable = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [minutesAvailable, setMinutesAvailable] = useState(0);
  const [minutesUsed, setMinutesUsed] = useState(0);

  useEffect(() => {
    getDataMinutes();
  }
    , []);

  const getDataMinutes = () => {
    setLoading(true);
    dispatch(fetchUser(tokenAuth())).then((res) => {
      if (res.payload.data) {
        setMinutesAvailable(res.payload.data.minutesAvailable);
        setMinutesUsed(res.payload.data.minutesUsed);
      }
      setLoading(false);
      setLoadingRefresh(false);
    });
  }


  const handleRefresh = () => {
    setLoadingRefresh(true);
    getDataMinutes();
  }

  return (
    <div className="mt-6 py-2 sm:w-full">
      <div className="flex flex-col w-full h-full py-10 bg-white dark:bg-[#2B2C2B] rounded-xl shadow-md">
        <div className='justify-end flex flex-row gap-4 mx-5 mb-3'>
          <button
            onClick={() => router.push('/pricing')}
            className=" bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white 
            text-xs py-2 px-4 rounded-lg flex items-center">
            VIP
            <img src="/assets/icons/diamond-white.svg" className="w-4 ml-1" />
          </button>
          <Tooltip content="Refresh">
            <button
              onClick={handleRefresh}
              className="bg-[#F0F0F0] border-none outline-none cursor-pointer p-2 rounded-md">
              <svg xmlns="http://www.w3.org/1000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className={`w-[22px] h-[22px] ${loadingRefresh || loading ? "animate-spin" : ""}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </Tooltip>
        </div>
        {loading ? (
          <div className="flex flex-col gap-24 m-auto lg:w-[60%] w-[80%]">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className='flex flex-row gap-5 px-5  w-full'>
            <div className='flex flex-col gap-2 shadow-lg p-4 rounded-sm w-1/2'>
              <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Current Plan</h1>
              <p className='text-lg text-gray-500 dark:text-gray-300'>{user?.plan?.toUpperCase()}</p>
            </div>
            <div className='flex flex-col gap-2 shadow-lg p-4 rounded-sm w-1/2'>
              <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Minutes Available</h1>
              <p className='text-lg text-gray-500 dark:text-gray-300'>You have {" "}
                <span className='text-blue-500 font-bold'>{acumulatedDuration(minutesAvailable)} </span> / {" "}
                <span className='text-red-500 font-bold'>{acumulatedDuration(minutesUsed)} </span>
                minutes used</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

MinutesAvailable.getLayout = function getLayout(page) {
  return <AdminLayout title={"Minutes Available"}>{page}</AdminLayout>;
}

export default MinutesAvailable;