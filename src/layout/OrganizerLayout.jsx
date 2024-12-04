import OrganizerSidebar from "../component/sidebar/OrganizerSidebar.jsx";
import UserHeader from "../component/header/UserHeader.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {reLoginWithToken} from "../features/user/AuthSlice.js";

function OrganizerLayout({children}) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            dispatch(reLoginWithToken())
        }

    }, []);
    return (
        <div className=" relative item-center h-screen max-h-full bg-[#ece8f3]
                             dark:bg-[#111827] dark:text-white">
            <UserHeader/>
            <div className="relative md:flex max-h-full h-screen">
                <div className=" w-1/4 ">
                    <OrganizerSidebar/>
                </div>
                <div className="w-3/4 max-h-screen overflow-y-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default OrganizerLayout;
