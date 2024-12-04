import {RiGroupLine} from "react-icons/ri";
import {BsGraphUpArrow} from "react-icons/bs";
import {GiReturnArrow} from "react-icons/gi";
import {GrAnnounce, GrUserManager} from "react-icons/gr";
import {BiSolidDiscount} from "react-icons/bi";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import avatar from "../../assets/img/User.png";
import {getExistsUsers, selectExistsList} from "../../features/user/ExistsSlice.js";
import {Avatar, Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";
import {FaQuestionCircle, FaSignOutAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import logo from "../../assets/img/logo/logo-auth-header-light.svg";
import {twMerge} from 'tailwind-merge';
import {
    logoutUser,
    selectIsLogin,
    selectUserLogin,
    selectUserLogout,
    setLoginSuccess
} from "../../features/user/AuthSlice.js";
import {toastOptions} from "../../ultility/toastOptions.js";


const BookingManagerSidebar = () => {
    const eventId = useParams().eventId;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUserLogin);
    const userExists = useSelector(selectExistsList)
    const userLogout = useSelector(selectUserLogout);
    const pathName = location.pathname;
    const isLogin = useSelector(selectIsLogin)

    const logout = () => {
        dispatch(logoutUser(userLogout));
        dispatch(setLoginSuccess())
        toast('🦄 Hẹn gặp lại!', toastOptions);
        navigate("/login");
    }

    const steps = [{
        icon: <GiReturnArrow/>,
        title: "Quay lại trang sự kiện của tôi",
        url: `/my-event/legal/createdEvent`,
        active: `/my-event/legal/createdEvent` === pathName
    }, {
        icon: <BsGraphUpArrow/>,
        title: "Tổng kết",
        url: `/my-event/event/${eventId}/summarize`,
        active: `/my-event/event/${eventId}/summarize` === pathName
    }, {
        icon: <RiGroupLine/>,
        title: "RSVPs",
        url: `/my-event/event/${eventId}/RSVPs/bookings`,
        active: `/my-event/event/${eventId}/RSVPs/bookings` === pathName
    }, {
        icon: <GrAnnounce/>,
        title: "Quảng bá",
        url: `/my-event/event/${eventId}/promote`,
        active: `/my-event/event/${eventId}/promote` === pathName
    }, {
        icon: <BiSolidDiscount/>,
        title: "Mã giảm giá",
        url: `/my-event/event/${eventId}/discount-codes`,
        active: `/my-event/event/${eventId}/discount-codes` === pathName
    }, {
        icon: <GrUserManager/>,
        title: "Người quản lý",
        url: `/my-event/event/${eventId}/moderators`,
        active: `/my-event/event/${eventId}/moderators` === pathName
    },]

    return (!user ? navigate(`/404`) : <div className="fixed w-[26%] border-r shadow-md">
        <nav className="bg-[#424242] h-screen">
            <ul className="text-left">
                <li>
                    <div className="text-center flex bg-[#14B981]">
                        <div className="w-1/2 text-left ml-2">
                            <div className="flex items-center gap-3 font-semibold dark:text-white">
                                <img src={logo} alt="" className="h-[75px] w-[100px] m-0 cursor-pointer  "
                                     onClick={() => navigate("/")}/>
                            </div>
                        </div>
                        <div className="w-1/2 text-right justify-right mx-3 my-5 mr-8">
                            <Popover placement="bottom-end" dismiss={{}}>
                                <PopoverHandler>
                                    <button className="ml-28 flex">
                                        <div className="pr-2 py-1 text-xl">{user.username}</div>
                                        <Avatar
                                            size="sm"
                                            alt={avatar}
                                            src={user.avatar}
                                            className="border border-white-500 shadow-xl shadow-green-900/20 ring-4 ring-blue-300"
                                        />
                                    </button>
                                </PopoverHandler>
                                <PopoverContent className="w-48 p-1">
                                    <div className="flex-col w-full gap-3">
                                        <div className="flex space-x-2 border-2  items-center justify-start w-full
                                      cursor-pointer" onClick={() => {
                                            dispatch(getExistsUsers())
                                            if (userExists !== null) {
                                                navigate(`/my-ticket/${user.id}`)
                                            }
                                        }}>
                                            <div>Vé đã mua</div>
                                        </div>
                                        <div className="flex space-x-2 border-2 items-center justify-start w-full
                                     cursor-pointer
                                    " onClick={() => {
                                            dispatch(getExistsUsers())
                                            if (userExists !== null) {
                                                navigate(`/profile`)
                                            }
                                        }}>
                                            <div>Hồ sơ cá nhân</div>
                                        </div>
                                        <div className="flex space-x-2 border-2 items-center justify-start w-full
                                     cursor-pointer
                                    " onClick={() => {
                                            dispatch(getExistsUsers())
                                            if (userExists !== null) {
                                                navigate(`/my-event/legal/createdEvent`)
                                            }
                                        }}>
                                            <div>Sự kiện đã tạo</div>
                                        </div>
                                        <div className="flex space-x-2 border-2 items-center justify-start w-full
                                     cursor-pointer
                                    " onClick={() => {
                                            dispatch(getExistsUsers())
                                            if (userExists !== null) {
                                                navigate(`/my-event/pos/${eventId}`)
                                            }
                                        }}>
                                            <div>Thống kê Pos</div>
                                        </div>
                                        <div className="flex space-x-2   items-center justify-start w-full
                                    border-2 cursor-pointer
                                    "
                                             onClick={logout}>
                                            <div className="w-[20px]">
                                                <FaSignOutAlt/>
                                            </div>
                                            <div>Đăng xuất</div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </li>
                {steps.map((step, index) => (<li key={index}
                                                 className={twMerge('flex gap-5 items-center hover:bg-[#ece8f3] hover:text-black py-3 px-5 mb-0', step.active && 'bg-gray-400 text-black ')}
                                                 onClick={() => navigate(step.url)}
                >
                    <span className={`rounded-full h-10 w-10 flex items-center justify-center text-xl`}>
                        {step.icon}
                    </span>
                    <p>{step.title}</p>
                </li>))}
            </ul>
            <div className="h-screen">
                <div className="text-center flex">
                    <a onClick={() => {
                        navigate(`/help-center`)
                    }}
                       className="w-full border-none rounded-xl bg-[#57616A] m-10 my-[85%]">
                        <div className="m-3 flex text-center justify-center">
                            <div className="p-1 text-xl"><FaQuestionCircle/></div>
                            <div className="text-lg">Câu hỏi thường gặp</div>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    </div>)
};

export default BookingManagerSidebar;
