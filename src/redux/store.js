import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import favouritesSlice from "./favouritesSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
    reducer: {
        Auth: authSlice,
        Profile: profileSlice,
        Favourites: favouritesSlice,
        Cart: cartSlice
    }
});