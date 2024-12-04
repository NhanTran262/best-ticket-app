import {FaFacebook} from "react-icons/fa6";
import {Tooltip} from "@material-tailwind/react";
import logoLight from "../../assets/img/logo/logo-auth-header-light.svg";
import logoDark from "../../assets/img/logo/logo-auth-header-dark.svg";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {GoogleLogin} from "@react-oauth/google";
import {useDispatch, useSelector} from "react-redux";
import {loginWithGoogle, selectIsLogin} from "../../features/user/AuthSlice.js";

function AuthHeader(props) {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLogin)
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


    const loginGoogle = (res) => {
        dispatch(loginWithGoogle(res))
    }

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm m-0">
                <Tooltip content="Back Home">
                    <img
                        className="mx-auto h-[150px] w-[200px] cursor-pointer"
                        src={theme === "light" ? logoLight : logoDark}
                        alt="Your Company"
                        onClick={() => navigate("/")}
                    />
                </Tooltip>
                <h2 className="mt-3 mb-9 text-center dark:text-white text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {props.name}
                </h2>
                <div className="flex justify-center gap-3 mt-2 h-[32px]">
                    <div className="w-full">
                        <div
                            className="w-full h-full flex gap-3 items-center border cursor-pointer text-dark-purple
                                hover:bg-[#ecf5ff] hover:text-[#409eff]
                                justify-center rounded-full "
                        >
                            <FaFacebook className="text-[#3b5998]"/>
                            Facebook
                        </div>
                    </div>
                    <div className="w-full ">
                        <GoogleLogin
                            shape={"pill"}
                            size={"medium"}
                            text={"continue_with"}
                            logo_alignment={"left"}
                            onSuccess={loginGoogle}
                            onError={(e) => {
                                console.log(e);
                            }}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    OR
                </div>
            </div>
        </>
    )
}

export default AuthHeader;
