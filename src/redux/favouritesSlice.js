import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {favouritesAPI} from "../api/favouritesAPI";

const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: []
    },
    extraReducers: (builder) => {
        builder.addCase(getAllFavourites.fulfilled, (state, action) => {
            state.favourites = action.payload;
        });
        builder.addCase(deleteFavourite.fulfilled, (state, action) => {
            state.favourites.splice(action.payload - 1, 1);
        });
        builder.addCase(addFavourite.fulfilled, (state, action) => {
            state.favourites = action.payload;
        })
    }
});

export const getAllFavourites = createAsyncThunk("/favourites/getAll", async () => {
    const data = await favouritesAPI.getFavouritesList();
    if(data.status === 200) {
        return data.data;
    }
});

export const addFavourite = createAsyncThunk("profile/addFavourite", async (payload) => {
    const data = await favouritesAPI.addFavourite(payload);
    if(data.status === 200) {
        return payload;
    }
});

export const deleteFavourite = createAsyncThunk("profile/deleteFavourite", async (payload) => {
    const data = await favouritesAPI.deleteFavourite(payload);
    if(data.status === 200 && data.data) {
        return payload;
    }
})

export default favouritesSlice.reducer;