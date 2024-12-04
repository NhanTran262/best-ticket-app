import {CiClock2, CiLocationOn} from "react-icons/ci";
import React, {useEffect, useState} from "react";
import JsBarcode from "jsbarcode";
import {Document, Page, Text} from "@react-pdf/renderer";
import {useFormatDateFull} from "../../ultility/customHook/useFormatDateFull.js";
import {useFormatCurrency} from "../../ultility/customHook/useFormatCurrency.js";

const Ticket = (props) => {
    const [listTicketCode, setListTicketCode] = useState([]);
    const time = useFormatDateFull(props.dataSendMail.time);
    const timeBooking = useFormatDateFull(props.dataSendMail.timeBooking);
    const {formatCurrency} = useFormatCurrency()
    useEffect(() => {
        const splitTicketCodes = async () => {
            if (props.dataSendMail && props.dataSendMail.ticketCode) {
                const ticketCodes = props.dataSendMail.ticketCode;
                const splitCodes = await ticketCodes.split(", ");
                setListTicketCode(splitCodes);
            }
        };

        splitTicketCodes();
    }, [props.dataSendMail]);

    useEffect(() => {
        listTicketCode.forEach(ticketCode => {
            JsBarcode(`#barcode-${ticketCode}`, ticketCode);
        })
    }, [listTicketCode])

    return (
        <>
            <Document>
                <Page>
                    <Text>
                        <div className="flex h-full w-full border border-black py-10">
                            <div className="w-3/12 text-xs  h-full flex items-center justify-center -rotate-90 py-10">
                                <div>
                                    <p>Mã đơn hàng: {props.dataSendMail.bookingId}</p>
                                    <p>Được đặt bởi: {props.dataSendMail.nameUser} <br/> vào
                                        lúc {props.dataSendMail.timeBooking}
                                    </p>
                                </div>


                            </div>
                            <div className="w-6/12 px-5 ">
                                <div>
                                    <p>{props.dataSendMail.eventName}</p>
                                    <p className="flex items-center"><CiClock2
                                        className="mr-2"/>Time: {props.dataSendMail.time}</p>
                                    <p className="flex items-center"><CiLocationOn className="mr-2 text-xl"/>Nhà Văn hoá
                                        Thanh niên
                                        Thành phố Hồ Chí Minh <br/>4 Phạm Ngọc Thạch, Bến Nghé, Quận 1, Thành Phố
                                        Hồ
                                        Chí Minh</p>
                                </div>
                                <div>
                                    <p>Ghế: {props.dataSendMail.seat}</p>
                                    <p>Tổng tiền: {formatCurrency(props.dataSendMail.totalPrice)}</p>
                                </div>

                            </div>
                            <div className=" -rotate-90">
                                {listTicketCode.map((ticketCode, index) => (
                                    <div className="" key={index}>
                                        <svg className="h-[100px] w-[200px]  ml-2" id={`barcode-${ticketCode}`}>
                                            {ticketCode}
                                        </svg>
                                    </div>
                                ))
                                }
                            </div>


                        </div>
                    </Text>
                    <Text render={({pageNumber, totalPages}) => (
                        `${pageNumber} / ${totalPages}`
                    )} fixed/>
                </Page>
            </Document>
        </>
    )
        ;
};
export default Ticket;