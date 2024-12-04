import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createCustomer, updateCustomer} from "../../api/CustomerApi.js";

const initialState = {
    value: null,
    loading: false,
    registerCustomerProfileSuccess: false,
    registerCustomerProfileError: null,
    editCustomerProfileSuccess: false,
    editCustomerProfileError: null,

};
export const registerCustomerProfile = createAsyncThunk(
    "users/customer/add",
    async (customer, {rejectedWithValue}) => {
        const response = await createCustomer(customer);
        if (response.status !== 201) {
            return rejectedWithValue(response.data.message);
        }
        return response.data;
    }
);

export const editCustomerProfile = createAsyncThunk(
    "users/customer/edit",
    async (editCustomer, {rejectedWithValue}) => {
        const response = await updateCustomer(editCustomer);
        if (response.status !== 200) {
            console.log(response)
            return rejectedWithValue(response.data.message);
        }
        return response.data;
    }
);

export const customerSlice = createSlice(
    {
        name: "customer",
        initialState,
        reducers: {
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
            setRegisterProfileSuccess: (state, action) => {
                state.registerCustomerProfileSuccess = action.payload;
            },
            setRegisterProfileError: (state, action) => {
                state.registerCustomerProfileError = action.payload;
            },
            setEditCustomerProfileSuccess: (state, action) => {
                state.editCustomerProfileSuccess = action.payload;
            },
            setEditCustomerProfileError: (state, action) => {
                state.editCustomerProfileError = action.payload;
            },
            setValue: (state, action) => {
                state.value = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(registerCustomerProfile.pending, (state) => {
                    state.registerCustomerProfileSuccess = false;
                    state.loading = true;
                    state.registerCustomerProfileError = false;
                })
                .addCase(registerCustomerProfile.rejected, (state, action) => {
                    state.registerCustomerProfileSuccess = false;
                    state.loading = false;
                    state.registerCustomerProfileError = true;
                })
                .addCase(registerCustomerProfile.fulfilled, (state, action) => {
                    state.registerCustomerProfileSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    localStorage.removeItem("urlImage");
                    state.registerCustomerProfileError = false;

                })

                .addCase(editCustomerProfile.pending, (state) => {
                    state.editCustomerProfileSuccess = false;
                    state.loading = true;
                    state.editCustomerProfileError = false;
                })
                .addCase(editCustomerProfile.rejected, (state, action) => {
                    state.editCustomerProfileSuccess = false;
                    state.loading = false;
                    state.editCustomerProfileError = true;
                })
                .addCase(editCustomerProfile.fulfilled, (state, action) => {
                    state.editCustomerProfileSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    localStorage.removeItem("urlImage");
                    state.editCustomerProfileError = false;

                })
        }
    }
)
export const {
    setValue,
    setLoading,
    setRegisterProfileSuccess,
    setRegisterProfileError,
    setEditCustomerProfileSuccess,
    setEditCustomerProfileError,
} = customerSlice.actions;

export const selectRegisterCustomerSuccess = (state) => state.customer.registerCustomerProfileSuccess;
export const selectRegisterCustomerError = (state) => state.customer.registerCustomerProfileError;
export const selectCustomer = (state) => state.customer.value;
export const selectCustomerProfileEdited = (state) => state.customer.value;
export const selectEditCustomerProfileSuccess = (state) => state.customer.editCustomerProfileSuccess;
export const selectEditCustomerProfileError = (state) => state.customer.editCustomerProfileError;
export default customerSlice.reducer;


