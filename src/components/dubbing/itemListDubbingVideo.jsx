import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FiMoreVertical } from "react-icons/fi";
import CrudDropdown from '../elements/crudDropdown';
import videojs from 'video.js';
import Player from '../videoPlayer/videojs/player';

const ItemListDubbingVideo = ({ videos, isWatched, loading, theme }) => {
  const [urlVideo, setUrlVideo] = useState([]);

  useEffect(() => {
    const newUrl = [];
    videos?.map((video) => {
      newUrl.push(video?.videoUrl);
    });
    setUrlVideo(newUrl);
  }, [videos]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 max-h-[100vh] overflow-y-auto scrollbar-webkit">
      {videos?.map((episode, index) => {
        return (
          <div key={index} className={`relative group`}>
            {/* skeleton loading */}
            {loading ? (
              <SkeletonTheme baseColor={theme === 'dark' ? '#1f1f1f' : '#e0e0e0'}
                highlightColor={theme === 'dark' ? '#333' : '#f5f5f5'}>
                <Skeleton height={200} />
              </SkeletonTheme>
            ) : (
              <>
                <div className={`relative w-full h-[200px] md:h-[250px] lg:h-[250px] xl:h-[250px]  flex-1 rounded-lg overflow-hidden  aspect-video ${isWatched ? 'opacity-60' : ''}`}>
                  <video 
                  src={Array.isArray(urlVideo) && urlVideo.length > 0 ? urlVideo[index] : ''}
                  controls
                  disablePictureInPicture 
                  controlsList="noplaybackrate nodownload"
                  className="w-full h-full object-cover aspect-w-16 aspect-h-9 rounded-lg"
                  />
                </div>

                <div className="flex flex-col lg:flex-row xl:flex-row justify-between mb-8 mt-3">
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-center  gap-2">
                      <span className="text-md font-semibold">{episode?.title?.english}</span>
                    </div>
                    <div className="flex flex-row justify-between w-full ">
                      <div className="flex items-center w-full flex-col md:flex-row lg:flex-row xl:flex-row  gap-2">
                        <span className="text-sm text-gray-400">Viewed 5 days ago - Edited 3 months ago</span>
                      </div>
                      <CrudDropdown
                        episode={episode}
                      />
                    </div>
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