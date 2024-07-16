import React, { useState } from 'react'
import Logo from '@/components/elements/logo'
import { MdCheck } from "react-icons/md";
import { ThemeProvider } from "next-themes"
import Link from 'next/link';
import { useRouter } from 'next/router'
import { IoIosArrowBack } from "react-icons/io";

const Pricing = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Monthly");

  const tabs = [
    "Monthly",
    "Yearly",
    "LTD"
  ];

  const data = {
    monthly: {
      basic: {
        value: 'Free Trial',
        data: [
          "3 Minutes of Dubbed Video",
          "Cloned Voice of Input File",
          "Output .Mp4",
          "Voice Cloning in 29 Languages",
          "Add Multispeaker Max 9",
          "Audio - Video Sync",
        ],
        action: "Coming Soon"
      },
      inovator: {
        value: '49/month',
        data: [
          "60 minutes per month",
          "Translate and Dub Your Video & Audio into 29 Languages",
          "Automated Machine Translation",
          "Voice Cloning in 29 Languages",
          "Multispeaker up to 9 voices",
          "Lip-sync Feature (Coming Soon)",
          "Rewrite [ Edit Your Script] - Coming Soon",
          "Revoice [ Choose Your Voiceovers] - Coming Soon",
          "Refine [ Fine-tune Your Production] - Coming Soon",
          "Remix [ Mix It Up and Add a New Dynamic] - Coming Soon",
        ],
        action: "Coming Soon"
      },
      studioDub: {
        value: '69/month',
        data: [
          "Everything in Innovator plus",
          "120 minutes per month",
          "Translate and Dub Your Video & Audio into 29 Languages",
          "Automated Machine Translation",
          "Voice Cloning in 29 Languages",
        ],
        action: "Coming Soon"
      },
      agencyDub: {
        value: '699/month',
        data: [
          "Everything in Studio plus",
          "900 minutes per month",
          "Priority support",
          "Real-time dubbing - Coming Soon",
        ],
        action: "Coming Soon"
      }
    },
    yearly: {
      inovator: {
        value: '499/month',
        data: [
          "60 minutes per month",
          "Translate and Dub Your Video & Audio into 29 Languages",
          "Automated Machine Translation",
          "Voice Cloning in 29 Languages",
          "Multispeaker up to 9 voices",
          "Lip-sync Feature (Coming Soon)",
          "Rewrite [ Edit Your Script] - Coming Soon",
          "Revoice [ Choose Your Voiceovers] - Coming Soon",
          "Refine [ Fine-tune Your Production] - Coming Soon",
          "Remix [ Mix It Up and Add a New Dynamic] - Coming Soon",
        ],
        action: "Coming Soon"
      },
      studioDub: {
        value: '799month',
        data: [
          "Everything in Innovator plus",
          "120 minutes per month",
          "Translate and Dub Your Video & Audio into 29 Languages",
          "Automated Machine Translation",
          "Voice Cloning in 29 Languages",
        ],
        action: "Coming Soon"
      },
      agencyDub: {
        value: '6999/month',
        data: [
          "Everything in Studio plus",
          "900 minutes per month",
          "Priority support",
          "Real-time dubbing - Coming Soon",
        ],
        action: "Coming Soon"
      }
    },
    ltd: {
      inovator: {
        value: '450',
        data: [
          "60 minutes per month",
          "Translate and Dub Your Video & Audio into 29 Languages",
          "Automated Machine Translation",
          "Voice Cloning in 29 Languages",
          "Multispeaker up to 9 voices",
          "Lip-sync Feature (Coming Soon)",
          "Rewrite [ Edit Your Script] - Coming Soon",
          "Revoice [ Choose Your Voiceovers] - Coming Soon",
          "Refine [ Fine-tune Your Production] - Coming Soon",
          "Remix [ Mix It Up and Add a New Dynamic] - Coming Soon",
        ],
        action: "Start Now"
      },
      studioDub: {
        value: '810',
        data: [
          "Everything in Innovator plus",
          "120 minutes per month",
          "Translate and Dub Your Video & Audio into 29 Languages",
          "Automated Machine Translation",
          "Voice Cloning in 29 Languages",
        ],
        action: "Start Now"
      },
      agencyDub: {
        value: '2225',
        data: [
          "Everything in Studio plus",
          "900 minutes per month",
          "Priority support",
          "Real-time dubbing - Coming Soon",
        ],
        action: "Start Now"
      }
    }
  }

  const handleOnClick = (action) => {
    if (action === "Start Now") {
      // router.push('/sendMail')
      //open mail
      window.open("mailto:support@dubair.ai")
    } else {
      console.log("Coming Soon")
    }
  }

  return (
    <ThemeProvider attribute="class">
      <div className="pl-8 pt-4 flex flex-col">
        <Link className="h-auto w-auto" href="/dubbing">
          <img src={'/assets/images/logo.svg'} alt="logo"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end px-8">
        <Link href="/dubbing">
          <button className="bg-[#18181B] text-white px-4 py-2 rounded-lg flex flex-row gap-1 items-center">
            <IoIosArrowBack className="h-4 w-4" />
            Back
          </button>
        </Link>
      </div>
      {/* 4 box pricing */}
      <div className="" >
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
                  <p className="text-white text-[2rem]">{data[activeTab.toLowerCase()].basic.value}</p>
                </div>
                <button
                  onClick={() => handleOnClick(data[activeTab.toLowerCase()].basic.action)}
                  className="bg-[#18181B] w-full mb-5 text-white rounded-lg px-4 py-2 mt-4">{data[activeTab.toLowerCase()].basic.action}</button>
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
                  <p className="text-black text-[2rem]">${data[activeTab.toLowerCase()].inovator.value}</p>
                </div>
                <button
                  onClick={() => handleOnClick(data[activeTab.toLowerCase()].inovator.action)}
                  className="bg-[#18181B] w-full mb-5 text-white rounded-lg px-4 py-2 mt-4">{data[activeTab.toLowerCase()].inovator.action}</button>
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
                  <p className="text-white text-[2rem]">${data[activeTab.toLowerCase()].studioDub.value}</p>
                </div>
                <button
                  onClick={() => handleOnClick(data[activeTab.toLowerCase()].studioDub.action)}
                  className="bg-[#18181B] w-full mb-5 text-white rounded-lg px-4 py-2 mt-4">{data[activeTab.toLowerCase()].studioDub.action}</button>
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
                  <p className="text-black text-[2rem]">${data[activeTab.toLowerCase()].agencyDub.value}</p>
                </div>
                <button
                  onClick={() => handleOnClick(data[activeTab.toLowerCase()].agencyDub.action)}
                  className="bg-[#18181B] w-full mb-5 text-white rounded-lg px-4 py-2 mt-4">{data[activeTab.toLowerCase()].agencyDub.action}</button>
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