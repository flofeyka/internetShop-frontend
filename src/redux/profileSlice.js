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
            state.profileData.image = process.env.REACT_APP_STATIC_URL + action.payload.image;
        });
        builder.addCase(getViewsHistory.fulfilled, (state, action) => {
            state.viewsHistory = action.payload;
        });
        builder.addCase(editProfileData.fulfilled, (state, action) => {
            state.profileData = action.payload;
        });
        builder.addCase(getOwners.fulfilled, (state, action) => {
            state.AdminList = action.payload;
        });
        builder.addCase(deleteOwner.fulfilled, (state, action) => {
            state.AdminList.splice(action.payload.id - 1, 1);
        });
        builder.addCase(uploadUsersImage.fulfilled, (state, action) => {
            state.profileData.image = action.payload;
        });
        builder.addCase(deleteUsersImage.fulfilled, (state, action) => {
            state.profileData.image = ""
        });
        builder.addCase(setOwner.fulfilled, (state, action) => {
            state.AdminList.push(action.payload);
        });
    }
});

export const deleteOwner = createAsyncThunk("profile/deleteOwner", async (payload) => {
    const data = await profileAPI.deleteOwner(payload);
    if(data.status === 200) {
        return data.user;
    }
})

export const setOwner = createAsyncThunk("profile/setOwner", async (payload) => {
    const data = await profileAPI.setOwner(payload);
    if(data.status === 200) {
        return data.user;
    }
})

export const getOwners = createAsyncThunk("profile/getOwners", async () => {
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
        return data.user;
    }
});

export const getViewsHistory = createAsyncThunk("profile/getViewsHistory", async (payload) => {
    const data = await purchaseAPI.getViewHistory();
    if(data.status === 200) {
        return data.history;
    }
});

export const uploadUsersImage = createAsyncThunk("profile/uploadAvatar", async (payload) => {
    const data = await profileAPI.uploadImage(payload);
    if(data.status === 200) {
        return data.data;
    }
});

export const deleteUsersImage = createAsyncThunk("profile/deleteAvatar", async () => {
    const data = await profileAPI.deleteImage();
    if(data.status === 200) {
        return data.data;
    }
})

export default profileSlice.reducer;