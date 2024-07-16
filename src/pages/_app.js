import "@/styles/globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'react-toastify/dist/ReactToastify.css';
import "react-toggle/style.css"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import 'react-loading-skeleton/dist/skeleton.css'
import 'video.js/dist/video-js.css';
import "videojs-youtube";
import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { store } from "@/store/store";
import { Provider } from "react-redux";
import Loader from "@/components/elements/loader";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { LoadingContext } from "@/context/loadingContext";
import { AuthProvider } from "@/context/authContext";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loadingAction = useMemo(() => ({
    showLoader: () => setLoading(true),
    hideLoader: () => setLoading(false),
  }), []);

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <AuthProvider>
        <LoadingContext.Provider value={loadingAction}>
          <NextIntlClientProvider
            locale={router.locale}
            timeZone="Europe/Vienna"
            messages={pageProps.messages}
          >
            {loading && <Loader message="Loading..." />}
            <Component {...pageProps} />
            <ToastContainer theme="colored" />

          </NextIntlClientProvider>
        </LoadingContext.Provider>
      </AuthProvider>
    </Provider>
  )
}

export default App;