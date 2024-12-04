import {applyMiddleware, compose, configureStore} from "@reduxjs/toolkit";
import UserSlice from "../features/user/UserSlice.js";
import EventSlice from "../features/EventSlice.js";
import AdminSlice from "../features/AdminSlice.js";
import TicketSlice from "../features/TicketSlice.js";
import BookingSlice from "../features/BookingSlice.js";
import BookingDetailSlice from "../features/BookingDetailSlice.js";
import CustomerSlice from "../features/user/CustomerSlice.js";
import OrganizerSlice from "../features/user/OrganizerSlice.js";

import TicketTypeSlice from "../features/TicketTypeSlice.js";
import TimeSlice from "../features/TimeSlice.js";
import SeatSlice from "../features/SeatSlice.js";
import UserFormInTicketBookingSlice from "../features/UserFormInTicketBookingSlice.js";
import FileSlice from "../features/FileSlice.js";
import ExistsSlice from "../features/user/ExistsSlice.js";
import AuthSlice from "../features/user/AuthSlice.js";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore(
        {
            reducer: {
                auth: AuthSlice,
                user: UserSlice,
                event: EventSlice,
                ticket: TicketSlice,
                ticketType: TicketTypeSlice,
                time: TimeSlice,
                admin: AdminSlice,
                booking: BookingSlice,
                bookingDetail: BookingDetailSlice,
                customer: CustomerSlice,
                organizer: OrganizerSlice,
                exists: ExistsSlice,
                seat: SeatSlice,
                userForm: UserFormInTicketBookingSlice,
                file: FileSlice
            },

        },
        composeEnhancers(applyMiddleware())
    )
;
