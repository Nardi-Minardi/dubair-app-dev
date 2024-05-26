import "@/styles/globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'react-toastify/dist/ReactToastify.css';
import "react-toggle/style.css"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { LoadingContext } from "@/context/loadingContext";
import Loader from "@/components/elements/loader";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //use context
  const loadingAction = useMemo(() => ({
    showLoader: () => setLoading(true),
    hideLoader: () => setLoading(false),
  }), []);

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Europe/Vienna"
        messages={pageProps.messages}
      >
        <GoogleOAuthProvider clientId="318621592135-jhcnrkn29dvkggogv2d450ert9v61rsn.apps.googleusercontent.com">
          <LoadingContext.Provider value={loadingAction}>
            {loading && <Loader message="Loading..." />}
            <Component {...pageProps} />
            <ToastContainer />
          </LoadingContext.Provider>
        </GoogleOAuthProvider>
      </NextIntlClientProvider>
    </Provider>
  )
}

export default App;