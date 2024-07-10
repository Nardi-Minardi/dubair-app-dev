import React from 'react'
import AdminLayout from '@/layouts/adminLayout';
import MaintenanceComp from '@/components/elements/maintenanceComp';

const Archive = () => {
  return (
    <div className="mt-6 py-2 sm:w-full">
      <div className="flex relative w-full h-full py-10 bg-white dark:bg-[#2B2C2B] rounded-xl shadow-md">
        <div className="flex flex-col gap-24 m-auto lg:w-[60%] w-[80%] justify-center items-center text-center">
          <MaintenanceComp />
        </div>
      </div>
    </div>
  )
}

Archive.getLayout = function getLayout(page) {
  return <AdminLayout title={"Archive"}>{page}</AdminLayout>;
}

export default Archive;