import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    createBooking,
    findAllBookings,
    findAllBookingsByEventId,
    findAllBookingsByEventIdNoPaged,
    findBookingsByTimeId,
    searchBookingByKeyword
} from "../api/BookingApi.js";

const initialState = {
    bookings: null,
    booking: null,
    message: null,
    totalPages: null,
    loading: false,
    success: false,
    error: null,
    bookingForTime: null,
    bookingCreate: null
};

export const getAllBookings = createAsyncThunk("bookings", async (currentPage, rejectWithValue) => {
    const response = await findAllBookings(currentPage);
    if (response.status !== 200) {
        return rejectWithValue(response.data)
    }
    return response.data;
});
export const getAllBookingsByEventId = createAsyncThunk("bookings/byEventId", async ({
                                                                                         eventId,
                                                                                         currentPage
                                                                                     }, rejectWithValue) => {
    const response = await findAllBookingsByEventId(eventId, currentPage);
    if (response.status !== 200) {
        return rejectWithValue(response.data)
    }
    return response.data;
});
export const getAllBookingsByEventIdNoPaged = createAsyncThunk("bookings/byEventId/list", async (eventId, rejectWithValue) => {
    const response = await findAllBookingsByEventIdNoPaged(eventId);
    if (response.status !== 200) {
        return rejectWithValue(response.data)
    }
    return response.data;
});
export const getAllBookingsByKeyword = createAsyncThunk("bookings/byEventId/byKeyword",
    async ({eventId, keyword, currentPage}, rejectWithValue) => {
        const response = await searchBookingByKeyword(eventId, keyword, currentPage);
        if (response.status !== 200) {
            return rejectWithValue(response.data)
        }
        return response.data;
    });

export const getBookingsByTimeId = createAsyncThunk("bookings/byTimeId", async (timeId) => {
    const response = await findBookingsByTimeId(timeId);
    return response.data;
});

export const createBookingForTicket = createAsyncThunk(
    "bookings/createBookingForTicket",
    async (bookings) => {
        const response = await createBooking(bookings);
        return response.data;
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
        state.bookings = action.payload.data;
        state.booking = action.payload;
        state.totalPages = action.payload.data.totalPages;
    } else {
        state.bookings = [];
        state.booking = null;
        state.totalPages = null;
    }
    state.error = false;
};

export const BookingSlice = createSlice({
    name: "Booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookings.pending, handlePending)
            .addCase(getAllBookings.rejected, handleRejected)
            .addCase(getAllBookings.fulfilled, handleFulfilled)

            .addCase(getAllBookingsByEventId.pending, handlePending)
            .addCase(getAllBookingsByEventId.rejected, handleRejected)
            .addCase(getAllBookingsByEventId.fulfilled, handleFulfilled)

            .addCase(getAllBookingsByEventIdNoPaged.pending, handlePending)
            .addCase(getAllBookingsByEventIdNoPaged.rejected, handleRejected)
            .addCase(getAllBookingsByEventIdNoPaged.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.bookingByEventIdNoPaged = action.payload.data;
            })

            .addCase(getAllBookingsByKeyword.pending, handlePending)
            .addCase(getAllBookingsByKeyword.rejected, handleRejected)
            .addCase(getAllBookingsByKeyword.fulfilled, handleFulfilled)

            .addCase(getBookingsByTimeId.pending, handlePending)
            .addCase(getBookingsByTimeId.rejected, handleRejected)
            .addCase(getBookingsByTimeId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.bookingForTime = action.payload.data;
            })

            .addCase(createBookingForTicket.pending, handlePending)
            .addCase(createBookingForTicket.rejected, handleRejected)
            .addCase(createBookingForTicket.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.bookingCreate = action.payload;
            })
    }
});
export const selectAllBookingsByEventId = (state) => state.booking.bookings;
export const selectAllBookingsByEventIdNoPaged = (state) => state.booking.bookingByEventIdNoPaged;
export const selectBookingsByTimeId = (state) => state.booking.bookingForTime;
export const selectBookingCreate = (state) => state.booking.bookingCreate;
export const selectAllBookingsByKeyword = (state) => state.booking.bookings;

export default BookingSlice.reducer;
