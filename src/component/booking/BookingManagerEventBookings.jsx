import BookingManagerOrderTable from "./BookingManagerOrderTable.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getEventById, selectEventById} from "../../features/EventSlice.js";
import BookingManagerTicketTable from "./BookingManagerTicketTable.jsx";
import UserFooter from "../footer/UserFooter.jsx"
import {selectShowTimeByEventId} from "../../features/TimeSlice.js";

export function BookingManagerEventBookings() {
    const dispatch = useDispatch();
    const event = useSelector(selectEventById);
    const eventId = useParams().eventId;
    const times = useSelector(selectShowTimeByEventId);
    const [sortByDate, setSortByDate] = useState('empty');
    const [sortByMonth, setSortByMonth] = useState('empty');
    const [activeTab, setActiveTab] = useState("orders");

    useEffect(() => {
        dispatch(getEventById(eventId))
    }, [dispatch, eventId]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    let sortedTimes = [];
    if (times && times.data) {
        sortedTimes = [...times.data.content].sort((a, b) => a.time - b.time);
    }

    const monthOptions = sortedTimes
        .slice()
        .sort((a, b) => {
            const dateA = new Date(a.time);
            const dateB = new Date(b.time);
            return dateA - dateB;
        })
        .map((time) => {
            const date = new Date(time.time);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedMonth = `${month}/${year}`;

            return (<option key={time.id} value={time.time}>
                {formattedMonth}
            </option>);
        });

    const filteredTimes = sortedTimes.filter((time) => time.time === sortByMonth);

    const dateOptions = filteredTimes
        .sort((a, b) => {
            const dateA = new Date(a.time);
            const dateB = new Date(b.time);
            return dateA - dateB;
        })
        .map((time) => {
            const date = new Date(time.time);
            const options = {
                weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            };
            const formattedDate = date.toLocaleString('vi-VI', options).replace(',', '');

            return (<option key={time.id} value={time.time}>
                {formattedDate}
            </option>);
        });

    const handleMonthOptionChange = (selectedSortByMonth) => {
        setSortByMonth(selectedSortByMonth);
    };

    const handleDateOptionChange = (selectedSortByDate) => {
        setSortByDate(selectedSortByDate);
    };

    return (times ? (<>
        <div className="w-full bg-white">
            <div className="w-[80%] mx-[10%] my-[5%] text-black">
                <div className="w-[80%] text-2xl">{event !== null ? event.name : <div>Loading...</div>}</div>
                <div className="w-[80%]">{event !== null ? event.duration : <div>Loading...</div>}</div>
                <hr className="my-5 border-0.5px border-black"/>
                <div className="bg-[#F1F1F1] flex text-lg rounded">
                    <div className="py-2 px-10 ">Hiển thị trong</div>
                    <div className="py-2 pl-[25%]">
                        <select className="bg-white px-20 rounded" value={sortByMonth}
                                onChange={(e) => handleMonthOptionChange(e.target.value)}>
                            <option value="empty">--Chọn tháng--</option>
                            {monthOptions}
                        </select>
                    </div>
                    <div className="px-2 py-2">
                        <select className="px-10 bg-white rounded" value={sortByDate}
                                onChange={(e) => handleDateOptionChange(e.target.value)}>
                            <option value="empty">--Vui lòng chọn ngày--</option>
                            {dateOptions}
                        </select>
                    </div>
                </div>
                {sortByMonth !== "empty" && sortByDate !== "empty" ? (<>
                        <div className="my-6">
                            <button
                                className={`${activeTab === "orders" ? "bg-black" : "bg-gray-400"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2`}
                                onClick={() => handleTabClick("orders")}
                            >
                                Đơn hàng
                            </button>
                            <button
                                className={`${activeTab === "tickets" ? "bg-black" : "bg-gray-400"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                                onClick={() => handleTabClick("tickets")}
                            >
                                Vé
                            </button>
                        </div>
                        {activeTab === "empty" ? <div></div> : (activeTab === "orders" ?
                            <BookingManagerOrderTable timeOfEvent={sortByDate}/> :
                            <BookingManagerTicketTable timeOfEvent={sortByDate}/>)}
                    </>) : <div></div>}
            </div>
            {sortByDate === 'empty' || sortByMonth === 'empty' ? <div className="pt-[12%]">
                <UserFooter/>
            </div> : <div><UserFooter/></div>}
        </div>
    </>) : (<div>Loading...</div>));
}