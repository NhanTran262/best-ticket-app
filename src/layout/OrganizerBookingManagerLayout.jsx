import BookingManagerSidebar from "../component/sidebar/BookingManagerSidebar.jsx";
import {useEffect} from "react";

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {reLoginWithToken} from "../features/user/AuthSlice.js";

function OrganizerBookingManagerLayout({children}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            dispatch(reLoginWithToken(token));
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate]);

    return (
        <div className="flex">
            <div className="w-2/6 text-white">
                <BookingManagerSidebar/>
            </div>
            <div className="bg-white">{children}</div>
        </div>
    );
}

export default OrganizerBookingManagerLayout;