import { createSlice } from "@reduxjs/toolkit";
import http from "../api";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
  },

  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
      window.localStorage.setItem("token", action.payload.token);
      http.refreshToken();
    },
    logout(state, action) {
      state.value = {};
      window.localStorage.removeItem("token");
      if (window.location.pathname !== "/auth") {
        window.location.href = "/auth";
      }
    },
    //purgeAuth: (state) => {
    // state.value = {};
    //window.localStorage.removeItem("token");
    //window.localStorage.removeItem("userAddress");
    //http.refreshToken();

    //if (location.pathname !== "/auth") window.location.href = "/auth";
    ///},
  },
});

export const { setAuth, logout } = userSlice.actions;
export default userSlice.reducer;
