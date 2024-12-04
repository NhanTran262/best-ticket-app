import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getPageBookings,
    getPageEvents,
    getPageTickets,
    getPageUsers,
    selectBookingsSuccess, selectEventsSuccess,
    selectTickets,
    selectTotalPageOfBooking, selectTotalPageOfEvent,
    selectTotalPageOfTicket,
    selectTotalPageOfUser,
    selectUsersSuccess
} from "../../features/AdminSlice.js";
import {
    TABLE_HEAD_BOOKING,
    TABLE_HEAD_EVENT,
    TABLE_HEAD_EVENT_APPROVAL,
    TABLE_HEAD_TICKET,
    TABLE_HEAD_USER
} from "../../ultility/AppConstant.js";
import TableContent from "./TableContent.jsx";
import Pagination from '@mui/material/Pagination';
import {getEventByStatusIsPending} from "../../features/EventSlice.js";


export default function AdminTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const param = useParams();
    const dispatch = useDispatch();
    const [dataHeader, setDataHeader] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    const totalPagesOfBookings = useSelector(selectTotalPageOfBooking);
    const totalPageOfUser = useSelector(selectTotalPageOfUser)
    const totalPageOfTicket = useSelector(selectTotalPageOfTicket)
    const totalPageOfEvent = useSelector(selectTotalPageOfEvent)
    const [totalPages, setTotalPages] = useState(0);
    const selectUserSuccess = useSelector(selectUsersSuccess);
    const selectBookingSuccess = useSelector(selectBookingsSuccess)
    const selectTicketSuccess = useSelector(selectTickets)
    const selectEventSuccess = useSelector(selectEventsSuccess)
    const ref = useRef();
    useEffect(() => {
        setTotalPages(totalPageOfUser)
    }, [selectUserSuccess]);
    useEffect(() => {
        setTotalPages(totalPagesOfBookings)
    }, [selectBookingSuccess]);
    useEffect(() => {
        setTotalPages(totalPageOfTicket)

    }, [selectTicketSuccess]);
    useEffect(() => {
        setTotalPages(totalPageOfEvent)
    }, [selectEventSuccess]);
    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (
            localStorage.theme === 'dark'
            || (!('theme' in localStorage)
                && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme]);
    useEffect(() => {
        if (param.param === "users") {
            dispatch(getPageUsers())
            setDataHeader(TABLE_HEAD_USER);
        } else if (param.param === "bookings") {
            dispatch(getPageBookings())
            setDataHeader(TABLE_HEAD_BOOKING)
        } else if (param.param === "events") {
            dispatch(getPageEvents())
            setDataHeader(TABLE_HEAD_EVENT)
        } else if (param.param === "event-approval") {
            dispatch(getEventByStatusIsPending(0))
            setDataHeader(TABLE_HEAD_EVENT_APPROVAL)
        } else if (param.param === "tickets") {
            dispatch(getPageTickets())
            setDataHeader(TABLE_HEAD_TICKET)
        }
    }, [param]);
    useEffect(() => {
        if (param.param === "bookings") {
            dispatch(getPageBookings(currentPage - 1));
        } else if (param.param === "users") {
            dispatch(getPageUsers(currentPage - 1))
        } else if (param.param === "eventApproval") {
            dispatch(getPageUsers(currentPage - 1))
        } else if (param.param === "tickets") {
            dispatch(getPageTickets(currentPage - 1))
        }
    }, [currentPage]);

    async function handleSearch(e) {
        e.preventDefault()
        const keyword = ref.current.value;
        console.log(keyword)
    }

    return (
        <>
            <div className="flex-col items-center justify-center justify-items-center ">
                <div className="flex justify-center mt-3 ">
                    <div className="uppercase font-bold text-3xl">{param.param}</div>
                </div>
                <form className="flex  items-center justify-center mt-3" onSubmit={handleSearch}>
                    <input id="search" type="text" placeholder="Search" ref={ref}
                           className="input input-sm input-bordered input-primary w-full max-w-xs"/>
                </form>
                <div className="flex justify-center mt-3 px-20">
                    <table className="table-fixed  table-zebra-zebra rounded-full w-full ">
                        <thead className="bg-amber-500
                        dark:text-white dark:bg-black">
                        <tr>
                            {param.param !== "eventApproval" ? (
                                <>
                                    {dataHeader.map((data, index) => (
                                        <th scope="col" key={index}
                                            className="px-4 py-3 text-start text-xs font-bold font-sans uppercase">
                                            {data}
                                        </th>
                                    ))}
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold font-sans uppercase"></th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold font-sans uppercase"></th>
                                </>
                            ) : (
                                <>
                                    {dataHeader.map((data, index) => (
                                        <th scope="col" key={index}
                                            className="px-4 py-3 text-start text-xs font-bold font-sans uppercase">
                                            {data}
                                        </th>
                                    ))}
                                </>
                            )}
                        </tr>
                        </thead>
                        <TableContent content={param}/>

                    </table>
                </div>
                <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div>
                        <Pagination
                            count={totalPages || 0}
                            color="secondary"
                            showFirstButton
                            showLastButton
                            size="large"
                            variant="outlined"
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                        />
                    </div>
                </div>
            </div>

        </>
    );
}
