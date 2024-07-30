import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signInWithCustomToken, signInWithEmailLink } from "firebase/auth";
import { auth, firebaseApiKey, firebaseProjectId, googleProvider } from '../pages/api/firebase';
import Cookies from 'js-cookie';
import { APP_NAME } from '../config';
import { storeCookieRefreshToken, storeCookieToken, tokenAuth, refreshToken } from "@/utils/LocalStorage";
import { refreshTokenUser } from "@/store/slices/authSlice";
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const getUserNoGoogleLogin = async () => {
    console.log('get user');
    const token = tokenAuth();
    if (!token) {
      return;
    }
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const refreshToken = async () => {
    console.log('run refresh token');
    const token = tokenAuth();
    if (!token) {
      return;
    }
    await auth.onAuthStateChanged((user) => {
      // console.log('user', user);
      if (!user) {
        console.log('no user');
        window.location.href = '/login';
        return;
      } else {
        setUser(user);
        //ini udah berhasil login pake google login
        dispatch(refreshTokenUser({ refreshToken: user?.refreshToken })).then((response) => {
          const data = response.payload?.data?.token;
          if (response.status === 401) {
            console.log('401');
            setUser(null);
            // window.location.href = '/login';
            return;
          }

          //store token baru ke cookies
          storeCookieToken(data.access_token);
          storeCookieRefreshToken(data.refresh_token);
        });
      }
    });
  }

  //refresh token every 45 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
      //set interval 45 minutes
    }, 2700000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useGlobalAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider };