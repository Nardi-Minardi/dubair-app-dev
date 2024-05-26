import React from 'react'
import AdminLayout from "@/layouts/adminLayout";

const MinutesAvailable = () => {
  return (
    <div className="mt-6 py-2 sm:w-full">
      <div className="flex relative w-full h-full py-10 bg-white dark:bg-[#2B2C2B] rounded-xl shadow-md">
        <div className="flex flex-col gap-24 m-auto lg:w-[60%] w-[80%] justify-center items-center text-center">
          <p>MinutesAvailable</p>
        </div>
      </div>
    </div>
  )
}

MinutesAvailable.getLayout = function getLayout(page) {
  return <AdminLayout title={"Minutes Available"}>{page}</AdminLayout>;
}

export default MinutesAvailable;