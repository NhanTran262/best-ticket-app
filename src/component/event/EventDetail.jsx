import {useDispatch, useSelector} from "react-redux";
import {getEventById, selectEventById} from "../../features/EventSlice.js";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {FaClock, FaHeart} from "react-icons/fa";
import {FaFacebook, FaLocationDot} from "react-icons/fa6";
import img from '../../assets/img/image/event.png'
import imgOrganizerLogo from '../../assets/img/image/organizerlogo.jpg'
import {IoIosArrowForward, IoMdMail} from "react-icons/io";
import {IoTicket} from "react-icons/io5";
import {selectShowTicketTypes} from "../../features/TicketTypeSlice.js";
import {getTimeByEventId, selectShowTimeByEventId} from "../../features/TimeSlice.js";

import {useFormatDateFull} from "../../ultility/customHook/useFormatDateFull.js";
import {useFormatCurrency} from "../../ultility/customHook/useFormatCurrency.js";
import {selectUserLogin} from "../../features/user/AuthSlice.js";

const EventDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eventId = useParams().id;
    const location = useLocation();
    const event = useSelector(selectEventById);
    const ticketTypes = useSelector(selectShowTicketTypes);
    const times = useSelector(selectShowTimeByEventId)
    const user = useSelector(selectUserLogin);
    const {formatCurrency} = useFormatCurrency()
    let isFirstRender = true;

    const showEventById = () => {
        dispatch(getEventById(eventId));
    }
    const showTimeByEventId = () => {
        dispatch(getTimeByEventId(eventId))
    }

    useEffect(() => {
        showEventById(eventId);
        showTimeByEventId(eventId);
    }, []);
    return (
        <>
            <div className="w-full overflow-y-auto pb-52">

                <img className="w-full h-96" src={event !== null ? event.image : <div>Loading...</div>} alt=""/>

                <div className="flex mx-60 gap-20">
                    <div className="w-4/6">
                        <div className=" flex mt-10">
                            <div className="w-4/6 flex">
                                <div className="">
                                    <div className="text-black text-xl">{event !== null ? event.name :
                                        <div>Loading...</div>}
                                    </div>
                                    {times !== null ? times.data.content.map((time, index) => {
                                        if (isFirstRender) {
                                            isFirstRender = false;
                                            return (
                                                <div className="flex items-center text-black" key={index}><FaClock
                                                    className="mr-2"/>
                                                    {useFormatDateFull(time.time)}
                                                </div>
                                            )
                                        }
                                    }) : <div></div>}


                                    <div className="flex items-center text-black"><FaLocationDot className="mr-2"/> Nhà
                                        Văn hoá Thanh niên Thành phố Hồ Chí Minh
                                    </div>
                                    <div>4 Phạm Ngọc Thạch, Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white mt-10">
                            <div className="font-bold text-xl border-dashed border-b border-black py-3">
                                <p className="text-black px-3">Thông tin vé</p>
                            </div>

                            {ticketTypes !== null ? ticketTypes.data.map((ticketType, index) => (
                                <div className="flex w-full border-dashed border-b border-black py-3 px-4" key={index}>
                                    <div className="w-5/6">{ticketType.name}</div>
                                    <div
                                        className="w-1/6 text-right"> {formatCurrency(ticketType.price)}
                                    </div>
                                </div>
                            )) : <div></div>}
                        </div>
                        <div className="bg-white mt-10">
                            <div className="font-bold text-xl border-dashed border-b border-black py-3">
                                <p className="text-black px-3">Lịch sự kiện</p>
                            </div>
                            {times !== null ? times.data.content.map((time, index) => (

                                <div className="flex w-full border-dashed border-b border-black py-3 px-4" key={index}>

                                    <div className="w-5/6">

                                        <p className="text-black">{useFormatDateFull(time.time)}</p>
                                    </div>
                                    <div className="w-1/6 flex text-right justify-end items-center" key={index}
                                         onClick={() => {
                                             if (user === null) {
                                                 navigate("/login");
                                             } else {
                                                 dispatch(fetchGetUser(user.id))
                                             }
                                         }}>
                                        <NavLink to={`${location.pathname}/ticket-booking/${time.id}`}
                                                 className="py-2 px-10 bg-[#EF4141] text-center text-white text-xs">Mua
                                            vé ngay
                                        </NavLink>
                                    </div>
                                </div>
                            )) : <div></div>}

                        </div>

                        <div className="mt-10 ">
                            <img className="w-full" src={img} alt="event"/>
                        </div>

                        <div className="bg-white mt-10">
                            <div className="font-bold text-xl border-dashed border-b border-black py-3">
                                <p className="text-black text-xl px-3">Nhà tổ chức</p>
                            </div>
                            <div className="flex w-full px-10 py-4">
                                <div className="w-1/6">
                                    <img src={imgOrganizerLogo} alt="organizerlogo"/>
                                </div>
                                <div className="w-5/6 ">
                                    <p className="text-black text-xl font-bold">NHÀ HÁT KỊCH IDECAF.</p>
                                    <p className="py-5">Sân khấu kịch Idecaf ra đời vào tháng 09.1997 với vở "Khoảng
                                        khắc tình yêu" đã
                                        nhanh chóng gây tiếng vang bởi chất lượng nghệ thuật, nội dung kịch bản sâu
                                        sắc,
                                        dàn diễn viên nổi tiếng và quan trọng nhất là thái độ phục vụ, tôn trọng
                                        khán
                                        giả của nhân viên phục vụ lẫn diễn viên của vở. Chỉ sau một thời gian ra
                                        mắt,
                                        sân khấu Idecaf trở thành một địa chỉ quen thụôc của khán giả mê kịch.</p>

                                    <p>Sau 20 năm hoạt động (tính đến hết tháng 12.2016), Idecaf đã dàn dựng hơn 100
                                        vở
                                        kịch dành cho người lớn, 30 vở kịch rối thiếu nhi, 29 chương trình ca múa
                                        nhạc
                                        kịch thiếu nhi "Ngày xửa... ngày xưa" và phối hợp với với Đài truyền hình
                                        TP.HCM
                                        dàn dựng chương trình "Chuyện ngày xưa". Hơn 20 năm hoạt động, Idecaf đã đạt
                                        5.000 suất diễn quả là một con số không nhỏ khi tình hình sân khấu nói chung
                                        đang trong tình trạng kén chọn khán giả.</p>
                                    <div
                                        className="flex items-center py-3 px-5 border w-2/6 text-[#9DC52F] border-[#9DC52F]">
                                        <span className="mr-2"><IoMdMail/></span>
                                        <span>Liên hệ nhà tổ chức</span>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="w-2/6 mt-10">
                        <div className="text-white text-center text-2xl bg-[#F46767] py-4 px-2 ">Chọn lịch diễn
                        </div>
                        <div className="flex w-full">
                            <div className="text-center w-1/2 py-2 border border-solid border-black flex">
                                    <span className="text-center mx-auto flex items-center">
                                        <FaFacebook
                                            className="mr-2"/>Chia sẻ
                                    </span>
                            </div>
                            <div className="text-center w-1/2 py-2 border border-solid border-black flex">
                                <span className="text-center mx-auto flex items-center"><FaHeart className="mr-2"/>Quan tâm</span>
                            </div>
                        </div>
                        <div className="text-center mb-8">-- người quan tâm
                        </div>

                        <div className="sticky top-0 w-[80%] bg-white">
                            <p className="p-3 text-black text-xl">{event !== null ? event.name : <div></div>}</p>
                            <hr/>
                            {times !== null ? times.data.content.map((time, index) => {
                                if (isFirstRender) {
                                    isFirstRender = false;
                                    return (
                                        <p className="flex items-center mb-3 p-3" key={index}>
                                            <span className="mr-3"><FaClock/></span>
                                            <span>{time.time}</span>
                                        </p>)
                                }
                            }) : <div></div>}

                            <p className="flex p-3 mb-3">
                                <span className="mr-3"><FaLocationDot/></span>
                                <span>
                                    Nhà Văn hoá Thanh niên Thành phố Hồ Chí Minh
                                    <br/>
                                    4 Phạm Ngọc Thạch, Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh
                                </span>
                            </p>
                            <hr/>
                            <p className="flex items-center py-2 px-4">
                                {ticketTypes.data.map((ticketType, index) => {
                                    if (isFirstRender) {
                                        isFirstRender = false;
                                        return (
                                            <>
                                                <span className="w-3/4 flex items-center" key={index}>
                                                  <IoTicket className="mr-3"/>
                                                   Từ <span className="text-black ml-1">{ticketType.price} VNĐ</span>
                                                </span>
                                                <span className="w-1/4 flex justify-end">
                                                  <IoIosArrowForward/>
                                                </span>
                                            </>
                                        );
                                    }
                                })}
                            </p>
                            <div className="bg-red-700 text-center py-2 px-6 text-xl text-white">Chọn lịch diễn
                            </div>
                            <div className="flex border border-solid border-black">
                                <div
                                    className="bg-red w-1/2 flex justify-center items-center py-2 border-r border-solid border-black">
                                    <FaFacebook className="mr-1 "/> Chia sẻ
                                </div>
                                <div className="bg-red w-1/2 flex justify-center items-center py-2"><FaHeart
                                    className="mr-1"/> Quan tâm
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
export default EventDetail;