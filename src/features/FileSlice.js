import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addFile, findAllFiles} from "../api/FileApi.js";

const initialState = {
    files: null,
    file: null,
    urlAvatar: localStorage.getItem("urlImage") || null,
    totalPages: null,
    loading: false,
    success: false,
    error: null,
};

export const testFirebase = createAsyncThunk(
    "testFireBase",
    async (files, {rejectWithValue}) => {
        const response = await findAllFiles();
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    });

export const uploadFirebase = createAsyncThunk(
    "uploadFireBase",
    async (image, {rejectWithValue}) => {
        const response = await addFile(image);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        console.log(response)
        return response.data;
    });


const handlePending = (state) => {
    state.success = false;
    state.loading = true;
    state.error = false;
}, handleRejected = (state, action) => {
    state.success = false;
    state.loading = false;
    state.files = action.payload;
    state.error = action.error;
}, handleFulfilled = (state, action) => {
    state.success = true;
    state.loading = false;
    state.files = action.payload.data;
    state.file = action.payload.data;
    state.urlAvatar = action.payload.data.url;
    localStorage.setItem("urlImage", action.payload.data.url)
    state.error = false;
};

export const fileSlice = createSlice(
    {
        name: "file",
        initialState,
        reducers: {
            setFile: (state, action) => {
                state.file = action.payload;
            },
            setUrlAvatar: (state, action) => {
                state.urlAvatar = action.payload;
            },
            setSuccess: (state, action) => {
                state.success = action.payload;
            },
            setError: (state, action) => {
                state.error = action.payload;
            },
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(testFirebase.pending, handlePending)
                .addCase(testFirebase.rejected, handleRejected)
                .addCase(testFirebase.fulfilled, handleFulfilled)

                .addCase(uploadFirebase.pending, handlePending)
                .addCase(uploadFirebase.rejected, handleRejected)
                .addCase(uploadFirebase.fulfilled, handleFulfilled)
        },
    });
export const {
    setFile,
    setUrlAvatar,
    setSuccess,
    setError,
    setLoading,
} = fileSlice.actions;
export const selectUrlAvatar = (state) => state.file.urlAvatar;
export const selectUploadFile = (state) => state.file.file;
export const selectSuccess = (state) => state.file.success;
export const selectError = (state) => state.file.error;
export const selectLoading = (state) => state.file.loading;
export default fileSlice.reducer;

