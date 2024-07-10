import React, { useState } from 'react'
import Logo from '@/components/elements/logo'
import { MdCheck } from "react-icons/md";
import { ThemeProvider } from "next-themes"
import Link from 'next/link';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("Monthly");

  const tabs = [
    "Monthly",
    "Yearly",
    "LTD"
  ];

  const data = {
    monthly: {
      basic: {
        value: 0,
        data: [
          "3 Minutes of Dubbed Video",
          "Monthly Credit Rollover",
          "200 Natural Speaking AI Voices",
          "Output .Mp4, .Mp3 & .SRT Support",
          "Voice Cloning in  28 Languages",
          "Edit Translations",
          "Add Multispeaker",
          "Audio - Video Sync",
        ]
      },
      inovator: {
        value: 49,
        data: [
          "60 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      },
      studioDub: {
        value: 79,
        data: [
          "120 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      },
      agencyDub: {
        value: 699,
        data: [
          "900 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      }
    },
    yearly: {
      inovator: {
        value: 499,
        data: [
          "60 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      },
      studioDub: {
        value: 799,
        data: [
          "120 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      },
      agencyDub: {
        value: 6999,
        data: [
          "900 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      }
    },
    ltd: {
      inovator: {
        value: 450,
        data: [
          "60 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      },
      studioDub: {
        value: 810,
        data: [
          "120 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      },
      agencyDub: {
        value: 2225,
        data: [
          "500 minutes per month",
          "Translate and Dub Your Video & Audio into 28 Languages",
          "Automated Speech-To-Text Transcription",
          "Automated Machine Translation",
          "Voice Cloning in  28 Languages",
          "Lip-sync Feature",
          "SRT File Upload",
          "Rewrite [ Edit Your Script]",
          "Revoice [ Choose Your Voiceovers]",
          "Refine  [ Fine-tune Your Production]",
          "Remix  [ Mix It Up and Add a New Dynamic]",
        ]
      }
    }
  }

  return (
    <ThemeProvider attribute="class">
      <div className="pl-8 py-4">
        <Link className="h-auto w-auto" href="/dubbing">
          <img src={'/assets/images/logo.svg'} alt="logo"
          />
        </Link>
      </div>
      {/* 4 box pricing */}
      <div className="bg-white py-12 dark:bg-[#18181B]" >
        <div className="container flex flex-col items-center justify-center px-5">
          <h2 className="text-3xl text-center font-bold">Your Content. Any Language</h2>
          <p className="text-lg text-center text-gray-400">Chose the plan that’s right for you with a no hassle upgrade</p>
          {/* tabs */}
          <div className="flex flex-row gap-2 mt-8">
            {tabs.map((tab, index) => (
              <button key={index}
                className={`px-4 py-2 cursor-pointer ${activeTab === tab ? "  bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] text-white" : "bg-white text-gray-700"} rounded-2xl`}
                onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>

          <div className="flex flex-row flex-wrap justify-center gap-4 mt-8">
            {data[activeTab.toLowerCase()].basic && (
              <div className=" bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-lg shadow-lg p-4 m-4 max-w-[16rem]">
                <div className="flex flex-col justify-start gap-2 items-start">
                  <h3 className="text-2xl text-white font-bold">Basic</h3>
                  <p className="text-white text-[2rem]">${data[activeTab.toLowerCase()].basic.value}/forever</p>
                </div>
                <button className="bg-[#18181B] w-full mb-5 text-white rounded-lg px-4 py-2 mt-4">Get Started</button>
                <ul className="flex flex-col gap-2 text-gray-400">
                  {data[activeTab.toLowerCase()].basic.data.map((item, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center">
                      <div className="bg-[#EEEEEE] rounded-full p-1">
                        <MdCheck className="h-3 w-3 text-black" />
                      </div>
                      <li className="text-[#2B2C2B]">{item}</li>
                    </div>
                  ))}
                </ul>

              </div>
            )}
            {data[activeTab.toLowerCase()].inovator && (
              <div className="bg-white rounded-lg shadow-lg p-4 m-4 max-w-[16rem]">
                <div className="flex flex-col justify-start gap-2 items-start">
                  <h3 className="text-2xl text-black font-bold">Inovator</h3>
                  <p className="text-black text-[2rem]">${data[activeTab.toLowerCase()].inovator.value}/month</p>
                </div>
                <button className="bg-[#18181B] w-full mb-5 text-white rounded-lg px-4 py-2 mt-4">Get Started</button>
                <ul className="flex flex-col gap-2 text-gray-400">
                  {data[activeTab.toLowerCase()].inovator.data.map((item, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center">
                      <div className="bg-black rounded-full p-1">
                        <MdCheck className="h-3 w-3 text-white" />
                      </div>
                      <li className="text-[#2B2C2B]">{item}</li>
                    </div>
                  ))}
                </ul>

              </div>
            )}
            {data[activeTab.toLowerCase()].studioDub && (
              <div className=" bg-gradient-to-t from-[#9E0BF3] via-[#66B0FE] to-[#454FEC] rounded-lg shadow-lg p-4 m-4 max-w-[16rem]">
                <div className="flex flex-col justify-start gap-2 items-start">
                  <h3 className="text-2xl text-white font-bold">Studio Dub</h3>
                  <p className="text-white text-[2rem]">${data[activeTab.toLowerCase()].studioDub.value}/month</p>
                </div>
                <button className="bg-[#18181B] w-full mb-5 text-white rounded-lg px-4 py-2 mt-4">Get Started</button>
                <ul className="flex flex-col gap-2 text-gray-400">
                  {data[activeTab.toLowerCase()].studioDub.data.map((item, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center">
                      <div className="bg-[#EEEEEE] rounded-full p-1">
                        <MdCheck className="h-3 w-3 text-black" />
                      </div>
                      <li className="text-[#2B2C2B]">{item}</li>
                    </div>
                  ))}
                </ul>

              </div>
            )}
            {data[activeTab.toLowerCase()].agencyDub && (
              <div className="bg-white rounded-lg shadow-lg p-4 m-4 max-w-[16rem]">
                <div className="flex flex-col justify-start gap-2 items-start">
                  <h3 className="text-2xl text-black font-bold">Agency Dub</h3>
                  <p className="text-black text-[2rem]">${data[activeTab.toLowerCase()].agencyDub.value}/month</p>
                </div>
                <button className="bg-[#18181B] w-full mb-5 text-white rounded-lg px-4 py-2 mt-4">Get Started</button>
                <ul className="flex flex-col gap-2 text-gray-400">
                  {data[activeTab.toLowerCase()].agencyDub.data.map((item, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center">
                      <div className="bg-black rounded-full p-1">
                        <MdCheck className="h-3 w-3 text-white" />
                      </div>
                      <li className="text-[#2B2C2B]">{item}</li>
                    </div>
                  ))}
                </ul>

              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Pricing