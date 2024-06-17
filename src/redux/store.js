import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import favouritesSlice from "./favouritesSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";

export const store = configureStore({
    reducer: {
        Auth: authSlice,
        Profile: profileSlice,
        Favourites: favouritesSlice,
        Cart: cartSlice,
        Product: productSlice,
        Order: orderSlice,
        App: appSlice
    }
});