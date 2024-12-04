import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {fetchExistsUsers} from "../../api/ExistsUserApi.js"

const initialState = {
    existsList: JSON.parse(localStorage.getItem("existsList")) || null,
    username: null,
    userEmail: null,
    customerPhoneNumber: null,
    customerIdCard: null,
    customerReceiptEmail: null,
    personPhoneNumber: null,
    personEmail: null,
    personIdCard: null,
    personTaxCode: null,
    companyBusinessCode: null,
    companyName: null,
    companyEmail: null,
    companyPhone: null,
}
export const getExistsUsers = createAsyncThunk(
    "users/exists",
    async (existsUsers, {rejectWithValue}) => {
        const response = await fetchExistsUsers(existsUsers)
        if (response.status !== 200) {
            return rejectWithValue(response.data.message)
        }
        return response.data
    }
)

export const existsSlice = createSlice({
    name: "exists",
    initialState,
    reducers: {
        setExistsList: (state, action) => {
            state.existsList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExistsUsers.fulfilled, (state, action) => {
                state.existsList = action.payload.data;
                localStorage.setItem("existsList", JSON.stringify(action.payload.data));
            })
    }
})
export const {
    setExistsList,
} = existsSlice.actions
export const selectExistsList = (state) => state.exists.existsList;
export const selectUsernames = (state) => state.exists.existsList.map(user => user.username);
export const selectEmails = (state) => state.exists.existsList.map(user => user.userEmail);
export const selectCustomerPhoneNumbers = (state) => state.exists.existsList.map(customer => customer.customerPhoneNumber);
export const selectCustomerIdCards = (state) => state.exists.existsList.map(customer => customer.customerIdCard);
export const selectCustomerReceiptEmails = (state) => state.exists.existsList.map(customer => customer.customerReceiptEmail);
export const selectPersonPhoneNumbers = (state) => state.exists.existsList.map(organizer => organizer.personPhoneNumber);
export const selectPersonEmails = (state) => state.exists.existsList.map(organizer => organizer.personEmail);
export const selectPersonIdCards = (state) => state.exists.existsList.map(organizer => organizer.personIdCard);
export const selectPersonTaxCodes = (state) => state.exists.existsList.map(organizer => organizer.personTaxCode);
export const selectCompanyBusinessCodes = (state) => state.exists.existsList.map(organizer => organizer.companyBusinessCode);
export const selectCompanyNames = (state) => state.exists.existsList.map(organizer => organizer.companyName);
export const selectCompanyEmails = (state) => state.exists.existsList.map(organizer => organizer.companyEmail);
export const selectCompanyPhones = (state) => state.exists.existsList.map(organizer => organizer.companyPhone);
export default existsSlice.reducer
