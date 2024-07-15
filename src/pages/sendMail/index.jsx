import React, { useState } from 'react'
import Logo from '@/components/elements/logo'
import { MdCheck } from "react-icons/md";
import { ThemeProvider } from "next-themes"
import Link from 'next/link';
import { useRouter } from 'next/router'
import { IoIosArrowBack } from "react-icons/io";
import { sendContactForm } from '@/libs/mail';

const SendMail = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [error, setError] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const validate = () => {
    let isValid = true;

    if (!message) {
      setError({ ...error, message: 'Message is required' });
      isValid = false;
    }
    if (!subject) {
      setError({ ...error, subject: 'Subject is required' });
      isValid = false;
    }
    if (!email) {
      setError({ ...error, email: 'Email is required' });
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (validate()) {
      console.log('Valid');
    }
    // await sendContactForm({ email, subject, message });
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
        <Link href="/pricing">
          <button className="bg-[#18181B] text-white px-4 py-2 rounded-lg flex flex-row gap-1 items-center">
            <IoIosArrowBack className="h-4 w-4" />
            Back
          </button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 mt-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-sm text-gray-400">Need details about our Business plan? Let us know.</p>
        </div>
        <div className="flex flex-col px-5 w-full lg:w-[50vw] xl:w-[50vw] gap-8">
          <div className="flex flex-col  gap-2">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setError({ ...error, email: '' });
              }}
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg px-4 outline-none"
              placeholder="Email" />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
            <input
              onChange={(e) => {
                setSubject(e.target.value);
                setError({ ...error, subject: '' });
              }}
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg px-4 outline-none"
              placeholder="Subject" />
            {error.subject && <p className="text-red-500 text-sm">{error.subject}</p>}
            <textarea
              onChange={(e) => {
                setMessage(e.target.value);
                setError({ ...error, message: '' })
              }}
              className="w-full h-32 border border-gray-300 rounded-lg px-4 outline-none"
              placeholder="Message" />
            {error.message && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
          <div className="flex flex-row  gap-4">
            <button
              className="bg-[#18181B] w-full justify-center cursor-pointer text-white text-sm py-2 px-4 rounded-lg flex items-center">
              <span className="text-md">
                {loading ? 'Sending...' : 'Send'}
              </span>
            </button>
          </div>
        </div>
      </form>
    </ThemeProvider>
  )
}

export default SendMail;