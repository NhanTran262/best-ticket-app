import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    seats : [],
    totalPrice: null,
    ticketTypes: [],
    price: [],
    ticketCodes: [],
    idSeats: []
};

export const SeatSlice = createSlice({
    name: "seat",
    initialState,
    reducers: {
        setSeats: (state, action) => {
            state.seats = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        setTicketType: (state, action) => {
            state.ticketTypes = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setTicketCode: (state, action) => {
            state.ticketCodes = action.payload;
        },
        setIdSeat: (state, action) => {
            state.idSeats = action.payload;
        },
    }
});

export const { setSeats,setTotalPrice,setTicketType,setPrice,setTicketCode,setIdSeat} = SeatSlice.actions;

export default SeatSlice.reducer;
