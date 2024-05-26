import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '@/components/layouts/adminLayout/navbar'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'


const Sidebar = dynamic(() => import('@/components/layouts/adminLayout/sidebar',
  { ssr: false }
))

const AdminLayout = ({ children, title }) => {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ThemeProvider attribute="class">
      <Head >
        <title>{title}</title>
      </Head>
      <div className="flex h-full min-h-screen bg-[#eeeeee] dark:bg-zinc-900">
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        <div className="w-full overflow-hidden">
          <div className="p-4 h-[100vh] ">
            <Navbar
            show={showSidebar}
              setter={setShowSidebar}
            />
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AdminLayout