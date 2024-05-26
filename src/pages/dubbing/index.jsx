import React from 'react'
import Link from 'next/link'
import AdminLayout from "@/layouts/adminLayout";
import dynamic from 'next/dynamic';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import DragDropFiles from '@/components/inputs/dragDropFiles';
import ButtonGradient from '@/components/buttons/buttonGradient';


const Dubbing = () => {
  const t = useTranslations('Dubbing');
  return (
    <div className="mt-6 py-2 sm:w-full">
      <div className="flex w-full h-full py-10 bg-white dark:bg-[#2B2C2B] rounded-sm">
        <div className="px-8 m-auto w-screen">
          <DragDropFiles
            title={t('langTitleUpload')}
            desc={t('langDescUpload')}
          />
          {/* OR */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-full h-0.5 bg-gray-300"></div>
            <p className="text-gray-500">OR</p>
            <div className="w-full h-0.5 bg-gray-300"></div>
          </div>

          <div className="flex h-10 flex-row align-center justify-between gap-2 mt-4">
            <input 
            placeholder={t('langPlaceholderUpload')}
            type="text" 
            className="my-input h-10 pl-3 w-full rounded-[12px] bg-white text-md text-gray-700 outline-none" />

            <ButtonGradient
              title={t('langBtnUpload')}
              radius="rounded-md"
              type="button"
              whiteSpace="whitespace-nowrap"
              onClick={() => { }}
            />
          </div>
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

