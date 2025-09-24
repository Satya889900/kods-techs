import { createSlice } from "@reduxjs/toolkit";

let doctorIdCounter = 1;

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [
      {
        id: doctorIdCounter++,
        name: "Dr. A. Sharma",
        specialization: "Cardiologist",
      },
      {
        id: doctorIdCounter++,
        name: "Dr. B. Verma",
        specialization: "Neurologist",
      },
    ],
    selectedDoctor: null,
  },
  reducers: {
    // Add new doctor
    addDoctor: (state, action) => {
      state.doctors.push({
        id: doctorIdCounter++,
        ...action.payload,
      });
    },
    // Set the selected doctor for details page or editing
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
  },
});

export const { addDoctor, setSelectedDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
