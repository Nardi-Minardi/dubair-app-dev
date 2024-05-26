import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';
import { storeData } from '@/utils/LocalStorage';
import { trending } from "../query";

const initialState = {
  videos: [],
  loading: false,
};

export const fetchVideo = createAsyncThunk(
  'video/fetchVideo',
  async ( rejectWithValue ) => {
    try {
        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: trending,
            
          }),
          // }, { cache: "no-store" });
        }, { next: { revalidate: 3600 } });

        const data = await response.json();
        return data.data.Page.media;
      } catch (error) {
        console.error('Error fetching data from AniList:', error);
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
      state.videos = payload;
      state.loading = false;
    });
    builder.addCase(fetchVideo.rejected, (state, { payload }) => {
      state.loading = false;
    });
  }
});

export default videoSlice.reducer;