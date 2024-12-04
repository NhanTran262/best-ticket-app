import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectShowTicketByTimeId, selectShowTicketIsBeingSelected} from "../../features/TicketSlice.js";
import "./Ticket.css"


function Seat({dataFormSeat}) {

    const [idSeat, setIdSeat] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ticketCodeSeats, setTicketCodeSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [priceOneTicket, setPriceOneTicket] = useState([]);
    const [nameTicketType, setNameTicketType] = useState([])
    const tickets = useSelector(selectShowTicketByTimeId);
    const ticketIsBeingSelected = useSelector(selectShowTicketIsBeingSelected);


    const handleSeatClick = (seatNumber) => {
        const selectedSeat = tickets.data.find((ticket) => ticket.seat === seatNumber);
        const idSeat = selectedSeat.id;
        const price = selectedSeat.ticketType.price;
        const seat = selectedSeat.seat;
        const ticketTypeName = selectedSeat.ticketType.name;
        const priceTicket = selectedSeat.ticketType.price;
        const ticketCode = selectedSeat.ticketCode;
        if (selectedSeat && !selectedSeats.includes(selectedSeat.seat)) {
            setIdSeat((prevIdSeat) => [...prevIdSeat, idSeat])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + parseInt(price));
            setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
            setNameTicketType((prevNameTicketType) => [...prevNameTicketType, ticketTypeName]);
            setPriceOneTicket((prevPriceOneTicket) => [...prevPriceOneTicket, priceTicket]);
            setTicketCodeSeats(prevTicketCode => [...prevTicketCode, ticketCode])
            dataFormSeat((totalPrice), [...selectedSeats, seat], [...nameTicketType], [priceOneTicket], [...ticketCodeSeats], [...idSeat]);
            event.target.style.backgroundColor = "#2E7D32";
        } else {

            setTotalPrice((prevTotalPrice) => prevTotalPrice - parseInt(price));
            setSelectedSeats(selectedSeats.filter(item => item !== seat));
            setTicketCodeSeats(ticketCodeSeats.filter(item => item !== ticketCode));
            setPriceOneTicket(priceOneTicket.filter(item => item !== priceTicket))
            setNameTicketType(nameTicketType.filter(item => item !== ticketTypeName));
            if (selectedSeat.ticketType.name === "VIP") {
                event.target.style.backgroundColor = "#FFD5CF";
            } else if (selectedSeat.ticketType.name === "THƯỜNG") {
                event.target.style.backgroundColor = "#C4F1F2";
            } else {
                event.target.style.backgroundColor = "#FDE098";
            }
        }
    };

    useEffect(() => {
        dataFormSeat(totalPrice, selectedSeats, nameTicketType, priceOneTicket, ticketCodeSeats, idSeat);
    }, [totalPrice, selectedSeats, nameTicketType, priceOneTicket, ticketCodeSeats, idSeat]);


    // Render danh sách ghế
    const renderSeats = () => {
            if (tickets !== null) {
                return tickets.data.map((ticket, index) => {
                    let classTicketIsBeingSelected, classTicketSuccess, classTicketVIP, classTicketThuong,
                        classTicketLau = '';
                    if (ticket.status === "Success") {
                        classTicketSuccess = 'ticketSuccess'
                    } else if (ticket.ticketType.name === "VIP") {
                        classTicketVIP = 'ticketVIP';
                    } else if (ticket.ticketType.name === "THƯỜNG") {
                        classTicketThuong = 'ticketThuong'
                    } else if (ticket.ticketType.name === "LẦU") {
                        classTicketLau = 'ticketLau'
                    }
                    let indexTicketIsBeingSelected = ticketIsBeingSelected.findIndex(item => item.ticketCode === ticket.ticketCode)
                    if (indexTicketIsBeingSelected !== -1) {
                        classTicketIsBeingSelected = 'ticketIsBeingSelected';
                    }
                    return <button
                        key={index}
                        className={`inline-block w-8 h-8 leading-8 text-center text-black text-xs m-2 rounded ${classTicketSuccess} ${classTicketIsBeingSelected} ${classTicketVIP} ${classTicketThuong} ${classTicketLau}`}
                        onClick={() => handleSeatClick(ticket.seat)}
                        disabled={ticket.status === "Success" || classTicketIsBeingSelected}
                    >
                        {ticket.seat}
                    </button>
                })
            }
        }
    ;

    return (
        <>
            <div className="bg-white mt-3 pt-3 overflow-y-auto">
                <h1 className="py-3 mx-auto rounded-full w-3/4 text-center font-bold text-3xl bg-[#EDEDED] ">Sân
                    khấu/Stage</h1>
                <div className="my-4 ml-3 ">
                    {renderSeats()}
                </div>
            </div>
        </>
    );
}

export default Seat;
