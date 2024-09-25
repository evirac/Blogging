import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );
    const { token } = res.data;

    localStorage.setItem("token", token);
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error.response.data.error));
  }
};

export const register = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    await axios.post("http://localhost:5000/api/auth/register", credentials);
    dispatch(login(credentials)); // Login the user after registration
  } catch (error) {
    dispatch(loginFailure(error.response.data.error));
  }
};
