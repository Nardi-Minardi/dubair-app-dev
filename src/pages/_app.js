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
import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Europe/Vienna"
        messages={pageProps.messages}
      >
        <Component {...pageProps} />
        <ToastContainer />
      </NextIntlClientProvider>
    </Provider>
  )
}

export default App;