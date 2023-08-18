import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    try{
        const response = await axios.get("http://localhost:3001/products");
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.resp)
    }
})

const productSlice = createSlice( {
    name: "products",
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.list = action.payload;
        }).addCase(fetchProducts.rejected, (state, action)=> {
            state.error = action.error.message;
            state.loading = false;
        });
    }
})


export default productSlice.reducer;