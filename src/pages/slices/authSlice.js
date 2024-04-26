import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null,
  // email: null,
  // tokenExpiration: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },

    logout: (state) => {
      state.userInfo = null;
    },
    clearStore: () => {
      return initialState;
    },
  },
});

export const {
  setCredentials,
  logout,
  clearStore,
  // setEmailAddress,
  // clearEmailAddress,
} = authSlice.actions;

export default authSlice.reducer;
