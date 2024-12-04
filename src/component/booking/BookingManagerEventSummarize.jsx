import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from 'react';
import {getEventById, selectEventById} from "../../features/EventSlice.js";
import UserFooter from "../footer/UserFooter.jsx"
import {SlLocationPin} from "react-icons/sl";
import logo from "../../assets/img/logo/logo-auth-header-light.svg";
import {useFormatCurrency} from "../../ultility/customHook/useFormatCurrency.js";
import Chart from 'chart.js/auto';
import {FaCheck, FaRegQuestionCircle} from "react-icons/fa";
import {HiMiniXMark} from "react-icons/hi2";
import {getTicketByEventId, selectShowTicketByEventId} from "../../features/TicketSlice.js";
import {getTimeByEventId, selectShowTimeByEventId} from "../../features/TimeSlice.js";

const BookingManagerEventSummarize = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const event = useSelector(selectEventById);
    const times = useSelector(selectShowTimeByEventId);
    const eventId = useParams().eventId;
    const {formatCurrency} = useFormatCurrency();
    const chartContainerRef = useRef(null);
    const tickets = useSelector(selectShowTicketByEventId);
    const [totalAmount, setTotalAmount] = useState(0);
    const [soldTicketsCount, setSoldTicketsCount] = useState(0);
    const [soldTicketsTotalAmount, setSoldTicketsTotalAmount] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [canceledTicketsCount, setCanceledTicketsCount] = useState(0);
    const [expiredTicketsCount, setExpiredTicketsCount] = useState(0);
    const [sortByDate, setSortByDate] = useState('empty');
    const [sortByMonth, setSortByMonth] = useState('empty');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        dispatch(getEventById(eventId));
    }, [dispatch, eventId, navigate]);

    useEffect(() => {
        dispatch(getTimeByEventId(eventId));
    }, [dispatch, eventId, navigate]);

    useEffect(() => {
        dispatch(getTicketByEventId(eventId));
    }, [dispatch, eventId]);

    const handleStartDateChange = (selectedStartDate) => {
        setStartDate(selectedStartDate);
        console.log(startDate)
    };

    const handleEndDateChange = (selectedEndDate) => {
        setEndDate(selectedEndDate);
        console.log(endDate)
    };

    useEffect(() => {
        if (event && startDate && endDate) {
            const filteredDates = dateOptions.filter((option) => {
                const formattedDate = option.props.children;
                const [day, month] = formattedDate.split('/');
                const date = new Date();
                date.setFullYear(new Date().getFullYear(), Number(month) - 1, Number(day));
                return date >= new Date(startDate) && date <= new Date(endDate);
            });

            const labels = filteredDates.map((option) => option.props.children);

            const chartData = {
                labels: labels, datasets: [{
                    label: 'Revenue', data: [50, 100, 200, 300, 400], borderColor: 'green', fill: false,
                },],
            };

            const chartOptions = {
                responsive: true, maintainAspectRatio: false, scales: {
                    x: {
                        display: true,
                    }, y: {
                        display: true, beginAtZero: true, suggestedMax: 100,
                    },
                },
            };

            const chartConfig = {
                type: 'line', data: chartData, options: chartOptions,
            };

            const lineChart = new Chart(chartContainerRef.current, chartConfig);

            return () => {
                lineChart.destroy();
            };
        }
    }, [endDate, event, startDate]);

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
            const formattedDate = `${month}/${year}`;

            return (
                <option key={time.id} value={time.time}>
                    {formattedDate}
                </option>
            );
        });

    const filteredTimes = sortedTimes.filter((time) => time.time === sortByMonth);

    const dateOptions = filteredTimes
        .slice()
        .sort((a, b) => {
            const dateA = new Date(a.time);
            const dateB = new Date(b.time);
            return dateA - dateB;
        })
        .map((time) => {
            const date = new Date(time.time);
            const options = {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const formattedDate = date.toLocaleString('en-US', options).replace(',', '');

            return (
                <option key={time.id} value={time.time}>
                    {formattedDate}
                </option>
            );
        });

    const handleMonthOptionChange = (selectedSortByMonth) => {
        setSortByMonth(selectedSortByMonth);
    };

    const handleDateOptionChange = (selectedSortByDate) => {
        setSortByDate(selectedSortByDate);
    };

    let ticketTypeList = [];
    if (tickets && tickets.data) {
        const ticketTypeSet = new Set();
        ticketTypeList = tickets.data.reduce((types, ticket) => {
            if (!ticketTypeSet.has(ticket.ticketType.id)) {
                ticketTypeSet.add(ticket.ticketType.id);
                types.push(ticket.ticketType);
            }
            return types;
        }, []);
    }

    useEffect(() => {
        if (tickets && tickets.data) {
            let calculatedSoldTicketsTotalAmount = 0;
            let countForSoldTickets = 0;
            let countForCanceledTickets = 0;
            let countForExpiredTickets = 0;
            tickets.data.forEach((ticket) => {
                let ticketTime = sortByDate;
                if (ticket.event.id === event.id) {
                    if (
                        ticket.status === "Success" &&
                        ticket.time.time === ticketTime &&
                        (ticket.bookingDetail !== "")
                    ) {
                        countForSoldTickets += 1;
                        calculatedSoldTicketsTotalAmount += ticket.ticketType.price;
                    } else if (ticket.status === "Canceled" && ticket.time.time === ticketTime) {
                        countForCanceledTickets += 1;
                    } else if (ticket.time.time === ticketTime) {
                        countForExpiredTickets += 1;
                    }
                }
            });
            setSoldTicketsCount(countForSoldTickets);
            setSoldTicketsTotalAmount(calculatedSoldTicketsTotalAmount);
            setServiceFee(8.8 / 100 + 15000 * countForSoldTickets);
            setTotalAmount(calculatedSoldTicketsTotalAmount - (8.8 / 100 + 15000 * countForSoldTickets));
            setCanceledTicketsCount(countForCanceledTickets);
            setExpiredTicketsCount(countForExpiredTickets);
        }
    }, [event.id, filteredTimes, serviceFee, sortByDate, tickets]);

    let countForSoldTicketsByTicketType = 0;
    let countForProcessedTicketsByTicketType = 0;
    let countForSoldTicketsByAllTicketType = 0;
    let countForProcessedTicketsByAllTicketType = 0;

    return (<>
        <div className="mt-16 mb-10 mx-[10%] border border-gray-300 rounded-xl text-black">
            <div className="flex">
                <div className="w-1/6 m-10 pl-5">
                    <div className="flex items-center gap-3 font-semibold dark:text-white">
                        <img src={logo} alt=""
                             className="h-[100px] w-[100px] m-0 cursor-pointer  "
                             onClick={() => navigate("/")}/>
                    </div>
                </div>
                <div className="w-3/6 my-14">
                    <div className="text-xl pb-2">{event.name}</div>
                    <div className="flex">
                        <div className="pr-1"><SlLocationPin/></div>
                        <div>{event.location.address}, {event.location.district}, {event.location.province} </div>
                    </div>
                </div>
                <div className="m-14 pl-24">
                    <button className="border bg-gray-200" onClick={() => {
                        navigate(`/checkin-app`)
                    }}>
                        <div className="m-2">Check-in</div>
                    </button>
                </div>
            </div>
            <div className="bg-[#F1F1F1] mb-5 mx-16 flex">
                <div className="p-2">Hiển thị</div>
                <div className="py-2">
                    <select className="bg-white" value={sortByMonth}
                            onChange={(e) => handleMonthOptionChange(e.target.value)}>
                        <option value="empty">--Chọn tháng--</option>
                        {monthOptions}
                    </select>
                </div>
                <div className="px-2 py-2">
                    <select className="bg-white" value={sortByDate}
                            onChange={(e) => handleDateOptionChange(e.target.value)}>
                        <option value="empty">--Vui lòng chọn ngày--</option>
                        {dateOptions}
                    </select>
                </div>
            </div>
        </div>
        <div className="mb-10 mx-[10%] bg-[#F1F1F1] border rounded-lg text-black">
            <div className="flex">
                <div className="p-5 text-xl w-1/2">Tổng thu nhập</div>
                <div
                    className="p-5 text-xl text-green-400 w-1/ font-bold">{formatCurrency(totalAmount)}</div>
            </div>
            <div className="flex">
                <div className="py-5 pl-12 text-xl w-1/2">Vé đã thanh toán</div>
                <div
                    className="p-5 text-xl w-1/2">{formatCurrency(soldTicketsTotalAmount)}</div>
            </div>
            <div className="flex">
                <div className="py-5 pl-12 text-xl w-1/2">Mức phí</div>
                <div className="p-5 text-xl w-1/2">
                    8,8% + 15.000 VND / vé
                </div>
            </div>
            <div className="flex">
                <div className="py-5 pl-12 text-xl w-1/2">Phí dịch vụ</div>
                <div className="p-5 text-xl w-1/2">{formatCurrency(serviceFee)}</div>
            </div>
        </div>
        <div className="bg-[#F1F1F1] mb-10 mx-[10%] flex text-black border rounded-lg">
            <div className="my-3 p-2 font-bold">Từ</div>
            <div className="my-3 py-2">
                <input type="date" className="bg-gray-500 rounded" value={startDate}
                       onChange={(e) => handleStartDateChange(e.target.value)}/>
            </div>
            <div className="my-3 py-2 pl-2 font-bold">Đến</div>
            <div className="my-3 px-2 py-2">
                <input type="date" className="bg-gray-500 rounded" value={endDate}
                       onChange={(e) => handleEndDateChange(e.target.value)}/>
            </div>
            <button className="bg-[#ADD260] border m-3 shadow-lg shadow-[#829E48] rounded-lg">
                <div className="px-5 text-white">Chọn</div>
            </button>
        </div>
        <div className="justify-center flex text-white font-bold mb-10">
            <div className="border rounded-lg bg-[#A1DA79] flex">
                <div className="my-4 pl-5 text-3xl"><FaCheck/></div>
                <div>
                    <div className="mx-3 mt-2">{soldTicketsCount}</div>
                    <div className="mx-3 mb-2">Đã thanh toán</div>
                </div>
            </div>
            <div className="mx-5 border rounded-lg bg-[#FD6161] flex">
                <div className="my-2 pl-3 text-5xl"><HiMiniXMark/></div>
                <div>
                    <div className="mx-3 mt-2">{canceledTicketsCount}</div>
                    <div className="mx-3 mb-2">Đã hủy</div>
                </div>
            </div>
            <div className="border rounded-lg bg-[#F7B31F] flex">
                <div className="my-2 pl-3 text-5xl"><HiMiniXMark/></div>
                <div>
                    <div className="mx-3 mt-2">{expiredTicketsCount}</div>
                    <div className="mx-3 mb-2">Hết hạn</div>
                </div>
            </div>
        </div>
        <div className="mx-[10%]">
            <div className="font-bold text-black">Thống kê vé</div>
            <table className="w-full">
                <thead className="text-white">
                <tr>
                    <th className="bg-[#78C47F] border border-white">
                        <input
                            type="checkbox"
                            name="toggleAll"
                            className="bg-white"
                        />
                    </th>
                    <th className="bg-[#78C47F] border border-white">
                        <div className="m-5">Loại vé</div>
                    </th>
                    <th className="bg-[#78C47F] border border-white">Giá bán VND</th>
                    <th className="bg-[#78C47F] border border-white">
                        <div className="flex justify-center">
                            <div>Vé đã thanh toán</div>
                            <div className="p-1"><FaRegQuestionCircle/></div>
                        </div>
                    </th>
                    <th className="bg-[#78C47F] border border-white">
                        <div className="flex justify-center">
                            <div>Vé đã xử lý</div>
                            <div className="p-1"><FaRegQuestionCircle/></div>
                        </div>
                    </th>
                    <th className="bg-[#78C47F] border border-white">Tổng số vé</th>
                </tr>
                </thead>
                <tbody className="text-right text-black">
                {ticketTypeList !== [] ? (ticketTypeList.map((ticketType) => {
                    countForSoldTicketsByTicketType = 0;
                    countForProcessedTicketsByTicketType = 0;
                    tickets.data.forEach((ticket) => {
                        if (ticket.ticketType.name === ticketType.name && ticket.time.time === sortByDate && ticket.status === "Success") {
                            countForSoldTicketsByTicketType++;
                            countForProcessedTicketsByTicketType++;
                        }
                    });
                    countForSoldTicketsByAllTicketType += countForSoldTicketsByTicketType;
                    countForProcessedTicketsByAllTicketType += countForProcessedTicketsByTicketType;
                    return (
                        <tr key={ticketType.id}>
                            <td className="text-center">
                                <input type="checkbox" className="bg-white"/>
                            </td>
                            <td>{ticketType.name}</td>
                            <td>{ticketType.price}</td>
                            <td>{countForSoldTicketsByTicketType}</td>
                            <td>{countForProcessedTicketsByTicketType}</td>
                            <td>{countForProcessedTicketsByTicketType}</td>
                        </tr>
                    );
                })) : <div>Loading..</div>}
                <tr>
                    <td colSpan="3" className="bg-[#F2F2F2] border border-[#DFDFDF] text-left font-bold">Tổng cộng</td>
                    <td className="bg-[#F2F2F2] border border-[#DFDFDF] font-bold">{countForSoldTicketsByAllTicketType}</td>
                    <td className="bg-[#F2F2F2] border border-[#DFDFDF] font-bold">{countForProcessedTicketsByAllTicketType}</td>
                    <td className="bg-[#F2F2F2] border border-[#DFDFDF] font-bold">{countForSoldTicketsByAllTicketType}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div className="my-10 mx-[18%]">
            <div className="font-bold text-sm text-black">Ticket Sale By Date (Paid only)</div>
            <div>
                <canvas ref={chartContainerRef}/>
            </div>
        </div>
        <div className=""><UserFooter/></div>
    </>);
};

export default BookingManagerEventSummarize;