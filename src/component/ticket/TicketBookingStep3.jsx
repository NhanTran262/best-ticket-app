import img from "../../assets/img/cover-event.jpg"
import {FaFacebookF} from "react-icons/fa";
import {CiCalendarDate} from "react-icons/ci";
import {useDispatch, useSelector} from "react-redux";
import {selectInfoUser} from "../../features/UserFormInTicketBookingSlice.js";
import {createBookingForTicket, selectBookingCreate} from "../../features/BookingSlice.js";
import {useEffect, useState} from "react";
import {selectEventById} from "../../features/EventSlice.js";
import {selectShowTimeByEventId} from "../../features/TimeSlice.js";
import {useParams} from "react-router-dom";
import Ticket from "./Ticket.jsx";
import {useFormatDateFull} from "../../ultility/customHook/useFormatDateFull.js";
import {selectUserLogin} from "../../features/user/AuthSlice.js";

export const TicketBookingStep3 = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const seatTickets = useSelector(state => state.seat)
    console.log(seatTickets)
    const user = useSelector(selectUserLogin);
    const infoUserInput = useSelector(selectInfoUser);
    const event = useSelector(selectEventById);
    const times = useSelector(selectShowTimeByEventId);
    const bookingCreate = useSelector(selectBookingCreate)
    const selectedTime = times.data.content.find((time) => time.id === param.param);
    const seatList = seatTickets.seats.join(", ");
    const ticketCodeList = seatTickets.ticketCodes.join(", ");
    const seatPriceList = seatTickets.price.join(", ");
    const [dataSendMail, setDataSendMail] = useState({});
    localStorage.removeItem("eventById")
    localStorage.removeItem("times")
    sessionStorage.removeItem("time")

    const bookings = {
        infoUserInput: infoUserInput,
        seatTickets: seatTickets,
        infoUser: user
    }
    useEffect(() => {
        dispatch(createBookingForTicket(bookings))
    }, []);

    useEffect(() => {
        if (bookingCreate !== null) {
            const newDataSendMail = {
                bookingId: bookingCreate.data.id,
                eventName: event.name,
                time: useFormatDateFull(selectedTime.time),
                nameUser: infoUserInput.name,
                emailUser: infoUserInput.email,
                timeBooking: useFormatDateFull(bookingCreate.data.createdAt),
                paymentMethod: infoUserInput.paymentMethod,
                seat: seatList,
                price: seatPriceList,
                totalPrice: seatTickets.totalPrice,
                ticketCode: ticketCodeList,
            };
            setDataSendMail(newDataSendMail);

            // emailjs.send('service_rgh3yss', 'template_tc83two', newDataSendMail, 'bC7itDNp2khTY1SsL')
            //     .then(function (response) {
            //         console.log('SUCCESS!', response.status, response.text);
            //     }, function (error) {
            //         console.log('FAILED...', error);
            //     });
        }

    }, [bookingCreate])
    console.log(dataSendMail)
    return (
        <>
            <div className=" mx-56">
                <h1 className="text-center font-bold text-3xl my-4">Đặt vé thành công</h1>
                <img src={img} alt="cover-event"/>
                <p className="text-center my-4">Cảm ơn bạn đã đặt vé tại TicketBox.vn</p>
                <div className="text-center text-white">
                    <a className="inline-block p-4 bg-[#3D5A99] mr-3" href="#"><FaFacebookF/>
                    </a>
                    <a className="inline-block p-4 bg-[#90BA3E]" href="#"><CiCalendarDate/>

                    </a>

                </div>

                {(dataSendMail && <Ticket dataSendMail={dataSendMail}/>)}
            </div>
        </>
    )
}
