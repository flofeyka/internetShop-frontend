import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {purchaseAPI} from "../api/purchaseAPI";

const productSlice = createSlice({
    name: "products",
    initialState: {
        productList: [],
        currentPage: 1,
        search: "",
        sort: "popularity",
        metaData: {},
        productData: {
            textMessage: null
        },
        myProducts: []
    },
    reducers: {
        setProductList: (state, action) => {
            state.productList.totalCount = action.payload.totalCount;
            state.productList.finalPrice = action.payload.finalPrice;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setSearchText: (state, action) => {
            state.search = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.productList = action.payload.data;
            state.metaData = action.payload.metaData;
            
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.productData = action.payload;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.myProducts.push(action.payload);
            state.productData = action.payload;
        });
        builder.addCase(getMyProducts.fulfilled, (state, action) => {
            state.myProducts = action.payload;
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.productData = action.payload;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.productData.textMessage = "Удалено."
        })
    }
});

export const {setCurrentPage, setSearchText, setSort} = productSlice.actions;

export const deleteProduct = createAsyncThunk("/products/deleteProduct", async (payload) => {
    const data = await purchaseAPI.deleteProduct(payload);
    if(data.status === 200) {
        return data.data;
    }
})

export const editProduct = createAsyncThunk("/products/editProduct", async (payload) => {
    const {id, name, description, price} = payload;
    const data = await purchaseAPI.editProduct(id, name, description, price);
    if(data.status === 200) {
        return data.product;
    }
})

export const getMyProducts = createAsyncThunk("/products/getMyProducts", async () => {
    const data = await purchaseAPI.getMyProducts();
    if(data.status === 200) {
        return data.products
    }
})

export const createProduct = createAsyncThunk("/products/createProduct", async (payload) => {
    const {name, description, price, quantity, sort} = payload;
    const data = await purchaseAPI.createProduct(name, description, price, quantity, sort);
    if(data.status === 200) {
        return data.Product
    }
})

export const getProducts = createAsyncThunk("getProductList", async (_, {getState}) => {
    const {currentPage, sort, search} = getState().Product;
    const data = await purchaseAPI.getAll(currentPage, sort, search);
    if(data.status === 200) {
        return data.product
    }
});

export const getProduct = createAsyncThunk("/products/getOneById", async (payload) => {
    const data = await purchaseAPI.getOneById(payload);
    if(data.status === 200) {
        return data.product
    }
})

export default productSlice.reducer;