import GuestLayout from "../layout/GuestLayout.jsx";
import UserLayout from "../layout/UserLayout.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import UserHomePage from "../layout/pages/home/UserHomePage.jsx";
import AdminHomePage from "../layout/pages/home/AdminHomePage.jsx";
import EventHomePage from "../layout/pages/event/EventHomePage.jsx";
import Login from "../component/auth/Login.jsx";
import Register from "../component/auth/Register.jsx";
import TicketHistory from "../component/ticket/TicketHistory.jsx";
import Search from "../component/event/Search.jsx";
import AdminTable from "../component/table/AdminTable.jsx";
import TicketBooking from "../component/ticket/TicketBooking.jsx";
import ForbiddenPage from "../layout/pages/errors/ForbiddenPage.jsx";
import ErrorLayout from "../layout/ErrorLayout.jsx";
import NotFoundPage from "../layout/pages/errors/NotFoundPage.jsx";
import InternalServerErrorPage from "../layout/pages/errors/InternalServerErrorPage.jsx";
import BadGatewayPage from "../layout/pages/errors/BadGatewayPage.jsx";
import ServiceUnavailablePage from "../layout/pages/errors/ServiceUnavailablePage.jsx";
import OrganizerBookingManagerLayout from "../layout/OrganizerBookingManagerLayout.jsx";
import {BookingManagerEventBookings} from "../component/booking/BookingManagerEventBookings.jsx";
import {BookingManagerModeratorList} from "../component/booking/BookingMangerModeratorList.jsx";
import OrganizerLayout from "../layout/OrganizerLayout.jsx";
import CreateEventPage from "../layout/pages/event/CreateEventPage.jsx";
import CreateEventStep1 from "../component/event/createEvent/CreateEventStep1.jsx";
import CreateEventStep2 from "../component/event/createEvent/CreateEventStep2.jsx";
import CreateEventStep3 from "../component/event/createEvent/CreateEventStep3.jsx";
import EventDetail from "../component/event/EventDetail.jsx";
import CustomerProfile from "../component/user/CustomerProfile.jsx";
import OrganizerProfile from "../component/user/OrganizerProfile.jsx";
import CreatedEvent from "../component/user/CreatedEvent.jsx";
import BookingManagerPromotion from "../component/booking/BookingManagerPromotion.jsx";
import BookingManagerEventSummarize from "../component/booking/BookingManagerEventSummarize.jsx";
import ForgotPassword from "../component/auth/ForgotPassword.jsx";
import SendCodeValidationForgotPassword from "../component/auth/SendCodeValidationForgotPassword.jsx";
import UnLockUser from "../component/auth/UnLockUser.jsx";
import UserRecovery from "../component/auth/UserRecovery.jsx";
import SendCodeValidationUnlock from "../component/auth/SendCodeValidationUnlock.jsx";

export const ROUT_DATA = [
    {path: "/login", element: Login, layout: GuestLayout},
    {path: "/register", element: Register, layout: GuestLayout},
    {path: "/code-forgot-password", element: SendCodeValidationForgotPassword, layout: GuestLayout},
    {path: "/forgot-password", element: ForgotPassword, layout: GuestLayout},
    {path: "/unlock", element: UnLockUser, layout: GuestLayout},
    {path: "/code-unlock", element: SendCodeValidationUnlock, layout: GuestLayout},
    {path: "/user-recovery", element: UserRecovery, layout: GuestLayout},
    {path: "/403", element: ForbiddenPage, layout: ErrorLayout},
    {path: "/404", element: NotFoundPage, layout: ErrorLayout},
    {path: "/500", element: InternalServerErrorPage, layout: ErrorLayout},
    {path: "/502", element: BadGatewayPage, layout: ErrorLayout},
    {path: "/503", element: ServiceUnavailablePage, layout: ErrorLayout},
    {path: "/", element: UserHomePage, layout: UserLayout},
    {path: "/event", element: EventHomePage, layout: UserLayout},
    {path: "/my-ticket/:customerId", element: TicketHistory, layout: UserLayout},
    {path: "/admin", element: AdminHomePage, layout: AdminLayout},
    {path: "/admin/user", element: AdminTable, layout: AdminLayout},
    {path: "/admin/ticket", element: AdminTable, layout: AdminLayout},
    {path: "/admin/:param", element: AdminTable, layout: AdminLayout},
    {path: "/search", element: Search, layout: UserLayout},
    {path: "/event/id/ticket-booking/id", element: TicketBooking, layout: UserLayout},
    {path: "/profile", element: CustomerProfile , layout: UserLayout},
    {path: "/my-event/legal", element: OrganizerProfile, layout: OrganizerLayout},
    {path: "/my-event/legal/createdEvent", element: CreatedEvent, layout: OrganizerLayout},
    {path: "*", element: NotFoundPage},


    {path: "/event/:id", element: EventDetail, layout: UserLayout},
    {path: "/event/:param/ticket-booking/:param", element: TicketBooking, layout: UserLayout},


    {path: "/event/:id", element: EventDetail, layout: UserLayout},
    {path: "/event/:param/ticket-booking/:param", element: TicketBooking, layout: UserLayout},


    {path: "/event/id/ticket-booking/id", element: TicketBooking, layout: UserLayout},
    {
        path: "/event/create", element: CreateEventPage, children: [
            {path: "", element: CreateEventStep1},
            {path: "step2", element: CreateEventStep2},
            {path: "step3", element: CreateEventStep3},
        ]
    },

    {
        path: "/my-event/event/:eventId/summarize",
        element: BookingManagerEventSummarize,
        layout: OrganizerBookingManagerLayout
    },
    {
        path: "/my-event/event/:eventId/RSVPs/bookings",
        element: BookingManagerEventBookings,
        layout: OrganizerBookingManagerLayout
    },
    {path: "/my-event/event/:eventId/promote", element: BookingManagerPromotion, layout: OrganizerBookingManagerLayout},
    // {path: "/my-event/event/:eventId/discount-codes", element: null, layout: OrganizerBookingManagerLayout},
    {
        path: "/my-event/event/:eventId/moderators",
        element: BookingManagerModeratorList,
        layout: OrganizerBookingManagerLayout
    },
];
