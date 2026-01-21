import  { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {AuthState} from '../constants/types/user'

const initialState:AuthState = {
  user: localStorage.getItem("user") || null,
  accessToken: localStorage.getItem("accessToken") || "",
 isAuthenticated: !!localStorage.getItem("accessToken"),
};
export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    loginSuccess(state, action:PayloadAction<{user:any,accessToken:string}>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout(state) {
      ((state.accessToken = ""),
        (state.user = null),
        (state.isAuthenticated = false));
    },
  },
});
export default authSlice.reducer;
export const { loginSuccess, logout } = authSlice.actions;
