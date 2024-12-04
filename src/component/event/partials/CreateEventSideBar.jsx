import logo from '../../../assets/img/logo/logo-auth-header-light.svg'
import {useLocation, useNavigate} from "react-router-dom";
import {Avatar, Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {twMerge} from 'tailwind-merge';
import {logoutUser, selectUserLogin} from "../../../features/user/AuthSlice.js";
import {FaCog, FaSignOutAlt} from "react-icons/fa";
import {FaUser} from "react-icons/fa6";

export default function CreateEventSideBar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const user = useSelector(selectUserLogin);
    console.log(user)
    const navigate = useNavigate();
    const steps = [
        {
            label: "Thông tin sự kiện",
            active: pathname === '/event/create',
            href: '/event/create'
        },
        {
            label: "Thời gian & loại vé",
            active: pathname === '/event/create/step2',
            href: '/event/create/step2'
        },
        {
            label: "Thông tin thanh toán",
            active: pathname === '/event/create/step3',
            href: '/event/create/step3'
        }
    ]
    const logout = () => {
        dispatch(logoutUser());
    }
    return (
        <div className="w-[25vw] bg-blue-gray-800  text-white text-xl ">
            <div className="flex gap-5 items-center p-5  justify-between  bg-blue-gray-900">
                <img src={logo} alt=""
                     className="h-[60px] w-[60px] m-0 cursor-pointer border-black rounded-lg bg-green-400 "
                     onClick={() => navigate("/")}/>
                <Popover placement="bottom-end" dismiss={true}>
                    <PopoverHandler>
                        <Avatar
                            size="2xl"
                            src={user.avatar}
                            className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"/>
                    </PopoverHandler>
                    <PopoverContent className="w-48 p-1">
                        <div className="flex-col w-full gap-3">
                            <div className="flex-col bg-blue-gray-50 text-center items-center justify-items-center
                                    justify-center w-full border-2 cursor-pointer">
                                <div>Hello</div>
                                <div
                                    className="font-bold text-xl">{user.fullName !== null ? user.fullName : user.username}</div>
                            </div>
                            <div className="flex space-x-2 border-2  items-center justify-start w-full
                                      cursor-pointer" onClick={() => {
                                navigate("/profile")
                            }}>
                                <div className="w-[20px]">
                                    <FaCog/>
                                </div>
                                <div>Edit Profile</div>
                            </div>
                            <div className="flex space-x-2 border-2 items-center justify-start w-full
                                     cursor-pointer"
                                 onClick={() => {
                                     navigate("/my-event/legal")
                                 }}>
                                <div className="w-[20px]">
                                    <FaUser/>
                                </div>
                                <div>My Organizer Profile</div>
                            </div>
                            <div className="flex space-x-2 items-center justify-start w-full border-2 cursor-pointer"
                                 onClick={logout}>
                                <div className="w-[20px]">
                                    <FaSignOutAlt/>
                                </div>
                                <div>Sign out</div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="px-3 py-3 flex-row space-y-2">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={twMerge('cursor-pointer flex gap-5 items-center  p-5', step.active && 'bg-blue-200 text-black rounded-lg')}
                        onClick={() => {
                            navigate(step.href)
                        }}>
                        <span
                            className="rounded-full bg-green-400 h-10 w-10 flex items-center justify-center">{index + 1}</span>
                        <p>{step.label}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}
