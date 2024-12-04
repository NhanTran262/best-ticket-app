import UserHeader from "../component/header/UserHeader.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getExistsUsers} from "../features/user/ExistsSlice.js";
import {getTicketTypes} from "../features/TicketTypeSlice.js";
import {reLoginWithToken} from "../features/user/AuthSlice.js";

window.global ||= window;


const UserLayout = ({children}) => {
    const dispatch = useDispatch();
    const showTicketType = () => {
        dispatch(getTicketTypes())
    }
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            dispatch(reLoginWithToken())
        }
    }, []);

    useEffect(() => {
        showTicketType();
        dispatch(getExistsUsers())
    }, []);
    return (
        <>
            <div className=" relative item-center h-screen max-h-full bg-[#ece8f3]
                             dark:bg-[#111827] dark:text-white
                             ">
                <UserHeader/>
                <div className="relative md:flex max-h-full h-screen overflow-y-hidden">
                    {children}

                </div>
            </div>
        </>
    );

}
export default UserLayout;
