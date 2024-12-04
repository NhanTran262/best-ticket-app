import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {showBookingDetail, showBookings, showEvents, showTickets, showUsers} from "../api/AdminApi.js";

const initialState = {
  bookings: null,
  booking: null,
  totalPagesOfBooking: null,
  totalElementsOfBooking: null,
  tickets: null,
  totalPagesOfTicket: null,
  totalElementsOfTicket: null,
  users: null,
  user: null,
  totalPagesOfUser: null,
  totalElementsOfUser: null,
  events: null,
  event: null,
  totalPagesOfEvent: null,
  totalElementsOfEvent: null,
  getPageUsersSuccess: false,
  getPageBookingsSuccess: false,
  getPageEventsSuccess: false,
  getPageTicketsSuccess: false,
  loading: true,
  error: false,
};

export const getPageBookings = createAsyncThunk(
  "getBookings",
  async (keyword,
         {rejectWithValue}
  ) => {
    const response = await showBookings(keyword);
    if (response.status !== 200) {
      return rejectWithValue(response);
    }
    return response.data;
  }
)
export const getBookingDetails = createAsyncThunk(
  "getBookingsDetail",
  async (id,
         {rejectWithValue}
  ) => {
    const response = await showBookingDetail(id);
    if (response.status !== 200) {
      return rejectWithValue(response);
    }
    return response.data.data;
  }
)

export const getPageTickets = createAsyncThunk(
  "getTickets",
  async (keyword, {rejectWithValue}) => {
    const response = await showTickets(keyword);
    if (response.status !== 200) {
      return rejectWithValue(response.data.message);
    }
    console.log(response)
    return response.data;
  }
)

export const getPageUsers = createAsyncThunk(
  "getUsers",
  async (keyword, {rejectWithValue}) => {
    const response = await showUsers(keyword);
    if (response.status !== 200) {
      return rejectWithValue(response.data.message);
    }
    return response.data;
  }
)
export const getPageEvents = createAsyncThunk(
  "getEvents",
  async (keyword, {rejectWithValue}) => {
    const response = await showEvents(keyword);
    if (response.status !== 200) {
      return rejectWithValue(response.data.message);
    }
    console.log(response)
    return response.data;
  }
)

export const adminSlice = createSlice(
  {
    name: "admin",
    initialState,
    reducers: {
      setBookings: (state, action) => {
        state.bookings = action.payload;
      },
      setTickets: (state, action) => {
        state.tickets = action.payload;
      },
      setUsers: (state, action) => {
        state.users = action.payload;
      },
      setEvents: (state, action) => {
        state.events = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPageBookings.pending, (state) => {
          state.getPageBookingsSuccess = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(getPageBookings.rejected, (state, action) => {
          state.getPageBookingsSuccess = false;
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getPageBookings.fulfilled, (state, action) => {
          state.getPageBookingsSuccess = true;
          state.loading = false;
          state.totalPagesOfBooking = action.payload.data.totalPages
          state.totalElementsOfBooking = action.payload.data.totalElements
          state.bookings = action.payload.data.content;
          state.error = false;
        })
        .addCase(getBookingDetails.pending, (state) => {
          state.getPageBookingsSuccess = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(getBookingDetails.rejected, (state, action) => {
          state.getPageBookingsSuccess = false;
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getBookingDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.booking = action.payload.content;
          state.error = false;
        })
        .addCase(getPageTickets.pending, (state) => {
          state.getPageTicketsSuccess = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(getPageTickets.rejected, (state, action) => {
          state.getPageTicketsSuccess = false;
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getPageTickets.fulfilled, (state, action) => {
          state.getPageTicketsSuccess = true;
          state.loading = false;
          state.tickets = action.payload.data.data.content;
          state.totalPagesOfTicket = action.payload.data.data.totalPages;
          state.totalElementsOfTicket = action.payload.data.data.totalElements;
          state.error = false;
        })
        .addCase(getPageUsers.pending, (state) => {
          state.getPageUsersSuccess = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(getPageUsers.rejected, (state, action) => {
          state.getPageUsersSuccess = false;
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getPageUsers.fulfilled, (state, action) => {
          state.getPageUsersSuccess = true;
          state.loading = false;
          state.users = action.payload.data.content;
          state.totalPagesOfUser = action.payload.data.totalPages
          state.totalElementsOfUser = action.payload.data.totalElements
          state.error = false;
        })
        .addCase(getPageEvents.pending, (state) => {
          state.getPageEventsSuccess = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(getPageEvents.rejected, (state, action) => {
          state.getPageEventsSuccess = false;
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getPageEvents.fulfilled, (state, action) => {
          state.getPageEventsSuccess = true;
          state.loading = false;
          state.events = action.payload.data.content;
          state.totalPagesOfEvent = action.payload.data.totalPages;
          state.totalElementsOfEvent = action.payload.data.totalElements;
          state.error = false;
        })
    }
  }
)

export const {
  setBookings,
  setTickets,
  setUsers,
  setEvents

} = adminSlice.actions;
export const selectBookings = (state) => state.admin.bookings;
export const selectTickets = (state) => state.admin.tickets;
export const selectUsers = (state) => state.admin.users;
export const selectEvents = (state) => state.admin.events;
export const selectBooking = (state) => state.admin.booking;
export const selectTicket = (state) => state.admin.ticket;
export const selectUser = (state) => state.admin.user;
export const selectEvent = (state) => state.admin.event;
export const selectBookingsSuccess = (state) => state.admin.getPageBookingsSuccess;
export const selectUsersSuccess = (state) => state.admin.getPageUsersSuccess;
export const selectEventsSuccess = (state) => state.admin.getPageEventsSuccess;
export const selectTicketsSuccess = (state) => state.admin.getPageTicketsSuccess;
export const selectTotalElementsOfBooking = (state) => state.admin.totalElementsOfBooking;
export const selectTotalElementsOfEvent = (state) => state.admin.totalElementsOfEvent;
export const selectTotalElementsOfTicket = (state) => state.admin.totalElementsOfTicket;
export const selectTotalElementsOfUser = (state) => state.admin.totalElementsOfUser;
export const selectTotalPageOfBooking = (state) => state.admin.totalPagesOfBooking;
export const selectTotalPageOfUser = (state) => state.admin.totalPagesOfUser;
export const selectTotalPageOfEvent = (state) => state.admin.totalPagesOfEvent;
export const selectTotalPageOfTicket = (state) => state.admin.totalPagesOfTicket;


export default adminSlice.reducer;
