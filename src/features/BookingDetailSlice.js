import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findAllBookingDetailsByBookingId} from "../api/BookingDetailApi.js";

const initialState = {
  bookingDetails: null,
  bookingDetail: null,
  totalPages: null,
  loading: false,
  success: false,
  error: null,
};

export const getAllBookingDetailsByBookingId = createAsyncThunk("bookingDetails/byBookingId", async (bookingId) => {
  try {
    const response = await findAllBookingDetailsByBookingId(bookingId);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const handlePending = (state) => {
  state.success = false;
  state.loading = true;
  state.error = false;
}, handleRejected = (state, action) => {
  state.success = false;
  state.loading = false;
  state.bookings = action.payload;
  state.error = action.error;
}, handleFulfilled = (state, action) => {
  state.success = true;
  state.loading = false;
  if (action.payload && action.payload.data) {
    state.bookingDetails = action.payload.data;
    state.bookingDetail = action.payload;
    state.totalPages = action.payload.data.totalPages;
    console.log(action.payload)
  } else {
    state.bookingDetails = null;
    state.bookingDetail = null;
    state.totalPages = null;
  }
  state.error = false;
};

export const BookingDetailSlice = createSlice({
  name: "BookingDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookingDetailsByBookingId.pending, handlePending)
      .addCase(getAllBookingDetailsByBookingId.rejected, handleRejected)
      .addCase(getAllBookingDetailsByBookingId.fulfilled, handleFulfilled);
  },
});

export default BookingDetailSlice.reducer;
