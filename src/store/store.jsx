import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { default as rootSlice } from "./rootReducer";
import logger from "redux-logger";
import { NODE_ENV } from "../config";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  version: 1,
  timeout: 100,
  storage,
  //_persist false
  blacklist: ['_persist'],
  // only auth reducer store storage
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  rootSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store using configureStore from @reduxjs/toolkit
export const store = configureStore({
  reducer: persistedReducer,
  devTools: NODE_ENV !== "production", // Enable Redux DevTools in development
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
});

export const persistor = persistStore(store);

export default store;