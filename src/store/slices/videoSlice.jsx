import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';
import { storeData } from '@/utils/LocalStorage';
import { trending, animeinfo } from "../query";
import { checkEnvironment } from '../checkEnvironment';

const initialState = {
  videos: [],
  loading: false,
  listVideo: [],
  loadingList: false,
};

//sementara ambil video trending anime list dari graphql anilist
export const fetchVideo = createAsyncThunk(
  'video/fetchVideo',
  async (rejectWithValue) => {
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

export const fetchListVideo = createAsyncThunk(
  'video/listVideo',
  async (animeid, {rejectWithValue}) => {
    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: animeinfo,
          variables: {
            id: parseInt(animeid.id),
          },
        }),
        // }, { cache: "no-store" });
      }, { next: { revalidate: 3600 } });

      const data = await response.json();
      return data.data.Media;
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
    //list video
    builder.addCase(fetchListVideo.pending, (state) => {
      state.loadingList = true;
    });
    builder.addCase(fetchListVideo.fulfilled, (state, { payload }) => {
      state.listVideo = payload;
      state.loadingList = false;
    });
    builder.addCase(fetchListVideo.rejected, (state, { payload }) => {
      state.loadingList = false;
    });
  }
});

export default videoSlice.reducer;