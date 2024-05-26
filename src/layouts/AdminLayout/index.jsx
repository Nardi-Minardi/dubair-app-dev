import React, { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import Navbar from '@/components/layouts/adminLayout/navbar'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import { Provider } from "react-redux";
import { store } from '@/store/store'
import { LoadingContext } from "@/context/loadingContext";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const Sidebar = dynamic(() => import('@/components/layouts/adminLayout/sidebar',
  { ssr: false }
))

const AdminLayout = ({ children, title }) => {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
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
        <div className="flex h-full min-h-screen bg-[#eeeeee] dark:bg-zinc-900">
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="w-full overflow-hidden">
            <div className="p-4">
              <Navbar
                show={showSidebar}
                setter={setShowSidebar}
              />
              <LoadingContext.Provider value={loadingAction}>
                {loading && <Loader message="Loading..." />}
                {children}
              </LoadingContext.Provider>
            </div>
          </div>
        </div>
      </PersistGate>
    </ThemeProvider>
    </Provider >
  )
}

export default AdminLayout