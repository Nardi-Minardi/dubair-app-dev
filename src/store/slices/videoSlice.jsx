import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';
import { storeData, tokenAuth } from '@/utils/LocalStorage';

const initialState = {
  videos: [],
  loading: false,
  listVideo: [],
  loadingList: false,
};

export const fetchVideo = createAsyncThunk(
  'video/fetchVideo',
  async (rejectWithValue) => {
    try {
      const response = await axios.get(`${API_URL}/projects`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokenAuth()}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return rejectWithValue(error);
    }
  }
);

export const createVideo = createAsyncThunk(
  'video/createVideo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenAuth()}`,
          }
        });
      return response;
    } catch (error) {
      console.error('Error creating video:', error);
      return rejectWithValue(error);
    }
  }
);

export const deleteVideo = createAsyncThunk(
  'video/deleteVideo',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/projects/${projectId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenAuth()}`,
          }
        });
      return response;
    } catch (error) {
      console.error('Error deleting video:', error);
      return rejectWithValue(error);
    }
  }
);


const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //fetch video
    builder.addCase(fetchVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVideo.fulfilled, (state, { payload }) => {
      state.videos = payload.projects;
      state.loading = false;
    });
    builder.addCase(fetchVideo.rejected, (state, { payload }) => {
      state.loading = false;
    });
    //create video
    builder.addCase(createVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createVideo.fulfilled, (state, { payload }) => {
      const concat = state.videos.concat(payload.data);
      state.videos = concat;
      state.loading = false;
    });
    builder.addCase(createVideo.rejected, (state, { payload }) => {
      state.loading = false;
    });
    //delete video
    builder.addCase(deleteVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVideo.fulfilled, (state, { payload }) => {
      const filter = state.videos.filter((video) => video.id !== state.videos.id);
      state.videos = filter;
      state.loading = false;
    });
  }
});

export default videoSlice.reducer;