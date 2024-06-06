import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";

export const store = configureStore({
    reducer: {
        Auth: authSlice,
        Profile: profileSlice
    }
});