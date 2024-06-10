import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FiMoreVertical } from "react-icons/fi";
import CrudDropdown from '../elements/crudDropdown';

const ItemDetailDubbingVideo = ({ videos, isWatched, loading, theme }) => {
  const [openPopover, setOpenPopover] = useState(false)
  const [urlVideo, setUrlVideo] = useState([]);
  const [pauseShow, setPauseShow] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const newUrl = [];
    videos?.map((video) => {
      newUrl.push(video?.videoUrl);
    });
    setUrlVideo(newUrl);
  }, [videos]);

  const onPlayVideo = (idx) => {
    const id = `video-${idx}`;
    const videoElement = document.getElementById(id);
    if (videoElement) {
      videoElement.play();
    }

    setPauseShow(true);

  }

  const onPauseVideo = (idx) => {
    const id = `video-${idx}`;
    const videoElement = document.getElementById(id);
    if (videoElement) {
      videoElement.pause();
    }

    setPauseShow(false);
  }

  return (
    <div className="flex flex-col max-h-[100vh] overflow-y-auto scrollbar-webkit">
      {videos?.map((episode, index) => {
        return (
          <div key={index} className={`relative group`}>
            {loading ? (
              <div className='flex flex-row gap-4 p-4 items-center w-auto'>
                <SkeletonTheme baseColor={theme === 'dark' ? '#1f1f1f' : '#e0e0e0'}
                  highlightColor={theme === 'dark' ? '#333' : '#f5f5f5'}>
                  <Skeleton height={80} width={80} />
                </SkeletonTheme>
                <div className="w-1/2 flex flex-col gap-2 items-start justify-center">
                  <SkeletonTheme baseColor={theme === 'dark' ? '#1f1f1f' : '#e0e0e0'}
                    highlightColor={theme === 'dark' ? '#333' : '#f5f5f5'}>
                    <Skeleton height={15} width={150} count={2} />
                  </SkeletonTheme>
                </div>
              </div>
            ) : (
              <div className='flex justify-between flex-row gap-4 py-4 items-center w-full'>
                <div className="flex flex-row gap-4 items-center justify-center">
                  <div className={`relative  max-w-[80px] h-[100px] lg:max-w-[80px] lg:h-[80px] xl:max-w-[80px] xl:h-[80px]
                      rounded-lg overflow-hidden bg-[#18181b] aspect-video ${isWatched ? 'opacity-60' : ''}`}>
                    <video
                      id={`video-${index}`}
                      ref={(el) => (videoRef.current = el)}
                      src={Array.isArray(urlVideo) && urlVideo.length > 0 ? urlVideo[index] : ''}
                      // controls
                      disablePictureInPicture
                      controlsList="noplaybackrate nodownload"
                      className="w-full h-full object-cover aspect-w-16 aspect-h-9 rounded-lg"
                    />
                    {/* play icons */}
                    {!pauseShow ? (
                      <div
                        onClick={() => onPlayVideo(index)}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <div className="hidden group-hover:flex items-center justify-center opacity-0 bg-white bg-opacity-40 
                            hover:bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]
                            rounded-full shadow group-hover:opacity-90 w-6 h-6">


                          <svg xmlns="http://www.w3.org/2000/svg" className='play-buttonicon w-4 h-4' viewBox="0 0 24 24"><path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" /></svg>

                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => onPauseVideo(index)}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <div className="hidden group-hover:flex items-center justify-center opacity-0 bg-white bg-opacity-40 
                            hover:bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC]
                            rounded-full shadow group-hover:opacity-90 w-6 h-6">

                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M14 10h-2v12h2zm6 0h-2v12h2z" /><path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2" /></svg>

                        </div>
                      </div>
                    )}

                  </div>
                  <div className="flex text-sm flex-col w-full items-start justify-center">
                    <div className="text-md">
                      {episode?.title?.english}
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row  gap-2">
                      <span className="text-sm text-gray-400">Viewed 5 days ago</span>-
                      <span className="text-sm text-gray-400">Edited 3 months ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CrudDropdown
                    episode={episode}
                  />
                </div>
              </div>
            )}
          </div>
        )
      }
      )}
    </div>
  )
}

export default ItemDetailDubbingVideo