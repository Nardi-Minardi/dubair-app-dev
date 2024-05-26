import React, { useState } from 'react'
import Link from 'next/link'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FiMoreVertical } from "react-icons/fi";
import CrudDropdown from '../elements/crudDropdown';

const ItemListDubbingVideo = ({ videos, isWatched, loading, theme }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 max-h-[100vh] overflow-y-auto scrollbar-webkit">
      {videos?.map((episode) => {
        return (
          <div className={`relative group`}>
            {/* skeleton loading */}
            {loading ? (
              <SkeletonTheme baseColor={theme === 'dark' ? '#1f1f1f' : '#e0e0e0'}
                highlightColor={theme === 'dark' ? '#333' : '#f5f5f5'}>
                <Skeleton height={200} />
              </SkeletonTheme>
            ) : (
              <>
                <div className={`relative w-full h-[200px] md:h-[250px] lg:h-[250px] xl:h-[250px] flex-1 rounded-lg overflow-hidden bg-[#18181b] aspect-video ${isWatched ? 'opacity-60' : ''}`}>
                  <img src={episode?.coverImage?.extraLarge || episode?.coverImage?.large}
                    alt={episode?.title?.english}
                    className="bg-[#18181b] h-full w-full object-cover aspect-w-16 aspect-h-9 rounded-lg transition-all duration-300 transform group-hover:scale-105 group-hover:opacity-60" quality={100} />

                  {/* play icons */}
                  <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                    <div className="hidden group-hover:flex items-center justify-center opacity-0 bg-white bg-opacity-40 
                          hover:bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]
                          rounded-full shadow group-hover:opacity-90 w-12 h-12">
                      <svg xmlns="http://www.w3.org/2000/svg" className='play-buttonicon w-5 h-5' viewBox="0 0 24 24"><path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" /></svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between mb-8 mt-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-md font-semibold">{episode?.title?.english}</span>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row  gap-2">
                      <span className="text-sm text-gray-400">Viewed 5 days ago</span>-
                      <span className="text-sm text-gray-400">Edited 3 months ago</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CrudDropdown />
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })
      }

    </div>
  )
}

export default ItemListDubbingVideo