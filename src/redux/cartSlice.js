import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {cartAPI} from "../api/cartAPI";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartList: [],
        totalCount: 0,
        finalPrice: 0
    },
    extraReducers: (builder) => {
        builder.addCase(getCartList.fulfilled, (state, action) => {
            state.cartList = action.payload.cartList;
            state.totalCount = action.payload.totalCount;
            state.finalPrice = action.payload.finalPrice;
        });
        builder.addCase(deleteOneFromCart.fulfilled, (state, action) => {
            state.cartList = state.cartList.filter(i => i.id !== action.payload);
        });
        builder.addCase(addOneToCart.fulfilled, (state, action) => {
            state.cartList.push(action.payload);
        })
    }
});

export const addOneToCart = createAsyncThunk("cart/addOne", async (payload) => {
    const data = await cartAPI.addOne(payload);
    if(data.status === 200) {
        return data.result;
    }
});

export const deleteOneFromCart = createAsyncThunk("cart/deleteOneFromCart", async (payload) => {
    const data = await cartAPI.deleteOne(payload);
    if(data.status === 200 && data.result) {
        return payload;
    }
});

export const getCartList = createAsyncThunk("cart/getAll", async () => {
    const data = await cartAPI.getAll();
    if(data.status === 200) {
        return data.cartList;
    }
})



export default cartSlice.reducer;