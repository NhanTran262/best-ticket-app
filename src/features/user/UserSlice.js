import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {forgotPassword, lock, remove, sendValidationCode, unlock} from "../../api/UserApi.js";


const initialState = {

    value: null,
    loading: false,
    sendMailCodeSuccess: false,
    sendMailCodeError: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: false,
    lockUserSuccess: false,
    lockUserError: false,
    unlockUserSuccess: false,
    unlockUserError: false,
    removeUserSuccess: false,
    removeUserError: false,
};


export const sendMailCode = createAsyncThunk(
    "send-otp",
    async (data, {rejectWithValue}) => {
        const response = await sendValidationCode(data);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);
export const forgotPasswordUser = createAsyncThunk(
    "forgot-password",
    async (data, {rejectWithValue}) => {
        const response = await forgotPassword(data);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);
export const lockUser = createAsyncThunk(
    "lock",
    async (userData, {rejectWithValue}) => {
        const response = await lock(userData);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data
    }
);
export const removeUser = createAsyncThunk(
    "remove",
    async (data, {rejectWithValue}) => {
        const response = await remove(data);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data
    }
);
export const unlockUser = createAsyncThunk(
    "unlock",
    async (data, {rejectWithValue}) => {
        const response = await unlock(data);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data
    }
);


export const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
            setValue: (state, action) => {
                state.value = action.payload;
            },
            setSendMailCodeSuccess: (state, action) => {
                state.sendMailCodeSuccess = action.payload;
            },
            setSendMailCodeError: (state, action) => {
                state.sendMailCodeError = action.payload;
            },
            setForgotPasswordSuccess: (state, action) => {
                state.forgotPasswordSuccess = action.payload;
            },
            setForgotPasswordError: (state, action) => {
                state.forgotPasswordError = action.payload;
            },
            setLockUserSuccess: (state, action) => {
                state.loginSuccess = action.payload;
            },
            setLockUserError: (state, action) => {
                state.lockUserError = action.payload;
            },
            setUnlockUserSuccess: (state, action) => {
                state.unlockUserSuccess = action.payload;
            },
            setUnlockUserError: (state, action) => {
                state.unlockUserError = action.payload;
            },
            setRemoveUserSuccess: (state, action) => {
                state.removeUserSuccess = action.payload;
            },
            setRemoveUserError: (state, action) => {
                state.removeUserError = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder

                .addCase(sendMailCode.pending, (state) => {
                    state.sendMailCodeSuccess = false;
                    state.loading = true;
                    state.sendMailCodeError = false;
                })
                .addCase(sendMailCode.rejected, (state, action) => {
                    state.sendMailCodeSuccess = false;
                    state.loading = false;
                    state.sendMailCodeError = true;
                })
                .addCase(sendMailCode.fulfilled, (state, action) => {
                    state.sendMailCodeSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    state.sendMailCodeError = false;
                })

                .addCase(forgotPasswordUser.pending, (state) => {
                    state.forgotPasswordSuccess = false;
                    state.loading = true;
                    state.forgotPasswordError = false;
                })
                .addCase(forgotPasswordUser.rejected, (state, action) => {
                    state.forgotPasswordSuccess = false;
                    state.loading = false;
                    state.forgotPasswordError = true;
                })
                .addCase(forgotPasswordUser.fulfilled, (state, action) => {
                    state.forgotPasswordSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    state.forgotPasswordError = false;
                })

                .addCase(lockUser.pending, (state) => {
                    state.lockUserSuccess = false;
                    state.loading = true;
                    state.lockUserError = false;
                })
                .addCase(lockUser.rejected, (state, action) => {
                    state.lockUserSuccess = false;
                    state.loading = false;
                    state.lockUserError = true;
                })
                .addCase(lockUser.fulfilled, (state, action) => {
                    state.lockUserSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    state.lockUserError = false;
                })

                .addCase(unlockUser.pending, (state) => {
                    state.unlockUserSuccess = false;
                    state.loading = true;
                    state.unlockUserError = false;
                })
                .addCase(unlockUser.rejected, (state, action) => {
                    state.unlockUserSuccess = false;
                    state.loading = false;
                    state.unlockUserError = true;
                })
                .addCase(unlockUser.fulfilled, (state, action) => {
                    state.unlockUserSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    state.unlockUserError = false;
                })

                .addCase(removeUser.pending, (state) => {
                    state.removeUserSuccess = false;
                    state.loading = true;
                    state.removeUserError = false;
                })
                .addCase(removeUser.rejected, (state, action) => {
                    state.removeUserSuccess = false;
                    state.loading = false;
                    state.removeUserError = true;
                })
                .addCase(removeUser.fulfilled, (state, action) => {
                    state.removeUserSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    state.removeUserError = false;
                })
        }
    }
)
export const {

    setLoading,
    setValue,
    setSendMailCodeSuccess,
    setSendMailCodeError,
    setForgotPasswordError,
    setForgotPasswordSuccess,
    setLockUserSuccess,
    setLockUserError,
    setUnlockUserSuccess,
    setUnlockUserError,
    setRemoveUserError,
    setRemoveUserSuccess,

} = userSlice.actions;
export const selectSendMailCodeSuccess = (state) => state.user.sendMailCodeSuccess;
export const selectSendMailCodeError = (state) => state.user.sendMailCodeSuccess;
export const selectLockUser = (state) => state.user.value;
export const selectRemoveUser = (state) => state.user.value;
export default userSlice.reducer;
