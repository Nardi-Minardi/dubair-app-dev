import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { googleProvider } from '../pages/api/firebase';
import Cookies from 'js-cookie';
import { APP_NAME } from '../config';
import { tokenAuth } from "@/utils/LocalStorage";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //verify token if login not using gmail
  const verifyToken = async (token) => {
    const auth = getAuth();
    // console.log('auth', auth);
    await signInWithCustomToken(auth, token).then((userCredential) => {
      // console.log('userCredential', userCredential);
      // Signed in
      const user = userCredential.user;
      console.log('user', user);
      setUser(user);
    }).catch((error) => {
      console.log('error', error);
      // Handle Errors here.
    });
  };

  const refreshToken = async () => {
    const auth = getAuth();
    await auth.currentUser?.getIdToken(true).then((idToken) => {
      // console.log('idToken', idToken);
      // Send token to your backend via HTTPS
      // ...

      //sementara redirect ke login
      window.location.href = '/login';
    }).catch((error) => {
      // Handle error
    });
  };

  // handle auth logic here...
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log('user', user);
      if (!user) {
        //force refresh token
        // refreshToken();
        verifyToken(tokenAuth());
        setUser(null);  

        return;
      } else {
        const in1hour = new Date(new Date().getTime() + 60 * 60 * 1000);// 1 jam karena dari backend 1 jam
        const cookiesName = APP_NAME + '-token';
        Cookies.set(cookiesName, user?.accessToken,
          {
            expires: in1hour,
            secure: true,
          });
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  //refresh token every 45 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 45 * 60 * 1000);

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