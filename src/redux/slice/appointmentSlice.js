// src/redux/slice/appointmentSlice.js
import { createSlice } from "@reduxjs/toolkit";

let idCounter = 1;

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: [],
  },
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push({
        id: idCounter++,
        ...action.payload,
        status: "pending",
      });
    },
    confirmAppointment: (state, action) => {
      const appt = state.appointments.find((a) => a.id === action.payload);
      if (appt) appt.status = "confirmed";
    },
    cancelAppointment: (state, action) => {
      const appt = state.appointments.find((a) => a.id === action.payload);
      if (appt) appt.status = "canceled";
    },
  rescheduleAppointment: (state, action) => {
  const { id, newDate, newTime } = action.payload;
  const appt = state.appointments.find((a) => a.id === id);
  if (appt) {
    appt.date = newDate;
    appt.time = newTime;
    appt.status = "reschedule_requested"; // Doctor requested, waiting patient/admin confirmation
  }
},

confirmReschedule: (state, action) => {
  const appt = state.appointments.find((a) => a.id === action.payload);
  if (appt && appt.status === "reschedule_requested") {
    appt.status = "confirmed"; 
    appt.wasRescheduled = true;// Confirmed by patient/admin
  }
},


  },
});

export const {
  addAppointment,
  confirmAppointment,
  cancelAppointment,
  rescheduleAppointment,
  confirmReschedule,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
