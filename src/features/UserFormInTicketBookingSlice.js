import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    values: null,
};

export const UserFormInTicketBookingSlice = createSlice({
    name: "userForm",
    initialState,
    reducers: {
        setValues: (state, action) => {
            state.values = action.payload;
        },
    },
});

export const {setValues} = UserFormInTicketBookingSlice.actions;

export default UserFormInTicketBookingSlice.reducer;

export const selectInfoUser = (state) => state.userForm.values