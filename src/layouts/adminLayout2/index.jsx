import React, { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import Navbar2 from '@/components/layouts/adminLayout/navbar2'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import { Provider } from "react-redux";
import { store } from '@/store/store'
import { LoadingContext } from "@/context/loadingContext";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { SidebarPovider } from '@/context/sidebarContext'

const Sidebar = dynamic(() => import('@/components/layouts/adminLayout/sidebar',
  { ssr: false }
))

const AdminLayout2 = ({ children, title }) => {
  const [loading, setLoading] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);
  const [tabActive, setTabActive] = useState('rewrite')
  const [heading, setHeading] = useState('Rewrite Project Translating To Bahasa Indonesia')
  const persistor = persistStore(store);
  //use context
  const loadingAction = useMemo(() => ({
    showLoader: () => setLoading(true),
    hideLoader: () => setLoading(false),
  }), []);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Head >
          <title>{title}</title>
        </Head>
        <PersistGate loading={null} persistor={persistor}>
          <div className="flex h-auto pb-5 lg:h-[100vh] xl:h-[100vh] bg-[#FAFBFC] dark:bg-zinc-900">
            <SidebarPovider>
              <Sidebar
               firstOpen={firstOpen}
               setFirstOpen={setFirstOpen}
              />
              <div className="w-full h-auto overflow-hidden">
                <div className="p-4">
                  <Navbar2
                    title={heading}
                    setTitle={setHeading}
                    setFirstOpen={setFirstOpen}
                    firstOpen={firstOpen}
                  />
                  {/* <LoadingContext.Provider value={loadingAction}>
                    {loading && <Loader message="Loading..." />} */}
                    {children}
                  {/* </LoadingContext.Provider> */}
                </div>
              </div>
            </SidebarPovider>
          </div>
        </PersistGate>
      </ThemeProvider>
    </Provider >
  )
}

export default AdminLayout2