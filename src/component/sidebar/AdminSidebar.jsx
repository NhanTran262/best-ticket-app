import {FaCogs, FaFileContract, FaHome, FaSignOutAlt} from "react-icons/fa";
import {FaMoon, FaSun, FaUsers} from "react-icons/fa6";
import {MdAppRegistration, MdEventAvailable} from "react-icons/md";
import {ImTicket} from "react-icons/im";
import {useNavigate, useParams} from "react-router-dom";
import {Avatar} from "@material-tailwind/react";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectUserLogout} from "../../features/user/AuthSlice.js";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function AdminSidebar() {
    const navigate = useNavigate();
    const param = useParams();
    const inputRef = useRef();
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const dispatch = useDispatch();
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

    const itemDashboard = [
        {icon: <FaHome size={25}/>, label: "Dashboard", path: "/admin", current: param.param === undefined},
        {icon: <FaUsers size={25}/>, label: " Users", path: "/admin/users", current: param.param === 'users'},
        {
            icon: <FaFileContract size={25}/>,
            label: " Bookings",
            path: "/admin/bookings",
            current: param.param === 'bookings'
        },
        {
            icon: <MdEventAvailable size={25}/>,
            label: " Events",
            path: "/admin/events",
            current: param.param === 'events'
        },
        {
            icon: <ImTicket size={25}/>,
            label: " Tickets",
            path: "/admin/tickets",
            current: param.param === 'tickets'
        },
        {
            icon: <MdAppRegistration size={25}/>,
            label: "Event Approval",
            path: "/admin/event-approval",
            current: param.param === 'event-approval'
        }
    ]
    const itemFooter = [
        {icon: <FaCogs size={25}/>, label: "Setting", path: "/admin"},
        {icon: <FaSignOutAlt size={25} onClick={() => logout()}/>, label: "Log out", path: "/admin"},
        {
            label: <input type="checkbox" className="toggle toggle-warning" ref={inputRef} onClick={changeTheme}/>
            , icon: <div>
                {
                    theme === "light" ?
                        <FaSun color={"yellow"} size={30}/> :
                        <FaMoon color={"black"} size={30}/>
                }
            </div>, path: ""
        },
    ]

    const logout = () => {
        dispatch(logoutUser(userLogout));
    }

    return (
        <>
            <div className="w-full text-center h-screen max-h-full flex-col overflow-y-auto bg-deep-purple-700
            dark:bg-blue-gray-400
            justify-end
            ">
                <div className="flex w-[250px] gap-2 h-[100px]
                items-center justify-center
                cursor-pointer text-2xl font-bold text-white font-serif
                " onClick={() => navigate("/admin")}>
                    <Avatar
                        size="lg"
                        alt="avatar"
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                        className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
                    />
                    <span>
                        Admin
                    </span>
                </div>
                <div className="p-2 space-x-1 flex items-center justify-center">
                    <input id="search" type="text" placeholder="Search"
                           className="input input-sm input-bordered input-primary w-full max-w-xs"/>
                </div>
                <hr/>
                {
                    itemDashboard.map(({icon, label, path, current}, index) => (
                        <div
                            key={index}
                            className={
                                classNames(
                                    current ?
                                        "flex gap-5 items-center p-2 justify-items-start" +
                                        "cursor-pointer text-sm" +
                                        "text-center" +
                                        "transition-transform transform-gpu " +
                                        "bg-white text-black hover:bg-white hover:text-black"
                                        :
                                        "flex gap-5 items-center p-2 " +
                                        "justify-items-start " +
                                        "cursor-pointer text-sm " +
                                        "text-white text-center" +
                                        "transition-transform transform-gpu" +
                                        "hover:bg-white hover:text-black"
                                )}
                            onClick={() => navigate(path)}>
                            <div>
                                {icon}
                            </div>
                            <div>{label}</div>
                        </div>
                    ))
                }
                <hr/>
                {
                    itemFooter.map(({icon, label, path}, index) => (
                        <div key={index} className="flex gap-5 items-center p-2 justify-items-start
                        cursor-pointer
                        text-white text-sm
                        transition-transform transform-gpu
                        hover:bg-white hover:text-black hover
                        ">
                            <div>
                                {icon}
                            </div>
                            <div>{label}</div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default AdminSidebar;
