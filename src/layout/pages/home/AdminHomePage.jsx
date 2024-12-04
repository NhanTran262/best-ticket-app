import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {useDispatch, useSelector} from "react-redux";
import {
    getPageBookings, getPageEvents, getPageTickets,
    getPageUsers,
    selectTotalElementsOfBooking,
    selectTotalElementsOfEvent, selectTotalElementsOfTicket,
    selectTotalElementsOfUser
} from "../../../features/AdminSlice.js";
import {useEffect} from "react";
import {getEventByStatusIsPending} from "../../../features/EventSlice.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};
export default function AdminHomePage() {
    const dispatch = useDispatch();
    const users = useSelector(selectTotalElementsOfUser);
    const bookings = useSelector(selectTotalElementsOfBooking)
    const events = useSelector(selectTotalElementsOfEvent)
    const tickets = useSelector(selectTotalElementsOfTicket)
    console.log(events)
    const data = {
        labels: ['Users', 'Bookings', 'Events', 'Tickets'],
        datasets: [{
            label: '# of Votes',
            data: [users,bookings,events,tickets],
            borderWidth: 1
        }]
    }
    useEffect(() => {
        dispatch(getPageUsers())
        dispatch(getPageBookings())
        dispatch(getPageEvents())
        dispatch(getEventByStatusIsPending(0))
        dispatch(getPageTickets())
    }, []);


    return (
        <div className="bg-white">
            <div
                className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                    <Bar options={options} data={data} className="rounded-lg bg-gray-100"/>
            </div>
        </div>
    )
}
