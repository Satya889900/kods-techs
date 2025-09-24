import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    // Make sure signupPatient exists if you are trying to import it
    signupPatient: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, signupPatient } = authSlice.actions; // ✅ Export it
export default authSlice.reducer;
