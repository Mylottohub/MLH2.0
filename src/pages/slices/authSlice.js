import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null,
  email: null,
  tokenExpiration: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.tokenExpiration = action.payload ? action.payload.expires : null;
    },
    setEmailAddress: (state, action) => {
      state.email = action.payload;
    },
    clearEmailAddress: (state) => {
      state.email = null;
    },

    logout: (state) => {
      state.userInfo = null;
      state.tokenExpiration = null;
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
  setEmailAddress,
  clearEmailAddress,
} = authSlice.actions;

export default authSlice.reducer;
