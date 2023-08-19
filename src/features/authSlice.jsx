import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAsync = createAsyncThunk("auth/login", async (userData) => {
    try {
        const response = await axios.post('http://localhost:3001/login', userData);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error); // Throw the specific error message
        } else {
            throw new Error("An error occurred"); // Default error message
        }
    }
});

export const registerAsync = createAsyncThunk("auth/register", async (userData) => {
    try {
        const response = await axios.post("http://localhost:3001/register", userData);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response.data;
    } catch(error) {
        if (error.response) {
            throw new Error(error.response.data.error); // Throw the specific error message
        } else {
            throw new Error("An error occurred"); // Default error message
        }
    }
});

export const editUser = createAsyncThunk('auth/edit', async (userData) => {
    try {
        const response = await axios.put(`http://localhost:3001/edituser/${userData.id}`, userData.updatedUser);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        window.location.reload();
        return response.data;
    } catch(error) {
        if (error.response) {
            throw new Error(error.response.data.error); // Throw the specific error message
        } else {
            throw new Error("An error occurred"); // Default error message
        }
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: null,
        email: null,
        password: null,
        image: null,
        loading: false,
        error: null, // Add error field
        role: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear error when pending
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.password = action.payload.user.password;
                state.image = action.payload.user.image;
                state.error = null; // Clear error on success
                state.role = action.payload.user.role;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Set error message
            })
            .addCase(registerAsync.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear error when pending
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.password = action.payload.user.password;
                state.error = null; // Clear error on success
                state.role = action.payload.user.role;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Set error message
            }).addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear error when pending
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.password = action.payload.user.password;
                state.error = null; // Clear error on success
                state.role = action.payload.user.role;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Set error message
            });
    },
});



export default authSlice.reducer;