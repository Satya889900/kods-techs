// src/redux/slices/appointmentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push({
        id: Date.now(),
        ...action.payload,
        status: "booked",
      });
    },
    cancelAppointment: (state, action) => {
      const appt = state.appointments.find(a => a.id === action.payload);
      if (appt) appt.status = "canceled";
    },
    confirmAppointment: (state, action) => {
      const appt = state.appointments.find(a => a.id === action.payload);
      if (appt) appt.status = "confirmed";
    },
    completeAppointment: (state, action) => {
      const appt = state.appointments.find(a => a.id === action.payload);
      if (appt) appt.status = "completed";
    },
  },
});

// ✅ Export actions
export const {
  addAppointment,
  cancelAppointment,
  confirmAppointment,
  completeAppointment,
} = appointmentSlice.actions;

// ✅ Export reducer
export default appointmentSlice.reducer;
