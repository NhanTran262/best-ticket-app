import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {showAllTicketType} from "../api/TicketTypeApi.js";


const initialState = {
  ticketTypes: JSON.parse(localStorage.getItem("ticketTypes")),
  ticketType: null,
  loading: false,
  success: false,
  error: null,
};


export const getTicketTypes = createAsyncThunk(
  "tickets/showAllTicketTypes",
  async () => {
    const response = await showAllTicketType();
    return response.data;
  }
);
const handlePending = (state) => {
  state.success = false;
  state.loading = true;
  state.error = false;
};

const handleRejected = (state, action) => {
  state.success = false;
  state.loading = false;
  state.error = action.error;
};
export const TicketTypeSlice = createSlice({
  name: "ticketType",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketTypes.pending, handlePending)
      .addCase(getTicketTypes.rejected, handleRejected)
      .addCase(getTicketTypes.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.ticketTypes = action.payload;
        localStorage.setItem("ticketTypes", JSON.stringify(action.payload));
        state.error = false;
      })


  }
});
export const {setLoading, setError, setSuccess} = TicketTypeSlice.actions;

export const selectShowTicketTypes = (state) => state.ticketType.ticketTypes;

export default TicketTypeSlice.reducer;
