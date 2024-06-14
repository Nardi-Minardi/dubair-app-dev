import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import Loader from "@/components/elements/loader";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'

const options = [
  { country: "Eng (US)", code: "en", flag: '/assets/flags/en-icon.png' },
  { country: "Indonesia", code: "id", flag: '/assets/flags/id-icon.png' },
];

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [loading, setLoading] = useState(false);
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
  const [currentPath, setCurrentPath] = useState(router.pathname);
  const otherLocale = router.locale === "en" ? "id" : "en";

  const setOption = (option) => {
    setLoading(true);
    setIsOptionsExpanded(false);
    setTimeout(() => {
      router.push(`/${option.code}${currentPath}`, undefined, { locale: option.code });
      setLoading(false);
    }, 500);
  };

  if (loading) return <Loader message="Loading..." />

  return (
    <>
      {/* <Link href={router.pathname} locale={otherLocale}>
        {t('switchLocale', { locale: otherLocale })}
      </Link> */}
      <div className="flex items-center">
        <div className="relative text-lg w-32 md:w-full lg:w-full">
          <div
            className="cursor-pointer
            flex items-center px-4
            gap-3
            "
            onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
            onBlur={() => setIsOptionsExpanded(false)}
          >
            <img src={options.find((option) => option.code === router.locale).flag} alt={options.find((option) => option.code === router.locale).country}
              className="w-6 h-6 " />
            <span className="whitespace-nowrap">
              {options.find((option) => option.code === router.locale).country}
            </span>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-6 w-6 md:h-4 lg:w-4 transform transition-transform duration-200 ease-in-out ${isOptionsExpanded ? "rotate-180" : "rotate-0"
                }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div
            className={`transition-transform duration-500 ease-custom ${!isOptionsExpanded
              ? "-translate-y-1/2 scale-y-0 opacity-0 "
              : "translate-y-0 scale-y-100 opacity-100 z-50"
              }`}
          >
            <ul className="absolute z-10 left-0 right-0 mb-4 dark:bg-[#2B2C2B] bg-white divide-y rounded-lg shadow-2xl overflow-hidden">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="px-3 py-2 dark:text-white transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-300
                  flex items-center cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setOption(option);
                  }}
                  onClick={() => setIsOptionsExpanded(false)}
                >
                  <img src={option.flag} alt={option.country} className="w-5 h-5" />
                  &nbsp;&nbsp;{option.code}
                  {pathname === `/${option.code}` && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7 text-green-500 ml-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSelector;