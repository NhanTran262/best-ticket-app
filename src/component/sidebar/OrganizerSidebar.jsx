import {useLocation, useNavigate} from "react-router-dom";
import {twMerge} from 'tailwind-merge';
import {AiFillSchedule} from "react-icons/ai";
import {FaCalendarAlt, FaMoneyCheckAlt, FaPiggyBank} from "react-icons/fa";

export default function OrganizerSidebar() {
    const location = useLocation();
    const pathName = location.pathname;
    const navigate = useNavigate();
    const steps = [
        {
            icon:<AiFillSchedule />,
            title: "Hồ sơ ban tổ chức",
            url: "/my-event/legal",
            active: "/my-event/legal" === pathName
        },
        {
            icon: <FaCalendarAlt />,
            title: "Sự kiện đã tạo",
            url: "/my-event/legal/createdEvent",
            active: "/my-event/legal/createdEvent" === pathName
        },
        {
            icon: <FaMoneyCheckAlt />,
            title: "Số dư tài khoản",
            url: "123",
            active: "123" === pathName
        },
        {
            icon: <FaPiggyBank />,
            title: "Thông tin tài khoản",
            url: "345",
            active: "345" === pathName
        }
    ]
    return (

        <div className="fixed w-1/4 h-full text-white font-serif bg-gray-800 pt-10 pl-5">
            {steps.map((step, index) => (
                <div key={index}
                     className={twMerge('flex gap-5 items-center hover:bg-[#ece8f3] hover:text-black py-3 px-5 mb-2',step.active && 'bg-gray-400 text-black ')}
                     onClick={()=> navigate(step.url)}
                >
                    <span className={`rounded-full h-10 w-10 flex items-center justify-center text-2xl`}>
                        {step.icon}
                    </span>
                        <p className="text-xl">{step.title}</p>
                </div>
            ))}
        </div>
    );
}
