import React, { useEffect, useState } from 'react'
import AdminLayout from '@/layouts/adminLayout';
import { useTranslations } from 'next-intl';
import DragDropFiles from '@/components/inputs/dragDropFiles';
import ButtonGradient from '@/components/buttons/buttonGradient';
import ListDubbingVideo from '@/components/dubbing/listDubbingVideo';
import { useDispatch } from 'react-redux';
import { fetchVideo } from '@/store/slices/videoSlice';
import { toast } from 'react-toastify'
import { get_filesize } from '@/utils/videoHook';
import axios from 'axios';
import ytdl from 'ytdl-core';

const Dubbing = () => {
  const t = useTranslations('Dubbing');
  const dispatch = useDispatch()
  const [fileFromLink, setFileFromLink] = useState('')
  const [typeFromLink, setTypeFromLink] = useState('')
  const [isYoutube, setIsYoutube] = useState(false)
  const [source, setSource] = useState('')

  useEffect(() => {
    getVideo()
  }, [])

  const getVideo = () => {
    try {
      dispatch(fetchVideo())
    } catch (error) {
      console.log(error)
    }
  }


  const extractYouTubeVideoId = (url) => {
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return Promise.resolve(url.match(regex)[0].split('=')[1])
  }

  const handleUploadFromLink = (e) => {
    if (!source) {
      toast.error('Please enter the link', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFileFromLink('')
      return
    }

    //validate is a format video from link
    const formatAllowed = new Map([["mp4", "video"], ["mov", "video"], ["m4v", "video"], ["webm", "video"], ["youtube", "iframe"]]);
    const extension = source.split('.').pop();
    //check if source from youtube or not
    if (source.includes('youtube')) {
      extractYouTubeVideoId(source).then((resId) => {
       
        setIsYoutube(true)
        setTypeFromLink('youtube')
      })


    }

    setTypeFromLink(extension)
    // const isFormat = formatAllowed.has(extension);
    if (!formatAllowed.has(extension) && !source.includes('youtube')) {
      toast.error('Please enter a video link', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFileFromLink('')
      return
    }

    get_filesize(source, function (size) {
      const zSize = (size / 1024 / 1024 / 1024).toFixed(2);
      console.log('zSize', zSize)
      const maxSizeFree = 5;
      if (zSize > maxSizeFree) {
        toast.error('Please select a video file less than 5GB', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setFileFromLink('')
        return
      }
    });

    const element = document.createElement(formatAllowed.get(extension));
    element.src = source;

    if (element.src) {
      setFileFromLink(source)
    }
  }

  return (
    <div className="mt-6 py-2 sm:w-full flex flex-col gap-6">

      <div className="flex w-full py-10 bg-white dark:bg-[#2B2C2B] rounded-sm">
        <div className="px-8 m-auto w-screen">
          <DragDropFiles
            title={t('langTitleUpload')}
            desc={t('langDescUpload')}
            fileFromLink={fileFromLink}
            setFileFromLink={setFileFromLink}
            typeFromLink={typeFromLink}
            setTypeFromLink={setTypeFromLink}
          />
          {/* OR */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-full h-0.5 bg-gray-300"></div>
            <p className="text-gray-500">OR</p>
            <div className="w-full h-0.5 bg-gray-300"></div>
          </div>

          <div className="flex h-10 flex-row align-center justify-between gap-2 mt-4">
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder={t('langPlaceholderUpload')}
              type="url"
              className="my-input h-10 pl-3 w-full rounded-[12px] bg-white text-md text-gray-700 outline-none" />

            <ButtonGradient
              title={t('langBtnUpload')}
              radius="rounded-md"
              type="button"
              whiteSpace="whitespace-nowrap"
              onClick={() => {
                handleUploadFromLink()
              }}
            />
          </div>

        </div>
      </div>

      <div className="flex w-full py-10 bg-white dark:bg-[#2B2C2B] rounded-sm">
        <div className="px-8 m-auto w-screen">
          <ListDubbingVideo
            getVideo={getVideo}
          />
        </div>
      </div>
    </div>
  )
}

Dubbing.getLayout = function getLayout(page) {
  return <AdminLayout title={"Dubbing"}>{page}</AdminLayout>;
}

export async function getStaticProps({ locale }) {
  console.log(locale);
  return {
    props: {
      messages: (await import(`../../../locales/${locale}.json`)).default,
    }
  };
}


export default Dubbing;

