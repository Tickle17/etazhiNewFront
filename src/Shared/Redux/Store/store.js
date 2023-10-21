import { combineReducers, configureStore } from "@reduxjs/toolkit";
import api from "../Slices/api";
import authSlice from "../Slices/authSlice";
import modalSlice from "../../modal/modalSlice";

const combineReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
  modalSlice: modalSlice,
});
const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(api.middleware),
});

export default store;
