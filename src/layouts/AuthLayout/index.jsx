import React, { useState, useMemo } from 'react'
import Head from 'next/head'
import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux";
import { store } from '@/store/store'
import { LoadingContext } from "@/context/loadingContext";
import Loader from '@/components/elements/loader';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const AuthLayout = ({ children, title }) => {
  const [loading, setLoading] = useState(false);
  const persistor = persistStore(store);
  const state = store.getState();
  console.log('state asdwad', state.rootSlice?.auth.token)
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
        <GoogleOAuthProvider clientId="318621592135-jhcnrkn29dvkggogv2d450ert9v61rsn.apps.googleusercontent.com">
          <LoadingContext.Provider value={loadingAction}>
            {loading && <Loader message="Loading..." />}
            {children}
          </LoadingContext.Provider>
        </GoogleOAuthProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  )
}

export default AuthLayout