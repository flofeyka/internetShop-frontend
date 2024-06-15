import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {profileAPI} from "../api/profileAPI";
import {purchaseAPI} from "../api/purchaseAPI";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData: {},
        viewsHistory: [],
        AdminList: []
    },
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.profileData = action.payload;
        });
        builder.addCase(getViewsHistory.fulfilled, (state, action) => {
            state.viewsHistory = action.payload;
        });
        builder.addCase(editProfileData.fulfilled, (state, action) => {
            state.profileData = action.payload;
        });
        builder.addCase(getOwners.fulfilled, (state, action) => {
            state.AdminList = action.payload;
        })
    }
});

export const getOwners = createAsyncThunk("profile/getOwners", async (payload) => {
    const data = await profileAPI.getOwners();
    if(data.status === 200) {
        return data.owners;
    }
})

export const getUserById = createAsyncThunk("profile/getData", async (payload) => {
    const data = await profileAPI.getProfileById(payload);
    if (data.status === 200) {
        return data.user;
    }
});

export const editProfileData = createAsyncThunk("profile/editData", async (payload) => {
    const data = await profileAPI.updateProfileInfo(payload);
    if (data.status === 200) {
        return data.user
    }
})

export const getViewsHistory = createAsyncThunk("profile/getViewsHistory", async (payload) => {
    const data = await purchaseAPI.getViewHistory();
    if(data.status === 200) {
        return data.history;
    }
})

export default profileSlice.reducer;