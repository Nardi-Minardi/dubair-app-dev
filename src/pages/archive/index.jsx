import React, { useEffect, useState, useRef } from 'react'
import AdminLayout from '@/layouts/adminLayout';
import MaintenanceComp from '@/components/elements/maintenanceComp';
import { fetchVideo } from '@/store/slices/videoSlice';
import { useDispatch } from 'react-redux';
import { tokenAuth } from '@/utils/LocalStorage';
import { fetchUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import ListDubbingVideo from '@/components/dubbing/listDubbingVideo';
import { useTranslations } from 'next-intl';

const Archive = () => {
  const t = useTranslations('Dubbing');
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    getVideo()
    dispatch(fetchUser(tokenAuth())).then((res) => {
      // console.log('res user, res.payload.data)
      setUser(res.payload?.data)
    })
  }, [])

  const getVideo = () => {
    try {
      dispatch(fetchVideo())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-6 py-2 sm:w-full">
      <div className="flex w-full py-10 lg:px-8 xl:px-8 bg-white dark:bg-[#2B2C2B] rounded-sm">
        <div className="flex flex-col gap-24 m-auto w-full">
          {/* <ListDubbingVideo
            getVideo={getVideo}
          /> */}
          <div className="flex flex-col gap-24 m-auto lg:w-[60%] w-[80%] justify-center items-center text-center">
            <MaintenanceComp />
          </div>
        </div>
      </div>
    </div>
  )
}

Archive.getLayout = function getLayout(page) {
  return <AdminLayout title={"Archive"}>{page}</AdminLayout>;
}

export async function getStaticProps({ locale }) {
  console.log('locale', locale)
  return {
    props: {
      messages: (await import(`../../../locales/en.json`)).default,
    }
  };
}

export default Archive;

