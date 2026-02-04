import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../constants/types/user";

const initialState: AuthState = {
  user:  null,
  accessToken: "",
  isAuthenticated: false,
};
export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: any; accessToken: string }>,
    ) {
      console.log("from login success");
      console.log("action  is ", action);

      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.parse(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout(state) {
      ((state.accessToken = ""),
        (state.user = null),
        (state.isAuthenticated = false));
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
    setAccessToken(state, action) {
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
    },
  },
});
export default authSlice.reducer;
export const { loginSuccess, logout, setAccessToken } = authSlice.actions;
