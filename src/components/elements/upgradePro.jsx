import Link from 'next/link'
import React from 'react'

const UpgradePro = () => {
  return (
    <div className="flex justify-center mx-8 my-5 rounded-2xl bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]">
      <div className="mt-3 px-2 flex flex-col items-center justify-evenly w-[80%] h-[28vh] rounded-[20px] custom-gradient mb-5">
        <div>
          <img src="/assets/images/logo-dark.png" className="w-full" />
        </div>
        <div className="flex gap-2 h-fit flex-col items-center">
          <p className="text-xl font-bold text-white text-center">Upgrade Account</p>
          <p className="text-sm px-4 text-white text-center">Get acces to all <br /> features</p></div>
        <div className='mt-1'>
          <Link rel="noopener noreferrer" className="bg-white text-sm px-8 py-2 flex items-center rounded-lg text-black hover:bg-gradient-to-b hover:from-white/40 hover:to-white/5 " href="/pricing">Buy Now
            <img src="/assets/icons/diamond.svg" className="ml-1 w-5 h-5" alt="" /></Link>
        </div>
      </div>
    </div>
  )
}

export default UpgradePro