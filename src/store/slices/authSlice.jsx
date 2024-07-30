import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, APP_NAME } from '../../config';
import { tokenAuth } from '@/utils/LocalStorage';
import Cookies from 'js-cookie';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/pages/api/firebase';

const initialState = {
  user: {},
  token: '',
  loading: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/account/login`, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
    
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/account`, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const loginByGoogle = createAsyncThunk(
  'auth/loginByGoogle',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/account/google`, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/account`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (data,  {rejectWithValue} ) => {
    try {
      const response = await axios.post(`${API_URL}/account/logout`, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
          }
        });
      // remove user firebase
      auth.signOut();
      const cookiesTokenAuth = `${APP_NAME}-token`;
      const cookiesTokenRefresh = `${APP_NAME}-refresh-token`;
      Cookies.remove(cookiesTokenAuth);
      Cookies.remove(cookiesTokenRefresh);
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/logout',
  async (data,  {rejectWithValue} ) => {
    try {
      const response = await axios.post(`${API_URL}/account/forgot-password`, data,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const refreshTokenUser = createAsyncThunk(
  'auth/refreshtoken',
  async (params,  {rejectWithValue} ) => {
    try {
      const response = await axios.post(`${API_URL}/account/refresh-token`,
      {
        refreshToken: params.refreshToken
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      // state.user = payload.data.user;
      // state.token = payload.data.token;
      state.loading = false;
      //clear error
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.token = payload.data?.idToken;
      state.loading = false;
      //clear error
     
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
    });
    //login by google
    builder.addCase(loginByGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginByGoogle.fulfilled, (state, { payload }) => {
      state.user = payload.data.user;
      state.token = payload.data.token;
      state.loading = false;
    });
    builder.addCase(loginByGoogle.rejected, (state, { payload }) => {
      state.loading = false;
    });
    //fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //refresh token
    builder.addCase(refreshTokenUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshTokenUser.fulfilled, (state, { payload }) => {
      state.token = payload.data.token;
      state.loading = false;
    });
    builder.addCase(refreshTokenUser.rejected, (state) => {
      state.loading = false;
    });

    // logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {};
      state.token = '';
      state.loading = false;
      //clear error
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default authSlice.reducer;