import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'

const styles = "h-[26px] w-[26px] text-yellow-400 dark:text-gray-300 bg-white dark:bg-[#121212] rounded-full p-1";

export default function ButtonDarkMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && (
        <div className={`flex w-[60px] h-6 bg-[#E6E6E6] rounded-full items-center cursor-pointer
      ${theme === 'dark' ? 'justify-end' : 'justify-start'}
      `}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <span className={`rounded-full px-1
       
        `}>

            {theme === 'light' ? <SunIcon className={styles} /> : <MoonIcon className={styles} />}


          </span>
        </div>
      )}
    </>
  );
}