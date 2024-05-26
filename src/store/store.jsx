import { configureStore } from "@reduxjs/toolkit";
import { default as rootSlice } from "./rootReducer";
import logger from "redux-logger";
import { NODE_ENV } from "../config";

// Create the Redux store using configureStore from @reduxjs/toolkit
export const store = configureStore({
  reducer: rootSlice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
  devTools: NODE_ENV !== "production",
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on