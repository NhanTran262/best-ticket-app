import {FaPlus, FaRegEdit} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getEventByOrganizerId} from "../../features/EventSlice.js";
import {CiClock2} from "react-icons/ci";
import {GrStatusUnknown} from "react-icons/gr";
import {IoLocationOutline} from "react-icons/io5";
import {RiDeleteBin5Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import {selectUserLogin} from "../../features/user/AuthSlice.js";

export default function CreatedEvent() {
    const eventByOrganizer = useSelector(state => state.event.events);
    const user = useSelector(selectUserLogin);
    const organizer = user.organizer;
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(getOrganizerByUserId(user.id));
    // }, [dispatch, user.id]);

    useEffect(() => {
        if (user.organizer) {
            dispatch(getEventByOrganizerId({organizerId: organizer.id, currentPage}));
        }
    }, [currentPage, organizer, dispatch]);
    const handleCreateEvent = () => {
        if (user) {
            if (organizer) {
                navigate("/event/create")
            } else {
                navigate("my-event/legal")
            }
        } else {
            navigate("/login")
        }
    }
    return (
        <div className="max-h-screen overflow-y-auto">
            <div className="px-10 py-5">
                <div className="flex justify-between items-center pb-5">
                    <h1 className=" text-xl font-serif"> SỰ KIỆN CỦA BẠN</h1>
                    <div
                        className="font-serif flex gap-2 bg-green-400 w-[200px] h-[40px] justify-center items-center rounded-lg  text-white cursor-pointer">
                        <FaPlus/>
                        <p>TẠO SỰ KIỆN </p>
                    </div>
                </div>
                <div className="container ">
                    {user && user.organizer && eventByOrganizer ? (
                        eventByOrganizer.map(event => (
                            <div
                                className="bg-gray-300 border-2 rounded-lg flex gap-2 mt-3"
                                key={event.id}
                            >
                                <img
                                    className="h-[190px] w-[180px] object-cover  rounded-l-lg"
                                    src={event.image}
                                    alt={event.name}
                                />
                                <div className="flex-row w-full p-3">
                                    <h1 className="uppercase text-center font-semibold">{event.name}</h1>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <CiClock2 size={20}/>
                                            <p>Thời gian: </p>
                                            {event.time && event.time}
                                        </div>
                                        <div className="flex gap-2">
                                            <IoLocationOutline size={20}/>
                                            <p>Địa chỉ: </p>
                                            {event.location && (
                                                <>
                                                    <p>{event.location.address},</p>
                                                    <p>{event.location.district},</p>
                                                    <p>{event.location.province}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <GrStatusUnknown size={18}/>
                                            <p>Tình trạng: </p>
                                            {(() => {
                                                switch (event.status) {
                                                    case "PENDING_APPROVAL":
                                                        return <p>Đang chờ duyệt</p>;
                                                    case "ACTIVE":
                                                        return <p>Đang hiển thị</p>;
                                                    default:
                                                        return null;
                                                }
                                            })()}
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex gap-1 bg-blue-200 rounded-lg p-2 px-5">
                                                <FaRegEdit/>
                                                <p className="uppercase">tiếp tục chỉnh sửa</p>
                                            </div>
                                            <div className="flex gap-1 bg-blue-200 rounded-lg p-2 px-5">
                                                <FaRegEdit/>
                                                <button className="uppercase" onClick={() => {
                                                    navigate(`/my-event/event/${event.id}/RSVPs/bookings`)
                                                }}>xem chi tiết
                                                </button>
                                            </div>
                                            <div className="bg-gray-500 rounded-lg p-2">
                                                <RiDeleteBin5Line size={20}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h1> BẠN CHƯA TẠO SỰ KIỆN NÀO </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}