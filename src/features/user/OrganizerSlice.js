import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOrganizer, findByUserId, updateOrganizer} from "../../api/OrganizerApi.js";


const initialState = {
    value: null,
    loading: false,
    registerOrganizerSuccess: false,
    registerOrganizerError: null,
    editOrganizerSuccess: false,
    editOrganizerError: null,
    getOrganizerSuccess: false,
    getOrganizerError: null,
}
export const registerOrganizerProfile = createAsyncThunk(
    "users/organizer/add",
    async (organizer, {rejectedWithValue}) => {
        const response = await createOrganizer(organizer);
        if (response.status !== 201) {
            return rejectedWithValue(response.data.message);
        }
        return response.data;
    }
);
export const editOrganizerProfile = createAsyncThunk(
    "users/organizer/edit",
    async (editOrganizer, {rejectedWithValue}) => {
        const response = await updateOrganizer(editOrganizer);
        if (response.status !== 200) {
            return rejectedWithValue(response.data.message);
        }
        return response.data;
    }
);
export const getOrganizerByUserId = createAsyncThunk(
    "organizers/userId",
    async (userId) => {
        const response = await findByUserId({userId});
        return response.data;
    }
);
export const organizerSlice = createSlice(
    {
        name: "organizer",
        initialState,
        reducers: {
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
            setRegisterOrganizerSuccess: (state, action) => {
                state.success = action.payload;
            },
            setRegisterOrganizerError: (state, action) => {
                state.error = action.payload;
            },
            setEditOrganizerSuccess: (state, action) => {
                state.success = action.payload;
            },
            setEditOrganizerError: (state, action) => {
                state.error = action.payload;
            },
            setGetOrganizerSuccess: (state, action) => {
                state.success = action.payload;
            },
            setGetOrganizerError: (state, action) => {
                state.error = action.payload;
            },
            setValue: (state, action) => {
                state.value = action.payload
            },
        },
        extraReducers:
            (builder) => {
                builder
                    .addCase(registerOrganizerProfile.pending, (state) => {
                        state.registerOrganizerSuccess = false;
                        state.loading = true;
                        state.registerOrganizerError = false;
                    })
                    .addCase(registerOrganizerProfile.rejected, (state, action) => {
                        state.registerOrganizerSuccess = false;
                        state.loading = false;
                        state.registerOrganizerError = true;
                    })
                    .addCase(registerOrganizerProfile.fulfilled, (state, action) => {
                        state.registerOrganizerSuccess = true;
                        state.loading = false;
                        state.value = action.payload.data;
                        state.registerOrganizerError = false;
                    })

                    .addCase(editOrganizerProfile.pending, (state) => {
                        state.editOrganizerSuccess = false;
                        state.loading = true;
                        state.editOrganizerError = false;
                    })
                    .addCase(editOrganizerProfile.rejected, (state, action) => {
                        state.editOrganizerSuccess = false;
                        state.loading = false;
                        state.editOrganizerError = true;
                    })
                    .addCase(editOrganizerProfile.fulfilled, (state, action) => {
                        state.editOrganizerSuccess = true;
                        state.loading = false;
                        state.value = action.payload.data;
                        state.editOrganizerError = false;
                    })
                    .addCase(getOrganizerByUserId.fulfilled, (state, action) => {
                        state.getOrganizerSuccess = true;
                        state.loading = false;
                        state.value = action.payload.data;
                        state.getOrganizerError = false;
                    })
            }
    }
)
export const {
    setValue,
    setLoading,
    setRegisterOrganizerSuccess,
    setRegisterOrganizerError,
    setEditOrganizerSuccess,
    setEditOrganizerError,
    setGetOrganizerSuccess,
    setGetOrganizerError
} = organizerSlice.actions;

export const selectRegisterOrganizerSuccess = (state) => state.organizer.registerOrganizerSuccess;
export const selectRegisterOrganizerError = (state) => state.organizer.registerOrganizerError;
export const selectOrganizer = (state) => state.organizer.value;
export const selectEditOrganizerSuccess = (state) => state.organizer.editOrganizerSuccess;
export const selectEditOrganizerError = (state) => state.organizer.editOrganizerError;
export const selectOrganizerEdit = (state) => state.organizer.value;
export const selectGetOrganizerSuccess = (state) => state.organizer.getOrganizerSuccess;
export const selectGetOrganizerError = (state) => state.organizer.getOrganizerError;
export default organizerSlice.reducer;

