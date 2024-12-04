import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login, loginGoogle, loginWithToken, logout, register} from "../../api/AuthApi.js";


const initialState = {
    value: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    loginError: false,
    errorMessage: null,
    loginSuccess: false,
    listRole: null,
    isLogin: false,
    logoutSuccess: false,
    logoutError: null,
    registerSuccess: false,
    registerError: false,
}
export const registerUser = createAsyncThunk(
    "register",
    async (registerData, {rejectWithValue}) => {
        const response = await register(registerData);
        if (response.status !== 201) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);
export const loginUser = createAsyncThunk(
    "login",
    async (loginData, {rejectWithValue}) => {
        const response = await login(loginData);
        if (response.status !== 200) {
            return rejectWithValue({message: response.data.message});
        }
        console.log(response.data);
        return response.data;
    }
);
export const reLoginWithToken = createAsyncThunk(
    "loginWithToken",
    async (loginData, {rejectWithValue}) => {
        const response = await loginWithToken();
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);
export const loginWithGoogle = createAsyncThunk(
    "loginGoogle",
    async (loginData, {rejectWithValue}) => {
        const response = await loginGoogle(loginData);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data;
    }
);
export const logoutUser = createAsyncThunk(
    "logout",
    async (logoutData, {rejectWithValue}) => {
        const response = await logout(logoutData);
        if (response.status !== 200) {
            return rejectWithValue(response.data.message);
        }
        return response.data
    }
);
export const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
            setValue: (state, action) => {
                state.value = action.payload;
            },
            setRegisterSuccess: (state, action) => {
                state.registerSuccess = action.payload;
            },
            setRegisterError: (state, action) => {
                state.registerError = action.payload;
            },
            setLoginError: (state, action) => {
                state.loginError = action.payload;
            },
            setLoginSuccess: (state, action) => {
                state.loginSuccess = action.payload;
            },
            setListRole: (state, action) => {
                state.listRole = action.payload;
            },
            setIsLogin: (state, action) => {
                state.isLogin = action.payload;
            },
            setErrorMessage: (state, action) => {
                state.errorMessage = action.payload;
            },
            setLogoutSuccess: (state, action) => {
                state.logoutSuccess = action.payload;
            },
            setLogoutError: (state, action) => {
                state.logoutError = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(registerUser.pending, (state) => {
                    state.registerSuccess = false;
                    state.loading = true;
                    state.registerError = false;
                })
                .addCase(registerUser.rejected, (state, action) => {
                    state.registerSuccess = false;
                    state.loading = false;
                    state.registerError = true;
                })
                .addCase(registerUser.fulfilled, (state, action) => {
                    state.registerSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    state.registerError = false;
                })

                .addCase(loginUser.pending, (state) => {
                    state.loginSuccess = false;
                    state.loading = true;
                    state.loginError = false;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loginSuccess = false;
                    state.loading = false;
                    state.loginError = true;
                    if (action.payload) {
                        if (action.payload.message === "User is locked!") {
                            state.errorMessage = action.payload.message;
                        } else if (action.payload.message === "User is deleted!") {
                            state.errorMessage = action.payload.message;
                        }
                    }
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.loginSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    localStorage.setItem("user", JSON.stringify( action.payload.data));
                    state.listRole = action.payload.data.listRole;
                    localStorage.setItem("token", action.payload.data.token);
                    state.logoutSuccess = false;
                    state.loginError = false;
                    state.isLogin = true;
                })

                .addCase(reLoginWithToken.pending, (state) => {
                    state.loginSuccess = false;
                    state.loading = true;
                    state.loginError = false;
                })
                .addCase(reLoginWithToken.rejected, (state, action) => {
                    state.loginSuccess = false;
                    state.loading = false;
                    state.loginError = action.payload;
                })
                .addCase(reLoginWithToken.fulfilled, (state, action) => {
                    state.loginSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    localStorage.setItem("user", JSON.stringify( action.payload.data));
                    state.listRole = action.payload.data.listRole;
                    localStorage.setItem("token", action.payload.data.token);
                    state.logoutSuccess = false;
                    state.loginError = false;
                    state.isLogin = true;
                })

                .addCase(loginWithGoogle.pending, (state) => {
                    state.loginSuccess = false;
                    state.loading = true;
                    state.loginError = false;
                })
                .addCase(loginWithGoogle.rejected, (state, action) => {
                    state.loginSuccess = false;
                    state.loading = false;
                    state.loginError = action.payload;
                })
                .addCase(loginWithGoogle.fulfilled, (state, action) => {
                    state.loginSuccess = true;
                    state.loading = false;
                    state.value = action.payload.data;
                    localStorage.setItem("user", JSON.stringify( action.payload.data));
                    state.listRole = action.payload.data.listRole;
                    localStorage.setItem("token", action.payload.data.token);
                    state.logoutSuccess = false;
                    state.loginError = false;
                    state.isLogin = true;
                })

                .addCase(logoutUser.pending, (state) => {
                    state.logoutSuccess = false;
                    state.loading = true;
                    state.logoutError = false;
                })
                .addCase(logoutUser.rejected, (state, action) => {
                    state.logoutSuccess = false;
                    state.loading = false;
                    state.logoutError = action.payload;
                })
                .addCase(logoutUser.fulfilled, (state, action) => {
                    state.logoutSuccess = true;
                    state.auth = null;
                    state.listRole = null;
                    state.loading = false;
                    state.value = action.payload.data;
                    state.logoutError = false;
                    state.loginSuccess = false;
                    state.isLogin = false;
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                })
        }
    }
)
export const {

    setLoading,
    setValue,
    setRegisterSuccess,
    setRegisterError,
    setLoginError,
    setLoginSuccess,
    setListRole,
    setIsLogin,
    setErrorMessage,
    setLogoutError,
    setLogoutSuccess,
} = authSlice.actions;
export const selectRegisterSuccess = (state) => state.auth.registerSuccess;
export const selectRegisterError = (state) => state.auth.registerError;
export const selectLoginSuccess = (state) => state.auth.loginSuccess;
export const selectLoginError = (state) => state.auth.loginError;
export const selectUserLogin = (state) => state.auth.value;
export const selectUserRole = (state) => state.auth.listRole;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectErrorMessage = (state) => state.auth.errorMessage;
export const selectLogoutSuccess = (state) => state.auth.logoutSuccess;
export const selectUserLogout = (state) => state.auth.value;
export default authSlice.reducer;