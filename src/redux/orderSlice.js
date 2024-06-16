import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderAPI } from "../api/orderAPI";

const orderSlice = createSlice({
    name: "order", 
    initialState: {
        products: [],
        notTakenOrders: [],
        myOrders: [],
        orderList: [],
        notVerifiedOrders: [],
        takenOrders: []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotTakenOrders.fulfilled, (state, action) => {
            state.notTakenOrders = action.payload;
        });
        builder.addCase(getMyOrders.fulfilled, (state, action) => {
            state.myOrders = action.payload.sort(a => !a.canceled ? -1 : 0);
        });
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            state.myOrders.forEach(order => {
                if(order.id === action.payload) {
                    order.canceled = true
                }
            });
            state.notTakenOrders = state.notTakenOrders.filter(order => !order.canceled);
        });
        builder.addCase(getNotVerifiedOrders.fulfilled, (state, action) => {
            state.notVerifiedOrders = action.payload;
        });
        builder.addCase(verifyOrder.fulfilled, (state, action) => {
            state.notVerifiedOrders.forEach(order => {
                if(order.id === action.payload) {
                    order.isVerified = true
                }
            });
            state.notVerifiedOrders = state.notVerifiedOrders.filter(order => order.isVerified === false);
        });
        builder.addCase(getTakenOrders.fulfilled, (state, action) => {
            state.takenOrders = action.payload;
        });
        builder.addCase(takeOrder.fulfilled, (state, action) => {
            state.takenOrders.forEach(order => {
                if(order.id === action.payload) {
                    order.isTaken = true
                }
            });
            state.takenOrders = state.takenOrders.filter(order => order.isTaken === false);
        });
    }
});

export const getTakenOrders = createAsyncThunk("/products/getTakenProducts", async () => {
    const data = await orderAPI.getTakenOrders();
    if(data.status === 200) {
        return data.products;
    }
});

export const verifyOrder = createAsyncThunk("/orders/verifyOrder", async (payload) => {
    const data = await orderAPI.verifyOrder(payload);
    if(data.status === 200) {
        return payload;
    }
});

export const takeOrder = createAsyncThunk("/orders/takeOrder", async (payload) => {
    const data = await orderAPI.takeOrder(payload);
    if(data.status === 200) {
        return payload;
    }
});

export const getNotTakenOrders = createAsyncThunk("/orders/getHistory", async () => {
    const data = await orderAPI.getNotTakenOrders();
    if(data.status === 200) {
        return data.orders;
    }
});

export const getNotVerifiedOrders = createAsyncThunk("/orders/getNotVerifiedOrders", async () => {
    const data = await orderAPI.getNotVerifiedOrders();
    if(data.status === 200) {
        return data.products;
    }
});


export const createOrder = createAsyncThunk("orders/createOne", async (payload) => {
    const data = await orderAPI.haveOrder(payload.address, payload.products, payload.payment);
    if(data.status === 200) {
        return data.data
    }
})

export const getMyOrders = createAsyncThunk("/products/getMyOrders", async () => {
    const data = await orderAPI.getMyOrders();
    if(data.status === 200) {
        return data.products;
    }
});

export const cancelOrder = createAsyncThunk("/orders/cancelOrder", async (id) => {
    const data = await orderAPI.cancelOrder(id);
    if(data.status === 200 && data.data) {
        return id;
    }
});

export const {setProducts} = orderSlice.actions;

export default orderSlice.reducer;