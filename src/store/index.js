import updateSlice from "./reducer/update/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  updateSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
