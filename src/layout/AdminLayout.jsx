import AdminSidebar from "../component/sidebar/AdminSidebar.jsx";
import AdminHeader from "../component/header/AdminHeader.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuthor} from "../ultility/customHook/useAuthor.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Bounce, toast} from "react-toastify";
import {reLoginWithToken, selectLogoutSuccess} from "../features/user/AuthSlice.js";


const AdminLayout = ({children}) => {
    const isAdmin = useAuthor();
    const dispatch = useDispatch();
    const logoutSuccess = useSelector(selectLogoutSuccess)
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            dispatch(reLoginWithToken())
        }
    }, []);
    useEffect(() => {
        if (logoutSuccess) {
            toast('🦄 Logout success!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            navigate("/");
        }
    }, []);
    return isAdmin ? (
            <>
                <div className="flex max-h-full h-screen overflow-hidden">
                    <div className="h-screen">
                        <AdminSidebar/>
                    </div>
                    <div className="flex-col  justify-center w-full  overflow-hidden">
                        <div className="flex-col  max-h-full overflow-hidden">
                            <AdminHeader/>
                            <div className="h-fit">
                                {
                                    children
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) :
        <Navigate to={"/403"}/>
}
export default AdminLayout;
