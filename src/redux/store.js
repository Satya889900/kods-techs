// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import setSelectedDoctor from "./slice/doctorSlice";
import appointmentReducer from "./slice/appointmentSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    doctor: setSelectedDoctor,
    appointment: appointmentReducer,
    auth: authReducer,
  },
});
