import {Breadcrumbs} from "@material-tailwind/react";
import image from "../../assets/img/User.png"
import {FaCalendar, FaTicket, FaUser} from "react-icons/fa6";
import {Link, NavLink} from "react-router-dom";
import TicketDetails from "./TicketDetails.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserLogin} from "../../features/user/AuthSlice.js";

function TicketHistory() {
    const [keyword, setKeyword] = useState("");
    const [activeButton, setActiveButton] = useState("");
    const user = useSelector(selectUserLogin);

    const sendKeyword = (data) => {
        setActiveButton(data);
        setKeyword(data)
    }
    return (
        <div className="bg-[#27272a] w-full overflow-y-auto">
            <div className="flex-col mx-40 px-10 gap-10  space-y-10 text-white">
                <div className="space-y-10">
                    <Breadcrumbs className="bg-dark ">
                        <Link to="/" className="opacity-60 text-white">
                            Home page
                        </Link>
                        <Link to="/" className="opacity-60 text-white">
                            My Tickets
                        </Link>
                    </Breadcrumbs>
                </div>
                <div className="flex gap-10 justify-items-center text-xs">
                    <div className="flex-col items-center justify-between space-y-5 w-1/4">
                        <div className="flex gap-1 items-center justify-items-center space-x-3">
                            <div className="items-center justify-items-center">
                                <img src={image} alt="" className="h-[30px] w-[30px]"/>
                            </div>
                            <div className="flex-col space-y-0">
                                <div>Account of</div>
                                <div>{user.username}</div>
                            </div>
                        </div>
                        <div className="flex-col items-center space-y-3 justify-items-center justify-center">
                            <NavLink to={"/profile"}
                                     className="flex gap-2 items-center cursor-pointer hover:bg-light-blue-100 hover:text-black">
                                <FaUser/>
                                My Account
                            </NavLink>
                            <div
                                className="flex gap-2 items-center cursor-pointer hover:bg-light-blue-100 hover:text-black">
                                <FaTicket/>
                                My Tickets
                            </div>
                            {user.listRole.includes("CUSTOMER") ? (
                                ""
                            ) : (
                                <div
                                    className="flex gap-2 items-center cursor-pointer hover:bg-light-blue-100 hover:text-black">
                                    <FaCalendar/>
                                    My Created Event
                                </div>
                            )}

                        </div>

                    </div>
                    <div
                        className="flex-col items-center space-y-3 justify-items-center justify-center font-bold w-3/4">
                        <div>
                            My Tickets
                        </div>
                        <div>
                            <hr className="text-white"/>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <div
                                className={`btn rounded-full btn-xs w-[150px] ${
                                    activeButton === '' ? 'bg-[#2DC275] text-black' : 'bg-[#5D616A] text-black'
                                }`}
                                onClick={() => sendKeyword('')}
                            >
                                All
                            </div>
                            <div
                                className={`btn rounded-full btn-xs w-[150px] ${
                                    activeButton === 'Success' ? 'bg-[#2DC275] text-black' : 'bg-[#5D616A] text-black'
                                }`}
                                onClick={() => sendKeyword('Success')}
                            >
                                Success
                            </div>
                            <div
                                className={`btn rounded-full btn-xs w-[150px] ${
                                    activeButton === 'Pending' ? 'bg-[#2DC275] text-black' : 'bg-[#5D616A] text-black'
                                }`}
                                onClick={() => sendKeyword('Pending')}
                            >
                                Processing
                            </div>
                        </div>

                        <div className="flex items-center justify-center overflow-y-auto overflow-x-hidden pb-20">
                            <TicketDetails value={keyword}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketHistory
