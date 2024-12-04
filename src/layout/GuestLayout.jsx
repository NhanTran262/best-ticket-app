import backgroundLight from "../assets/img/logo/logo-page-auth-light.png";
import backgroundDark from "../assets/img/logo/logo-page-auth-dark.png";
import {useEffect, useState} from "react";

const GuestLayout = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
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

    return (
        <div className="flex-row ">
            <div>
                <div className="flex items-center justify-center text-center gap-3 bg-white
                dark:bg-black dark:text-white
                ">

                    {
                        children
                    }
                    <div
                        className="flex bg-white dark:bg-black rounded-lg items-center h-screen flex-1 flex-col justify-center lg:px-8">
                        <img src={theme === "light" ? backgroundLight : backgroundDark} className="w-screen h-screen "
                             alt=""/>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default GuestLayout;
