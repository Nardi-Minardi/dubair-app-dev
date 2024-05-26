import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';
import { storeData } from '@/utils/LocalStorage';

const initialState = {
  user: {},
  token: '',
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, loginData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login_google`, loginData,
        {
          headers: {
            'Content-Type': 'application/json'
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
      const response = await axios.get(`${API_URL}/user/me`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/update`, data.body,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
          }
        });
        console.log('response.data logout', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (token, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/user/logout`, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
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
    //login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.data.user;
      state.token = payload.data.token;
      state.isAuthenticated = true;
      state.loading = false;
      //clear error
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.error = payload.data;
      state.loading = false;
    });
    //login by google
    builder.addCase(loginByGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginByGoogle.fulfilled, (state, { payload }) => {
      state.user = payload.data.user;
      state.token = payload.data.token;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(loginByGoogle.rejected, (state, { payload }) => {
      state.error = payload.data;
      state.loading = false;
    });
    //fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.error = payload.data;
      state.loading = false;
    });
    //update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.error = payload.data;
      state.loading = false;
    });

    // logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {};
      state.token = '';
      state.isAuthenticated = false;
      state.loading = false;
      //clear error
      state.error = null;
    });
  }
});

export default authSlice.reducer;