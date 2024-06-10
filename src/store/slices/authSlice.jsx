import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, APP_NAME } from '../../config';
import { tokenAuth } from '@/utils/LocalStorage';
import Cookies from 'js-cookie';

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
      console.log('response.data', response)
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
  async (  rejectWithValue ) => {
    try {
      // await axios.post(`${API_URL}/user/logout`, {},
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${tokenAuth()}`
      //     }
      //   });
      const cookiesName = `${APP_NAME}-token`;
      Cookies.remove(cookiesName);
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
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