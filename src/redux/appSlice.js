import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersData } from "./authSlice";

const appSlice = createSlice({
  name: "app",
  initialState: {
    initialized: false
  }, 
  reducers: {
    setInitialized: (state) => {
        state.initialized = true
    }
}
});

export default appSlice.reducer;

const { setInitialized } = appSlice.actions;

export const initializedApp = createAsyncThunk("app/initializedApp", async (_, {dispatch}) => {
    const promises = [];
    promises.push(dispatch(getUsersData()));
    
    await Promise.all(promises);
    dispatch(setInitialized());
});