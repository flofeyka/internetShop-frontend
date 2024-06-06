import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {profileAPI} from "../api/profileAPI";
import {purchaseAPI} from "../api/purchaseAPI";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData: {},
        viewsHistory: []
    },
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.profileData = action.payload;
        });
        builder.addCase(getViewsHistory.fulfilled, (state, action) => {
            state.viewsHistory = action.payload;
        })
    }
});

export const getUserById = createAsyncThunk("profile/getData", async (payload) => {
    const data = await profileAPI.getProfileById(payload);
    if (data.status === 200) {
        return data.user;
    }
});

export const getViewsHistory = createAsyncThunk("profile/getViewsHistory", async (payload) => {
    const data = await purchaseAPI.getViewHistory();
    if(data.status === 200) {
        return data.history;
    }
})

export default profileSlice.reducer;