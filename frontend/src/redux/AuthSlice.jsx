import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
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
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  logout,
} = authSlice.actions;
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

    dispatch(loginSuccess({ token }));
  } catch (error) {
    dispatch(loginFailure(error.response.data.error));
  }
};

export const register = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    await axios.post("http://localhost:5000/api/auth/register", credentials);
    dispatch(
      login({ email: credentials.email, password: credentials.password })
    );
  } catch (error) {
    dispatch(loginFailure(error.response.data.error));
  }
};

// fetch user details
export const fetchUserDetails = () => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(fetchUserSuccess(res.data));
  } catch (error) {
    dispatch(
      fetchUserFailure(
        error.response?.data?.error || "Failed to fetch user details"
      )
    );
  }
};
