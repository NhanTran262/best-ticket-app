import logo from "../../assets/img/logo/logo-auth-header-light.svg";
import {CiSearch} from "react-icons/ci";
import {FaMoon, FaSun, FaTicket, FaUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Avatar, Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";
import {GrLanguage} from "react-icons/gr";
import logoVie from "../../assets/img/logo/Flag_of_Vietnam.svg"
import logoEng from "../../assets/img/logo/Flag_of_the_United_Kingdom_(3-5).svg"
import {FaCog, FaSignOutAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {toastOptions} from "../../ultility/toastOptions.js";
import {getTicketsByCustomerId} from "../../features/TicketSlice.js";
import {logoutUser, selectUserLogin, selectUserLogout, setLogoutSuccess} from "../../features/user/AuthSlice.js";


const UserHeader = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const user = useSelector(selectUserLogin);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    const userLogout = useSelector(selectUserLogout);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (
            localStorage.theme === 'dark'
            || (!('theme' in localStorage)
                && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme]);

    useEffect(() => {
        inputRef.current.checked = theme !== "dark";
    }, []);

    const changeTheme = async (e) => {
        if (e.target.checked) {
            await setTheme("light")
        } else {
            await setTheme("dark")
        }
    }
    // useEffect(() => {
    //     if (userRole !== null && userRole.includes(ADMIN)) {
    //         navigate("/admin");
    //     }
    // }, [userRole]);

    const loginButton = () => {
        return (
            !user ?
                <span onClick={() => navigate("/login")} className="hover:text-amber-400">
                    Login | Register
                </span>
                : <Popover placement="bottom-end" dismiss={true}>
                    <PopoverHandler>
                        <Avatar
                            size="sm"
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
        )
    }
    const changeLanguageButton = () => {
        return (
            <>
                <Popover placement="bottom-start">
                    <PopoverHandler>
               <span className="hover:text-amber-400 rounded-full">
                    <GrLanguage size={20}/>
               </span>
                    </PopoverHandler>
                    <PopoverContent className="w-32 p-1">
                        <div className="flex-col justify-center justify-items-center items-center w-full">
                            <div className="flex space-x-2 justify-center  items-center w-full
                                    hover:bg-gray-500  hover:text-white
                                    cursor-pointer
                                    ">
                                <div className="w-[20px]">
                                    <img src={logoVie} alt="" className="w-[20px]"/>
                                </div>
                                <div>Viet Nam</div>
                            </div>
                            <div className="flex space-x-2 gap-2 justify-center  items-center w-full
                                    hover:bg-gray-500  hover:text-white
                                    cursor-pointer
                                    ">
                                <div className="w-fit h-fit">
                                    <img src={logoEng} alt="" className="w-[20px]"/>
                                </div>
                                <div>English</div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </>
        )
    }
    const changeThemeButton = () => {
        return (
            <>
                <input type="checkbox" className="toggle toggle-warning" ref={inputRef} onClick={changeTheme}/>
                <div>
                    {
                        theme === "light" ?
                            <FaSun color={"yellow"} size={30}/> :
                            <FaMoon color={"black"} size={30}/>
                    }
                </div>
            </>
        )
    }

    const logout = () => {
        dispatch(logoutUser(userLogout));
        toast('🦄 Hẹn gặp lại!', toastOptions);
        dispatch(setLogoutSuccess());
        localStorage.removeItem("user");
        navigate("/");
    }

    const handleCreateEvent = () => {
        const organizer = user.organizer;
        if (user) {
            if (organizer !== null) {
                navigate('/event/create');
            } else {
                navigate('/my-event/legal');
            }
        } else {
            navigate('/login');
        }
    };
    const handleMyTicket = async () => {
        const customer = user.customer;
        if (user) {
            if (customer !== null) {
                const customerId = customer.id;
                dispatch(getTicketsByCustomerId(customerId));
                navigate(`/my-ticket/${customerId}`);
            } else {
                navigate('/profile');
            }
        } else {
            navigate('/login');
        }
    }
    return (
        <>
            <div className="h-[76px] w-full bg-[#10b981] text-white px-3 dark:bg-[#14b8a6]">
                <div className="px-6  flex text-center justify-center gap-20 items-center
                text-sm border-b-2 border-gray-400 ">
                    <div className="flex items-center gap-3 font-semibold dark:text-white">
                        <img src={logo} alt="" className="h-[75px] w-[100px] m-0 cursor-pointer  "
                             onClick={() => navigate("/")}/>
                    </div>
                    <div className="relative text-gray-600">
                        <input
                            type="search"
                            name="search"
                            placeholder="Bạn cần tìm gì ?"
                            className="border-green-600 border-[1px] h-11 px-5 w-[380px] pr-10 rounded-lg text-sm focus:outline-none flex"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4"
                                onClick={() => navigate(`/search?${searchTerm}`, {state: {text: {searchTerm}}})}>
                            <CiSearch className="text-gray-600 h-5 w-5"/>
                        </button>
                    </div>
                    <div className="flex items-center gap-3 font-semibold">
                        <span
                            className="cursor-pointer border-white border-[1px]
                                        hover:bg-white hover:text-black
                                        rounded-3xl font-bold px-6 py-2" onClick={handleCreateEvent}>
                            Create Event
                        </span>
                    </div>
                    <div className="cursor-pointer flex items-center gap-3 hover:text-amber-400"
                         onClick={handleMyTicket}
                    >
                        <FaTicket size={30}/>
                        <span>My ticket</span>
                    </div>
                    <div className="cursor-pointer flex items-center gap-4 font-bold">
                        {loginButton()}
                        {changeLanguageButton()}
                        {changeThemeButton()}

                    </div>
                </div>
            </div>
        </>
    )
        ;
};
export default UserHeader;
