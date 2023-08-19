import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    try{
        const response = await axios.get("http://localhost:3001/products");
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response)
    }
});

export const createProduct = createAsyncThunk("products/create", async(newProduct) => {
    try{
        const response = await axios.post("http://localhost:3001/insertproducts", newProduct);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response);
    }
});

export const deleteProduct = createAsyncThunk('products/delete', async(id) => {
    try{
        await axios.delete(`http://localhost:3001/deleteproduct/${id}`);
        return id; 
    }catch(error) {
        throw new Error(error.response);
    }
});
export const editProduct = createAsyncThunk('products/edit', async({id, updatedProduct}) => {
    try{
        await axios.put(`http://localhost:3001/editproduct/${id}`, updatedProduct);
        console.log("id: ",id, "updatedProduct: ", updatedProduct);
        return id; 
    }catch(error) {
        throw new Error(error.response);
    }
});



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
        }).addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createProduct.fulfilled, (state, action)=> {
            state.loading = false;
            state.error = null;
            state.list.push(action.payload.result);
        }).addCase(createProduct.rejected, (state, action) => {
            state.loading = null;
            state.error = action.error.message;
        }).addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.list = state.list.filter(element => element.id !== action.payload);
        }).addCase(deleteProduct.rejected, (state, action) => {
            state.loading = null;
            state.error = action.error.message;
        }).addCase(editProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.list = state.list.map((element) =>
                    element.id === action.payload.id ? action.payload : element
                );
        }).addCase(editProduct.rejected, (state, action) => {
            state.loading = null;
            state.error = action.error.message;
        })
    }
})


export default productSlice.reducer;