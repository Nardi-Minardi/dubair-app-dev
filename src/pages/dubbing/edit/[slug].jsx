import React, { useEffect, useState } from 'react'
import AdminLayout2 from '@/layouts/adminLayout2';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import Rewrite from '@/components/dubbing/edit/rewrite';
import Revoice from '@/components/dubbing/edit/revoice';
import Refine from '@/components/dubbing/edit/refine';
import Remix from '@/components/dubbing/edit/remix';
import { useGlobalSidebarContext } from '@/context/sidebarContext';
import { useRouter } from 'next/router';
import { fetchListVideo } from '@/store/slices/videoSlice';
import { checkEnvironment } from '@/store/checkEnvironment';
import { playeranimeinfo } from '@/store/query';

const items = [
  {
    id: 1,
    title: 'Dubbing',
    description: 'Dubbing is the post-production process of recording and replacing voices on a motion picture or television soundtrack subsequent to the original shooting.',
  },
  {
    id: 2,
    title: 'Archive',
    description: 'Archive is a collection of historical records, documents, or other materials of a place, organization, or group.',
  },
  {
    id: 3,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 4,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 5,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 6,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 7,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 8,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 9,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 10,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 11,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 12,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 13,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 14,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 15,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
  {
    id: 16,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
  },
]

const items2 = [
  {
    id: 1,
    title: 'Dubbing',
    description: 'Dubbing is the post-production process of recording and replacing voices on a motion picture or television soundtrack subsequent to the original shooting.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg',
  },
  {
    id: 2,
    title: 'Archive',
    description: 'Archive is a collection of historical records, documents, or other materials of a place, organization, or group.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx164702-FjpM96MPdzVm.jpg',
  },
  {
    id: 3,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx166240-PBV7zukIHW7V.png',
  },
  {
    id: 4,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx177704-AOdVwTtSz6ap.jpg',
  },
  {
    id: 5,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx163139-JchZhUFlNTWU.jpg',
  },
  {
    id: 6,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx156822-Jzo2ITWgm4kM.jpg',
  },
  {
    id: 7,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx163270-oxwgbe43Cpog.jpg',
  },
  {
    id: 9,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153518-LEK6pAXtI03D.jpg',
  },
  {
    id: 10,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153518-LEK6pAXtI03D.jpg',
  },
  {
    id: 11,
    title: 'Minutes Available',
    description: 'Minutes Available is the total minutes available for dubbing.',
    img: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153518-LEK6pAXtI03D.jpg',
  },
]

const DubbingDetail = () => {
  const router = useRouter();
  const t = useTranslations('Dubbing');
  const dispatch = useDispatch()
  const { tabActive, setTabActive } = useGlobalSidebarContext();
  const { slug } = router.query;

  return (
    <div className="mt-6 w-full ">
      {tabActive === 'rewrite' && (
        <Rewrite
          items={items}
          items2={items2}
        />
      )}
      {tabActive === 'revoice' && (
        <Revoice
          items={items}
          items2={items2}
        />
      )}
      {tabActive === 'refine' && (
        <Refine
          items={items}
          items2={items2}
        />
      )}
      {tabActive === 'remix' && (
        <Remix
          items={items}
          items2={items2} />
      )}
    </div>
  )
}

DubbingDetail.getLayout = function getLayout(page) {
  return <AdminLayout2 title={"Dubbing Detail"}>{page}</AdminLayout2>;
}

export async function getServerSideProps({ locale, slug }) {
  return {
    props: {
      messages: (await import(`../../../../locales/${locale}.json`)).default,
    }
  };
}


export default DubbingDetail;

