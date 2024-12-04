import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    showAllTicket,
    showAllTicketByCustomerId,
    showAllTicketFinished,
    showAllTicketUpcoming,
    showTicketByEventId,
    showTicketById,
    showTicketByTimeId,
    updateStatusFail,
    updateStatusSuccess
} from "../api/TicketApi";

const initialState = {
    tickets: [],
    ticket: null,
    ticketsByStatus: [],
    ticketsByCustomerId: null,
    ticketForTime: null,
    ticketWebSocketForTime: null,
    ticketIsBeingSelected: [{ticketCode: "5411-7755-1545"}, {ticketCode: "2489-6202-7687"}],
    loading: false,
    success: false,
    error: null,
};


export const getTicketsByStatusFinished = createAsyncThunk(
    "tickets/showAllTicketFinished",
    async (data) => {
        const response = await showAllTicketFinished(data);
        return response.data;
    }
);
export const getTicketsByCustomerId = createAsyncThunk(
    "tickets/showAllTicketByCustomerId",
    async (customerId) => {
        const response = await showAllTicketByCustomerId(customerId);
        return response.data;
    }
);
export const getTicketsByStatusUpcoming = createAsyncThunk(
    "tickets/showAllTicketUpcoming",
    async data => {
        const response = await showAllTicketUpcoming(data);
        return response.data;
    }
);
export const getTickets = createAsyncThunk(
    "tickets/showAllTicket",
    async () => {
        const response = await showAllTicket();
        return response.data;
    }
);
export const getTicketById = createAsyncThunk(
    "tickets/showTicketById",
    async (id) => {
        const response = await showTicketById(id);
        return response.data;
    }
);
export const getTicketByEventId = createAsyncThunk(
    "tickets/showTicketByEventId",
    async (eventId) => {
        const response = await showTicketByEventId(eventId);
        return response.data;
    }
);
export const getTicketByTimeId = createAsyncThunk(
    "tickets/showTicketByTimeId",
    async (timeId) => {
        const response = await showTicketByTimeId(timeId);
        return response.data;
    }
);

export const updateStatusTicketSuccess = createAsyncThunk(
        "tickets/updateStatusTicket",
        async (selectedSeats) => {
            const response = await updateStatusSuccess(selectedSeats);
            return response.data;
        }
    )
;

export const updateStatusTicketFail = createAsyncThunk(
        "tickets/updateStatusTicketFail",
        async (selectedSeats) => {
            const response = await updateStatusFail(selectedSeats);
            return response.data;
        }
    )
;
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


export const TicketSlice = createSlice({
    name: "ticket",
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
            .addCase(getTicketsByStatusFinished.pending, handlePending)
            .addCase(getTicketsByStatusFinished.rejected, handleRejected)
            .addCase(getTicketsByStatusFinished.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.ticketsByCustomerId = action.payload;
                state.error = false;
            })

            .addCase(getTicketsByStatusUpcoming.pending, handlePending)
            .addCase(getTicketsByStatusUpcoming.rejected, handleRejected)
            .addCase(getTicketsByStatusUpcoming.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.ticketsByCustomerId = action.payload;
                state.error = false;
            })

            .addCase(getTicketsByCustomerId.pending, handlePending)
            .addCase(getTicketsByCustomerId.rejected, handleRejected)
            .addCase(getTicketsByCustomerId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.ticketsByCustomerId = action.payload;
                state.error = false;
            })

            .addCase(getTickets.pending, handlePending)
            .addCase(getTickets.rejected, handleRejected)
            .addCase(getTickets.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.tickets = action.payload;
                state.error = false;
            })

            .addCase(getTicketById.pending, handlePending)
            .addCase(getTicketById.rejected, handleRejected)
            .addCase(getTicketById.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.ticket = action.payload;
                state.error = false;
            })

            .addCase(getTicketByEventId.pending, handlePending)
            .addCase(getTicketByEventId.rejected, handleRejected)
            .addCase(getTicketByEventId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.ticketForEvent = action.payload;
                state.error = false;
            })

            .addCase(getTicketByTimeId.pending, handlePending)
            .addCase(getTicketByTimeId.rejected, handleRejected)
            .addCase(getTicketByTimeId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.ticketForTime = action.payload;
                state.error = false;
            })


            .addCase(updateStatusTicketSuccess.pending, handlePending)
            .addCase(updateStatusTicketSuccess.rejected, handleRejected)
            .addCase(updateStatusTicketSuccess.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.tickets = action.payload;
                state.error = false;
            })

            .addCase(updateStatusTicketFail.pending, handlePending)
            .addCase(updateStatusTicketFail.rejected, handleRejected)
            .addCase(updateStatusTicketFail.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.tickets = action.payload;
                state.error = false;
            })
    }
});
export const {setLoading, setError, setSuccess} = TicketSlice.actions;

export const selectLoading = (state) => state.ticket.loading;
export const selectError = (state) => state.ticket.error;
export const selectShowTicket = (state) => state.ticket.tickets;
export const selectShowTicketByTimeId = (state) => state.ticket.ticketForTime;
export const selectShowTicketWebSocketByTimeId = (state) => state.ticket.ticketWebSocketForTime;
export const selectShowTicketByEventId = (state) => state.ticket.ticketForEvent;
export const selectShowTicketByCustomerId = (state) => state.ticket.ticketsByCustomerId;
export const selectShowTicketIsBeingSelected = (state) => state.ticket.ticketIsBeingSelected;
export default TicketSlice.reducer;
