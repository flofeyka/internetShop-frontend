import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../api/authAPI";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: {},
  },
  reducers: {
    setUserData: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.user.image = process.env.REACT_APP_STATIC_URL + action.payload.image;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LogoutSystem.fulfilled, (state, action) => {
      state.isAuth = false;
      state.user = {};
    });
  },
});

const { setUserData } = authSlice.actions;

export const LoginSystem = createAsyncThunk(
  "auth/login",
  async (payload, { dispatch }) => {
    const data = await authAPI.login(
      payload.email,
      payload.password,
    );
    if (data.status === 200) {
      return dispatch(setUserData(data.user));
    }
  }
);

export const RegisterSystem = createAsyncThunk(
  "auth/register",
  async (payload, { dispatch }) => {
    const { name, email, phoneNumber, password } = payload;
    const data = await authAPI.register(
      email,
      name,
      phoneNumber,
      password,
    );
    if (data.status === 200) {
      return dispatch(setUserData(data.user));
    }
  }
);

export const getUsersData = createAsyncThunk(
  "auth/getUsersData",
  async (_, { dispatch }) => {
    const data = await authAPI.getUsersData();
    if (data.status === 200) {
      return dispatch(setUserData(data.user));
    }
  }
);

export const LogoutSystem = createAsyncThunk("auth/logout", async () => {
  const data = await authAPI.logout();
  return data;
});

export default authSlice.reducer;
